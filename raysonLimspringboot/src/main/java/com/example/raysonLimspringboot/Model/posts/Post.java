package com.example.raysonLimspringboot.Model.posts;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Post {
    private String id;
    private String userName;
    private String topic;
    private String post;
    private String imageUrl;

    

    public Post(String id, String username, String topic, String post) {
        this.id = id;
        this.userName = username;
        this.topic = topic;
        this.post = post;
    }

    public static JsonObject toJson (Post p){

        JsonObjectBuilder job = Json.createObjectBuilder()
                .add("username", p.getUserName())
                .add("topic", p.getTopic())
                .add("post", p.getPost());

        if(p.getImageUrl() != null){
            job.add("imageUrl", p.getImageUrl());
        }
        if(p.getId() != null){
            System.out.println("getting id");
            job.add("id", p.getId());
        }

        return job.build();
    }

    public static Post fromJson (JsonObject json){

        Post p = new Post();
        p.setUserName(json.getString("username"));
        p.setTopic(json.getString("topic"));
        p.setPost(json.getString("post"));

        return p;
    }

    public static Post fromJsonWithImage (JsonObject json){

        Post p = new Post();
        p.setUserName(json.getString("username"));
        p.setTopic(json.getString("topic"));
        p.setPost(json.getString("post"));

        if(!json.isNull("imageUrl")){
            p.setImageUrl(json.getString("imageUrl"));
        }

        return p;
    }
}
