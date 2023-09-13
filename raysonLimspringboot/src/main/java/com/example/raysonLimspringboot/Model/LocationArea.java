package com.example.raysonLimspringboot.Model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.parsing.Location;

import com.example.raysonLimspringboot.Utilities.Utils;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LocationArea {
    private String name;
    private Integer id;
    private List<EncounteredPokemon> pokemonEncounters;

    public static LocationArea fromJson (String json){
        
        JsonObject jo = Utils.readJSON(json);
        JsonArray pokemonEncounters = jo.getJsonArray("pokemon_encounters");

        LocationArea la = new LocationArea();
        List<EncounteredPokemon> eps = new ArrayList<>();

        for(int i = 0; i < pokemonEncounters.size(); i++){
            JsonObject p = pokemonEncounters.getJsonObject(i);
            EncounteredPokemon ep = EncounteredPokemon.fromString(p);
            eps.add(ep);
        }

        la.setName(jo.getString("name"));
        la.setId(jo.getJsonNumber("id").intValue());
        la.setPokemonEncounters(eps);
        return la;
    }

    public static JsonObject toJSON (LocationArea la){

        JsonArrayBuilder pkmns = Json.createArrayBuilder();

        for (EncounteredPokemon ep : la.getPokemonEncounters()){
            JsonObject epJSON = EncounteredPokemon.toJson(ep);
            pkmns.add(epJSON);
        }

        return Json.createObjectBuilder()
                .add("name", la.getName())
                .add("id", la.getId())
                .add("pokemonEncounters", pkmns.build())
                .build();
    }

    public static JsonObject returnCleanedJson (String json){
        LocationArea la = LocationArea.fromJson(json);
        return LocationArea.toJSON(la);
    }
}
