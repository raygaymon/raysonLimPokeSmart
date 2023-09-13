package com.example.raysonLimspringboot.COnfig;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.raysonLimspringboot.Record.ErrorDto;


@ControllerAdvice
public class RestExceptionHandler {
    
    @ExceptionHandler(value = { AppException.class})
    @ResponseBody
    public ResponseEntity<ErrorDto> handleException(AppException ex) {
        return ResponseEntity.status(ex.getHttpStatus())
                            .body(new ErrorDto(ex.getMessage()));
    }
}
