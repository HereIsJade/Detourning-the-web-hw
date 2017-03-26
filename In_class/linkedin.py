from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import os
import time
import sys

chromedriver = "/Users/Jade/Desktop/python/Detourning in-class/chromedriver"
os.environ["webdriver.chrome.driver"] = chromedriver
driver = webdriver.Chrome(chromedriver)

driver.get('https://www.linkedin.com/uas/login')

login=driver.find_element_by_id('session_key-login')
login.send_keys('lavigne@saaaam.com')
password=driver.find_element_by_id('session_password-login')
password.send_keys('rudyrudy')
password.send_keys(Keys.RETURN)

time.sleep(3)

search_item="police"

url='https://www.linkedin.com/search/results/people/?keywords'+search_item

driver.get(url)
time.sleep(6)
buttons=driver.find_elements_by_css_selector('.search-result--person button')
buttons[0].click()
time.sleep(3)
send_button=driver.find_elements_by_css_selector('.send-invite__actions button')[-1]
send_button.click()
