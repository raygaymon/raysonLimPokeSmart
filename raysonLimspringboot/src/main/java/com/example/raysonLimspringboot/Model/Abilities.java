package com.example.raysonLimspringboot.Model;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.raysonLimspringboot.Utilities.Utils;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Abilities {
    private String name;
    private String url;
    private Boolean isHidden;
    private List<String> pokemonWithAbility;
    private Integer id;
    private String desc;
    private String detailedDesc;

    public static Abilities fromJSON (JsonObject json) {
        Abilities a = new Abilities();

        //getting innner jsonobject from ability
        JsonObject ability = json.getJsonObject("ability");

        //setting parameters
        a.setName(ability.getString("name"));
        a.setUrl(ability.getString("url"));
        a.setIsHidden(json.getBoolean("is_hidden"));
        return a;
    }

    public static List<Abilities> abilityList (JsonArray ja) {
        List<Abilities> abilities = new ArrayList<>();
        for (int i = 0; i < ja.size(); i++){
            JsonObject abilityJson = ja.getJsonObject(i);
            Abilities a = Abilities.fromJSON(abilityJson);
            abilities.add(a);
        }

        return abilities;
    }

    public static Abilities detailedAbilityFromJson (String json){
        Abilities a = new Abilities();

        JsonObject jo = Utils.readJSON(json);

        JsonArray flavorTexts = jo.getJsonArray("flavor_text_entries");

        if(!flavorTexts.isEmpty()){
            JsonObject flavorText = flavorTexts.getJsonObject(flavorTexts.size()-3);
            a.setDesc(flavorText.getString("flavor_text"));
        } else {
            a.setDesc("Not yet Available");
        }
        

        JsonArray pokemons = jo.getJsonArray("pokemon");
        List<String> pokemonWithAbility = new ArrayList<>();
        for (int i = 0; i < pokemons.size(); i++){
            JsonObject o = pokemons.getJsonObject(i);
            JsonObject p = o.getJsonObject("pokemon");
            if (o.getBoolean("is_hidden") == true){
                pokemonWithAbility.add(p.getString("name") + " (Hidden)");
            } else {
                pokemonWithAbility.add(p.getString("name"));
            }
        }

        JsonArray effectEntries = jo.getJsonArray("effect_entries");
        if(!effectEntries.isEmpty()){
            JsonObject effectentry = effectEntries.getJsonObject(1);
            a.setDetailedDesc(effectentry.getString("effect"));
        } else {
            a.setDetailedDesc("Not yet available");
        }
        

        a.setName(jo.getString("name"));
        a.setId(jo.getJsonNumber("id").intValue());
        a.setPokemonWithAbility(pokemonWithAbility);
        

        return a;
    }

    public static JsonObject detailedAbilityJson (Abilities a){

        return Json.createObjectBuilder()
                    .add("name", a.getName())
                    .add("id", a.getId())
                    .add("pokemonWithAbility", Utils.listOfStringToJsonArray(a.getPokemonWithAbility()))
                    .add("desc", a.getDesc())
                    .add("detailedDesc", a.getDetailedDesc())
                    .build();
    }

    public static JsonObject cleanedUpAbiltiyJson (String json){
        return Abilities.detailedAbilityJson(Abilities.detailedAbilityFromJson(json));
    }
}
