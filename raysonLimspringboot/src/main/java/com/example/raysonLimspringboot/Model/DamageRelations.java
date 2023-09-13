package com.example.raysonLimspringboot.Model;

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
public class DamageRelations {
    private List<String> doubleDamageFrom;
    private List<String> doubleDamageTo;
    private List<String> halfDamageFrom;
    private List<String> halfDamageTo;
    private List<String> noDamageFrom;
    private List<String> noDamageTo;

    public static DamageRelations fromJson (JsonObject o) {

        DamageRelations dmgR = new DamageRelations();
        JsonObject dr = o.getJsonObject("damage_relations");

        JsonArray dblDmgFrom = dr.getJsonArray("double_damage_from");
        dmgR.setDoubleDamageFrom(Utils.iterateJsonArrayForNameOnly(dblDmgFrom));

        JsonArray dblDmgTo = dr.getJsonArray("double_damage_to");
        dmgR.setDoubleDamageTo(Utils.iterateJsonArrayForNameOnly(dblDmgTo));

        JsonArray halfDmgFrom = dr.getJsonArray("half_damage_from");
        dmgR.setHalfDamageFrom(Utils.iterateJsonArrayForNameOnly(halfDmgFrom));

        JsonArray halfDmgTo = dr.getJsonArray("half_damage_to");
        dmgR.setHalfDamageTo(Utils.iterateJsonArrayForNameOnly(halfDmgTo));

        JsonArray noDmgFrom = dr.getJsonArray("no_damage_from");
        dmgR.setNoDamageFrom(Utils.iterateJsonArrayForNameOnly(noDmgFrom));

        JsonArray noDmgTo = dr.getJsonArray("no_damage_to");
        dmgR.setNoDamageTo(Utils.iterateJsonArrayForNameOnly(noDmgTo));

        return dmgR;

    }

    public static JsonArray dmgRList (List<String> typeList){
        JsonArray moves = typeList.stream().map(Json::createValue).collect(JsonCollectors.toJsonArray());
        return moves;
    }

    public static JsonObject dmrToJson (DamageRelations dmr) {
        
        return Json.createObjectBuilder()
                .add("double_damage_from", DamageRelations.dmgRList(dmr.getDoubleDamageFrom()))
                .add("double_damage_to", DamageRelations.dmgRList(dmr.getDoubleDamageTo()))
                .add("half_damage_from", DamageRelations.dmgRList(dmr.getHalfDamageFrom()))
                .add("half_damage_to", DamageRelations.dmgRList(dmr.getHalfDamageTo()))
                .add("no_damage_to", DamageRelations.dmgRList(dmr.getNoDamageTo()))
                .add("no_damage_from", DamageRelations.dmgRList(dmr.getNoDamageFrom()))
                .build();
    }
}
