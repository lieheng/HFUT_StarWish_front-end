import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
    state() {
        return {
            username: '',
            isLogin: false,
            reports: []
        }
    },
    mutations: {
        setUsername(state, username) {
            state.username = username
        },
        setLogin(state, isLogin) {
            state.isLogin = isLogin
        },
        setReport(state, reports) {
            state.reports = reports
        }
    }
})

export default store