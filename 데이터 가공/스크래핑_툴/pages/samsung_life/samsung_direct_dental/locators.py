"""
Selenium이 브라우저에서 버튼을 클릭하려면
해당 버튼의 위치를 알아야 함.
이 위치(locator)를 알려주는 변수들을 모아놓음.

CSS ID외에도 CLASS_NAME이나, XPATH도 가능
혹은 CSS 선택자 방식으로도 위치 지정 가능
"""

from selenium.webdriver.common.by import By


BIRTHDAY_INPUT = (By.ID, 'birthday')
MALE_BUTTON = (By.CSS_SELECTOR, 'label[for="gender1"]')
FEMALE_BUTTON = (By.CSS_SELECTOR, 'label[for="gender2"]')
CHECK_BUTTON = (By.ID, 'calculate')
CHANGE_INPUT_BUTTON = (By.XPATH, '//a[@class="link-t2"]')

ECONOMICAL_PLAN_BUTTON = (By.ID, 'result1')
STANDARD_PLAN_BUTTON = (By.ID, 'result2')
PREMIUM_PLAN_BUTTON = (By.ID, 'result3')

SELECT_BOX = (By.ID, 'contAmt')
AMOUNT_INSURED_500 = (By.XPATH, '//select[@id="contAmt"]/option[@value="5000000"]')
AMOUNT_INSURED_1000 = (By.XPATH, '//select[@id="contAmt"]/option[@value="10000000"]')
RECALCULATE_BUTTON = (By.ID, 'reCalc')

ECONOMICAL_PLAN_COST = (By.ID, 'premium1')
STANDARD_PLAN_COST = (By.ID, 'premium2')
PREMIUM_PLAN_COST = (By.ID, 'premium3')

CLOSE_BUTTON = (By.CSS_SELECTOR, 'button[onclick="confirmClose();"]')
