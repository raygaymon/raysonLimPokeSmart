package com.example.raysonLimspringboot.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.raysonLimspringboot.Utilities.Utils;

import com.paypal.api.payments.Amount;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payer;
import com.paypal.api.payments.PayerInfo;
import com.paypal.api.payments.Payment;
import com.paypal.api.payments.PaymentExecution;
import com.paypal.api.payments.RedirectUrls;
import com.paypal.api.payments.Transaction;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;

import jakarta.json.JsonObject;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class PaypalService {
	
	@Autowired
	private APIContext apiContext;
    @Autowired
    private MailService service;

    @Value("${paypal.client.id}")
	private String clientId;
	@Value("${paypal.client.secret}")
	private String clientSecret;
	@Value("${paypal.mode}")
	private String mode;
	
	
	public Map<String, Object> createPayment(String sum){
    Map<String, Object> response = new HashMap<String, Object>();
        Amount amount = new Amount();
        amount.setCurrency("USD");
        amount.setTotal(sum);
        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        List<Transaction> transactions = new ArrayList<Transaction>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod("paypal");

        Payment payment = new Payment();
        payment.setIntent("sale");
        payment.setPayer(payer);
        payment.setTransactions(transactions);

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl("https://rayson-lim-pokesmart-production.up.railway.app/");
        redirectUrls.setReturnUrl("https://rayson-lim-pokesmart-production.up.railway.app/");
        payment.setRedirectUrls(redirectUrls);
        Payment createdPayment;

    try {
        String redirectUrl = "";
        APIContext context = new APIContext(clientId, clientSecret, mode);
        
        createdPayment = payment.create(context);

        if(createdPayment!=null){
            List<Links> links = createdPayment.getLinks();
            for (Links link:links) {
                if(link.getRel().equals("approval_url")){
                    redirectUrl = link.getHref();
                    break;
                }
            }
            response.put("status", "success");
            response.put("redirect_url", redirectUrl);
        }
    } catch (PayPalRESTException e) {
        System.out.println("Error happened during payment creation!");
    }
    return response;
}

public Payment completePayment(String paymentId, String payerID){
    Map<String, Object> response = new HashMap<>();
    Payment payment = new Payment();
    payment.setId(paymentId);

    PaymentExecution paymentExecution = new PaymentExecution();
    paymentExecution.setPayerId(payerID);
    try {
        APIContext context = new APIContext(clientId, clientSecret, "sandbox");
        Payment createdPayment = payment.execute(context, paymentExecution);
        if(createdPayment!=null){
            response.put("status", "success");
            response.put("payment", createdPayment);
            JsonObject decryptedJson = MailService.decryptJson(createdPayment);

            //by right email will be sent to decryptedJson.getString("email") but for demonstration purposes will be sending to myself
            service.sendEmail("archangelgx@gmail.com", "Purchase Receipt", decryptedJson.getString("body"));

            return createdPayment;
        }
    } catch (PayPalRESTException e) {
        System.out.println("somewthing fucked up");
        System.err.println(e.getDetails());
    }
    return null;
}

}
