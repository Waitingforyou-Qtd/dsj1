$(function() {
    // 获取用户的的基本信息
    getUserInfo();
    // TODO:!!!退出功能模块!!!
    var layer = layui.layer;
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录？', {
            icon: 3,
            title: '提示'
        }, function(index) {
            // 1. 清空本地 token
            localStorage.removeItem('token');
            // 2. 跳转到登录页
            location.href = '/login.html';
            // 3. 关闭确认框
            layer.close(index);
            
        });
    });
});


function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        /* headers: {
            Authorization: localStorage.getItem('token') || ''
        }, */
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！');
            }
            renderAvatar(res.data);
        },
        /* complete: function (res) {
            // 成功 or 失败都会执行这里
            if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                // 1. 清空 token
                localStorage.removeItem('token');
                // 2. 强制跳转到登录页
                location.href = '/login.html';
            }
        } */
    });
}

function renderAvatar(user) {
    // 优先 nickname
    // 1. 获取用户名称
    var name = user.nickname || user.username;
    // 2. 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;' + name);
    // 3. 按需渲染用户头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 3.2 渲染文本
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}