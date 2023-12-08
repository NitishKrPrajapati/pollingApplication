const { registerUser, loginUser } = require("../Controllers/UserControllers");

const UserRouter = require("express").Router();

UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
module.exports = { UserRouter };
