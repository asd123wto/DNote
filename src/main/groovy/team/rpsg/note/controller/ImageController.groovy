package team.rpsg.note.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.io.ResourceLoader
import org.springframework.data.redis.core.BoundHashOperations
import org.springframework.data.redis.core.RedisTemplate
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.multipart.MultipartFile
import team.rpsg.note.custom.CurrentUser
import team.rpsg.note.mapper.UserMapper
import team.rpsg.note.pojo.User
import team.rpsg.note.util.JSON
import team.rpsg.note.util.MD5
import team.rpsg.note.util.Response
import team.rpsg.note.util.Token

import javax.servlet.http.HttpServletRequest
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths

@Controller
class ImageController {

    @Autowired
    UserMapper userMapper
    @Autowired
    RedisTemplate<String, Object> template
    @Autowired
    ResourceLoader resourceLoader


    @RequestMapping(path = "/image/upload")
    @ResponseBody
    upload(MultipartFile img, String token) {

        if(img.isEmpty())
            return Response.failed(":errorimg")

        def ext = getFileExtension img.getOriginalFilename()
        if(ext != "jpg" && ext != "jpeg" && ext != "gif" && ext != "png" && ext != "bmp" && ext != "webp")
            return Response.failed(":error")


        def fileName = Token.get() + "." + ext

        byte[] bytes = img.getBytes()
        Path path = Paths.get "noteimg/" + fileName
        Files.write(path, bytes)

        Response.success([fileName: fileName])

    }

    def getFileExtension(fileName) {
        if(fileName.lastIndexOf(".") != -1 && fileName.lastIndexOf(".") != 0)
            return fileName.substring(fileName.lastIndexOf(".") + 1)
        return ""
    }

    @RequestMapping(path = "/image/get/{filename:.+}")
    @ResponseBody
    get(@PathVariable String filename) {
        resourceLoader.getResource("file:" + Paths.get("noteimg/", filename).toString())
    }


}