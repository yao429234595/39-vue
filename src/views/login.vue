<template>

  <el-row type="flex" class="row-bg" justify="center" align="middle">
    <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
      <el-form :model="form" :rules="rules" ref="ruleForm" class="content" label-position="top" label-width="80px">
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
  
</template>

<script>

  //引入axios
  import axios from "axios"

  export default {
    data() {
      return {
        form: {
         username: "admin",
         password: "123456"
        },
        rules: {
          username: [
            { required: true, message: '请输入账号名称', trigger: 'blur' },
            { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'change' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           axios({
             url: 'http://localhost:8888/api/private/v1/login',
             method: 'post',
             data: this.form
           }).then(({data: {data, meta}}) => {
             console.log(data, meta)
             if(meta.status === 200) {
               localStorage.setItem('token', data.token)
               this.$router.push('/home')
             }
             if(meta.status === 400) {
               alert("用户名或者密码错误")
             }
             
           })
          } else {
              return false
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
  
</script>

<style>
  .row-bg {
    height: 100%;
    background-color: #2D434C;
  }
  .content {
    background-color: #fff;
    padding: 30px 20px;
    border-radius: 15px;
    min-width: 400px;
  }
</style>

