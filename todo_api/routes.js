const todos = require("./todos");

const router = async function (req, res) {
  // GET: /api/todos
  if (req.url === "/api/todos" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });

    res.end(JSON.stringify(todos));
  }

  // GET: /api/todos/:id
  if (req.url.match(/^\/api\/todos\/([0-9]+)$/) && req.method === "GET") {
    try {
      // extract id from url
      const id = req.url.split("/")[3];

      const todo = todos.find((todo) => Number(todo.id) === Number(id));

      if (todo) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(todo));
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Todo does not exist" }));
      }
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Internal Server Error" }));
    }
  }

  // POST: /api/todos/
  if (req.url === "/api/todos" && req.method === "POST") {
    let body = "";

    try {
      // Listen for data event
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      // Listen for the end event
      req.on("end", async () => {
        // Create a new todo
        const newTodo = JSON.parse(body);
        todos.push(newTodo);

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newTodo)); // Convert object to JSON string
      });
    } catch (error) {
      console.log(error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Internal Server Error" }));
    }
  }

  // PUT: /api/todos/:id
  if (req.url.match(/^\/api\/todos\/([0-9]+)$/) && req.method === "PUT") {
    try {
      const id = req.url.split("/")[3];
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", async () => {
        const todo = todos.find((todo) => Number(todo.id) === Number(id));

        if (todo) {
          todos[todo] = JSON.parse(body);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(todos[todo]));
        } else {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Todo does not exist" }));
        }
      });
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Internal Server Error" }));
    }
  }

  // DELETE: /api/todos/:id
  if (req.url.match(/^\/api\/todos\/([0-9]+)$/) && req.method === "DELETE") {
    try {
      const id = req.url.split("/")[3];

      const todoIndex = todos.findIndex(
        (todo) => Number(todo.id) === Number(id)
      );
      if (todoIndex === -1) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Todo does not exist" }));
      } else {
        todos.splice(todoIndex, 1);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Todo deleted successfully" }));
      }
    } catch (error) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: error }));
    }
  }
};

module.exports = router;
