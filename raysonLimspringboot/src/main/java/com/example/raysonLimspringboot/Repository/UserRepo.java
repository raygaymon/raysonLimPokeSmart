package com.example.raysonLimspringboot.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import com.example.raysonLimspringboot.Model.posts.User;

@Repository
public class UserRepo {

    private String FINDUSERNAME = "SELECT * FROM user WHERE username = ?;";
    private String REGISTERUSER = "INSERT INTO user (id, username, email, password, postCount) VALUES (?,?,?,?,?)";
    private String UPDATEPOSTCOUNT = "UPDATE user set postCount = ? where id = ?";
    private String GETPOSTCOUNT = "SELECT postCount from user where username = ?";

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Optional<User> findUserByUsername(String username) {
        SqlRowSet rs = jdbcTemplate.queryForRowSet(FINDUSERNAME, username);
        if (rs.next()) {
            User user = new User();
            user.setId(rs.getString("id"));
            user.setUsername(rs.getString("username"));
            user.setEmail(rs.getString("email"));
            user.setPassword(rs.getString("password"));
            user.setPostCount(rs.getInt("postCount"));

            return Optional.of(user);
        } else {
            return Optional.empty();
        }

    }

    public Integer insertNewUser(User user) {
        return jdbcTemplate.update(REGISTERUSER, user.getId(), user.getUsername(), user.getEmail(), user.getPassword(),
                0);

    }

    public Boolean updatePostCount(String id, Integer postCount) {
        return jdbcTemplate.update(UPDATEPOSTCOUNT, postCount, id) > 0;
    }
}
