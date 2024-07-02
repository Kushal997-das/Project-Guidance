import time

from selenium import webdriver
from selenium.webdriver.common.by import By

chrome_option = webdriver.ChromeOptions()
chrome_option.add_experimental_option('detach', True)

driver = webdriver.Chrome(options=chrome_option)
driver.get("https://orteil.dashnet.org/experiments/cookie/")

cookie_button = driver.find_element(By.ID, value='cookie')
store = driver.find_elements(By.CSS_SELECTOR, value="#store div b")

end_time = time.time() + 5 * 60

while time.time() < end_time:
    money = int(driver.find_element(By.ID, value='money').text)

    time_machine = driver.find_element(By.CSS_SELECTOR, value="div[id='buyAlchemy lab'] b")
    portal = driver.find_element(By.CSS_SELECTOR, value="div #buyPortal b")
    alchemy = driver.find_element(By.CSS_SELECTOR, value="div[id='buyAlchemy lab'] b")
    shipment = driver.find_element(By.CSS_SELECTOR, value="div #buyShipment b")
    mine = driver.find_element(By.CSS_SELECTOR, value="div #buyMine b")
    factory = driver.find_element(By.CSS_SELECTOR, value="div #buyFactory b")
    grandma = driver.find_element(By.CSS_SELECTOR, value="div #buyGrandma b")
    cursor = driver.find_element(By.CSS_SELECTOR, value="div #buyCursor b")

    time_machine_amount = int(time_machine.text.split()[-1].replace(",", ""))
    portal_amount = int(portal.text.split()[-1].replace(",", ""))
    alchemy_amount = int(alchemy.text.split()[-1].replace(",", ""))
    shipment_amount = int(shipment.text.split()[-1].replace(",", ""))
    mine_amount = int(mine.text.split()[-1].replace(",", ""))
    factory_amount = int(factory.text.split()[-1].replace(",", ""))
    grandma_amount = int(grandma.text.split()[-1].replace(",", ""))
    cursor_amount = int(cursor.text.split()[-1].replace(",", ""))

    if money >= time_machine_amount:
        time_machine.click()
        time.sleep(0.1)
    elif money >= portal_amount:
        portal.click()
        time.sleep(0.1)
    elif money >= alchemy_amount:
        alchemy.click()
        time.sleep(0.1)
    elif money >= shipment_amount:
        shipment.click()
        time.sleep(0.1)
    elif money >= mine_amount:
        mine.click()
        time.sleep(0.1)
    elif money >= factory_amount:
        factory.click()
        time.sleep(0.1)
    elif money >= grandma_amount:
        grandma.click()
        time.sleep(0.1)
    elif money >= cursor_amount:
        cursor.click()
        time.sleep(0.1)

    cookie_button.click()

print("one minute finished")
