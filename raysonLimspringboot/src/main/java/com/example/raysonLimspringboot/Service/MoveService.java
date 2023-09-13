package com.example.raysonLimspringboot.Service;

import java.net.URI;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.example.raysonLimspringboot.Model.Moves;
import com.example.raysonLimspringboot.Utilities.Utils;

import jakarta.json.JsonObject;

@Service
public class MoveService {
    
    private static final String APIURL = "https://pokeapi.co/api/v2/move";

    public JsonObject getMoveByName (String name){
        RequestEntity<Void> requestUrl = RequestEntity
                                            .get(APIURL + ("/%s".formatted(name)).replace(" ", "-"))
                                            .accept(MediaType.APPLICATION_JSON)
                                            .build();
        System.out.println(requestUrl);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(requestUrl, String.class);
        return Moves.cleanUpDetailedMove(response.getBody());
    }

    public List<String> getAllMovesNameOnly (String limit, String offset){

        URI url = UriComponentsBuilder.fromUriString(APIURL)
                                        .queryParam("limit", Integer.parseInt(limit))
                                        .queryParam("offset", Integer.parseInt(offset))
                                        .build().toUri();

        RequestEntity<Void> requestUrl = RequestEntity
                                            .get(url)
                                            .accept(MediaType.APPLICATION_JSON)
                                            .build();
        System.out.println(requestUrl);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(requestUrl, String.class);
        JsonObject movelist = Utils.readJSON(response.getBody());
        return Utils.iterateJsonArrayForNameOnly(movelist.getJsonArray("results"));
    }
}
