from selenium.webdriver.common.by import By


BIRTHDAY_INPUT = (By.ID, 'birthS-input')
MALE_BUTTON = (By.XPATH, '//*[@id="gender-radio"]/label[1]')
FEMALE_BUTTON = (By.XPATH, '//*[@id="gender-radio"]/label[2]')
CHECK_BUTTON = (By.ID, 'btn-next-step')

JOB_BUTTON = (By.ID, 'job-button')
# JOB_INPUT = (By.CSS_SELECTOR, 'div.ne-box-search > input.sjob-search-text')
# JOB_SELECT = (By.CSS_SELECTOR, 'li.checked > button')
JOB_B = (By.CSS_SELECTOR, 'ul.nav-tabs > li:nth-of-type(2)')
JOB_SELECT1 = (By.CSS_SELECTOR, 'div.step1 > div.slimScrollDiv > div.sfd-scrollbox > ul > li:nth-of-type(1)')
JOB_SELECT2 = (By.CSS_SELECTOR, 'div.step2 > div.slimScrollDiv > div.sfd-scrollbox > ul > li:nth-of-type(1)')
JOB_SELECT3 = (By.CSS_SELECTOR, 'div.step3 > div.slimScrollDiv > div.sfd-scrollbox > ul > li:nth-of-type(1)')
JOB_SELECT4 = (By.CSS_SELECTOR, 'div.step4 > div.slimScrollDiv > div.sfd-scrollbox > ul > li:nth-of-type(3)')
JOB_AGREE = (By.CLASS_NAME, 'btn-checkbox')
JOB_CHECK = (By.CSS_SELECTOR, 'div.modal-footer > button.float-right')

EVENT_CLOSE = (By.ID, 'btn-confirm')

SIMPLE_SELECT = (By.CLASS_NAME, 'plan1')
STANDARD_SELECT = (By.CLASS_NAME, 'plan2')
PREMIUM_SELECT = (By.CLASS_NAME, 'plan3')

# STANDARD_PLAN_COST = (By.CSS_SELECTOR, 'td.inNum:nth-of-type(1) > strong')
# PREMIUM_PLAN_COST = (By.CSS_SELECTOR, 'td.inNum:nth-of-type(2) > strong')
SIMPLE_PLAN_COST = (By.CSS_SELECTOR, 'div.n1 > div.sum > strong')
STANDARD_PLAN_COST = (By.XPATH, '//*[@id="total-current"]/strong')
PREMIUM_PLAN_COST = (By.CSS_SELECTOR, 'div.n3 > div.sum > strong')
# PAGE_IMG = (By.XPATH, '//img[@class="background"]')

BACK = (By.XPATH, '//*[@id="btn-prev-step"]')

# 10년
TEN = (By.XPATH, '//*[@id="insured-term"]/label[1]')
FIFTEEN = (By.XPATH, '//*[@id="insured-term"]/label[2]')
TWENTY = (By.XPATH, '//*[@id="insured-term"]/label[3]')