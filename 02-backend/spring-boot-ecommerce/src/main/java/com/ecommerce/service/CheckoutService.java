package com.ecommerce.service;

import com.ecommerce.dto.PaymentInfo;
import com.ecommerce.dto.Purchase;
import com.ecommerce.dto.PurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface CheckoutService {
	
	public PurchaseResponse placeOrder(Purchase purchase);
	
	public PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;

}
