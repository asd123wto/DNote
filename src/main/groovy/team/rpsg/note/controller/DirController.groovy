package team.rpsg.note.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import team.rpsg.note.custom.CurrentUser
import team.rpsg.note.mapper.DirMapper
import team.rpsg.note.pojo.User
import team.rpsg.note.util.Response

@Controller
class DirController {

    @Autowired DirMapper dirMapper

    @RequestMapping(path = "/dir/list")
    @ResponseBody
    list(@CurrentUser User user, Long id) {
        Response.success dirMapper.list(user.id, id)
    }


}