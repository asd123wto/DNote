package team.rpsg.note.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import team.rpsg.note.util.Response

@Controller
class I18NController {


    @RequestMapping(path = "/i18n")
    @ResponseBody
    getI18N(String type) {

        Response.success()

    }

}