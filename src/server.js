import http from "node:http";

const server = http.createServer((req, res) => {
  return res.end("Hello world");
  console.log("Legal");
});

server.listen(5000);
