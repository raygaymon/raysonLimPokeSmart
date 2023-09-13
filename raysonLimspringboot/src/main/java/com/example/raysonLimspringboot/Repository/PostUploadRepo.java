package com.example.raysonLimspringboot.Repository;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.example.raysonLimspringboot.Model.posts.Post;


@Repository
public class PostUploadRepo {
    
    @Autowired
    private JdbcTemplate template;

    public final String GETALLPOSTS = "select * from post";
    public final String GETALLPOSTSBYTOPIC = "select * from post where topic = ?";
    public final String GETALLPOSTSBYUSER = "select * from post where username = ?";
    public final String GETALLPOSTSBYID = "select * from post where id = ?";
    public final String ADDNEWPOST = "insert into post (id, username, topic, post) values (?, ?,?,?)";
    public final String ADDNEWPOSTWITHURL = "insert into post (id, username, topic, post, imageUrl) values (?,?,?,?,?)";
    public final String DELETEPOST = "delete from post where id = ?";
    public final String ADDIMAGEURL = "update post set imageUrl = ? where post = ?";

    public List<Post> getAllPosts (){
        return template.query(GETALLPOSTS, BeanPropertyRowMapper.newInstance(Post.class));
    }

    public List<Post> getPostsByUser (String user){
        return template.query(GETALLPOSTSBYUSER, BeanPropertyRowMapper.newInstance(Post.class), user);
    }

    public List<Post> getPostsByID (String id){
        return template.query(GETALLPOSTSBYID, BeanPropertyRowMapper.newInstance(Post.class), id);
    }

    public List<Post> getPostsByTopic (String topic){
        return template.query(GETALLPOSTSBYTOPIC, BeanPropertyRowMapper.newInstance(Post.class), topic);
    }

    public Boolean addImageUrl (String imageUrl, String post){
        System.out.println("runnig image url update for :" + post);
        return template.update(ADDIMAGEURL, imageUrl, post) > 0;
    }

    public Integer newPost (Post p){
        KeyHolder kh = new GeneratedKeyHolder();

        PreparedStatementCreator psc = new PreparedStatementCreator() {
            
            @Override
            public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                PreparedStatement pc = con.prepareStatement(ADDNEWPOST, new String[] {"id"});
                pc.setString(1, p.getId());
                pc.setString(2, p.getUserName());
                pc.setString(3, p.getTopic());
                pc.setString(4, p.getPost());
                return pc;
            }

            
        };
        return template.update(psc, kh);
    }

    public Boolean deletePostById (String id ){
        return template.update(DELETEPOST, id) > 1;
    }

    public Integer newPostWithImage (Post p, String imageURL){
        KeyHolder kh = new GeneratedKeyHolder();

        PreparedStatementCreator psc = new PreparedStatementCreator() {
            
            @Override
            public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                PreparedStatement pc = con.prepareStatement(ADDNEWPOSTWITHURL, new String[] {"id"});
                pc.setString(1, p.getId());
                pc.setString(2, p.getUserName());
                pc.setString(3, p.getTopic());
                pc.setString(4, p.getPost());
                pc.setString(5, imageURL);
                return pc;
            }

            
        };
        return template.update(psc, kh); 
    }

}
