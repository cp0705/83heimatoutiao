<template>
  <div class="login">
    <el-card class="login-card">
      <div class="title">
        <img src="./../../assets/images/logo_index.png" alt />
      </div>
      <!-- 数据校验=> 绑定model -->
      <el-form ref="myForm" :model="loginForm" :rules="loginRules" style="margin-top:20px;">
        <el-form-item prop="mobile">
          <!-- 手机号 -->
          <el-input placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <!-- 验证码 -->
          <el-input style="width:65%" placeholder="请输入验证码" v-model="loginForm.code"></el-input>
          <el-button style="float:right;">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="agree">
          <!-- 同意选项 -->
          <el-checkbox v-model="loginForm.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <!-- 登录按钮 -->
          <el-button @click="login" type="primary" style="width:100%;">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // 自定义校验
    let validator = function (rule, value, cb) {
    //   if (value) {
    //     cb()
    //   } else {
    //     cb(new Error('您必须无条件同意'))
    //   }
      value ? cb() : cb(new Error('您必须无条件同意'))
    }
    return {
      // 表单数据是一个对象
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        agree: false // 是否同意协议
      },
      // 校验规则对象
      loginRules: {
        mobile: [
          {
            required: true,
            message: '请输入您的手机号'
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '请输入合法的手机号'
          }
        ],
        code: [
          {
            required: true,
            message: '请您输入验证码'
          },
          {
            pattern: /^\d{6}$/,
            message: '请输入正确的验证码'
          }
        ],
        agree: [{ validator }]
      }
    }
  },
  methods: {
    login () {
      // 校验整个表单内容规则
      this.$refs.myForm.validate(isOk => {
        if (isOk) {
          this.$axios({
            method: 'post',
            url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
            data: this.loginForm
          }).then(res => {
            // console.log(res)
            window.localStorage.setItem('user-token', res.data.token)
            this.$router.push('/home')
          }).catch(() => {
            // this.$message({
            //   message: '您输入账号信息有误，请重新输入',
            //   type: 'warning'
            // })
            this.$message.warning('您输入账号信息有误，请重新输入')
          })
          console.log('校验成功')
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
//组件中写less  添加属性lang='less'
//默认情况下 vue单文件组件的style演示是全局的，添加scoped可避免样式冲突
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("./../../assets/images/login_bg.jpg");
  background-size: cover;
  .login-card {
    width: 440px;
    height: 340px;
    .title {
      text-align: center;
      img {
        height: 45px;
      }
    }
  }
}
</style>
