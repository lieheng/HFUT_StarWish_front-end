<template>
    <div class="Bar" data-v-60a5c4bb data-v-b15b4b37>
        <el-row>
            <el-col :span="4" :offset="2">
                <div class="horcenter">
                    <RouterLink to="/" class="Title" data-v-b15b4b37 data-v-e9cb7cd5>
                        <img style="width: 50px" src="/src/assets/自闭症logo.png" />
                        <span class="text" data-v-e9cb7cd5>StarWish</span>
                    </RouterLink>
                </div>
            </el-col>
            <el-col :span="4" :offset="12">
                <div class="horcenter">
                    <div v-if="store.state.isLogin" class="vt-flyout VPNavBarMenuGroup" data-v-9b494740=""
                        data-v-93e4270e="">
                        <span class="vt-flyout-button-text">{{ store.state.username }}
                            <el-icon>
                                <ArrowDown />
                            </el-icon>
                        </span>
                        <div class="vt-flyout-menu">
                            <div class="vt-menu">
                                <div class="vt-menu-items">
                                    <button class="vt-link link vt-menu-link" v-on:click="GotoHistory">
                                        历史记录
                                    </button>
                                    <button class="vt-link link vt-menu-link">
                                        <a href="/">退出登录</a>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button v-else class="Title" data-v-b15b4b37 data-v-e9cb7cd5 plain @click="GotoLogin">
                        <span class="vt-flyout-button-text">登录/注册</span>
                    </button>
                </div>
            </el-col>
        </el-row>
    </div>
    <el-dialog v-model="dialogLoginVisible" title="登录" width="500" :before-close="Close">
        <el-form :model="login" :rules="loginRules">
            <el-form-item label="&emsp;账号&emsp;" prop="username">
                <el-input v-model="login.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="&emsp;密码&emsp;">
                <el-input v-model="login.password" autocomplete="off" :show-password="true" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="GotoRegister">去注册</el-button>
                <el-button type="primary" @click="Login">
                    登录
                </el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="dialogRegisterVisible" title="注册" width="500" :before-close="Close">
        <el-form :model="register" :rules="registerRules">
            <el-form-item label="&emsp;账号&emsp;" prop="username">
                <el-input v-model="register.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="&emsp;密码&emsp;" prop="password">
                <el-input v-model="register.password" autocomplete="off" :show-password="true" />
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
                <el-input v-model="register.confirmPassword" autocomplete="off" :show-password="true" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="GotoLogin">去登录</el-button>
                <el-button type="primary" @click="Register">
                    注册
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<style>
.horcenter {
    margin: 0 auto;
    max-width: 100%
}

.el-col {
    display: flex;
}
</style>

<script lang="ts" setup>
import axios from 'axios'
import { RouterLink, RouterView } from 'vue-router'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import store from '../store/index.js'
import router from '@/router'

const dialogLoginVisible = ref(false)
const dialogRegisterVisible = ref(false)

const login = reactive({
    username: '',
    password: ''
})

const register = reactive({
    username: '',
    password: '',
    confirmPassword: ''
})

function GotoRegister() {
    dialogLoginVisible.value = false
    dialogRegisterVisible.value = true
    login.username = ''
    login.password = ''
}

function GotoLogin() {
    dialogLoginVisible.value = true
    dialogRegisterVisible.value = false
    register.username = ''
    register.password = ''
    register.confirmPassword = ''
}

const loginRules = reactive({
    username: [
        { max: 100, message: '最大限制为100个字符', trigger: 'change' },
        {
            pattern: /^\w+$/,
            message: '仅可以包含字母、数字、下划线',
            trigger: 'change'
        }
    ]
})

const registerRules = reactive({
    username: [
        { required: true, message: '请输入账号', trigger: 'change' },
        { max: 100, message: '最大限制为100个字符', trigger: 'change' },
        {
            pattern: /^\w+$/,
            message: '仅可以包含字母、数字、下划线',
            trigger: 'change'
        }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'change' },
        {
            pattern: /^(?=.*[a-zA-Z])(?=.*\d).{8,16}$/,
            message: '至少包含字母、数字，8-16位',
            trigger: 'change'
        }
    ],
    confirmPassword: [
        { required: true, message: '请再次输入密码', trigger: 'change' },
        {
            validator: (rule: any, value: any, callback: any) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== register.password) {
                    callback(new Error('两次输入密码不一致!'));
                }
            }
        }]
})

function Logout() {
    store.commit('setUsername', '')
    store.commit('setLogin', false)
}

function GotoHistory() {
    axios.post('http://localhost:8080/history', {
        username: store.state.username
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (response) {
        store.commit('setReport', response.data)
        router.push("/history")
    }).catch(function (error) {
        ElMessage({
            message: '网络异常',
            type: 'error'
        })
    })
}


function Register() {
    var uPattern = /^\w+$/
    var pPattern = /^(?=.*[a-zA-Z])(?=.*\d).{8,16}$/
    if(!(uPattern.test(register.username))||!pPattern.test(register.password) ){
        ElMessage({
            message: '格式错误',
            type: 'error'
        })
        return
    }
    if (register.password != register.confirmPassword) {
        ElMessage({
            message: '密码不一致',
            type: 'error'
        })
        return
    }
    
    axios.post('http://localhost:8080/register', register, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(function (response) {
            if (response.data == 0) {
                login.username = ''
                login.password = ''
                register.username = ''
                register.password = ''
                register.confirmPassword = ''
                dialogRegisterVisible.value = false
                ElMessage({
                    message: '注册成功',
                    type: 'success'
                })
                router.push("/")
            } else if (response.data == 3) {
                ElMessage({
                    message: '账号已存在',
                    type: 'error'
                })
            } else if (response.data == 5) {
                ElMessage({
                    message: '注册失败',
                    type: 'error'
                })
            }
        }).catch(function (error) {
            ElMessage({
                message: '网络异常',
                type: 'error'
            })
        });
}

function Login() {
    var pattern = /^\w+$/
    if (pattern.test(login.username)) {
        axios.post('http://localhost:8080/login', login, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            if (response.data == 0) {
                store.commit('setUsername', login.username)
                store.commit('setLogin', true)
                login.username = ''
                login.password = ''
                register.username = ''
                register.password = ''
                register.confirmPassword = ''
                dialogLoginVisible.value = false
                ElMessage({
                    message: '登录成功',
                    type: 'success'
                })
                router.push("/")
            } else if (response.data == 1) {
                ElMessage({
                    message: '密码错误',
                    type: 'error'
                })
            } else if (response.data == 2) {
                ElMessage({
                    message: '账号不存在',
                    type: 'error'
                })
            }
        }).catch(function (error) {
            ElMessage({
                message: '网络异常',
                type: 'error'
            })
        });
    } else {
        ElMessage({
                message: '格式错误',
                type: 'error'
            })
    }

}

const Close = (done: () => void) => {
    login.username = ''
    login.password = ''
    register.username = ''
    register.password = ''
    register.confirmPassword = ''
    done()
}

</script>