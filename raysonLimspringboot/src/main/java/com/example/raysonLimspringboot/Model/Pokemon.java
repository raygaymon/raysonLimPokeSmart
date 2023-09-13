package com.example.raysonLimspringboot.Model;

import java.util.List;

import com.example.raysonLimspringboot.Utilities.Utils;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pokemon {
    private Integer id;
    private String name;
    private List<Abilities> abilities;
    private List<Moves> moves;
    private List<Type> types;
    private Stats stats;
    private Sprites sprites;
    private String locationAreaEncounters;

    public static Pokemon fromJSON (JsonObject o) {
        Pokemon p = new Pokemon();

        p.setName(o.getString("name"));
        p.setId(o.getJsonNumber("id").intValue());
        p.setLocationAreaEncounters(o.getString("location_area_encounters"));

        //extracting various arrays in the pokemon json
        JsonArray movelist = o.getJsonArray("moves");
        JsonArray abilityList = o.getJsonArray("abilities");
        JsonArray stats = o.getJsonArray("stats");
        JsonObject sprites = o.getJsonObject("sprites");
        JsonArray types = o.getJsonArray("types");

        //converting jsonarrays into lists
        p.setMoves(Moves.getMoves(movelist));
        p.setAbilities(Abilities.abilityList(abilityList));
        p.setStats(Stats.fromJSONArray(stats));
        p.setSprites(Sprites.fromJson(sprites));
        p.setTypes(Type.fromJsonArray(types));

        return p;

    }

    public JsonObject fromPokemon (Pokemon p) {

        JsonArray moveArray = Moves.toJSON(p.getMoves());

        return Json.createObjectBuilder()
                .add("name", Utils.titlecase(this.getName()))
                .add("id", this.getId())
                .add("moves", moveArray)
                .add("type", Type.typeList(this.getTypes()))
                .add("stats", Stats.statToJson(this.getStats()))
                .add("sprites", Sprites.spriteToJson(this.getSprites()))
                .add("locationAreaEncounters", this.getLocationAreaEncounters())
                .build();
    }

    
}
