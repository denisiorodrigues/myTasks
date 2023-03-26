import { timeEnd } from "node:console";
import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutesPath } from "./utils/build-routes-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutesPath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query;

      const tasks = database.select(
        "tasks",
        search
          ? {
              title: search,
            }
          : null
      );

      return res
        .setHeader("Content-Type", "application/json")
        .end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutesPath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;

      if (!title) {
        return res.writeHead(404).end("Title is required");
      }

      if (!description) {
        return res.writeHead(404).end("Describe is required");
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: null,
      };

      database.insert("tasks", task);

      return res
        .setHeader("Conttnt-Type", "application/json")
        .writeHead(201)
        .end(JSON.stringify(task));
    },
  },
  {
    method: "PUT",
    path: buildRoutesPath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      let task = database.find("tasks", id);
      task.title = title;
      task.description = description;
      task.updated_at = new Date();

      database.update("tasks", id, task);

      return res.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutesPath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;

      let task = database.find("tasks", id);
      task.completed_at = new Date();

      database.update("tasks", id, task);

      return res.writeHead(204).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutesPath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      database.delete("tasks", id);

      return res.writeHead(204).end();
    },
  },
];
