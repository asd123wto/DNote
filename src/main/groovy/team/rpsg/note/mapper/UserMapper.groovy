package team.rpsg.note.mapper

import org.apache.ibatis.annotations.Insert
import org.apache.ibatis.annotations.Mapper
import org.apache.ibatis.annotations.Param
import org.apache.ibatis.annotations.Select
import team.rpsg.note.pojo.User

@Mapper
public interface UserMapper {

    @Select("select * from user")
    List<User> list()

    @Select("select * from user where username = #{username}")
    User getByUsername(@Param("username")String username)

    @Select("select * from user where mail = #{mail}")
    User getByMail(@Param("mail")String mail)

    @Select("select * from user where id = #{id}")
    User get(@Param("id")Long id)

    @Insert("insert into user (id, username, password, nickname, mail, vip) values(null, #{username}, #{password}, #{nickname}, #{mail}, #{vip})")
    void insert(User user)
}
