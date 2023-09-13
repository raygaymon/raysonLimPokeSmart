package com.example.raysonLimspringboot.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.raysonLimspringboot.COnfig.UserAuthProvider;
import com.example.raysonLimspringboot.Model.posts.User;
import com.example.raysonLimspringboot.Record.LoginRecord;
import com.example.raysonLimspringboot.Record.SignUpRecord;
import com.example.raysonLimspringboot.Record.UserRecord;
import com.example.raysonLimspringboot.Service.UserService;

import jakarta.json.Json;


@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserAuthProvider userAuthProvider;
    
    @PostMapping("/login")
    public ResponseEntity<UserRecord> login(@RequestBody LoginRecord login) {

        UserRecord user = userService.login(login);
        user.setToken(userAuthProvider.createToken(user));
        return ResponseEntity.ok(user);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody SignUpRecord signUp) {
        User user = userService.register(signUp);
        UserRecord createdUser = new UserRecord ();
        createdUser.setToken(userAuthProvider.createToken(new UserRecord(user.getId(), user.getUsername(), "")));
        return ResponseEntity.ok(Json.createObjectBuilder().add("User", createdUser.toString()).build().toString());
    }
}
