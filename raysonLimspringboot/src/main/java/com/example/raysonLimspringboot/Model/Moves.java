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
public class Moves {
    private String name;
    private Integer id;
    private String type;
    private String damageType;
    private Integer power;
    private Integer accuracy;
    private Integer pp;
    private Integer priority;
    private Integer effectChance;
    private String desc;
    private List<String> learnedByPokemon;
    private String url;
    private String moveLearnMethod;
    private Integer levelLearnedAt;
    private String latestAvailVersion;

    public static Moves fromJSON (JsonObject o){
        Moves m = new Moves();

        //extracting all json components within output json
        JsonObject moveDeets = o.getJsonObject("move");
        JsonArray versionGroupDetails = o.getJsonArray("version_group_details");
        JsonObject latestVersion = versionGroupDetails.getJsonObject(versionGroupDetails.size()-1);
        JsonObject learnMethod = latestVersion.getJsonObject("move_learn_method");
        JsonObject versionGroup = latestVersion.getJsonObject("version_group");

        //setting infomation into move object
        m.setName((Utils.titlecase(moveDeets.getString("name"))).replace("-", " "));
        m.setUrl(moveDeets.getString("url"));
        m.setMoveLearnMethod(learnMethod.getString("name"));
        m.setLevelLearnedAt(latestVersion.getJsonNumber("level_learned_at").intValue());
        m.setLatestAvailVersion(versionGroup.getString("name").replace("-", "/"));
        return m;
    }

    public static List<Moves> getMoves (JsonArray ja ) {
        List<Moves> moves = new ArrayList<>();
        for (int i = 0; i < ja.size(); i++){
            JsonObject m = ja.getJsonObject(i);
            Moves move = Moves.fromJSON(m);
            moves.add(move);
        }

        return moves;
    }

    public static JsonArray toJSON (List<Moves> movelist) {
        JsonArray moves = movelist.stream().map(m -> Moves.moveToJson(m)).collect(JsonCollectors.toJsonArray());
        return moves;
    }

    public static JsonObject moveToJson (Moves m) {
        return Json.createObjectBuilder()
                .add("name", m.getName())
                .add("url", m.getUrl())
                .add("moveLearnMethod", m.getMoveLearnMethod())
                .add("levelLearnedAt", m.getLevelLearnedAt())
                .add("latestAvailVersion", m.getLatestAvailVersion())
                .build();
    }

    public static Moves getMovesMoreDetailed (String json){

        JsonObject jo = Utils.readJSON(json);
        Moves m = new Moves();
        
        JsonArray learnedByPokemon = jo.getJsonArray("learned_by_pokemon");
        List<String> learningPokemon = Utils.iterateJsonArrayForNameOnly(learnedByPokemon);

        JsonArray flavorTexts = jo.getJsonArray("flavor_text_entries");
        JsonObject latestDesc = flavorTexts.getJsonObject(flavorTexts.size()-3);

        JsonObject type = jo.getJsonObject("type");
        JsonObject damageClass = jo.getJsonObject("damage_class");

        m.setName(jo.getString("name"));

        if (!jo.isNull("accuracy")){
            m.setAccuracy(jo.getJsonNumber("accuracy").intValue());
        } else {
            m.setAccuracy(0);
        }

        if (!jo.isNull("effect_chance")){
            m.setEffectChance(jo.getJsonNumber("effect_chance").intValue());
        } else {
            m.setEffectChance(0);
        }
        if (!jo.isNull("power")){
            m.setPower(jo.getJsonNumber("power").intValue());
        } else {
            m.setPower(0);
        }

        m.setDesc(latestDesc.getString("flavor_text"));
        m.setId(jo.getJsonNumber("id").intValue());
        m.setLearnedByPokemon(learningPokemon);
        
        m.setPriority(jo.getJsonNumber("priority").intValue());
        m.setType(type.getString("name"));
        m.setPp(jo.getJsonNumber("pp").intValue());
        m.setDamageType(damageClass.getString("name"));

        return m;
    }

    public static JsonObject detailedMoveToJson (Moves m) {

        JsonArray pkmns = (m.getLearnedByPokemon()).stream().map(Json::createValue).collect(JsonCollectors.toJsonArray());

        return Json.createObjectBuilder()
                .add("name", m.getName())
                .add("accuracy", m.getAccuracy())
                .add("power", m.getPower())
                .add("pp", m.getPp())
                .add("desc", m.getDesc())
                .add("effect_chance", m.getEffectChance())
                .add("damageType", m.getDamageType())
                .add("learnedPokemonList", pkmns)
                .add("id", m.getId())
                .add("type", m.getType())
                .add("priority", m.getPriority())
                .build();
    }

    public static JsonObject cleanUpDetailedMove (String json){
        Moves m = Moves.getMovesMoreDetailed(json);
        return Moves.detailedMoveToJson(m);
    }
}
