package com.example.raysonLimspringboot.Repository;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;

@Repository
public class ImageUpload {
    
    @Autowired
    private AmazonS3 s3;


    public String saveImage(MultipartFile uploadFile) {
        System.out.println("uploading file");
        Map<String, String> userData = new HashMap<>();
        userData.put("filename", uploadFile.getOriginalFilename());

        //setting the information of the object to be uploaded
        ObjectMetadata metaData = new ObjectMetadata();
        metaData.setContentType(uploadFile.getContentType());
        metaData.setContentLength(uploadFile.getSize());
        metaData.setUserMetadata(userData);

        String id = UUID.randomUUID().toString().substring(0,8);

        try{
            PutObjectRequest putReq = new PutObjectRequest("raysonlimcsfassessment", id, uploadFile.getInputStream(), metaData);

            putReq = putReq.withCannedAcl(CannedAccessControlList.PublicRead);
            PutObjectResult result = s3.putObject(putReq);
            System.out.println("shit is working " + result);

        }catch(IOException ex){
            ex.printStackTrace();
        }

        return "https://raysonlimcsfassessment.sgp1.digitaloceanspaces.com/" + id;
    }

    public String deleteImage(String filename){
        
        String imageId = filename.replace("https://raysonlimcsfassessment.sgp1.digitaloceanspaces.com/", "");
        s3.deleteObject("raysonlimcsfassessment", imageId);
        return "Deletion success for image with id: " + imageId;
    }

}
