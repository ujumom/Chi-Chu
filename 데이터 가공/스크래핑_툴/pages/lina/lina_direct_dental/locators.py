"""
Selenium이 브라우저에서 버튼을 클릭하려면
해당 버튼의 위치를 알아야 함.
이 위치(locator)를 알려주는 변수들을 모아놓음.

CSS ID외에도 CLASS_NAME이나, XPATH도 가능
혹은 CSS 선택자 방식으로도 위치 지정 가능
"""

from selenium.webdriver.common.by import By


BIRTHDAY_INPUT = (By.ID, 'birthday')
MALE_BUTTON = (By.ID, 'main_btn_male')
FEMALE_BUTTON = (By.ID, 'main_btn_female')
CHECK_BUTTON = (By.ID, 'btn_direct_dental_cal')

STANDARD_PLAN_COST = (By.CSS_SELECTOR, 'td.inNum:nth-of-type(1) > strong')
PREMIUM_PLAN_COST = (By.CSS_SELECTOR, 'td.inNum:nth-of-type(2) > strong')
# PAGE_IMG = (By.XPATH, '//img[@class="background"]')
