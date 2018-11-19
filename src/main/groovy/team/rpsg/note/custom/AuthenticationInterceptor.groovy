package team.rpsg.note.custom

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.redis.core.BoundHashOperations
import org.springframework.data.redis.core.RedisTemplate
import org.springframework.web.method.HandlerMethod
import org.springframework.web.servlet.HandlerInterceptor
import org.springframework.web.servlet.ModelAndView
import team.rpsg.note.pojo.User
import team.rpsg.note.util.JSON
import team.rpsg.note.util.Response

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class AuthenticationInterceptor implements HandlerInterceptor{

    @Autowired
    RedisTemplate<String, Object> template

    @Override
    boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        response.setCharacterEncoding("utf-8");
        response.setContentType("application/json; charset=utf-8");

        if (!(handler instanceof HandlerMethod))
            return true

        HandlerMethod handlerMethod = (HandlerMethod) handler

        def token = request.getParameter "token"

        if(token){
            def uid = token.split("n")[0]

            BoundHashOperations<String, String, Object> map = template.boundHashOps "session:" + uid

            if(!map.get("user"))
                throw new AuthFailedException()

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
        int a = 1;
        int b= 2;
    }
}
