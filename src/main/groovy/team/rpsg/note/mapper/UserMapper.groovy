package team.rpsg.note.mapper;

import org.apache.ibatis.annotations.Mapper
import org.apache.ibatis.annotations.Result
import org.apache.ibatis.annotations.Select
import team.rpsg.note.pojo.User;

@Mapper
public interface UserMapper {

    @Select("select * from user")
    List<User> list()
}
