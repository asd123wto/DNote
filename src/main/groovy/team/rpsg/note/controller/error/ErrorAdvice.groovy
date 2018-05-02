package team.rpsg.note.controller.error

import com.google.gson.Gson
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseBody
import team.rpsg.note.util.JSON

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@ControllerAdvice
class ErrorAdvice {

    @ExceptionHandler(Exception.class)
    @ResponseBody
    String allExceptionHandler(HttpServletRequest request, HttpServletResponse response, Exception exception) throws Exception {
        exception.printStackTrace(System.out)
        JSON.stringify([code: -1, message: exception.getMessage()])
    }

}
