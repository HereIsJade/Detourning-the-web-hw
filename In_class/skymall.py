from selenium import webdriver
import time

driver=webdriver.Firefox()

url='https://skymall.com/collections/health-beauty'

driver.get(url)
products=driver.find_elements_by_css_selector('.products')
for product in products:
    title=products.find_element_by_css_selector('.product_title').text
    price=products.find_element_by_css_selector('.price-box').text
    print title, price
