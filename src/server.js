import http from "node:http";
import { Database } from "./database.js";

const database = new Database();

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/tasks") {
    const tasks = database.select("tasks");

    return res
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(tasks));
  }

  if (method === "POST" && url === "/tasks") {
    const task = {
      Id: 1,
      name: "Denisio",
      email: "denisio@example.com",
    };

    database.insert("tasks", task);

    return res
      .setHeader("Conttnt-Type", "application/json")
      .writeHead(201)
      .end(JSON.stringify(task));
  }

  return res.writeHead(404).end();
});

server.listen(5000);
