package team.rpsg.note.mapper

import org.apache.ibatis.annotations.Delete
import org.apache.ibatis.annotations.Insert
import org.apache.ibatis.annotations.Mapper
import org.apache.ibatis.annotations.Options
import org.apache.ibatis.annotations.Param
import org.apache.ibatis.annotations.Select
import org.apache.ibatis.annotations.Update
import team.rpsg.note.pojo.Dir
import team.rpsg.note.pojo.User

@Mapper
public interface DirMapper {

    @Select("select * from dir where user = #{user} and parent = #{parentId} and is_delete = 0 order by type")
    List<Dir> list(@Param("user") Long user, @Param("parentId") Long parentId)

    @Insert("insert into dir (id, user, name, parent, create_time, type, is_delete) values(null, #{user}, #{name}, #{parent}, #{create_time}, #{type}, 0)")
    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
    long insert(Dir dir)

    @Update("update dir set name = #{title} where id = #{id} and user = #{userId}")
    void updateTitle(@Param("userId") long userId, @Param("id") Long id, @Param("title")String title)

    @Select("select type from dir where id = #{id}")
    long typeOf(@Param("id") Long id)

    @Update("update dir set is_delete = 1 where user = #{userId} and id = #{id}")
    void remove(@Param("userId") long userId, @Param("id") Long id)
}
