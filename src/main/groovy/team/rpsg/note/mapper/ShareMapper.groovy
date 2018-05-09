package team.rpsg.note.mapper

import org.apache.ibatis.annotations.*
import team.rpsg.note.pojo.Share

@Mapper
public interface ShareMapper {

    @Select("select count(*) from share where user = #{user} and post = #{post}")
    int has(@Param("user") long user, @Param("post") long post)

    @Insert("insert into share (id, user, post, password, share_id) values(null, #{user}, #{post}, #{password}, #{share_id})")
    long insert(Share share)

    @Select("select * from share where user = #{user} and post = #{post}")
    Share get(@Param("user") long user, @Param("post") long post)

    @Select("select p.dir as id, p.title as title, s.share_id as share_id from share s, posts p where s.user = #{user} and s.post = p.dir")
    List<Map> list(@Param("user")long user)

    @Delete("delete from share where user = #{user} and share_id = #{shareId}")
    void remove(@Param("user") long user, @Param("shareId") String shareId)

    @Select("select * from share where share_id = #{shareId} and password = #{password}")
    Share sget(@Param("shareId") String shareId, @Param("password") String password)

    @Select("select * from share where share_id = #{shareId}")
    Share shas(@Param("shareId") String shareId)

}
