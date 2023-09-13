package com.example.raysonLimspringboot.Service;

import java.nio.CharBuffer;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.raysonLimspringboot.COnfig.AppException;
import com.example.raysonLimspringboot.Model.posts.User;
import com.example.raysonLimspringboot.Record.LoginRecord;
import com.example.raysonLimspringboot.Record.SignUpRecord;
import com.example.raysonLimspringboot.Record.UserRecord;
import com.example.raysonLimspringboot.Repository.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserRecord login(LoginRecord loginDto) {
        User user = userRepository.findUserByUsername(loginDto.username())
                                    .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        if (passwordEncoder.matches(CharBuffer.wrap(loginDto.password()),
            user.getPassword())) {
                return new UserRecord(user.getId(), user.getUsername(), "");
        } 
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public User register(SignUpRecord signUp) {
        Optional<User> optionalUser = userRepository.findUserByUsername(signUp.username());

        // You were implement the above repo's method
        if (optionalUser.isPresent()) {
            AppException ae =  new AppException("Username already exists", HttpStatus.BAD_REQUEST);
            throw ae;
        }

        String id = UUID.randomUUID().toString().substring(0, 8);

        User user = new User(id, signUp.username(), signUp.password().toString(), signUp.email(), 0);
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(signUp.password())));

        if (userRepository.insertNewUser(user) > 0) {
            return user;
        }
        else {
            throw new AppException("User " + user.getUsername() + " was not successfully created", HttpStatus.BAD_REQUEST);
        }
    }

}
