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
import com.example.raysonLimspringboot.Model.posts.Reply;

@Repository
public class ReplyRepo {
    @Autowired
    private JdbcTemplate template;

    public final String GETALLREPLIESBYPOSTID = "select * from reply where postId = ?";
    public final String ADDREPLY = "insert into reply (username, post, postId) values (?,?,?)";
    public final String DELETEREPLY = "delete from reply where id=?";

    public List<Reply> getAllRepliesOfPost (String postId){
        return template.query(GETALLREPLIESBYPOSTID, BeanPropertyRowMapper.newInstance(Reply.class), postId);
    }

    public Integer newReply (Reply p){
        KeyHolder kh = new GeneratedKeyHolder();

        PreparedStatementCreator psc = new PreparedStatementCreator() {
            
            @Override
            public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                PreparedStatement pc = con.prepareStatement(ADDREPLY, new String[] {"id"});
                pc.setString(1, p.getUsername());
                pc.setString(3, p.getPostId());
                pc.setString(2, p.getPost());
                return pc;
            }

            
        };
        template.update(psc, kh);
        return kh.getKey().intValue();
    }
}
