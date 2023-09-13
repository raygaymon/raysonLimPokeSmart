package com.example.raysonLimspringboot.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.raysonLimspringboot.COnfig.AppException;
import com.example.raysonLimspringboot.Model.posts.Post;
import com.example.raysonLimspringboot.Model.posts.User;
import com.example.raysonLimspringboot.Repository.PostUploadRepo;
import com.example.raysonLimspringboot.Repository.UserRepo;

@Service
public class PostService {
    @Autowired
    private PostUploadRepo postRepo;
    @Autowired
    private UserRepo userRepo;
    

    public List<Post> getAllPosts (){
        return postRepo.getAllPosts();
    }

    public List<Post> getPostsByUser (String user){
        return postRepo.getPostsByUser(user);
    }

    public List<Post> getPostsByID (String id){
        return postRepo.getPostsByID(id);
    }

    public List<Post> getPostsByTopic (String topic){
        return postRepo.getPostsByTopic(topic);
    }

    public Boolean addImageUrl (String imageUrl, String post){
       return postRepo.addImageUrl(imageUrl, post);
    }

    public Boolean deletePostById (String id){
        return postRepo.deletePostById(id);
    }

    @Transactional
    public Integer newPost (Post p){

        User user = userRepo.findUserByUsername(p.getUserName())
                                    .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        Integer postCountOfUser = user.getPostCount();
        if(postCountOfUser == 0){
            postCountOfUser = 1;
            Boolean updatePostCountSuccess = userRepo.updatePostCount(p.getUserName(), postCountOfUser);
        }   else {
            Boolean updatePostCountSuccess = userRepo.updatePostCount(p.getUserName(), postCountOfUser + 1);
        }
        
        Integer postId = postRepo.newPost(p);
        
        return postId;
    }

    @Transactional
    public Integer newPostWithImage (Post p, String imageUrl){

        User user = userRepo.findUserByUsername(p.getUserName())
                                    .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        Integer postCountOfUser = user.getPostCount();
        if(postCountOfUser == 0){
            postCountOfUser = 1;
            Boolean updatePostCountSuccess = userRepo.updatePostCount(p.getUserName(), postCountOfUser);
        }   else {
            Boolean updatePostCountSuccess = userRepo.updatePostCount(p.getUserName(), postCountOfUser + 1);
        }
        return postRepo.newPostWithImage(p, imageUrl);
    }
}
