const todos = require("./todos");

const router = async function (req, res) {
  // GET: /api/todos
  if (req.url === "/api/todos" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });

    res.end(JSON.stringify(todos));
  }

  // GET: /api/todos/:id
  if (
    req.url.match("/\\\\/api\\\\/todos\\\\/([0-9]+)/") &&
    req.method === "GET"
  ) {
    try {
      // extract id from url
      const id = req.url.split("/")[3];
      const todo = await todos.find((todo) => todo.id === id);

      if (todo) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(todo));
      } else {
        throw new Error("Todo does not exist");
      }
    } catch (error) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: error }));
    }
  }

  // POST: /api/todos/
  if (req.url === "/api/todos" && req.method === "POST") {
    try {
      let body = "";

      // Listen for data event
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      // Listen for the end event
      req.on("end", async () => {
        // Create a new todo
        await todos.push(JSON.parse(body));
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(todos.slice(-1));
      });
    } catch (error) {
      console.log(error);
    }
  }

  // PUT: /api/todos/:id
  if (
    req.url.match("/\\\\/api\\\\/todos\\\\/([0-9]+)/") &&
    req.method === "PUT"
  ) {
    try {
      const id = req.url.split("/")[3];
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", async () => {
        const todo = todos.find((todo) => todo.id === id);

        if (!todo) throw new Error("Todo does not exist");
        todos[todo] = JSON.parse(body);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(todo));
      });
    } catch (error) {
      console.log(error);
    }
  }

  // DELETE: /api/todos/:id
  if (
    req.url.match("/\\\\/api\\\\/todos\\\\/([0-9]+)/") &&
    req.method === "DELETE"
  ) {
    try {
      const id = req.url.split("/")[3];

      const todoIndex = todos.findIndex((todo) => (todo.id = id));
      if (!todoIndex) throw new Error("Todo does not exist");

      todos.splice(todoIndex, 1);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Todo deleted successfully" }));
    } catch (error) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: error }));
    }
  }
};

module.exports = router;
