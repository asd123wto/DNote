let RPSG = {
    get: (options, _callback) => {
        let url = typeof (options) === "string" ? options : options.url;
        let callback = _callback || options.success;

        let data = options.data || {};
        let type = options.type || "post";

        let postCode = options.postCode || true;

        if(options.load === undefined || options.load === true)
            layer.load(1, {shade: false});

        if(options.loginRequired === undefined || options.loginRequired === true)
            data.token = RPSG.cookies.get("token")

        $.ajax({
            url: url,
            type: type,
            data: data,
            success: result => {
                if(!result)
                    return RPSG.tip("服务器发生错误（无响应）");

                let obj = JSON.parse(result);

                if(obj.code !== 0 && postCode && obj.message)
                    return RPSG.tip(obj.message);

                if(obj.code !== 0 && postCode)
                    return RPSG.tip("服务器发生错误，错误码：" + obj.code);

                layer.closeAll('loading');

                callback(obj.data);


            },
            error: obj => {
                console.log(obj)
                if(obj.responseJSON.status && obj.responseJSON.status !== 200){
                    return RPSG.tip("服务器发生错误：(" + obj.status + ") " + obj.responseJSON.error + ", " + obj.responseJSON.exception + ", " + obj.responseJSON.message)
                }else{
                    RPSG.tip("服务器发生错误（网络连接失败）");
                }
            }
        })

    },
    
    tip: msg => layer.msg(msg, {offset: 't',}) & layer.closeAll('loading'),

    render: (id, data, clean) => {
        if((clean === undefined || clean === true) && $("#" + id).parent().find(".tmpled").length !== 0)
            $("#" + id).parent().find(".tmpled").remove();
        var after = (clean === undefined || clean === true) ? $("#" + id) : $("#" + id).parent().find(".tmpled").last();
        return $("<div></div>").addClass("tmpled").addClass(id).insertAfter(after).hide().html(template(id, data)).fadeIn("normal");
    },

    isLogin: () => !!RPSG.cookies.get("token"),

    login: (username, password, callback) => {
        RPSG.logout()
        RPSG.get({
            url: "/tologin",
            data: {
                username: username,
                password: password
            },
            success: function (data) {
                RPSG.cookies.set("token", data.token);
                RPSG.cookies.set("uid", data.uid);
                RPSG.cookies.set("nickname", data.nickname);
                callback && callback();
            }
        })
    },

    logout: withTarget => {
        RPSG.cookies.remove(["token", "uid", "nickname"])
        if(withTarget)
            location.href = "/login.html";
    },

    cookies: {
        set: (key, value, days) => {
            days = days || 365;
            let d = new Date();
            d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
            let expires = "expires="+ d.toUTCString();
            document.cookie = key + "=" + value + ";" + expires + "; path=/";
            return value;
        },
        get: cname => {
            let name = cname + "=";
            let ca = document.cookie.split(';');
            for(let i = 0; i <ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0)=== ' ')
                    c = c.substring(1);
                if (c.indexOf(name) === 0)
                    return c.substring(name.length, c.length);
            }
            return null;
        },
        remove: name => {
            if(typeof name === "string")
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
            else
                for(let i in name)
                    RPSG.cookies.remove(name[i]);
        },
    },
}