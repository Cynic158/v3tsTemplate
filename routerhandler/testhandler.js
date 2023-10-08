const multiparty = require("multiparty");
const path = require("path");
const fs = require("fs");

let fileArr = [
  {
    fileId: 1,
    fileUrl: "http://127.0.0.1/apiresource/avatar.jpg",
    fileName: "头像",
  },
  {
    fileId: 2,
    fileUrl: "http://127.0.0.1/apiresource/loginbg.png",
    fileName: "登录背景",
  },
];
let urlArr = [
  "http://127.0.0.1/apiresource/avatar.jpg",
  "http://127.0.0.1/apiresource/loginbg.png",
];

function generateFilename(oldFilename) {
  let d = new Date();
  let names = oldFilename.split(".");
  return `${names[0]}${d.getTime()}.${names[1]}`;
}

function uploadimg(req, res) {
  let form = new multiparty.Form({
    uploadDir: "./static",
  });
  form.parse(req, function (err, fields, files) {
    if (err) {
      console.log(err.message);
    } else {
      Object.values(files).forEach((file) => {
        let size = file[0].size;
        let oldpath = file[0].path;
        if (size > 0) {
          let oldname = file[0].originalFilename;
          // 此处拼接，首先用path.dirname取得oldpath的除去文件名的路径
          // 然后与新生产的文件名进行拼接
          let newpath = path.join(
            path.dirname(oldpath),
            generateFilename(oldname)
          );
          // 以同步的方式重命名文件
          fs.renameSync(oldpath, newpath);
          let fileurl = "http://127.0.0.1/apiresource/" + newpath.substring(7);
          urlArr.push(fileurl);
          setTimeout(() => {
            res.send({
              code: 200,
              data: {
                message: "上传成功",
                imgurl: fileurl,
              },
            });
          }, 500);
        } else {
          // 以同步的方式移除大小有误的文件
          fs.rmSync(oldpath);
          setTimeout(() => {
            res.send({
              code: 201,
              data: {
                message: "文件不符合要求",
              },
            });
          }, 500);
        }
      });
    }
  });
}

function addfileitem(req, res) {
  console.log(req.body.imgUrl);
  let result = urlArr.find((item) => item == req.body.imgUrl);
  if (result) {
    fileArr.push({
      fileId: fileArr[fileArr.length - 1].fileId + 1,
      fileUrl: req.body.imgUrl,
      fileName: req.body.imgName,
    });
    setTimeout(() => {
      res.send({
        code: 200,
        data: {
          message: "添加成功",
        },
      });
    }, 500);
  } else {
    setTimeout(() => {
      res.send({
        code: 201,
        data: {
          message: "添加失败(图片出错)",
        },
      });
    }, 500);
  }
}

function deletefileitem(req, res) {
  let result = fileArr.find((item) => item.fileId == req.body.fileid);
  if (result) {
    fileArr.splice(result.fileId - 1, 1);
    setTimeout(() => {
      res.send({
        code: 200,
        data: {
          message: "删除成功",
        },
      });
    }, 500);
  } else {
    setTimeout(() => {
      res.send({
        code: 201,
        data: {
          message: "删除失败",
        },
      });
    }, 500);
  }
}

function editfileitem(req, res) {
  let result = fileArr.find((item) => item.fileId == req.body.fileid);
  if (result) {
    result.fileName = req.body.filename;
    result.fileUrl = req.body.fileurl;
    setTimeout(() => {
      res.send({
        code: 200,
        data: {
          message: "编辑成功",
        },
      });
    }, 500);
  } else {
    setTimeout(() => {
      res.send({
        code: 201,
        data: {
          message: "编辑失败",
        },
      });
    }, 500);
  }
}

function getfilelist(req, res) {
  // 接收页码返回列表
  // 页码算法
  let startIndex = (req.query.page - 1) * req.query.pagesize;
  let silceArr = fileArr.slice(startIndex, startIndex + req.query.pagesize);
  let total = fileArr.length;
  setTimeout(() => {
    res.send({
      code: 200,
      data: {
        message: "获取成功",
        total: total,
        filelist: silceArr,
      },
    });
  }, 500);
}

module.exports = {
  uploadimg,
  addfileitem,
  getfilelist,
  deletefileitem,
  editfileitem,
};
