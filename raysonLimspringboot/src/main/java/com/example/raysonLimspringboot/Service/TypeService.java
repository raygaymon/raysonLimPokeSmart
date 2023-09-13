package com.example.raysonLimspringboot.Service;


import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.raysonLimspringboot.Model.Type;
import com.example.raysonLimspringboot.Utilities.Utils;

import jakarta.json.JsonArray;
import jakarta.json.JsonObject;

@Service
public class TypeService {

    private static final String APIURL = "https://pokeapi.co/api/v2/type";
    
    public JsonObject getTypeByName (String name){
        RequestEntity<Void> requestUrl = RequestEntity
                                            .get(APIURL + "/%s".formatted(name))
                                            .accept(MediaType.APPLICATION_JSON)
                                            .build();
        System.out.println(requestUrl);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(requestUrl, String.class);
        return Type.cleanUpJsonSingle(response.getBody());
    }

    public JsonArray getAllTypes(){
        
        RequestEntity<Void> requestUrl = RequestEntity
                                            .get(APIURL)
                                            .accept(MediaType.APPLICATION_JSON)
                                            .build();
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> allTypes = rt.exchange(requestUrl, String.class);
        JsonObject jo = Utils.readJSON(allTypes.getBody());
        JsonArray typeArray = jo.getJsonArray("results");
        List<Type> holdingArea = typeArray.stream()
                            .map(m -> Utils.readJSON(m.toString()))
                            .map(m -> Type.fromJson(m))
                            .toList();

        return Type.typeList(holdingArea);
    }
    
}
