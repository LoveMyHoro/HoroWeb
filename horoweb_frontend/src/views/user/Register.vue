<script setup>
import { ref } from "vue";
import router from "@/router";
import { registerService, sendMailService } from "@/api/user";
// 1.由于提示用户的操作是成功了还是失败了
import { ElMessage } from 'element-plus';

// 2.设置返回的json数据
const registerForm = ref({
  username: "", // 使用用户名
  password: "",
  rePassword: "", // Add confirmPassword here if not present
  email: "", // 添加邮箱字段
});
// 3.设置校验规则
const rules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 20, message: "用户名长度在 3 到 20 个字符之间", trigger: "blur" },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  confirmPassword: [
    { required: true, message: "请确认密码", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value!== registerForm.value.password) {
          callback(new Error("两次密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  email: [
    { required: true, message: "请输入邮箱地址", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" },
  ]
};

// 用于存储生成的验证码
const verificationCode = ref("");
// 用于标记验证码是否已发送
const isVerificationCodeSent = ref(false);
// 用于存储用户输入的验证码
const enteredVerificationCode = ref("");

// 生成随机验证码的函数
const generateVerificationCode = () => {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
};

// 发送邮箱验证
const sendVerificationEmail = async () => {
  const email = registerForm.value.email;
  if (!email) {
    ElMessage.error("请先填写邮箱地址");
    return;
  }

    const result = await sendMailService(email);
    ElMessage.success("验证码已发送，请查收邮件");
    isVerificationCodeSent.value = true;
    verificationCode.value=result.data;
    console.log(verificationCode.value);
};

// 验证用户输入的验证码是否正确
const verifyVerificationCode = () => {
  if (enteredVerificationCode.value === verificationCode.value) {
    // 这里可以继续执行注册操作，调用真正的注册服务
    register();
  } else {
    ElMessage.error("验证码错误，请重新输入");
  }
};

// 5.发送注册请求
// 引入registerFormRef来引用表单：
const registerFormRef = ref(null);

const register = async () => {
  const valid = await registerFormRef.value.validate();
  if (valid) {
    // 使用用户名进行注册
    await registerService(registerForm.value); // 注册服务
    ElMessage.success("注册成功!");
    router.push("/login"); // 跳转到登录页面
  }
};

// 5.切换页面
const goToLogin = () => {
  router.push("/login"); // 返回登录页面
};

// 6.粒子效果
const options = {
  fpsLimit: 60,
  interactivity: {
    detectsOn: "canvas",
    events: {
      onClick: {
        // 开启鼠标点击的效果
        enable: true,
        mode: "push",
      },
      onHover: {
        // 开启鼠标悬浮的效果(线条跟着鼠标移动)
        enable: true,
        mode: "grab",
      },
      resize: true,
    },
    modes: {
      // 配置动画效果
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      grab: {
        distance: 200,
        duration: 0.4,
      },
      attract: {
        // 鼠标悬浮时，集中于一点，鼠标移开时释放产生涟漪效果
        distance: 200,
        duration: 0.4,
        factor: 5,
      },
    },
  },
  particles: {
    color: {
      value: "#BA55D3", // 粒子点的颜色
    },
    links: {
      color: "#FFBBFF", // 线条颜色
      distance: 150, // 线条距离
      enable: true,
      opacity: 0.4, // 不透明度
      width: 1.2, // 线条宽度
    },
    collisions: {
      enable: true,
    },
    move: {
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
      bounce: false,
      direction: "none",
      enable: true,
      out_mode: "out",
      random: false,
      speed: 0.5, // 移动速度
      straight: false,
    },
    number: {
      density: {
        enable: true,
        value_area: 800,
      },
      value: 80, // 粒子数
    },
    opacity: {
      // 粒子透明度
      value: 0.7,
    },
    shape: {
      // 粒子样式
      type: "star",
    },
    size: {
      // 粒子大小
      random: true,
      value: 3,
    },
  },
  detectRetina: true,
};
</script>

<template>
  <div class="login">
    <Particles id="tsparticles" class="login__particles" :options="options" />

    <div class="loginPart">
      <h2>用户注册</h2>
      <el-form
        aria-autocomplete="off"
        :model="registerForm"
        ref="registerFormRef"
        :rules="rules"
        label-width="100px"
        style="transform: translate(-30px)"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="registerForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="registerForm.password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            type="password"
            v-model="registerForm.confirmPassword"
            placeholder="请确认密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="registerForm.email"
            placeholder="请输入邮箱地址"
          ></el-input>
        </el-form-item>
        <el-button
          v-if="!isVerificationCodeSent"
          class="btn"
          type="primary"
          @click="sendVerificationEmail"
        >发送验证码</el-button>
        <el-form-item v-if="isVerificationCodeSent">
          <el-input
            v-model="enteredVerificationCode"
            placeholder="请输入验证码"
          ></el-input>
          <el-button
            class="btn"
            type="primary"
            @click="verifyVerificationCode"
          >验证并注册</el-button>
        </el-form-item>
        <div style="text-align: right; transform: translate(0, 30px)">
          <el-link type="success" @click="goToLogin">已有账号？去登录</el-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('@/assets/images/bg5.jpg') no-repeat center center;
  background-size: cover;
}
.login__particles {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0.9;
  position: fixed;
  pointer-events: none;
}

.loginPart {
  position: absolute;
  /*定位方式绝对定位absolute*/
  top: 50%;
  left: 80%;
  /*顶和高同时设置50%实现的是同时水平垂直居中效果*/
  transform: translate(-50%, -50%);
  /*实现块元素百分比下居中*/
  width: 450px;
  padding: 50px;
  background: rgba(255, 204, 255, 0.3);
  /*背景颜色为黑色，透明度为0.8*/
  box-sizing: border-box;
  /*box-sizing设置盒子模型的解析模式为怪异盒模型，
    将border和padding划归到width范围内*/
  box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.5);
  /*边框阴影  水平阴影0 垂直阴影15px 模糊25px 颜色黑色透明度0.5*/
  border-radius: 15px;
  /*边框圆角，四个角均为15px*/
}

h2 {
  margin: 0 0 30px;
  padding: 0;
  color:  #fff;
  text-align: center;
  /*文字居中*/
}

.btn {
  transform: translate(170px);
  width: 80px;
  height: 40px;
  font-size: 15px;
}
</style>