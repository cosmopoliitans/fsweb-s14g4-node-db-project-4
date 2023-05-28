// require("dotenv").config();

const server = require("./api/server");

const port = 4000;

server.listen(port, () => {
  console.log(`server is running at ${port}`);
});
