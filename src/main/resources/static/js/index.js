$(".reg button").click(() => RPSG.tip("暂未开放注册"));

$(".login button").click(function(){

    let username = $("#username").val(), password = $("#password").val();

    if(username.length === 0 || password.length === 0)
        return RPSG.tip("输入用户名密码靴靴")

    RPSG.login(username, password);


});