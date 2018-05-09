$(() => i18n.to(RPSG.cookies.get("lang") || "cn", onload, false));


function onload() {

	$(".password input").keydown(function (e) {
		if(e.keyCode !== 13)
			return

		get()
	})

    i18n.apply()

	let id = RPSG.query.get("id")

	RPSG.post("/share/shas", {id: id}, d => {
		$('.loading-note').hide()

		if(!d.has)
			return $(".has-not").show()

		if(d.password)
			return $(".password").show()

		get()
	})
}


function get() {
	let id = RPSG.query.get("id")

	RPSG.post("/share/sget", {id: id, password: $(".password input").val()}, d=> {
		$(".password").hide()


		$(".content-container").show()
		$(".title").text(d.title)
		$(".share-people .people").text(d.user)
		$(".content").html(d.content)
	})
}

