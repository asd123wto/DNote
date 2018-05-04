package team.rpsg.note.custom

import com.google.gson.Gson
import com.google.gson.GsonBuilder
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.redis.core.BoundHashOperations
import org.springframework.data.redis.core.RedisTemplate
import org.springframework.web.method.HandlerMethod
import org.springframework.web.servlet.HandlerInterceptor
import org.springframework.web.servlet.ModelAndView
import team.rpsg.note.pojo.User
import team.rpsg.note.util.JSON

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class AuthenticationInterceptor implements HandlerInterceptor{

    @Autowired
    RedisTemplate<String, Object> template

    @Override
    boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (!(handler instanceof HandlerMethod))
            return true

        HandlerMethod handlerMethod = (HandlerMethod) handler

        def token = request.getParameter "token"
        if(token){
            def uid = token.split("n")[0]

            BoundHashOperations<String, String, Object> map = template.boundHashOps "session:" + uid

            def user = JSON.parse(map.get("user").toString(), User.class)
            request.setAttribute "user", user
        }

        return true
    }

    @Override
    void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}
