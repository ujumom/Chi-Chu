"""
Selenium이 브라우저에서 버튼을 클릭하려면
해당 버튼의 위치를 알아야 함.
이 위치(locator)를 알려주는 변수들을 모아놓음.

CSS ID외에도 CLASS_NAME이나, XPATH도 가능
혹은 CSS 선택자 방식으로도 위치 지정 가능
"""

from selenium.webdriver.common.by import By


BIRTHDAY_INPUT = (By.ID, 'birthday')
MALE_BUTTON = (
    By.CSS_SELECTOR, 
    'div.ip_info > div.g_btn_sel_n > a:nth-of-type(1)'
)
FEMALE_BUTTON = (
    By.CSS_SELECTOR, 
    'div.ip_info > div.g_btn_sel_n > a:nth-of-type(2)'
)
CHECK_BUTTON = (By.ID, 'btnD01')

# STANDARD_PLAN_COST = (By.CSS_SELECTOR, 'td.inNum:nth-of-type(1) > strong')
# PREMIUM_PLAN_COST = (By.CSS_SELECTOR, 'td.inNum:nth-of-type(2) > strong')
# PAGE_IMG = (By.XPATH, '//img[@class="background"]')
