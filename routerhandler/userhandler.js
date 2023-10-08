const generateJWT = require("jsonwebtoken");
const secretKey = "v3tstemplate";

let userArr = [
  {
    userId: 1,
    avatar: "http://127.0.0.1/apiresource/avatar.jpg",
    username: "admin",
    password: "111111",
    desc: "超级管理员",
    roles: ["超级管理员"],
    buttons: ["btn-imgfile-upload", "btn-default"],
    routes: ["permissions1", "permissions2", "permissions3"],
    token: "",
  },
  {
    userId: 2,
    avatar: "http://127.0.0.1/apiresource/avatar.jpg",
    username: "default",
    password: "111111",
    desc: "普通管理员",
    roles: ["普通管理员"],
    buttons: ["btn-default"],
    routes: ["permissions4", "permissions5", "permissions6"],
    token: "",
  },
];

function login(req, res) {
  // 获取请求体携带过来的用户名与密码
  let { username, password } = req.body;
  // 循环获取用户信息，用于判断是否有此用户且格式正确
  let checkUser = userArr.find(
    (item) => item.username === username && item.password === password
  );
  // 没有用户返回失败信息
  if (!checkUser) {
    setTimeout(() => {
      res.send({
        code: 201,
        data: {
          message: "账号或者密码不正确",
        },
      });
    }, 1500);
  } else {
    // 生成token
    let sendToken = generateJWT.sign(
      {
        username: checkUser.username,
        userid: checkUser.userId,
      },
      secretKey,
      { expiresIn: "12h" }
    );
    checkUser.token = "Bearer " + sendToken;
    setTimeout(() => {
      res.send({
        code: 200,
        data: {
          message: "登陆成功",
          token: sendToken,
        },
      });
    }, 1500);
  }
}

function info(req, res) {
  // 获取请求头携带token
  let userToken = req.headers.authorization;
  // 查看用户信息是否包含有此token用户
  let checkUser = userArr.find((item) => item.token === userToken);
  // 没有用户返回失败信息
  if (!checkUser) {
    setTimeout(() => {
      res.send({
        code: 201,
        data: {
          message: "获取用户信息失败",
        },
      });
    }, 500);
  } else {
    // 返回用户信息
    setTimeout(() => {
      res.send({
        code: 200,
        data: {
          message: "获取用户信息成功",
          userInfo: checkUser,
        },
      });
    }, 500);
  }
}

function logout(req, res) {
  // 获取请求头携带token
  let userToken = req.headers.authorization;
  // 查看用户信息是否包含有此token用户
  let checkUser = userArr.find((item) => item.token === userToken);
  // 没有用户返回失败信息
  if (!checkUser) {
    setTimeout(() => {
      res.send({
        code: 201,
        data: {
          message: "登出失败",
        },
      });
    }, 500);
  } else {
    // 清除用户token
    checkUser.token = "";
    setTimeout(() => {
      res.send({
        code: 200,
        data: {
          message: "登出成功",
        },
      });
    }, 500);
  }
}

module.exports = {
  login,
  info,
  logout,
};
