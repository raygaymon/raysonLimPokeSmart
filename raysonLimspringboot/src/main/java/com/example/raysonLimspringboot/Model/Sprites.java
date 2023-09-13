package com.example.raysonLimspringboot.Model;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Sprites {
    private String backDefault;
    private String backFemale;
    private String backShiny;
    private String backShinyFemale;
    private String frontDefault;
    private String frontFemale;
    private String frontShiny;
    private String frontShinyFemale;
    private String officialFront;
    private String officialShiny;

    public static Sprites fromJson (JsonObject jo) {
        Sprites s = new Sprites();

        JsonObject other = jo.getJsonObject("other");
        JsonObject artworks = other.getJsonObject("official-artwork");

        //back sprites
        s.setBackDefault(jo.getString("back_default"));
        s.setBackShiny(jo.getString("back_shiny"));

        if (!jo.isNull("back_shiny_female")) {
            s.setBackShinyFemale(jo.getString("back_shiny_female"));
        } else {
            s.setBackShinyFemale("null");
        }

        if (!jo.isNull("back_female")) {
            s.setBackFemale(jo.getString("back_female"));
        } else {
            s.setBackFemale("null");
        }

        //front sprites
        s.setFrontDefault(jo.getString("front_default"));
        s.setFrontShiny(jo.getString("front_shiny"));;

        if (!jo.isNull("front_female")) {
            s.setFrontFemale(jo.getString("front_female"));
        } else {
            s.setFrontFemale("null");
        }

        if (!jo.isNull("front_shiny_female")) {
            s.setFrontShinyFemale(jo.getString("front_shiny_female"));
        } else {
            s.setFrontShinyFemale("null");
        }

        //official sprites
        s.setOfficialFront(artworks.getString("front_default"));
        s.setOfficialShiny(artworks.getString("front_shiny"));

        return s;
    }

    public static JsonObject spriteToJson (Sprites s){

        return Json.createObjectBuilder()
                .add("backDefault", s.getBackDefault())
                .add("backFemale", s.getBackFemale())
                .add("backShiny", s.getBackShiny())
                .add("backShinyFemale", s.getBackShinyFemale())
                .add("frontDefault", s.getFrontDefault())
                .add("frontFemale", s.getFrontFemale())
                .add("frontShiny", s.getFrontShiny())
                .add("frontShinyFemale", s.getFrontShinyFemale())
                .add("officialFront", s.getOfficialFront())
                .add("officialShiny", s.getOfficialShiny())
                .build();
    }
}
