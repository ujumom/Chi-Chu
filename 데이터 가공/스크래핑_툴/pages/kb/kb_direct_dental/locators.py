from selenium.webdriver.common.by import By


BIRTHDAY_INPUT = (By.ID, 'usernum1')
MALE_BUTTON = (By.ID, 'man')
FEMALE_BUTTON = (By.ID, 'woman')
CHECK_BUTTON = (By.CSS_SELECTOR, 'a._btn_confirm')

JOB_INPUT = (By.XPATH, '//*[@id="ids_user2"]')
JOB_BIG = (By.ID, 'lrgcl_0')
JOB_MID = (By.ID, 'mdcl_0')
JOB_SM = (By.ID, 'smcl_0')
JOB_NAME = (By.ID, 'ocpt_0')
JOB_CHECK_BUTTON = (By.CSS_SELECTOR, 'button.pc_large_bottom_btn.enter')

# Cost button
COST_LOCATOR = (By.XPATH, '//*[@id="count1"]')
CHANGE_BUTTON = (By.XPATH, '//*[@id="ng-app"]/body/div[3]/div[3]/div/div[2]/div[2]/div[1]/div/div/div/div[1]/div[1]/ul[1]/li/div/button')
CHANGE_YES = (By.CSS_SELECTOR, 'div.ngdialog-content > div > div.btn_wrap.tac > a.btn.basic.yellow.ng-binding')

# 납입기간
FIFTEEN_DUE = (By.CSS_SELECTOR, 'ul.pc_urgent_top > li:nth-of-type(2) > a')
TWENTY_DUE = (By.CSS_SELECTOR, 'ul.pc_urgent_top > li:nth-of-type(3) > a')

# 납입기간 ALERT
ALERT_CHECK = (By.CSS_SELECTOR, 'div.btn_wrap.tac > a')

# plans
PREMIUM_PLAN = (By.XPATH, '(//span[contains(@class, "tot_bp")])[last()-2]')
STANDARD_PLAN = (By.XPATH, '(//span[contains(@class, "tot_bp")])[last()-1]')
FAST_PLAN = (By.XPATH, '(//span[contains(@class, "tot_bp")])[last()]')
# PAGE_IMG = (By.XPATH, '//img[@class="background"]')