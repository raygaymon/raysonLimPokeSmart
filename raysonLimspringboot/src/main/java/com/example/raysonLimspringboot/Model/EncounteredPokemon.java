package com.example.raysonLimspringboot.Model;
import java.util.ArrayList;
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
public class EncounteredPokemon {
    private String name;
    private Integer maxChance;
    private Integer minLevel;
    private Integer maxLevel;
    private List<String> conditions;
    private List<String> method;
    private List<String> version;

    public static EncounteredPokemon fromString(JsonObject jo){

        EncounteredPokemon ep = new EncounteredPokemon();

        JsonObject p = jo.getJsonObject("pokemon");
        JsonArray versionDetails = jo.getJsonArray("version_details");

        List<String> versions = new ArrayList<>();
        List<String> encounterMethods = new ArrayList<>();
        List<String> encounterConditions = new ArrayList<>();

        Integer maxChance = 0;
        Integer minLevel = 0;
        Integer maxLevel = 0;

        for(int i = 0; i < versionDetails.size(); i++){
            JsonObject o = versionDetails.getJsonObject(i);

            if (o.isNull("max_chance")){
                maxChance = 0;
            }

            if (o.getJsonNumber("max_chance").intValue() > maxChance){
                maxChance = o.getJsonNumber("max_chance").intValue();
            }

            JsonArray encounterDetails = o.getJsonArray("encounter_details");
            for (int j = 0; j < encounterDetails.size(); j++){

                JsonObject job = encounterDetails.getJsonObject(j);
                JsonObject method = job.getJsonObject("method");

                if (!job.isNull("condition_values")){
                    JsonArray conditions = job.getJsonArray("condition_values");

                    if(!conditions.isEmpty()){
                        for (int k = 0; k < conditions.size(); k ++) {

                            JsonObject cond = conditions.getJsonObject(k);

                            if(cond.getString("name").equals("slot2-none")){
                                continue;
                            }

                            String c = cond.getString("name");
                            String c2 = c.replace("slot2-", "");

                            String ver = Utils.cleanUpPokemonVersionNames(c2);
                            String c3 = Utils.convertToTitleCaseIteratingChars(c2.replace("-", ": "));

                            if(ver.equals("not pokemon") && !encounterConditions.contains(c3)){

                                encounterConditions.add(c3);

                            } else if (!ver.equals("not pokemon")) {
                                String c4 = Utils.titlecase(ver).concat(" in the DS Gameboy slot");

                                if (!encounterConditions.contains(c4)){
                                    encounterConditions.add(c4);
                                }
                            }
                        }
                    }
                }
                
                if(!encounterMethods.contains(method.getString("name").replace("-", " "))){
                    encounterMethods.add((method.getString("name")).replace("-", " "));
                }

                if (job.isNull("max_level")){
                    maxLevel = 0;
                }

                if (job.isNull("min_level")){
                    maxLevel = 0;
                }

                if (job.getJsonNumber("max_level").intValue() > maxLevel){
                maxLevel = job.getJsonNumber("max_level").intValue();
                }

                if (job.getJsonNumber("min_level").intValue() > minLevel){
                minLevel = job.getJsonNumber("min_level").intValue();
                }
            }


            JsonObject version = o.getJsonObject("version");
            if (!versions.contains(version.getString("name"))){
                versions.add(version.getString("name"));
            }
        }

        ep.setName(p.getString("name"));
        ep.setConditions(encounterConditions);
        ep.setVersion(versions);
        ep.setMethod(encounterMethods);
        ep.setMaxChance(maxChance);
        ep.setMaxLevel(maxLevel);
        ep.setMinLevel(minLevel);
        return ep;
    }

    public static JsonObject toJson (EncounteredPokemon ep){
        return Json.createObjectBuilder()
                .add("name", ep.getName())
                .add("minLevel", ep.getMinLevel())
                .add("maxLevel", ep.getMaxLevel())
                .add("maxChance", ep.getMaxChance())
                .add("versions", Utils.listOfStringToJsonArray(ep.getVersion()))
                .add("encounterMethods", Utils.listOfStringToJsonArray(ep.getMethod()))
                .add("conditions", Utils.listOfStringToJsonArray(ep.getConditions()))
                .build();
    }

    public static JsonObject returnCleanedJson (JsonObject json){
        EncounteredPokemon ep = EncounteredPokemon.fromString(json);
        return EncounteredPokemon.toJson(ep);
    }
}
