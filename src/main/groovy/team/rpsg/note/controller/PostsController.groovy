package team.rpsg.note.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import team.rpsg.note.custom.CurrentUser
import team.rpsg.note.mapper.DirMapper
import team.rpsg.note.mapper.PostsMapper
import team.rpsg.note.pojo.User
import team.rpsg.note.util.Response

@Controller
class PostsController {

    @Autowired PostsMapper postsMapper
    @Autowired DirMapper dirMapper

    @RequestMapping(path = "/posts/get")
    @ResponseBody
    get(@CurrentUser User user, Long id) {
        def post = postsMapper.userGet(user.id, id)

        if(!post)
            return Response.failed(":postnotfound")

        Response.success post
    }

    @RequestMapping(path = "/posts/save")
    @ResponseBody
    save(@CurrentUser User user, Long id, String content, String title) {
        def post = postsMapper.userGet(user.id, id)

        if(!post)
            return Response.failed(":postnotfound")

        post.content = content
        post.title = title
        post.modify_time = new Date()

        postsMapper.update post

        dirMapper.updateTitle user.id, id, title

        Response.success()
    }


}