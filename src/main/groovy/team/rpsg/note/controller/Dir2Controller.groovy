package team.rpsg.note.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import team.rpsg.note.custom.CurrentUser
import team.rpsg.note.pojo.User
import team.rpsg.note.util.Response

@Controller
class Dir2Controller {

    @RequestMapping(path = "/dir/list")
    @ResponseBody
    login1(@CurrentUser User user) {
        Response.success user
    }


}