package team.rpsg.note.custom

import org.springframework.core.MethodParameter
import org.springframework.web.bind.support.WebDataBinderFactory
import org.springframework.web.context.request.NativeWebRequest
import org.springframework.web.method.support.HandlerMethodArgumentResolver
import org.springframework.web.method.support.ModelAndViewContainer
import team.rpsg.note.pojo.User

import javax.servlet.http.HttpServletRequest

class UserMethodArgumentResolver implements HandlerMethodArgumentResolver{

    boolean supportsParameter(MethodParameter parameter) {
        parameter.getParameterType().isAssignableFrom(User.class) && parameter.hasParameterAnnotation(CurrentUser.class)
    }

    Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        def user = webRequest.getNativeRequest(HttpServletRequest.class).getAttribute "user"

        if(!user)
            throw new AuthFailedException()

        user
    }

}
