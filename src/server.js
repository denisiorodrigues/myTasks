import http from "node:http";

const tasks = [];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/tasks") {
    res
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(tasks));
  }

  if (method === "POST" && url === "/tasks") {
    const task = {
      Id: 1,
      name: "Denisio",
      email: "denisio@example.com",
    };

    tasks.push(task);

    res
      .setHeader("Conttnt-type", "application/json")
      .writeHead(201)
      .end(JSON.stringify(task));
  }

  res.writeHead(404).end();
});

server.listen(5000);
