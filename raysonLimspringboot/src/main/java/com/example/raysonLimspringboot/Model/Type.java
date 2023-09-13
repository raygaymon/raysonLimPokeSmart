package com.example.raysonLimspringboot.Model;
import java.util.ArrayList;
import java.util.List;

import com.example.raysonLimspringboot.Utilities.Utils;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.stream.JsonCollectors;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Type {
    private String type;
    private String url;
    private DamageRelations dmr;


    public static Type fromJson (JsonObject o){
        Type t = new Type();
        t.setType(o.getString("name"));
        t.setUrl(o.getString("url"));
        return t;
    }

    public static Type fromJsonSingle(JsonObject jo){
        Type t = new Type();
        t.setType(jo.getString("name"));
        t.setDmr(DamageRelations.fromJson(jo));
        return t;
    }

    public static List<Type> fromJsonArray (JsonArray ja){

        List<Type> types = new ArrayList<>();
        for (int i = 0; i < ja.size(); i++){
            
            JsonObject o = ja.getJsonObject(i);
            JsonObject type = o.getJsonObject("type");
            Type t = Type.fromJson(type);
            types.add(t);
        }

        return types;
    }

    public static JsonObject typeToJson (Type t) {
        return Json.createObjectBuilder()
                .add("name", Utils.titlecase(t.getType()))
                .add("url", t.getUrl())
                .build();
    }

    public static JsonObject typeToJsonSingular (Type t) {
        return Json.createObjectBuilder()
                .add("name", t.getType())
                .add("damage_relations", DamageRelations.dmrToJson(t.getDmr()))
                .build();
    }


    public static JsonArray typeList (List<Type> typeList){
        JsonArray moves = typeList.stream().map(m -> Type.typeToJson(m)).collect(JsonCollectors.toJsonArray());
        return moves;
    }

    public static JsonObject cleanUpJsonList (String input) {
        JsonObject rawType = Utils.readJSON(input);
        Type t = Type.fromJson(rawType);
        JsonObject cleanedType = Type.typeToJson(t);
        return cleanedType;
    }

    public static JsonObject cleanUpJsonSingle (String input) {
        JsonObject rawType = Utils.readJSON(input);
        Type t = Type.fromJsonSingle(rawType);
        JsonObject cleanedType = Type.typeToJsonSingular(t);
        return cleanedType;
    }
}
