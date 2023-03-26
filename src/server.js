import http from "node:http";
import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { json } from "./middlewares/json.js";

const database = new Database();

const server = http.createServer(async (req, res) => {
  await json(req, res);

  const { method, url } = req;
  if (method === "GET" && url === "/tasks") {
    const tasks = database.select("tasks");

    return res
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(tasks));
  }

  if (method === "POST" && url === "/tasks") {
    console.log(req.body);

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
  }

  return res.writeHead(404).end();
});

server.listen(5000);
