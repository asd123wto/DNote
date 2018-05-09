package team.rpsg.note.controller

import com.google.gson.Gson
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.redis.core.BoundHashOperations
import org.springframework.data.redis.core.RedisTemplate
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import team.rpsg.note.mapper.UserMapper
import team.rpsg.note.pojo.User
import team.rpsg.note.util.JSON
import team.rpsg.note.util.MD5
import team.rpsg.note.util.Response
import team.rpsg.note.util.Token

import javax.servlet.http.HttpServletRequest

@Controller
class LoginController{

    @Autowired
    UserMapper userMapper
    @Autowired
    RedisTemplate<String, Object> template

    @RequestMapping(path = "/tologin")
    @ResponseBody
    login(String username, String password, HttpServletRequest request) {
        def user = userMapper.getByUsername(username)

        if(!user)
            return Response.failed(":loginusernotfound")


        if(user.password != MD5.parse(password))
            return Response.failed(":loginwrongpassword")

        def token = Token.get(user.id)

        user.password = null

        BoundHashOperations<String, String, Object> map = template.boundHashOps("session:" + user.id)
        map.put "token", token
        map.put "user", JSON.stringify(user)

        Response.success([token: token, uid: user.id, nickname: user.nickname])

    }

    @RequestMapping(path = "/toreg")
    @ResponseBody
    reg(String key, String mail, String username, String nickname, String password) {

        if(!key || !mail || !username || !nickname || !password)
            return Response.failed("naive")

        if(userMapper.getByMail(mail))
            return Response.failed(":regemail")

        if(userMapper.getByUsername(username))
            return Response.failed(":regusername")

        if(key != "iloveyiyi")
            return Response.failed(":reginvite")

        def user = new User()

        user.username = username
        user.mail = mail
        user.nickname = nickname
        user.password = MD5.parse password
        user.vip = 0

        userMapper.insert user

        Response.success()

    }

}