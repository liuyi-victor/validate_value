import os
import urllib.request
import json
import unittest

'''
Loaded data:
    brand:"SBUX", value: [5,10,15,20,50], 
    brand:"FMSA", value: [15, 50, 100, 250, 500],
    brand:"AMZN", value: {minimum: 10, maximum: 200},
    brand:"AAPL", value: {minimum: 25, maximum: 300},
    brand:"EBAY", value: [25,50,100,200]
'''
class TestRangeValues(unittest.TestCase):
    def test_amazon_valid1(self):
        contents = urllib.request.urlopen("http://127.0.0.1:3000/brand/AMZN/100").read()
        data = json.loads(contents.decode("utf-8"))
        self.assertTrue(data['result'])
    def test_amazon_valid2(self):
        contents = urllib.request.urlopen("http://127.0.0.1:3000/brand/AMZN/200").read()
        data = json.loads(contents.decode("utf-8"))
        self.assertTrue(data['result'])
    def test_amazon_invalid(self):
        contents = urllib.request.urlopen("http://127.0.0.1:3000/brand/AMZN/500").read()
        data = json.loads(contents.decode("utf-8"))
        self.assertFalse(data['result'])
    def test_apple_valid1(self):
        contents = urllib.request.urlopen("http://127.0.0.1:3000/brand/AAPL/100").read()
        data = json.loads(contents.decode("utf-8"))
        self.assertTrue(data['result'])
    def test_apple_valid1(self):
        contents = urllib.request.urlopen("http://127.0.0.1:3000/brand/AAPL/25").read()
        data = json.loads(contents.decode("utf-8"))
        self.assertTrue(data['result'])
    def test_apple_invalid(self):
        contents = urllib.request.urlopen("http://127.0.0.1:3000/brand/AAPL/500").read()
        data = json.loads(contents.decode("utf-8"))
        self.assertFalse(data['result'])
    
class TestDiscreteValues(unittest.TestCase):
    def test_ebay_valid1(self):
        contents = urllib.request.urlopen("http://127.0.0.1:3000/brand/EBAY/100").read()
        data = json.loads(contents.decode("utf-8"))
        self.assertTrue(data['result'])
    def test_ebay_valid2(self):
        contents = urllib.request.urlopen("http://127.0.0.1:3000/brand/EBAY/50").read()
        data = json.loads(contents.decode("utf-8"))
        self.assertTrue(data['result'])
    def test_ebay_invalid(self):
        contents = urllib.request.urlopen("http://127.0.0.1:3000/brand/EBAY/70").read()
        data = json.loads(contents.decode("utf-8"))
        self.assertFalse(data['result'])
    def test_starbucks_valid1(self):
        contents = urllib.request.urlopen("http://127.0.0.1:3000/brand/SBUX/50").read()
        data = json.loads(contents.decode("utf-8"))
        self.assertTrue(data['result'])
    def test_starbucks_valid2(self):
        contents = urllib.request.urlopen("http://127.0.0.1:3000/brand/SBUX/15").read()
        data = json.loads(contents.decode("utf-8"))
        self.assertTrue(data['result'])
    def test_starbucks_invalid(self):
        contents = urllib.request.urlopen("http://127.0.0.1:3000/brand/SBUX/30").read()
        data = json.loads(contents.decode("utf-8"))
        self.assertFalse(data['result'])
    
class TestInvalidBrands(unittest.TestCase):
    def test_invalid_brand(self):
        contents = urllib.request.urlopen("http://127.0.0.1:3000/brand/AMNZ/30").read()
        data = json.loads(contents.decode("utf-8"))
        self.assertFalse(data['result'])
        
    
if __name__ == '__main__':
    unittest.main()
