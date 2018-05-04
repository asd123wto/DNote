package team.rpsg.note.util

import com.google.gson.Gson

class Response {

    static String success(Object obj) {
        JSON.stringify([code: 0, message: "success", data: obj])
    }

    static String success(){
        Response.success(null)
    }

    static failed(int code, String message) {
        JSON.stringify([code: code, message: message])
    }

    static failed(String message) {
        JSON.stringify([code: -1, message: message])
    }

}
