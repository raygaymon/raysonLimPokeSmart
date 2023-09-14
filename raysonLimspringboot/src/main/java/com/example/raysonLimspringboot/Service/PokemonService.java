package com.example.raysonLimspringboot.Service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.example.raysonLimspringboot.COnfig.AppException;
import com.example.raysonLimspringboot.Model.Pokemon;
import com.example.raysonLimspringboot.Utilities.Utils;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.stream.JsonCollectors;


@Service
public class PokemonService {
    
    private static final String APIURL = "https://pokeapi.co/api/v2/pokemon/";

    public JsonObject getPokemonById (Integer id){

        RequestEntity<Void> request = RequestEntity
                                        .get(APIURL + id)
                                        .accept(MediaType.APPLICATION_JSON)
                                        .build();

        System.out.println("api called");
        System.out.println(request);

        RestTemplate template = new RestTemplate();
        ResponseEntity<String> response = template.exchange(request, String.class);
        JsonObject pokemon = Utils.readJSON(response.getBody());
        Pokemon p = Pokemon.fromJSON(pokemon);
        JsonObject tidiedPokemon = p.fromPokemon(p);

        return tidiedPokemon;
    }

    public JsonObject getPokemonByName (String name){

            RequestEntity<Void> request = RequestEntity
                                            .get(APIURL + name)
                                            .accept(MediaType.APPLICATION_JSON)
                                            .build();

            System.out.println("api called");
            System.out.println(request);

            RestTemplate template = new RestTemplate();

            try {
                ResponseEntity<String> response = template.exchange(request, String.class);
                JsonObject pokemon = Utils.readJSON(response.getBody());
                Pokemon p = Pokemon.fromJSON(pokemon);
                JsonObject tidiedPokemon = p.fromPokemon(p);

                return tidiedPokemon;
            } catch (HttpClientErrorException e) {
                throw new AppException("Pokemon could not be found successfully", HttpStatus.BAD_REQUEST);
            }    
    }

    public JsonArray getAllPokemon (String limit, String offset){

        UriComponents url = UriComponentsBuilder.fromUriString(APIURL)
                                .queryParam("limit", Integer.parseInt(limit))
                                .queryParam("offset", Integer.parseInt(offset))
                                .build();

        RequestEntity<Void> request = RequestEntity
                                        .get(url.toUri())
                                        .accept(MediaType.APPLICATION_JSON)
                                        .build();

        System.out.println("api called");
        System.out.println(request);

        RestTemplate template = new RestTemplate();

        try {
            ResponseEntity<String> response = template.exchange(request, String.class);
            JsonObject pokemonListJson = Utils.readJSON(response.getBody());
            JsonArray pokemonArray = pokemonListJson.getJsonArray("results");
            List<String> pokemonNames = Utils.iterateJsonArrayForNameOnly(pokemonArray);
            return pokemonNames.stream().map(m -> Utils.titlecase(m)).map(Json::createValue).collect(JsonCollectors.toJsonArray());
        } catch (HttpClientErrorException e) {
            throw new AppException("Pokemon List could not be found successfully", HttpStatus.BAD_REQUEST);
        }
        
    }

}
