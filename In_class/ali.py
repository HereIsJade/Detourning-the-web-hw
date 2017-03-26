from selenium import webdriver
import time

driver=webdriver.Firefox()


url='http://www.alibaba.com/trade/search?fsb=y&IndexArea=product_en&CatId=&SearchText=ssd'

def get_page():
    time.sleep(0.5)
    # titles=driver.find_elements_by_css_selector('h2.title')
    # for title in titles:
    #     print title.text

    items=driver.find_elements_by_css_selector('.m-product-item')
    for item in items:
        title=driver.find_element_by_css_selector('.title')
        try:
            price=driver.find_element_by_css_selector('.price')
        except:
            price='unknown'
        print title.text,price.text

    driver.find_element_by_css_selector('a.next').click()
    get_page()

driver.get(url)
get_page()
driver.quit()
