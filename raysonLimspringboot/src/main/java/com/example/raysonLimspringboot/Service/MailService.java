package com.example.raysonLimspringboot.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.raysonLimspringboot.Utilities.Utils;
import com.paypal.api.openidconnect.Address;
import com.paypal.api.payments.PayerInfo;
import com.paypal.api.payments.Payment;
import com.paypal.api.payments.ShippingAddress;

import jakarta.json.Json;
import jakarta.json.JsonObject;

@Service
public class MailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String toEmail, String subject, String body){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("archangelgx@gmail.com");
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);

        System.out.println("Suck my ass mail is sent");
    }

    public static JsonObject decryptJson (Payment payment){

        String transacId = payment.getId();
        PayerInfo pi = payment.getPayer().getPayerInfo();
        String status = payment.getState();
        String firstName = pi.getFirstName();
        String lastName = pi.getLastName();
        String payerId = pi.getPayerId();
        String payeeEmail = pi.getEmail();
        String paid = payment.getTransactions().get(0).getAmount().getTotal() + "USD";
        ShippingAddress sa = payment.getTransactions().get(0).getItemList().getShippingAddress();
        String address = "Your product will be shipping to:\n" + sa.getLine1() + "\nCity: " + sa.getCity() + "\nState: " + sa.getState() + "\nCountry Code: US\nPostal Code: " + sa.getPostalCode();

        String emailBody = "Transaction ID : " + transacId + "\n\nTransaction Status: " + Utils.titlecase(status) +  "\n\nCustomer Details: " + firstName + " " + lastName + "\nPayer ID: " + payerId + "\nPaid Amount: " + paid + "\n\n" + address + "\n\n\n\n\nThank you for shopping at PokeSmart. We hope to see you again!";

        return Json.createObjectBuilder().add("email", payeeEmail).add("body", emailBody).build();
    }
}
