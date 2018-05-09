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

if(RPSG.isLogin())
    animateLogin()

function animateLogin() {
    $(".login-outer").addClass("element-animation")
    $("#username").text(RPSG.cookies.get("nickname"))

    setTimeout(() => {
        $(".login-inset-login").addClass("hide");
        $(".login-inset-tip").show();
        $(".head").addClass("bounce")

        setTimeout(() => {
            location.href = "/index.html"
        }, 1200)
    }, 300);

}

i18n.to(RPSG.cookies.get("lang") || "cn")