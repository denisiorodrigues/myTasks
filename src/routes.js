import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutesPath } from "./utils/build-routes-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutesPath("/tasks"),
    handler: (req, res) => {
      const tasks = database.select("tasks");

      return res
        .setHeader("Content-Type", "application/json")
        .end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutesPath("/tasks"),
    handler: (req, res) => {
      const { name, done } = req.body;

      const task = {
        id: randomUUID(),
        name,
        done,
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
      const { name, done } = req.body;

      const task = {
        name,
        done,
      };

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
