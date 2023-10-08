const express = require("express");
const parseJWT = require("express-jwt");
const koa = require("koa");
const serve = require("koa-static");
const proxy = require("koa2-proxy-middleware");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./router/user");
const testRouter = require("./router/test");

const app = express();
const serveapp = new koa();

serveapp.use(
  proxy({
    targets: {
      "/prod-api/(.*)": {
        target: "http://127.0.0.1",
        changeOrigin: true,
        pathRewrite: {
          "/prod-api": "",
        },
      },
    },
  })
);
serveapp.use(serve("./dist"));
serveapp.listen(3333, () => {
  console.log("项目挂载于http://127.0.0.1:3333");
});

const secretKey = "v3tstemplate";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/apiresource", express.static("./static"));
app.use(
  parseJWT.expressjwt({ secret: secretKey, algorithms: ["HS256"] }).unless({
    path: [/^\/user\/login/, /^\/test\/uploadimg/],
  })
);
app.use("/user", userRouter);
app.use("/test", testRouter);

app.use((err, req, res, next) => {
  if (err.name == "UnauthorizedError") {
    return res.send({
      code: 401,
      message: "voidtoken",
    });
  } else {
    res.send({
      code: 500,
      message: "unknownError",
    });
  }
});
app.listen(80, () => {
  console.log("接口挂载于http://127.0.0.1");
});
