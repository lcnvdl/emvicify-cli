const install = require("./cmd/install");
const here = require("./cmd/here");
const makeController = require("./cmd/make-controller");
const makeRouter = require("./cmd/make-router");
const makeMiddleware = require("./cmd/make-middleware");
const makeService = require("./cmd/make-service");

module.exports = {
  install,
  here,
  makeController,
  makeRouter,
  makeMiddleware,
  makeService,
};
