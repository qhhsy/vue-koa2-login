import * as types from './types.js'
//至于把要不要把token存放在本地，看个人。我这里没有存到本地，所以每次都要重新登录

const mutations = {
    [types.LOGIN]: (state, data) => {
        //把token存到本地
        // window.localStorage.setItem('token', data);
        //更改token的值
        state.token = data;
    },
    [types.LOGOUT]: (state) => {
        //登出的时候要移出token
        // window.localStorage.removeItem('token');
        state.token = null;
    },
    [types.USERNAME]: (state, data) => {
        //把用户名存到本地
        // window.localStorage.setItem('username', data);
        state.username = data;
    }
};

export default mutations;