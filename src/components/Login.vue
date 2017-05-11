<template>
    <div>
        <el-row>
            <el-col :span="10" :offset="7">
                <el-tabs v-model="activeName" @tab-click="handleClick">

                    <el-tab-pane label="登录" name="login">
                        <el-form :model="loginForm" :rules="rules" label-width="100px" ref="loginForm">
                            <el-form-item label="用户名" prop="username">
                                <el-input v-model="loginForm.username"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input v-model="loginForm.password" type="password"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
                                <el-button @click="resetForm('loginForm')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>

                    <el-tab-pane label="注册" name="register">
                        <Register></Register>
                    </el-tab-pane>

                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>

<script>
//引入验证组件
import Register from './Register.vue'
import api from '../axios.js'

export default {
    data(){
        return {
            activeName: 'login', //选项卡
            loginForm: {        //表单v-model的值
                username: '',
                password: ''
            },
            rules: { //验证规则
                username: [
                    { required: true, message: '用户名不能少', trigger: 'blur'},
                    { min: 6, max: 16, message: '用户名在6到16位之间', trigger: 'blur'}
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        handleClick(tab, event){
            // console.log(tab, event);
        },
        resetForm(formName){
            this.$refs[formName].resetFields();
        },
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){ //验证通过
                    let opt = this.loginForm;
                    api.userLogin(opt)
                        .then(({ data }) => {
                            console.log('登录传来的json:' + JSON.stringify(data));
                            if(data.info === false){
                                this.$message({
                                    type: 'info',
                                    message: '账号不存在'
                                });
                                return ;
                            }
                            if(data.success){
                                this.$message({
                                    type: 'success',
                                    message: '登录成功'
                                })
                                let create_time = data.create_time;
                                let token = data.token;
                                let username = data.username;
                                console.log(token);
                                console.log(username);
                                this.$store.dispatch('UserLogin', token);
                                this.$store.dispatch('UserName', username);
                                //如果用户手动输入"/"那么会跳转到这里来，即this.$route.query.redirect有参数
                                let redirectUrl = decodeURIComponent(this.$route.query.redirect || '/');
                                console.log(redirectUrl);
                                this.$router.push({
                                    path: redirectUrl
                                });
                            }else{
                                this.$message({
                                    type: 'info',
                                    message: '密码错误'
                                });
                            }
                        });
                }else{ //验证不通过
                    console.log('error submit');
                    return false;
                }
            });
        }
    },
    components: {
        Register
    }
}
</script>

<style scoped>
    
</style>