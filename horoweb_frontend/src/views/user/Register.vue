<script setup>
import { ref } from "vue";
import router from "@/router";
import { registerService, sendMailService } from "@/api/user";
import { ElMessage } from 'element-plus';

// 注册表单数据
const registerForm = ref({
  username: "",
  password: "",
  rePassword: "",
  email: "",
});

// 表单验证规则
const rules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 20, message: "用户名长度在3到20个字符之间", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
  ],
  rePassword: [
    {
      required: true, message: "请确认密码", trigger: "blur"
    },
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
      trigger: "blur"
    }
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
  try {
    const result = await sendMailService(email);
    ElMessage.success("验证码已发送，请查收邮件");
    isVerificationCodeSent.value = true;
    verificationCode.value = result.data;
    console.log(verificationCode.value);
  } catch (error) {
    ElMessage.error("发送验证码失败，请稍后再试");
    console.error(error);
  }
};

// 验证用户输入的验证码是否正确
const verifyVerificationCode = () => {
  if (enteredVerificationCode.value === verificationCode.value) {
    register();
  } else {
    ElMessage.error("验证码错误，请重新输入");
  }
};

// 发送注册请求
const registerFormRef = ref(null);
const register = async () => {
  try {
    const valid = await registerFormRef.value.validate();
    if (valid) {
      await registerService(registerForm.value);
      ElMessage.success("注册成功!");
      router.push("/login");
    }
  } catch (error) {
    ElMessage.error("注册失败，请检查输入信息");
    console.error(error);
  }
};

// 切换页面
const goToLogin = () => {
  router.push("/login");
};

// 粒子效果
const options = {
  fpsLimit: 60,
  interactivity: {
    detectsOn: "canvas",
    events: {
      onClick: {
        enable: true,
        mode: "push"
      },
      onHover: {
        enable: true,
        mode: "grab"
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40
      },
      push: {
        quantity: 4
      },
      grab: {
        distance: 200,
        duration: 0.4
      },
      attract: {
        distance: 200,
        duration: 0.4,
        factor: 5
      }
    }
  },
  particles: {
    color: {
      value: "#BA55D3"
    },
    links: {
      color: "#FFBBFF",
      distance: 150,
      enable: true,
      opacity: 0.4,
      width: 1.2
    },
    collisions: {
      enable: true
    },
    move: {
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      },
      bounce: false,
      direction: "none",
      enable: true,
      out_mode: "out",
      random: false,
      speed: 0.5,
      straight: false
    },
    number: {
      density: {
        enable: true,
        value_area: 800
      },
      value: 80
    },
    opacity: {
      value: 0.7
    },
    shape: {
      type: "star"
    },
    size: {
      random: true,
      value: 3
    }
  },
  detectRetina: true
};
</script>

<template>
  <div class="register">
    <img src="@/assets/images/bg5.jpg" alt="注册页面背景图" class="register-bg-img" loading="lazy" />
    <Particles id="tsparticles" class="register__particles" :options="options" />
    <div class="registerPart">
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
        <el-form-item label="确认密码" prop="rePassword">
          <el-input
            type="password"
            v-model="registerForm.rePassword"
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
.register {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-bg-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.register__particles {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0.9;
  position: fixed;
  pointer-events: none;
}

.registerPart {
  position: absolute;
  top: 50%;
  left: 80%;
  transform: translate(-50%, -50%);
  width: 450px;
  padding: 50px;
  background: rgba(255, 204, 255, 0.3);
  box-sizing: border-box;
  box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.5);
  border-radius: 15px;
}

h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.btn {
  transform: translate(170px);
  width: 80px;
  height: 40px;
  font-size: 15px;
}
</style>