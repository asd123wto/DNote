if(!RPSG.isLogin())
    location.replace("/login.html")


function updateNick() {
    $(".nickname").text(RPSG.cookies.get("nickname"));
}


Tree = {
    createDir: (option, parent) => {
        let parentInsert = typeof parent === "string" ? parent : parent.find(">.tree-children")

        let dom = $(template("treetmpl", option)).appendTo(parentInsert);
        dom.find(">.tree-children").hide();

        let left = option.left;

        dom[0].unfold = function (refresh, callback) {
            dom.find(">.tree-children").show();
            dom.find(">.tree .fold").addClass("icon-moreunfold").removeClass("icon-less");

            if(refresh || dom.find(">.tree-children>*").length === 0){
                return RPSG.get({
                    url: "/dir/list",
                    data: {id: option.id},
                    success: darr => {
                        for (var d of darr){
                                Tree.createDir({id: d.id, text: d.name, createTime: d.create_time, icon: Tree.icon[d.type], parentId: option.id, left: left + 1}, dom)
                        }

                        callback && callback()
                    }
                })
            }

            callback && callback()


        }
        
        dom[0].fold = () => {
            dom.find(">.tree-children").hide();
            dom.find(">.tree .fold").removeClass("icon-moreunfold").addClass("icon-less");
        }

        dom.find(">.tree").click(() => {
            let isFold = dom.find(">.tree .fold").hasClass("icon-moreunfold");
            console.log(isFold)
            dom[0][isFold ? "fold" : "unfold"]()
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

    Tree.createDir({id: 0, text: RPSG.cookies.get("nickname") + "'s D-NOTE", icon: Tree.icon.root, parentId: 0, left: -1}, ".left-container").unfold(true)
})
