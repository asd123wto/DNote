package team.rpsg.note.controller.error

import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseBody
import team.rpsg.note.custom.AuthFailedException
import team.rpsg.note.util.JSON
import team.rpsg.note.util.Response

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@ControllerAdvice
class ErrorAdvice {

    @ExceptionHandler(Exception.class)
    @ResponseBody
    String allExceptionHandler(HttpServletRequest request, HttpServletResponse response, Exception exception) throws Exception {
        exception.printStackTrace(System.out)
        if(exception instanceof AuthFailedException)
            return Response.failed(-100, "Auth Failed")

        Response.failed(-1, exception.getMessage())
    }

}
