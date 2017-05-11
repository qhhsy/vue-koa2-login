const jwt = require('jsonwebtoken');
//检查token是否过期
module.exports = async ( ctx, next ) => {
    //拿到token
    
    //console.log(ctx.request);的输出
        // { method: 'GET',
        // url: '/api/user',
        // header:
        // { 'accept-language': 'zh-CN,zh;q=0.8',
        //     'accept-encoding': 'gzip, deflate, sdch, br',
        //     referer: 'http://localhost:8000/',
        //     authorization: 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTIzMTIzMTIzIiwiaWF0IjoxNDk0NDA1MDg4LCJleHAiOjE0OTQ0MDUwODh9.57iy3sL9TG0MTXBS7Xr6SS0QGRZObrivUloy-25NBqg',
        //     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36',
        //     accept: 'application/json, text/plain, */*',
        //     connection: 'close',
        //     host: 'localhost:8888' } }

    if(ctx.request.header['authorization']){
        let token = ctx.request.header['authorization'].split(' ')[1];
        //解码token
        let decoded = jwt.decode(token, 'sinner77');
        //console.log(decoded);的输出 ：{ user_id: '123123123', iat: 1494405235, exp: 1494405235 }
        if(token && decoded.exp <= new Date()/1000){
            ctx.status = 401;
            ctx.body = {
                message: 'token过期'
            };
        }else{
            //如果权限没问题，那么交个下一个控制器处理
            return next();
        }
    }else{
        ctx.status = 401;
        ctx.body = {
            message: '没有token'
        }
    }
};