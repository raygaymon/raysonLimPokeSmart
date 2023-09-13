package com.example.raysonLimspringboot.Model.posts;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Image {
    private Integer id;
    private String imageName;
    private byte[] image;
}
