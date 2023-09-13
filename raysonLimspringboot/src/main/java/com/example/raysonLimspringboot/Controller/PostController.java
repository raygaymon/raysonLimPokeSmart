package com.example.raysonLimspringboot.Controller;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.raysonLimspringboot.Model.posts.Post;
import com.example.raysonLimspringboot.Model.posts.Reply;
import com.example.raysonLimspringboot.Repository.ImageUpload;
import com.example.raysonLimspringboot.Service.PostService;
import com.example.raysonLimspringboot.Repository.ReplyRepo;
import com.example.raysonLimspringboot.Utilities.Utils;

import jakarta.json.Json;
import jakarta.json.JsonObject;

@RestController
@RequestMapping("/posts")
@EnableTransactionManagement
public class PostController {

    @Autowired
    private PostService service;
    @Autowired
    private ImageUpload imageRepo;
    @Autowired
    private ReplyRepo replyrepo;


    @GetMapping("/topic/{topic}")
    public ResponseEntity<String> getPostById (@PathVariable("topic") String topic ){

        List<Post> p = service.getPostsByTopic(topic.replace("-", " "));
        List<JsonObject> jp = p.stream()
                            .map(post -> (Post.toJson(post)))
                            .toList();

        if(!p.isEmpty()){
            return ResponseEntity.ok(Json.createArrayBuilder(jp).build().toString());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/user/{user}")
    public ResponseEntity<String> getPostByUser (@PathVariable("user") String user){

        List<Post> p = service.getPostsByUser(user);
        List<JsonObject> jp = p.stream()
                            .map(post -> (Post.toJson(post)))
                            .toList();

        if(!p.isEmpty()){
            return ResponseEntity.ok(Json.createArrayBuilder(jp).build().toString());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<String> getAllPosts (){

        List<Post> p = service.getAllPosts();
        List<JsonObject> jp = p.stream()
                            .map(post -> (Post.toJson(post)))
                            .toList();

        if(!p.isEmpty()){
            return ResponseEntity.ok(Json.createArrayBuilder(jp).build().toString());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping(path = "/upload")
    public ResponseEntity<String> uploadPost (@RequestBody String post) throws IOException{

        JsonObject jo = Utils.readJSON(post);
        Post p = Post.fromJson(jo);
        p.setId(UUID.randomUUID().toString().substring(0,7));
        Integer id = service.newPost(p);

        if (id > 0){

            return ResponseEntity.ok(Json.createObjectBuilder().add("success", "Post with no images successfully uploaded with id: " + id).build().toString());
            
        } else {
            return ResponseEntity.status(HttpStatus.BANDWIDTH_LIMIT_EXCEEDED).build();
        }
    }

    @PostMapping(path="/uploadPicture", consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadPicture (@RequestPart String username, @RequestPart String topic, @RequestPart String post, @RequestPart MultipartFile file){

        String imageUrl = imageRepo.saveImage(file);
        Post p = new Post((UUID.randomUUID().toString().substring(0,7)), username, topic, post);
        Integer postID = service.newPostWithImage(p, imageUrl);

        return ResponseEntity.ok(Json.createObjectBuilder().add("Status", "Image upload status: " + postID).build().toString());
    }

    @GetMapping("/replies/{postId}")
    public ResponseEntity<String> getAllReplies (@PathVariable("postId") String id) {
        System.out.println(id);
        List<Reply> result = replyrepo.getAllRepliesOfPost(id);
        List<JsonObject> jo = result.stream().map(reply -> Reply.toJson(reply)).toList();

        if(!jo.isEmpty()){
            return ResponseEntity.ok(Json.createArrayBuilder(jo).build().toString());
        } else {
            System.out.println("empty list");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/replies/post")
    public ResponseEntity<String> uploadReply (@RequestBody String reply){
        Reply r = Reply.fromJson(Utils.readJSON(reply));
        Integer replyId = replyrepo.newReply(r);

        if(replyId > 0){
            return ResponseEntity.ok(Json.createObjectBuilder().add("Status", "reply posting success with id of " + replyId).build().toString());
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Json.createObjectBuilder().add("Status", "reply posting failed with id of " + replyId).build().toString());
        }
    }

    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<String> deletePost (@PathVariable("postId") String id){
        
        Post toDelete = service.getPostsByID(id).get(0);
        Boolean deleteSuccess = service.deletePostById(id);

        if(toDelete.getImageUrl() != null){
            System.out.println("deleting picture");
            String deletion = imageRepo.deleteImage(toDelete.getImageUrl());
            return ResponseEntity.ok(Json.createObjectBuilder().add("Status", deleteSuccess + "\n" + deletion).build().toString());
        }
        
        return ResponseEntity.ok(Json.createObjectBuilder().add("Status", deleteSuccess).build().toString());
    }
}
