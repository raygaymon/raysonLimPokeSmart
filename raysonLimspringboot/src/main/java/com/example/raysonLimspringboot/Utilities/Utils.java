package com.example.raysonLimspringboot.Utilities;

import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import jakarta.json.stream.JsonCollectors;

public class Utils {
    
    public static JsonObject readJSON (String json) {
        JsonReader jor = (JsonReader) Json.createReader(new StringReader(json));
        return jor.readObject();
    }

    public static List<String> iterateJsonArrayForNameOnly (JsonArray ja){
        List<String> output = new ArrayList<>();
        for (int i = 0; i < ja.size(); i++){
            JsonObject type = ja.getJsonObject(i);
            output.add(type.getString("name"));
        }
        return output;
    }

    public static String titlecase (String s) {
        StringBuilder sb = new StringBuilder(s.length());
        sb.append(s.substring(0,1).toUpperCase());
        for (int i = 1 ; i < (s.length()) ; i++){
            sb.append(s.substring(i, i+1));
        }

        return sb.toString().trim();
    }

    public static JsonArray listOfStringToJsonArray (List<String> typeList){
        JsonArray moves = typeList.stream().map(Json::createValue).collect(JsonCollectors.toJsonArray());
        return moves;
    }

    public static String cleanUpPokemonVersionNames (String s){
        switch(s){
            case "firered":
                return "Pokemon: Fire Red";
            case "leafgreen":
                return "Pokemon: Leaf Green";
            case "sapphire":
                return "Pokemon: Sapphire";
            case "ruby":
                return "Pokemon: Ruby";
            case "emerald":
                return "Pokemon: Emerald";
            default:
                return "not pokemon";
        }
    }

    public static String convertToTitleCaseIteratingChars(String text) {
        if (text == null || text.isEmpty()) {
            return text;
        }

        StringBuilder converted = new StringBuilder();

        boolean convertNext = true;
        for (char ch : text.toCharArray()) {
            if (Character.isSpaceChar(ch)) {
                convertNext = true;
            } else if (convertNext) {
                ch = Character.toTitleCase(ch);
                convertNext = false;
            } else {
                ch = Character.toLowerCase(ch);
            }
            converted.append(ch);
        }

        return converted.toString();
    }
}
