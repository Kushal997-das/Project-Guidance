from selenium import webdriver
from selenium.webdriver.common.keys import Keys
mail="Automated"
# Get URL for aol
url = 'https://accounts.google.com'

# Open Chrome browser
browser = webdriver.Firefox()
browser.get(url)

# Login email Id
loginElem = browser.find_element_by_css_selector("#identifierId")
loginElem.send_keys("<sender email address>")

# Click Next
submitElem = browser.find_element_by_css_selector(".VfPpkd-RLmnJb")
submitElem.click()

# Login Password
passElem = browser.find_element_by_css_selector("#password > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > input:nth-child(1)")
passElem.send_keys("<password>")

# Click Next
submit=browser.find_element_by_css_selector(".VfPpkd-LgbsSe-OWXEXe-k8QpJ > div:nth-child(3)")
submit.click()

# Receiver's ID
sendto = browser.find_element_by_css_selector("#\\:qf")
sendto.send_keys("<receiver's email address>")

# Compose Mail
body = browser.find_element_by_css_selector("#\\:r2")
body.send_keys(mail)

#Send
hit = browser.find_element_by_css_selector("#\\:pn")
hit.click()