<template>
  <div class="login">
      <el-card class="login-card">
          <div class="title">
              <img src="./../../assets/images/logo_index.png" alt="">
          </div>
          <el-form style="margin-top:20px;">
             <el-form-item>
                 <el-input></el-input>
             </el-form-item>
             <el-form-item>
                 <el-input style="width:65%"></el-input>
                 <el-button style="float:right;">发送验证码</el-button>
             </el-form-item>
             <el-form-item>
                 <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
             </el-form-item>
             <el-form-item>
                 <el-button type="primary" style="width:100%;">登录</el-button>
             </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {

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
    background: url('./../../assets/images/login_bg.jpg');
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
