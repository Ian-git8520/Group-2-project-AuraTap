"""
Helper utilities for M-Pesa payment integration
"""
import base64
import requests
from datetime import datetime


class MpesaHelper:
    """Helper class for M-Pesa payment processing"""
    
    def __init__(self, consumer_key, consumer_secret, shortcode, passkey):
        self.consumer_key = consumer_key
        self.consumer_secret = consumer_secret
        self.shortcode = shortcode
        self.passkey = passkey
        self.access_token = None
    
    def get_access_token(self):
        """Get OAuth access token from M-Pesa API"""
        api_url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
        
        try:
            response = requests.get(
                api_url,
                auth=(self.consumer_key, self.consumer_secret)
            )
            self.access_token = response.json()['access_token']
            return self.access_token
        except Exception as e:
            raise Exception(f"Failed to get access token: {str(e)}")
    
    def generate_password(self):
        """Generate password for STK push"""
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        data_to_encode = self.shortcode + self.passkey + timestamp
        encoded = base64.b64encode(data_to_encode.encode())
        return encoded.decode('utf-8'), timestamp
    
    def stk_push(self, phone_number, amount, account_reference, transaction_desc):
        """
        Initiate STK push payment
        
        Args:
            phone_number: Customer phone number (254XXXXXXXXX)
            amount: Amount to charge
            account_reference: Order ID or reference
            transaction_desc: Description of transaction
        
        Returns:
            dict: M-Pesa API response
        """
        if not self.access_token:
            self.get_access_token()
        
        password, timestamp = self.generate_password()
        
        api_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
        
        headers = {
            "Authorization": f"Bearer {self.access_token}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "BusinessShortCode": self.shortcode,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": int(amount),
            "PartyA": phone_number,
            "PartyB": self.shortcode,
            "PhoneNumber": phone_number,
            "CallBackURL": "https://yourdomain.com/api/mpesa/callback",
            "AccountReference": account_reference,
            "TransactionDesc": transaction_desc
        }
        
        try:
            response = requests.post(api_url, json=payload, headers=headers)
            return response.json()
        except Exception as e:
            raise Exception(f"STK Push failed: {str(e)}")
    
    def query_transaction(self, checkout_request_id):
        """
        Query status of STK push transaction
        
        Args:
            checkout_request_id: CheckoutRequestID from STK push
        
        Returns:
            dict: Transaction status
        """
        if not self.access_token:
            self.get_access_token()
        
        password, timestamp = self.generate_password()
        
        api_url = "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query"
        
        headers = {
            "Authorization": f"Bearer {self.access_token}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "BusinessShortCode": self.shortcode,
            "Password": password,
            "Timestamp": timestamp,
            "CheckoutRequestID": checkout_request_id
        }
        
        try:
            response = requests.post(api_url, json=payload, headers=headers)
            return response.json()
        except Exception as e:
            raise Exception(f"Transaction query failed: {str(e)}")
