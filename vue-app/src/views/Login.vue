<template>
  <div class="login">
    <div class="right">
      <div class="logoText">
        <div class="logo"></div>
        <div class="text">欢迎使用智慧家庭种植</div>
      </div>
      <div class="form">

        <nut-cell>
          <span slot="title">
            <nut-textinput
              class="left-icon username"
              v-model="username"
              placeholder="请输入账号"
            />
          </span>
        </nut-cell>

        <nut-cell>
          <span slot="title">
            <nut-textinput
              class="left-icon password"
              v-model="password"
              placeholder="请输入密码"
              type="password"
            />
          </span>
        </nut-cell>

        <nut-button @click="login">
          登录
        </nut-button>
      </div>
    </div>
  </div>
</template>

<script>
import { saveLocalUser } from "../utils/session.js";
export default {
  data() {
    return {
      username: null,
      password: null
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters["getUserInfo"];
    }
  },
  methods: {
    login() {
      console.log("login");
      /**
       * 客户端对账号信息进行一些必要的校验。
       * 实际开发中，根据业务需要进行处理，这里仅做示例。
       */
      if (this.username.length < 5) {
        this.$toast.fail("账号最短为 5 个字符", {
          duration: 4000,
          center: true
        });
        return;
      }
      if (this.password.length < 6) {
        this.$toast.fail("密码最短为 6 个字符", {
          duration: 4000,
          center: true
        });
        return;
      }
      /**
       * 下面简单模拟下服务端的处理
       * 检测用户账号密码是否在已注册的用户列表中
       * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
       */
      const data = {
        username: this.username,
        password: this.password,
        rememberMe: false
      };
      this.$store.dispatch("login", data).then(res => {
        saveLocalUser(this.userInfo);
        this.$router.push({
          path: "/login"
        });
      });
    }
  }
};
</script>

<style>
.login .nut-button {
  height: 6vh;
  font-size: 3vh;
  border-radius: 6px;
  background: #ff4040;
}

.login .nut-textinput.left-icon input {
  height: 6vh;
  font-size: 3vh;
  border-radius: 6px;
  padding-left: 5vh;
  padding-right: 40px;
}
.login .nut-textinput.username input {
  background: url("../assets/icons/user.svg") no-repeat 10px center;
  background-size: 3vh;
}
.login .nut-textinput.password input {
  background: url("../assets/icons/password.svg") no-repeat 10px center;
  background-size: 3vh;
}
.login .nut-textinput {
  border-radius: 6px;
}
.login .nut-textinput .nut-textinput-clear {
  right: 15px;
  height: 3vh;
  width: 3vh;
}
.login .nut-cell {
  width: 100%;
  padding: 0px;
  border-radius: 6px;
  /* height: 100px; */
}
/* .login .nut-cell .nut-cell-box {
    height: 100px;
} */
/* .login .nut-cell .nut-cell-left {
    width: 100%;
} */
/* .login .nut-cell .nut-cell-right {
    height: 100px;
} */
</style>


<style scoped>
.login .logoText {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: rgba(39, 147, 255, 1);
  width: calc(60% + 6vh);
  height: 12vh;
  margin-bottom: 1vh;
  border-radius: 6px;
}
.login .logoText .logo {
  width: 12vw;
  height: 12vw;
  background: url("../assets/logo.png");
  line-height: 1;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-right: 3vh;
}
.login .logoText .text {
  /* width: 5vw; */
  height: 5vw;
  line-height: 1;
  color: rgba(255, 255, 255, 1);
  font-size: 3vh;
  display: flex;
  align-items: center;
}
.login .btmText {
  position: absolute;
  bottom: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
}
.login .left {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.login .left .logo {
  width: 12vw;
  height: 12vw;
  background: url("../assets/logo.png");
  line-height: 1;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.login .left .text {
  color: rgba(255, 255, 255, 1);
  font-size: 3vh;
}
.login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.form {
  width: 60%;
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: rgba(230, 230, 230, 0.5);
  padding: 3vh;
  border-radius: 6px;
}
.left {
  background: rgba(39, 147, 255, 1);
}
.right {
  background: #eee;
}
/* 横屏 */
@media all and (min-device-aspect-ratio: 4/3) {
  .left {
    height: 100%;
    width: 20vw;
  }

  .right {
    height: 100%;
    width: 80vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .login .right .logoText {
    display: none !important;
  }
}

/*竖屏*/
@media all and (max-device-aspect-ratio: 3/4) {
  .left {
    height: 100%;
    width: 0%;
    display: none !important;
  }

  .right {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>


