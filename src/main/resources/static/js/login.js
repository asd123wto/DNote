$(".switcher").click(function () {
    $(this).parents(".form").removeClass("current").siblings().addClass("current")
});

$(".login button").click(() => {
    let dom = $(".login-form");

    if(!dom.validate().check())
        return;

    RPSG.login(dom.find("input[name='username']").val(), dom.find("input[name='password']").val(), animateLogin);

});

$(".reg button").click(() => {
    let dom = $(".reg-form");

    if(!dom.validate().check())
        return;

    let data = {
        key: dom.find("input[name='key']").val(),
        mail: dom.find("input[name='mail']").val(),
        username: dom.find("input[name='username']").val(),
        nickname: dom.find("input[name='nickname']").val(),
        password: dom.find("input[name='password']").val()
    }

    RPSG.get({
        url: "/toreg",
        data: data,
        loginRequired: false,
        success: function () {
            RPSG.tip("注册成功，正在登录");

            let outer = $(".login-form")

            outer.find("input[name='username']").val(data.username)
            outer.find("input[name='password']").val(data.password)

            $(".login button").click()

        }
    })
});


function animateLogin() {
    location.href = "/index.html"
}