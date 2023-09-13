package com.example.raysonLimspringboot.Service;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.example.raysonLimspringboot.Model.Items;
import com.example.raysonLimspringboot.Utilities.Utils;

import jakarta.json.JsonArray;
import jakarta.json.JsonObject;

@Service
public class ItemService {
    
    private static final String APIURL = "https://pokeapi.co/api/v2/item";

    public JsonObject getItemByName (String name){
        RequestEntity<Void> requestUrl = RequestEntity
                                            .get(APIURL + "/%s".formatted(name))
                                            .accept(MediaType.APPLICATION_JSON)
                                            .build();
        System.out.println(requestUrl);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(requestUrl, String.class);
        return Items.returnCleanedItemJson(response.getBody());
    }

    public List<String> getAllItems (String limit, String offset){

        UriComponents url = UriComponentsBuilder.fromUriString(APIURL)
                                .queryParam("limit", Integer.parseInt(limit))
                                .queryParam("offset", Integer.parseInt(offset))
                                .build();

        RequestEntity<Void> request = RequestEntity
                                        .get(url.toUri())
                                        .accept(MediaType.APPLICATION_JSON)
                                        .build();

        System.out.println("item getAll api called");
        System.out.println(request);

        RestTemplate template = new RestTemplate();
        ResponseEntity<String> response = template.exchange(request, String.class);
        JsonObject movelist = Utils.readJSON(response.getBody());
        return Utils.iterateJsonArrayForNameOnly(movelist.getJsonArray("results"));
    }
}
