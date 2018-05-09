package team.rpsg.note.mapper

import org.apache.ibatis.annotations.Insert
import org.apache.ibatis.annotations.Mapper
import org.apache.ibatis.annotations.Options
import org.apache.ibatis.annotations.Param
import org.apache.ibatis.annotations.Select
import org.apache.ibatis.annotations.Update
import team.rpsg.note.pojo.Dir
import team.rpsg.note.pojo.Post

@Mapper
public interface PostsMapper {

    @Select("select title, content, (select nickname from user where id = posts.user) as user from posts where dir = #{dirId}")
    Map get(@Param("dirId") Long dirId)

    @Select("select * from posts where user = #{user} and dir = #{dirId}")
    Post userGet(@Param("user") Long user, @Param("dirId") Long dirId)

    @Select("select count(*) from posts where user = #{user} and dir = #{dirId}")
    int has(@Param("user") Long user, @Param("dirId") Long dirId)

    @Insert("insert into posts (id, user, content, title, create_time, modify_time, dir) values(null, #{user}, #{content}, #{title}, #{create_time}, #{modify_time}, #{dir})")
    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
    long insert(Post post)

    @Update("update posts set content = #{content}, title = #{title}, modify_time = #{modify_time} where id = #{id}")
    void update(Post post)

    @Update("update posts set title = #{title} where dir = #{id} and user = #{userId}")
    void updateTitle(@Param("userId") long userId, @Param("id") Long id, @Param("title")String title)
}
