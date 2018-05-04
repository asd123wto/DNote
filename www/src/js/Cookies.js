export default {
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
	}
}
