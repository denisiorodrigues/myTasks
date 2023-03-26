import { randomUUID } from "node:crypto";
import { Database } from "./database.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: "/tasks",
    handler: (req, res) => {
      const tasks = database.select("tasks");

      return res
        .setHeader("Content-Type", "application/json")
        .end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: "/tasks",
    handler: (req, res) => {
      const { name, done } = req.body;

      const task = {
        Id: randomUUID(),
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
];
