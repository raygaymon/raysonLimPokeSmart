package com.example.raysonLimspringboot.Model.posts;
import com.fasterxml.jackson.databind.util.JSONPObject;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reply {
    private Integer id;
    private String postId;
    private String username;
    private String post;

    public static JsonObject toJson (Reply r){
        return Json.createObjectBuilder()
                .add("postId", r.getPostId())
                .add("username", r.getUsername())
                .add("post", r.getPost())
                .build();
    }

    public static Reply fromJson (JsonObject json){
        Reply r = new Reply();
        r.setPostId(json.getString("postId"));
        r.setUsername(json.getString("username"));
        r.setPost(json.getString("post"));
        return r;
    }
}
