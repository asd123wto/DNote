package team.rpsg.note.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import team.rpsg.note.custom.CurrentUser
import team.rpsg.note.mapper.DirMapper
import team.rpsg.note.mapper.PostsMapper
import team.rpsg.note.mapper.ShareMapper
import team.rpsg.note.pojo.Share
import team.rpsg.note.pojo.User
import team.rpsg.note.util.MD5
import team.rpsg.note.util.Response
import team.rpsg.note.util.Token

@Controller
class ShareController {

    @Autowired ShareMapper shareMapper
    @Autowired PostsMapper postsMapper

    @RequestMapping(path = "/share/has")
    @ResponseBody
    has(@CurrentUser User user, Long id) {
        Response.success([has: shareMapper.has(user.id, id) != 0])
    }

    @RequestMapping(path = "/share/create")
    @ResponseBody
    create(@CurrentUser User user, Long id, String password) {
        if(shareMapper.has(user.id, id) != 0)
            return Response.failed(":error")

        def share = new Share()
        share.post = id
        share.user = user.id
        share.password = password.length() == 0 ? "" : MD5.parse(password)
        share.share_id = Token.get()

        shareMapper.insert(share)

        Response.success()
    }

    @RequestMapping(path = "/share/get")
    @ResponseBody
    get(@CurrentUser User user, Long id) {
        Response.success(shareMapper.get(user.id, id))
    }

    @RequestMapping(path = "/share/list")
    @ResponseBody
    list(@CurrentUser User user) {
        Response.success(shareMapper.list(user.id))
    }

    @RequestMapping(path = "/share/remove")
    @ResponseBody
    remove(@CurrentUser User user, String id) {
        shareMapper.remove(user.id, id)

        Response.success()
    }

    @RequestMapping(path = "/share/sget")
    @ResponseBody
    sget(String id, String password) {

        if(password.length() != 0)
            password = MD5.parse password

        def share = shareMapper.sget(id, password)
        if(!share)
            return Response.failed(":wrongpassword")

        Response.success(postsMapper.get(share.post))
    }

    @RequestMapping(path = "/share/shas")
    @ResponseBody
    shas(String id) {
        def share = shareMapper.shas(id)
        Response.success([has:  !!share, password: !!share ? (share.password.length() != 0) : false])
    }
}