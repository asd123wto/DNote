package team.rpsg.note.pojo;



class User {
    int id
    String username
    String password
    String nickname
    String mail
    int vip

    String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", nickname='" + nickname + '\'' +
                ", mail='" + mail + '\'' +
                ", vip=" + vip +
                '}';
    }
}
