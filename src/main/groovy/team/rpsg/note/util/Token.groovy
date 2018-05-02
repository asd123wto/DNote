package team.rpsg.note.util

import com.fasterxml.uuid.Generators

class Token {
    static String get(uid){
        uid + "n" + Generators.randomBasedGenerator().generate().toString().replace("-", "")
    }
}
