package team.rpsg.note.controller

import org.json.JSONObject
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.redis.core.BoundHashOperations
import org.springframework.data.redis.core.RedisTemplate
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import team.rpsg.note.mapper.UserMapper

import javax.servlet.http.HttpServletRequest

@Controller
class LoginController {

    @Autowired UserMapper userMapper
    @Autowired RedisTemplate<String, Object> template

    @RequestMapping(path = "/login")
    @ResponseBody
    String login(HttpServletRequest request) {
        BoundHashOperations<String, String, Object> map = template.boundHashOps("session: q")

    }


}