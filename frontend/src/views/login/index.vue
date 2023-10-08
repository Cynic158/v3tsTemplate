<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0" :md="12" style="height: 100vh"></el-col>
      <el-col
        :span="12"
        :xs="24"
        :md="12"
        style="height: 100vh; position: relative"
      >
        <el-form
          :model="loginData"
          :rules="rules"
          class="login-form"
          ref="loginform"
        >
          <h1>
            欢迎
            <div class="tip">
              <h3>超级管理员: admin 111111</h3>
              <h3>普通管理员: default 111111</h3>
            </div>
          </h1>
          <h2>Welcome to v3tsTemplate</h2>
          <div class="input-container">
            <el-form-item prop="username">
              <el-input
                class="up-input"
                v-model="loginData.username"
                prefix-icon="User"
                placeholder="请输入用户名"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                class="down-input"
                v-model="loginData.password"
                type="password"
                placeholder="请输入密码"
                show-password
                prefix-icon="Lock"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login" :loading="loadingflag"
                >登录</el-button
              >
            </el-form-item>
          </div>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
// 导入用户仓库
import useUserStore from "@/store/modules/user";
// 使用路由
import { useRouter } from "vue-router";
// element的消息通知组件
// @ts-ignore
import { ElNotification } from "element-plus";
// 获取时间字符串函数
import { getTimeStr } from "@/utils/index";

// 使用user仓库
let userStore = useUserStore();
// 使用路由
let $router = useRouter();

// 表单校验规则
const rules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 5, max: 10, message: "用户名长度为5到10位", trigger: "blur" },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
    {
      min: 6,
      max: 15,
      message: "密码长度为6到15位",
      trigger: "blur",
    },
  ],
};

//登录部分
// 表单元素
let loginform = ref(null);
// 表单数据
let loginData = reactive({
  username: "",
  password: "",
});
// 登录按钮加载状态
let loadingflag = ref(false);
// 登录事件
let login = async () => {
  // 校验表单
  // @ts-ignore
  await loginform.value.validate();

  try {
    // 显示加载
    loadingflag.value = true;
    // 由仓库发起请求
    await userStore.userLogin(loginData);
    // 请求成功，进入首页
    $router.push("/");
    // 获取当前时段字符串
    let timestr: string = getTimeStr();
    // 消息提示
    ElNotification({
      type: "success",
      title: timestr,
      message: "登录成功",
      duration: 3000,
    });
  } catch (error: any) {
    // 请求失败，消息提示
    ElNotification({
      type: "error",
      message: error.message,
      duration: 3000,
    });
  } finally {
    // 请求完成，关闭加载
    loadingflag.value = false;
  }
};

onMounted(() => {
  // 登录表单输入键盘快捷键代码块
  // 用户名输入框
  // @ts-ignore
  let upInput = document.querySelector(".up-input").children[0].children[1];
  // 密码输入框
  // @ts-ignore
  let downInput = document.querySelector(".down-input").children[0].children[1];
  // 判断用户名输入框是否聚焦flag
  let upFocus = false;
  // 判断密码输入框是否聚焦flag
  let downFocus = false;
  // 判断用户名输入框是否聚焦
  upInput.addEventListener("focus", () => {
    upFocus = true;
  });
  // 判断密码输入框是否聚焦
  downInput.addEventListener("focus", () => {
    downFocus = true;
  });
  // 判断用户名输入框是否失去聚焦
  upInput.addEventListener("blur", () => {
    upFocus = false;
  });
  // 判断密码输入框是否失去聚焦
  downInput.addEventListener("blur", () => {
    downFocus = false;
  });
  // 监听表单并对快捷键进行回应
  // @ts-ignore
  document
    .querySelector(".login-form")
    .addEventListener("keyup", function (e: any) {
      if ((e.key == "ArrowDown" || e.key == "ArrowUp") && upFocus == true) {
        // 用户名输入框按上下箭头，跳转聚焦到密码输入框
        // @ts-ignore
        downInput.focus();
      } else if (
        (e.key == "ArrowDown" || e.key == "ArrowUp") &&
        downFocus == true
      ) {
        // 密码输入框按上下箭头，跳转聚焦到用户名输入框
        // @ts-ignore
        upInput.focus();
      } else if (e.key == "Enter") {
        // 回车键则点击登录
        login();
      }
    });

  // 自动聚焦
  // @ts-ignore
  upInput.focus();

  // 清空校验提示，防止登出时回到登录页还有校验提示
  // @ts-ignore
  loginform.value.clearValidate(["username", "password"]);

  // 根据env变量来更改背景图片
  // let envUrl = import.meta.env.VITE_APP_BASE_URL;
  // @ts-ignore
  // document.querySelector(".login-container").style.backgroundImage =
  //   'url("' + envUrl + '/apiresource/loginbg.png")';
  // document.querySelector(".login-container").style.backgroundImage =
  //   'url("' + envUrl + '/apiresource/loginbg.png")';
});
</script>

<style scoped lang="scss">
.tip {
  font-size: 16px;
  float: right;
  margin-top: 10px;
  margin-right: 10px;
}
.login-container {
  width: 100%;
  height: 100vh;
  // background-image: url("/apiresource/loginbg.png");
  background-image: url("../../../public/bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  .login-form {
    width: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    background-color: rgba($color: $login-form-bgcolor, $alpha: 0.6);
    padding: 12px 18px 8px 18px;
    h1 {
      color: #fff;
      font-size: 40px;
      margin-bottom: 12px;
    }
    h2 {
      color: #fff;
      font-size: 20px;
      margin-bottom: 12px;
    }
    .input-container {
      margin-left: 40px;
      margin-right: 40px;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>
