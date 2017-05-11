const UserController = require('../controller/user.js');
const Router = require('koa-router');

const childRouter = new Router();

const checkToken = require('../token/checkToken.js');

childRouter.post('/login', UserController.Login);
childRouter.post('/register', UserController.Reg);

//这个路由，表示要先检查权限
childRouter.get('/user', checkToken, UserController.GetAllUsers);
childRouter.post('/delUser', checkToken, UserController.DelUser);

module.exports = childRouter;