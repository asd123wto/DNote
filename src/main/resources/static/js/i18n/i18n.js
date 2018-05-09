window.i18n = {
	current: null,
	to: (langName, callback, apply) => {
		layer.load(1, {shade: false, offset: 'rb'});

		let loaded = () => {
			i18n.current = i18n[langName]
			RPSG.cookies.set("lang", langName)

			if(apply === undefined || apply === true)
				i18n.apply()

			layer.closeAll()
			callback && callback()
		};

		if(i18n[langName] === undefined)
			return loadScript("/js/i18n/" + langName + ".js", loaded)

		loaded()
	},
	apply: () => {
		$("*[i18n]").each(function () {
			$(this).text(i18n.current[$(this).attr("i18n")]);
		});

		$("*[i18n-prop]").each(function () {
			let _ = $(this).attr("i18n-prop")
			let prop = _.split(":")[0]
			let value = _.split(":")[1]
			$(this).attr(prop, i18n.current[value])
		})
	},
	isEn: () => RPSG.cookies.get("lang") === "en",
	switchto: () => {
		if(i18n.isEn())
			return i18n.to("cn")

		i18n.to("en")
	},
	get: langName => langName ? (langName === "en" ? "en_us" : "zh_cn") : (i18n.isEn() ? "en_us" : "zh_cn")
};

//抄的
function loadScript(url, callback){

	var script = document.createElement("script")
	script.type = "text/javascript";

	if (script.readyState){  //IE
		script.onreadystatechange = function(){
			if (script.readyState === "loaded" || script.readyState === "complete"){
				script.onreadystatechange = null;
				callback();
			}
		};
	} else {  //Others
		script.onload = function(){
			callback();
		};
	}

	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);
}