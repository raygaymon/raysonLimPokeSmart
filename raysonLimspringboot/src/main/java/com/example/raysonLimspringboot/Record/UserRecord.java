package com.example.raysonLimspringboot.Record;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserRecord {
    
    private String id;
    private String username;
    private String token;
}
