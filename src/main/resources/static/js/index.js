if(!RPSG.isLogin())
    location.replace("/login.html")


function updateNick() {
    $(".nickname").text(RPSG.cookies.get("nickname"));
}


Note = {
    createTree: (option, parent) => {
        let left = option.left;
        left = left <= 0 ? 0 : left;
        option.color = 78 + left * 8;
        option.color = option.color > 255 ? 255 : option.color;

        let isFile = option.type === 1;

        let parentInsert = typeof parent === "string" ? parent : parent.find(">.tree-children")

        let dom = $(template("treetmpl", option)).appendTo(parentInsert);

        if(!isFile){
            dom.find(">.tree-children").hide();

            dom[0].unfold = function (refresh, callback) {
                let _fun = () => {
                    if(dom.find(">.tree-children>*").length !== 0)
                        dom.find(">.tree").addClass("fold");
                    callback && callback()
                }

                dom.find(">.tree-children").show();
                dom.find(">.tree .fold").addClass("icon-moreunfold").removeClass("icon-less");


                if(refresh || dom.find(">.tree-children>*").length === 0){
                    return RPSG.get({
                        url: "/dir/list",
                        data: {id: option.id},
                        success: darr => {
                            for (var d of darr)
                                Note.createTree({type: d.type, id: d.id, text: d.name, createTime: d.create_time, icon: Note.icon[d.type], parentId: option.id, left: option.left + 1}, dom)

                           _fun()
                        }
                    })
                }

                _fun()

            }

            dom[0].fold = () => {
                dom.find(">.tree-children").hide();
                dom.find(">.tree").removeClass("fold");
                dom.find(">.tree .fold").removeClass("icon-moreunfold").addClass("icon-less");
            }

            dom.find(">.tree").click((e) => {
                if($(e.target).is(".tree-icon"))
                    return;
                let isFold = dom.find(">.tree .fold").hasClass("icon-moreunfold");
                console.log(isFold)
                dom[0][isFold ? "fold" : "unfold"]()
            });

        }

        dom.find(">.tree .tree-icon").click(() => {

        });

        return dom[0]
    },
    icon: {
        root: "icon-40one",
        "0": "icon-wenjianjia",
        "1": "icon-wenjian",
    }
}


$(() => {
    updateNick();
    Note.createTree({type:0, id: 0, text: RPSG.cookies.get("nickname") + "'s D-NOTE", icon: Note.icon.root, parentId: 0, left: -1}, ".left-container").unfold(true)
})
