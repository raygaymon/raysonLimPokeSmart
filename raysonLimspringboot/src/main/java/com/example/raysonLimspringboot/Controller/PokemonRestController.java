package com.example.raysonLimspringboot.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.raysonLimspringboot.Service.AbilityService;
import com.example.raysonLimspringboot.Service.ItemService;
import com.example.raysonLimspringboot.Service.LocationAreaService;
import com.example.raysonLimspringboot.Service.MoveService;
import com.example.raysonLimspringboot.Service.PokemonService;
import com.example.raysonLimspringboot.Service.TypeService;
import com.example.raysonLimspringboot.Utilities.Utils;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;

@RestController
@CrossOrigin
@RequestMapping("/home")
public class PokemonRestController {
    @Autowired
    private PokemonService serviceP;
    @Autowired
    private TypeService serviceT;
    @Autowired
    private MoveService serviceM;
    @Autowired
    private ItemService serviceI;
    @Autowired
    private AbilityService serviceA;
    @Autowired
    private LocationAreaService serviceLA;

    @GetMapping("pokemon/id/{id}")
    public ResponseEntity<String> getPokemonById (@PathVariable("id") Integer id) {
        JsonObject pokemonResult = serviceP.getPokemonById(id);
        

        if (pokemonResult == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {

            return ResponseEntity.ok(
                Json.createObjectBuilder()
                    .add("Pokemon", pokemonResult)
                    .build().toString()
            ); 
        }
        
    }

    @GetMapping("pokemon/name/{name}")
    public ResponseEntity<String> getPokemonByName (@PathVariable("name") String name) {
        
        JsonObject pokemonResult = serviceP.getPokemonByName(name);

        if (pokemonResult == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {

            return ResponseEntity.ok(
                Json.createObjectBuilder().add("Pokemon", pokemonResult).build().toString()
            ); 
        }
    }

    @GetMapping("pokemon/all")
    public ResponseEntity<String> getAllPokemon (@RequestParam(name = "limit", required=false, defaultValue="20") String limit, @RequestParam(name = "offset", required=false, defaultValue="0") String offset) {
        JsonArray pokemonList = serviceP.getAllPokemon(limit, offset);

        if (pokemonList == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {

            return ResponseEntity.ok(
                Json.createObjectBuilder().add("Pokemon", pokemonList).build().toString()
            ); 
        }
    }

    @GetMapping("/types")
    public ResponseEntity<String> getAllTypes (){
        JsonArray response = serviceT.getAllTypes();

        if (response == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {

            return ResponseEntity.ok(
                Json.createObjectBuilder()
                    .add("Types", response)
                    .build().toString()
            );
        }
    }

    @GetMapping("/types/{type}")
    public ResponseEntity<String> getAllTypes (@PathVariable("type") String type){
        JsonObject response = serviceT.getTypeByName(type);

        if (response == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {

            return ResponseEntity.ok(
                Json.createObjectBuilder()
                    .add("Types", response)
                    .build().toString()
            );
        }
    }

    @GetMapping("/moves")
    public ResponseEntity<String> getAllMoves (@RequestParam(required=false, defaultValue = "0") String offset, @RequestParam(required=false, defaultValue = "20") String limit ){

        List<String> response = serviceM.getAllMovesNameOnly(limit, offset);

        if (response == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {

            return ResponseEntity.ok(
                Json.createObjectBuilder()
                    .add("moves", Utils.listOfStringToJsonArray(response))
                    .build().toString()
            );
        }
    }

    @GetMapping("/moves/{move}")
    public ResponseEntity<String> getMoveByName (@PathVariable("move") String move){
        JsonObject response = serviceM.getMoveByName(move);
        if (response == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {

            return ResponseEntity.ok(response.toString());
        }
    }

    @GetMapping("/item/{name}")
    public ResponseEntity<String> getItemByName (@PathVariable("name") String name){
        JsonObject response = serviceI.getItemByName(name);
        if (response == null) {
            
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {

            return ResponseEntity.ok(response.toString());
        }
    }

    @GetMapping("/item")
    public ResponseEntity<String> getAllItemss (@RequestParam(required=false, defaultValue = "0") String offset, @RequestParam(required=false, defaultValue = "20") String limit ){
        List<String> response = serviceI.getAllItems(limit, offset);

        if (response == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {

            return ResponseEntity.ok(
                Json.createObjectBuilder()
                    .add("Items", Utils.listOfStringToJsonArray(response))
                    .build().toString()
            );
        }
    }

    @GetMapping("/ability/{name}")
    public ResponseEntity<String> getAbilityByName (@PathVariable("name") String name){

        JsonObject response = serviceA.getAbilityByName(name);
        if (response == null) {
            
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {

            return ResponseEntity.ok(response.toString());
        }
    }

    @GetMapping("/ability")
    public ResponseEntity<String> getAllAbilities (@RequestParam(required=false, defaultValue = "0") String offset, @RequestParam(required=false, defaultValue = "20") String limit ){

        List<String> response = serviceA.getAllAbilitiesNameOnly(limit, offset);

        if (response == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {

            return ResponseEntity.ok(
                Json.createObjectBuilder()
                    .add("abilities", Utils.listOfStringToJsonArray(response))
                    .build().toString()
            );
        }
    }

    @GetMapping("/location-area/{name}")
    public ResponseEntity<String> getLocationAreaByName (@PathVariable("name") String name){

        JsonObject response = serviceLA.getLocationAreaByName(name);
        if (response == null) {
            
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {

            return ResponseEntity.ok(response.toString());
        }
    }

    @GetMapping("/location-area")
    public ResponseEntity<String> getLocationAreas (@RequestParam(required=false, defaultValue = "0") String offset, @RequestParam(required=false, defaultValue = "20") String limit ){

        List<String> response = serviceLA.getAllLocationAreas(limit, offset);

        if (response == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {

            return ResponseEntity.ok(
                Json.createObjectBuilder()
                    .add("location-areas", Utils.listOfStringToJsonArray(response))
                    .build().toString()
            );
        }
    }


}
