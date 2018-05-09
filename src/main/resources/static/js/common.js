let RPSG = {
    post: (url, data, callback) => RPSG.get({url: url, data: data, success: callback}),
    get: (options, _callback) => {
        let url = typeof (options) === "string" ? options : options.url;
        let callback = _callback || options.success;

        let data = options.data || {};
        let type = options.type || "post";

        let postCode = options.postCode || true;

        if(options.load === undefined || options.load === true)
            layer.load(1, {shade: false, offset: 'rb'});

        if(options.loginRequired === undefined || options.loginRequired === true)
            data.token = RPSG.cookies.get("token")

        $.ajax({
            url: url,
            type: type,
            data: data,
            success: result => {
                layer.closeAll('loading');

                if(!result)
                    return RPSG.tip(i18n.current["servererror"]);

                let obj = JSON.parse(result);

                if(obj.code !== 0 && postCode && obj.message){
                    if(obj.message[0] === ":")
                        obj.message = i18n.current[obj.message.substr(1)];

	                return RPSG.tip(obj.message);
                }

                if(obj.code !== 0 && postCode)
                    return RPSG.tip(i18n.current["servererrorwithcode"] + obj.code);

                callback(obj.data);


            },
            error: obj => {
                layer.closeAll('loading');

                if(obj.responseJSON.status && obj.responseJSON.status !== 200){
                    return RPSG.tip(i18n.current["servererror"] + ":(" + obj.status + ") " + obj.responseJSON.error + ", " + obj.responseJSON.exception + ", " + obj.responseJSON.message)
                }else{
                    RPSG.tip(i18n.current["servererror"] + " (" + i18n.current["servernet"] + ")");
                }
            }
        })

    },
    
    tip: msg => layer.msg(msg, {offset: 't', tipsMore: true}),

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

	query: {
		set: (param, paramVal, url) => {
			let TheAnchor = null;
			let newAdditionalURL = "";
			url = url || location.href;
			let tempArray = url.split("?");
			let baseURL = tempArray[0];
			let additionalURL = tempArray[1];
			let temp = "";

			if (additionalURL) {
				let tmpAnchor = additionalURL.split("#");
				let TheParams = tmpAnchor[0];
				TheAnchor = tmpAnchor[1];
				if (TheAnchor)
					additionalURL = TheParams;

				tempArray = additionalURL.split("&");

				for (i = 0; i < tempArray.length; i++) {
					if (tempArray[i].split('=')[0] !== param) {
						newAdditionalURL += temp + tempArray[i];
						temp = "&";
					}
				}
			} else {
				let tmpAnchor = baseURL.split("#");
				let TheParams = tmpAnchor[0];
				TheAnchor = tmpAnchor[1];

				if (TheParams)
					baseURL = TheParams;
			}

			if (TheAnchor)
				paramVal += "#" + TheAnchor;

			let rows_txt = temp + "" + param + "=" + paramVal;
			return baseURL + "?" + newAdditionalURL + rows_txt;
		},
		get: (name, url) => {
			if (!url) url = window.location.href;
			name = name.replace(/[\[\]]/g, "\\$&");
			let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
				results = regex.exec(url);
			if (!results) return null;
			if (!results[2]) return '';
			return decodeURIComponent(results[2].replace(/\+/g, " "));
		}
	},

    confirm: (txt, callback) => {
	    let lid = layer.confirm(txt, {btn: [i18n.current["yes"], i18n.current["no"]], title: i18n.current["layertitle"], shadeClose: true}, () => {
		    callback()
		    layer.close(lid)
	    })
    },

	alert: (txt, callback, p) => {
		let lid = layer.confirm(txt, {btn: [i18n.current["yes"]], title: i18n.current["layertitle"], shadeClose: true, offset: p || "auto"}, () => {
			callback && callback()
			layer.close(lid)
		})
	},

    toDate: str => {
        let comp = num => num <= 9 ? "0" + num : num

        var d = new Date(str);
        return d.getFullYear() + "-" + comp(d.getMonth() + 1) + "-" + comp(d.getDate()) + " " + comp(d.getHours()) + ":" + comp(d.getMinutes());
    }

}