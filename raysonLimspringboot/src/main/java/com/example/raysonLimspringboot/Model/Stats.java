package com.example.raysonLimspringboot.Model;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Stats {
    private Integer hp;
    private Integer attack;
    private Integer defense;
    private Integer specialAttack;
    private Integer specialDefense;
    private Integer speed;

    public static Stats fromJSONArray (JsonArray ja){

        Stats s = new Stats();

        JsonObject hp = ja.getJsonObject(0);
        System.out.println(hp.toString());
        s.setHp(hp.getJsonNumber("base_stat").intValue());

        JsonObject attack = ja.getJsonObject(1);
        System.out.println(attack.toString());
        s.setAttack(attack.getJsonNumber("base_stat").intValue());

        JsonObject defense = ja.getJsonObject(2);
        s.setDefense(defense.getJsonNumber("base_stat").intValue());

        JsonObject specialAttack = ja.getJsonObject(3);
        s.setSpecialAttack(specialAttack.getJsonNumber("base_stat").intValue());

        JsonObject specialDef = ja.getJsonObject(4);
        s.setSpecialDefense(specialDef.getJsonNumber("base_stat").intValue());

        JsonObject speed = ja.getJsonObject(5);
        s.setSpeed(speed.getJsonNumber("base_stat").intValue());
        
        return s;
    }

    public static JsonObject statToJson (Stats s) {
        return Json.createObjectBuilder()
                    .add("hp", s.getHp())
                    .add("attack", s.getAttack())
                    .add("defense", s.getDefense())
                    .add("specialAttack", s.getSpecialAttack())
                    .add("specialDefense", s.getSpecialDefense())
                    .add("speed", s.getSpeed())
                    .build();
    }
}
