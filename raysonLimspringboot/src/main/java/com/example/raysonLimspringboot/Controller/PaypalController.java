package com.example.raysonLimspringboot.Controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.raysonLimspringboot.Model.shop.Order;
import com.example.raysonLimspringboot.Service.MailService;
import com.example.raysonLimspringboot.Service.PaypalService;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;

import jakarta.json.Json;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/paypal")
public class PaypalController {

    // @Autowired
    // private MailService service;

    @Autowired
    private PaypalService ppService;

    public static final String SUCCESS_URL = "pay/success";
    public static final String CANCEL_URL = "pay/cancel";

    @PostMapping(value = "/make/payment")
    
    public ResponseEntity<Map<String, Object>> makePayment(@RequestParam("sum") String sum){
        System.out.println(ppService.createPayment(sum));

        return ResponseEntity.ok().body(ppService.createPayment(sum));
    }

    @PostMapping(value = "/complete/payment")
    public ResponseEntity<String> completePayment(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String PayerID){

    
    Payment p = ppService.completePayment(paymentId, PayerID);

    if (p == null){
        return ResponseEntity.ok(Json.createObjectBuilder().add("status","Something fucked up").build().toString());
    } else {
        return ResponseEntity.ok(Json.createObjectBuilder().add("status",p.toString()).build().toString());
    }
    
}

}
