package team.rpsg.note.mapper

import org.apache.ibatis.annotations.Insert
import org.apache.ibatis.annotations.Mapper
import org.apache.ibatis.annotations.Param
import org.apache.ibatis.annotations.Select
import team.rpsg.note.pojo.Dir
import team.rpsg.note.pojo.User

@Mapper
public interface DirMapper {

    @Select("select * from dir where user = #{user} and parent = #{parentId}")
    List<Dir> list(@Param("user") Long user, @Param("parentId") Long parentId)

}
