// TODO:!!!统一为有权限的接口设置header请求头!!!
// 每次调用$.get post Ajax时
// 时候先调用ajaxPrefilter
$.ajaxPrefilter(function(options) {
    // 在 AJAX 请求之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    // TODO:为有权限的接口设置 headers 请求头
    if (options.url.includes('/my/')) {
        options.headers = {
            // Authorization 对特定请求方法进行拦截， 统一进行权限认证
            Authorization: localStorage.getItem('token') || ''
        };
    }
    // TODO:没有登录的情况下不能访问后台首页 
    options.complete = function(res) {
        // 成功 or 失败都会执行这里
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 1. 清空 token
            localStorage.removeItem('token');
            // 2. 强制跳转到登录页
            location.href = '/login.html';
        }
    };
});