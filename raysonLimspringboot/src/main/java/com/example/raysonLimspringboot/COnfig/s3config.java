package com.example.raysonLimspringboot.COnfig;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder.EndpointConfiguration;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

@Configuration
public class s3config {
    
    @Value("${s3.key.access}")
    private String apiKey;

    @Value("${s3.key.secret}")
    private String apiSecret;

    @Value("${s3.bucket.url}")
    private String digitalOceanUrl;

    @Bean
    public AmazonS3 getS3client() {
        BasicAWSCredentials cred = new BasicAWSCredentials(
            apiKey, apiSecret
        );

        // region use auto since cloudflare is auto
        EndpointConfiguration endPC = new EndpointConfiguration(
            digitalOceanUrl, "sgp1"
        );

        return AmazonS3ClientBuilder.standard()
                    .withEndpointConfiguration(endPC)
                    .withCredentials(new AWSStaticCredentialsProvider(cred))
                    .build();
        
    }
}
