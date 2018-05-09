package team.rpsg.note.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import team.rpsg.note.custom.CurrentUser
import team.rpsg.note.mapper.DirMapper
import team.rpsg.note.mapper.PostsMapper
import team.rpsg.note.pojo.Dir
import team.rpsg.note.pojo.Post
import team.rpsg.note.pojo.User
import team.rpsg.note.util.Response

@Controller
class DirController {

    @Autowired DirMapper dirMapper
    @Autowired PostsMapper postsMapper

    @RequestMapping(path = "/dir/list")
    @ResponseBody
    list(@CurrentUser User user, Long id) {
        Response.success dirMapper.list(user.id, id)
    }

    @RequestMapping(path = "/dir/create")
    @ResponseBody
    createDir(@CurrentUser User user, Integer type/*0 == dir, 1 == file*/, Long parentId, String name) {
        if(type != 0 && type != 1)
            return Response.failed(":error")


        def dir = new Dir()
        dir.create_time = new Date()
        dir.name = name
        dir.parent = parentId
        dir.type = type
        dir.user = user.id

        dirMapper.insert dir

        long id = dir.id

        if(type == 1){
            def post = new Post()
            post.create_time = post.modify_time = new Date()
            post.user = user.id
            post.dir = id
            post.title = name
            post.content = ""

            postsMapper.insert post
        }

        return Response.success([id: id])
    }

    @RequestMapping(path = "/dir/rename")
    @ResponseBody
    rename(@CurrentUser User user, Long id, String name) {
        dirMapper.updateTitle user.id, id, name

        if(dirMapper.typeOf(id) == 1)
            postsMapper.updateTitle user.id, id, name


        Response.success()
    }

    @RequestMapping(path = "/dir/remove")
    @ResponseBody
    remove(@CurrentUser User user, Long id) {
        dirMapper.remove user.id, id
        Response.success()
    }


}