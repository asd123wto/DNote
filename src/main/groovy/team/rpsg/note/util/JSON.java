package team.rpsg.note.util;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import groovy.transform.CompileStatic;
import groovy.transform.TypeChecked;


public class JSON {
    public static String stringify(Object obj){
        return new GsonBuilder().serializeNulls().create().toJson(obj);
    }

    public static <T> T parse(String json, Class<T> cls){
        return new Gson().fromJson(json, cls);
    }
}
