"""
Unit tests for validator functions
"""
import unittest
from validators import (
    validate_email,
    validate_price,
    validate_rating,
    validate_phone_number
)


class TestValidators(unittest.TestCase):
    """Test cases for validation functions"""
    
    def test_validate_email_valid(self):
        """Test valid email formats"""
        valid_emails = [
            'user@example.com',
            'test.user@domain.co.ke',
            'admin123@restaurant.io'
        ]
        for email in valid_emails:
            self.assertTrue(validate_email(email), f'{email} should be valid')
    
    def test_validate_email_invalid(self):
        """Test invalid email formats"""
        invalid_emails = [
            'notanemail',
            '@example.com',
            'user@',
            'user @example.com',
            ''
        ]
        for email in invalid_emails:
            self.assertFalse(validate_email(email), f'{email} should be invalid')
    
    def test_validate_price_valid(self):
        """Test valid prices"""
        valid_prices = [10.99, 5, 100.50, 0.01]
        for price in valid_prices:
            self.assertTrue(validate_price(price), f'{price} should be valid')
    
    def test_validate_price_invalid(self):
        """Test invalid prices"""
        invalid_prices = [0, -5, -10.99, 'abc', None]
        for price in invalid_prices:
            self.assertFalse(validate_price(price), f'{price} should be invalid')
    
    def test_validate_rating_valid(self):
        """Test valid ratings"""
        valid_ratings = [1, 2, 3, 4, 5]
        for rating in valid_ratings:
            self.assertTrue(validate_rating(rating), f'{rating} should be valid')
    
    def test_validate_rating_invalid(self):
        """Test invalid ratings"""
        invalid_ratings = [0, 6, -1, 10, 'five', None]
        for rating in invalid_ratings:
            self.assertFalse(validate_rating(rating), f'{rating} should be invalid')
    
    def test_validate_phone_number_valid(self):
        """Test valid Kenyan phone numbers"""
        valid_phones = [
            '0712345678',
            '0723456789',
            '+254712345678',
            '254712345678',
            '0112345678'
        ]
        for phone in valid_phones:
            self.assertTrue(
                validate_phone_number(phone),
                f'{phone} should be valid'
            )
    
    def test_validate_phone_number_invalid(self):
        """Test invalid phone numbers"""
        invalid_phones = [
            '123456',
            '07123',
            '0812345678',  # Wrong prefix
            '+255712345678',  # Wrong country code
            'abcdefghij',
            ''
        ]
        for phone in invalid_phones:
            self.assertFalse(
                validate_phone_number(phone),
                f'{phone} should be invalid'
            )


if __name__ == '__main__':
    unittest.main()
