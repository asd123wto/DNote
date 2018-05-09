class UploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }
    upload() {
        return new Promise((resolve, reject) => {
            const data = new FormData();
            data.append('img', this.loader.file);
            data.append('token', RPSG.cookies.get("token"));
            $.ajax({
                url: 'image/upload',
                type: 'POST',
                data: data,
                dataType: 'json',
                processData: false,
                contentType: false,
                success: result => {
                	if(result.code !== 0){
                		RPSG.tip(i18n.current["errorimg"])
                		return reject(i18n.current["errorimg"])
					}

					resolve({default: "image/get/" + result.data.fileName});
                }
            });

        });
    }
    abort() {
    }
}


if(!RPSG.isLogin())
    location.replace("/login.html")


function updateNick() {
    $(".nickname").text(RPSG.cookies.get("nickname"));
}


Note = {
    create: (option, parent) => {
        let left = option.left;
        left = left <= 0 ? 0 : left;
        option.color = 78 + left * 8;
        option.color = option.color > 255 ? 255 : option.color;

        let isFile = option.type === 1;

        let parentInsert = typeof parent === "string" ? parent : parent.find(">.tree-children")

        let dom = $(template("treetmpl", option)).appendTo(parentInsert);

        if(!isFile){
            dom.find(">.tree-children").hide();

            dom[0].unfold = function (refresh, callback, addclass) {
                let _fun = () => {
                    if(dom.find(">.tree-children>*").length !== 0 || addclass)
                        dom.find(">.tree").addClass("unfold");

                    dom[0].folding = false

	                dom[0].updateShadow()

                    callback && callback()
                }

                dom.find(">.tree-children").show();
                dom.find(">.tree .fold").addClass("icon-moreunfold").removeClass("icon-less");


                if(refresh || dom.find(">.tree-children>*").length === 0 && !dom[0].folding){
                    dom[0].folding = true

                    return RPSG.get({
                        url: "/dir/list",
                        data: {id: option.id},
                        success: darr => {
                            for (var d of darr)
                                Note.create({type: d.type, id: d.id, text: d.name, createTime: d.create_time, icon: Note.icon[d.type], parentId: option.id, left: option.left + 1}, dom)

                           _fun()
                        }
                    })
                }

                _fun()

            }

            dom[0].fold = () => {
                dom.find(">.tree-children").hide();
                dom.find(">.tree").removeClass("unfold");
                dom.find(">.tree .fold").removeClass("icon-moreunfold").addClass("icon-less");
            }

            dom[0].isFold = () => dom.find(">.tree .fold").hasClass("icon-less");


            dom.find(">.tree").click((e) => {
                if($(e.target).is(".tree-icon") || $(e.target).is(".tree-rename") || $(e.target).parents(".tree-rename").length !== 0)
                    return;

                dom[0][dom[0].isFold() ? "unfold" : "fold"]()
            });

        }

	    dom[0].updateShadow = deep => {
		    let it = d => {
			    d = $(d)
			    d.find(">.tree-children>.last").removeClass("last");

			    let child = d.find(">.tree-children>*")
			    child.last().addClass("last")

			    if(deep !== false)
				    child.each((idx, ele) => it(ele))
		    }

		    it(dom)
	    }

        dom.find(">.tree .tree-icon").click(e => {
            $(template("menutmpl", option)).appendTo("body");

            let menu = $(".context-menu").css({
	            "left": e.pageX + "px",
	            "top": e.pageY + "px"
            });

        });

        return dom[0]
    },
    icon: {
        root: "fa fa-plus-circle",
        "0": "iconfont icon-wenjianjia",
        "1": "iconfont icon-wenjian",
    },
	edit: id => {
    	window._current = undefined

    	$(".mission-tip").hide();
    	$(".editor-outer").show();

    	if(isMobile())
    		$(".button.op").click()

		let editorLoaded = () => {
            RPSG.get({
                url: "posts/get",
                data: {id: id},
                success: data => {
                	_editor.setData(data.content)
                    $("#title input").val(data.title)

                    window._current = id
                }
            })
		}

		if(window._editor)
			return editorLoaded()

        window._editor = true;

        DecoupledEditor.create(document.getElementById("editor"), {
            fontFamily: {
            	options: window.font
			},
			language: i18n.isEn() ? undefined : "zh-cn"
		}).then(editor => {
            const toolbarContainer = document.querySelector('#toolbar-container');
            toolbarContainer.appendChild(editor.ui.view.toolbar.element);
            window._editor = editor

            editor.plugins.get('FileRepository').createUploadAdapter = loader => {
                return new UploadAdapter(loader);
            };

            onresize()

			editorLoaded()
		}).catch(err => console.error(err))


	},

	vcreate: (type, parentId) => {
    	let text = type === 0 ? i18n.current["newdir"] : i18n.current["newfile"]
		let dom = $(".tree-outer[treeid=" + parentId + "]")

		let create = () => RPSG.get({
			url: "dir/create",
			data: {type: type, parentId: parentId, name: text},
			success: d => {
				let id = d.id

				Note.create({createTime: new Date().toString(), type: type, id: id, text: text, icon: Note.icon[type], parentId: id, left: ~~dom.attr("left") + 1}, dom)
				dom[0].updateShadow(false)
			}
		})

		if(dom[0].isFold())
			return dom[0].unfold(undefined, create, true);

    	create()
	},

	rename: id => {
		let dom = $(".tree-outer[treeid=" + id + "]>.tree")
		let origin = dom.find(".tree-rename input").val()

		dom.find(".tree-name").hide()

		let rename = () => {
			let name = dom.find(".tree-rename input").val() || origin

			RPSG.get({
				url: "/dir/rename",
				data: {id: id, name: name},
				success: d => {
					dom.find(".tree-rename").hide()
					dom.find(".tree-name").css("display", "inline-block").text(name)
					RPSG.tip(i18n.current["renamesuccess"])
				}
			})

		}

		dom.find(".tree-rename").css("display", "inline-block")
			.find("input").focus().val(dom.find(".tree-name").text()).blur(rename).keydown(e => {
				if(e.keyCode === 13)
					rename()
		})
	},

	remove: id => {
		let dom = $(".tree-outer[treeid=" + id + "]")

		RPSG.confirm(i18n.current["deleteconfirm"], () => {
			RPSG.get({
				url: "/dir/remove",
				data: {id: id},
				success: d => {
					dom.find(".tree-rename").hide()
					dom.find(".tree-name").css("display", "inline-block").text(name)
					dom.remove()
					RPSG.tip(i18n.current["removesuccess"])
				}
			})
		})
	},

	info: id => {
		let dom = $(".tree-outer[treeid=" + id + "]")
    	layer.alert(
    		i18n.current["createtime"] + ": " + RPSG.toDate(dom.attr("createTime")) + "<br>" +
		    i18n.current["createuser"] + ": " + RPSG.cookies.get("nickname") + "<br>"
		    , {title: i18n.current["alert"]})
	},

	share: id => {
    	RPSG.get({
		    url: "/share/has",
		    data: {id: id},
		    success: d => {
				let show = () => RPSG.post("/share/get", {id: id}, shareData => RPSG.alert(template("sharetmpl", shareData)))

				if(d.has)
					return show()

			    RPSG.confirm(template("createsharetmpl", {}), () => RPSG.post("/share/create", {id: id, password: $("#share-password input").val()}, show))
		    }
	    })
	},

	shareList: () => {
    	RPSG.post("/share/list", {}, d => {
    		if(d.length === 0)
    			return RPSG.tip(i18n.current["noshare"])
    		RPSG.alert(template("sharelisttmpl", {data: d}), () => {}, '20px')

		    $(".share-list-fuck-ad").height($(window).height() - 250)
	    })
	},

	deleteShare: id => {
    	RPSG.post("/share/remove", {id: id}, () => {
		    let dom = $("div[sid='" + id + "']");
		    dom.find("button").remove()
		    dom.find(".share-content-url").text(i18n.current["removesuccess"])
	    })
	},

	switchTree: () => {
    	let show = $(".left-container").css("display") === "flex"
		$(".left-container").css("display", show ? "none" : "flex")
		$(".right-container").css("display", show ? "table" : "none")
	},

}

function isMobile(){
	var ctx = window.getComputedStyle(document.body, ":after").getPropertyValue("content");
	return ctx == "\"1\"" || ctx == "'1'";
}


$(() => i18n.to(RPSG.cookies.get("lang") || "cn", onload, false));


function onload() {
	template.defaults.imports.i18n = t => i18n.current[t]

	updateNick();
	Note.create({type:0, id: 0, text: RPSG.cookies.get("nickname"), icon: Note.icon.root, parentId: 0, left: -1}, ".left-container").unfold(true)
    i18n.apply()
    
    $("body").on("click", ".context-menu-mask", function (e) {
        if($(e.target).is(".context-menu-mask"))
            $(this).remove();
    }).on("click", ".menu-item", function (e) {
		$(".context-menu-mask").remove()
	})
	
	$(window).resize(onresize)

	window.font = [
		'default',
		'Arial,Helvetica,sans-serif',
		'Georgia,serif',
		'Impact,Charcoal,sans-serif',
		'Tahoma,Geneva,sans-serif',
		"'Times New Roman',Times,serif",
		'Verdana,Geneva,sans-serif',
	]

	for(let f of i18n.current.font)
		font.push(f.value)

	$(".save-button").click(save)

    $(window).keydown(event => {
		if((event.ctrlKey || event.metaKey) && event.which === 83) {
			save()
			event.preventDefault();
			return false;
		}
	});
}


function getEditorHeight() {
	return $(window).height() - 128 - 1
}

function onresize() {
    if(window._editor && !isMobile()){
        $(".ck-editor__editable").css({
            minHeight: getEditorHeight(),
            maxHeight: getEditorHeight()
        })
    }
}

function save() {
	if(!window._editor || !window._current)
		return;

    let title =  $("#title input").val() || i18n.current["newfile"]
    RPSG.get({
        url: "posts/save",
        data: {id: window._current, title: title, content: window._editor.getData()},
        success: d => {
            RPSG.tip(i18n.current["saved"])
            $("div[treeid='" + window._current + "'] .tree-name").text(title)
        }
    })
}