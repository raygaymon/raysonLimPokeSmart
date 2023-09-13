package com.example.raysonLimspringboot.Model;
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
public class Items {
    private Integer id;
    private String name;
    private Integer cost;
    private Integer flingPower;
    private String flingEffect;
    private String effect;
    private String flavorText;
    private String sprite;

    public static Items fromJson (String json){

        Items i = new Items();

        JsonObject jo = Utils.readJSON(json);
        JsonObject sprites = jo.getJsonObject("sprites");
        JsonArray effectEntries = jo.getJsonArray("effect_entries");
        JsonObject effectEntry = effectEntries.getJsonObject(0);
        JsonArray flavorTexts = jo.getJsonArray("flavor_text_entries");
        JsonObject flavorTextLatestEN = flavorTexts.getJsonObject(flavorTexts.size()-3);

        i.setName(jo.getString("name"));
        i.setId(jo.getJsonNumber("id").intValue());
        i.setCost(jo.getJsonNumber("cost").intValue());
        i.setSprite(sprites.getString("default"));

        if(!jo.isNull("fling_effect")){
           i.setFlingEffect(jo.get("fling_effect").toString()); 
        } else {
            i.setFlingEffect("null");
        }
        if(!jo.isNull("fling_power")){
           i.setFlingPower(jo.getJsonNumber("fling_power").intValue());
        } else {
            i.setFlingPower(0);
        }

        i.setEffect(effectEntry.getString("effect"));
        i.setFlavorText(flavorTextLatestEN.getString("text"));

        return i;
    }

    public static JsonObject itemToJson (Items i){
        return Json.createObjectBuilder()
                .add("name", i.getName())
                .add("id", i.getId())
                .add("cost", i.getCost())
                .add("sprite", i.getSprite())
                .add("fling", Json.createObjectBuilder()
                            .add("effect", i.getFlingEffect())
                            .add("power", i.getFlingPower())
                            .build())
                .add("effect", i.getEffect())
                .add("flavorText", i.getFlavorText())
                .build();
    }

    public static JsonObject returnCleanedItemJson ( String json){
        Items i = Items.fromJson(json);
        return Items.itemToJson(i);
    }
}
