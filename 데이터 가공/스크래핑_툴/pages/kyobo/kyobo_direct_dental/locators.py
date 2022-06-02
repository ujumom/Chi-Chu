"""
Selenium이 브라우저에서 버튼을 클릭하려면
해당 버튼의 위치를 알아야 함.
이 위치(locator)를 알려주는 변수들을 모아놓음.

CSS ID외에도 CLASS_NAME이나, XPATH도 가능
혹은 CSS 선택자 방식으로도 위치 지정 가능
"""

from selenium.webdriver.common.by import By


BIRTHDAY_INPUT = (By.ID, 'plnnrBrdt')
MALE_BUTTON = (By.CSS_SELECTOR, 'div.form_calc > span:nth-of-type(1)')
FEMALE_BUTTON = (By.CSS_SELECTOR, 'div.form_calc > span:nth-of-type(2)')
CHECK_BUTTON = (By.ID, 'fastPayCalc')

TEN_YEAR_COVERAGE_BUTTON = (By.CSS_SELECTOR, 'a[href="#A01"]')
TWENTY_YEAR_COVERAGE_BUTTON = (By.CSS_SELECTOR, 'a[href="#A02"]')
PLAN_COST = (
    By.CSS_SELECTOR, 
    'div#mainGraph5 > div > div.bar_2 > div > strong'
)
