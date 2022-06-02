import csv
import time

from ..base.elements import DOWNLOAD_FOLDER
from ..base.exceptions import NotEligibleAgeError
from ..base.page import BasePage
from . import elements
from . import locators
# from drivers.helper import get_driver
# from user_settings import BROWSER


class SamsungFireDirectDentalPage(BasePage):
    def __init__(self, driver, option: str):
        """
        option
        - 'standard': 기본 보장형
        - 'premium': 집중 보장형
        """
        super().__init__(driver)
        if option == 'simple':
            self.cost_locator = locators.SIMPLE_PLAN_COST
        elif option == 'standard':
            self.cost_locator = locators.STANDARD_PLAN_COST
        else:
            self.cost_locator = locators.PREMIUM_PLAN_COST

    def scrape(self, input_pairs, option):
        self.go_to_url(elements.URL)

        download_folder = self.make_directory(DOWNLOAD_FOLDER)

        file = open(f'{download_folder}/{__class__.__name__}.csv', 'w', newline='')
        csv_writer = csv.writer(file)
        
        for age, birthdate, gender in input_pairs:
            self.__input_info(birthdate, gender, option)
            time.sleep(2)

            try:
                self.__check_eligibility(age)
                cost = self.__gather_data()
                csv_writer.writerow([age, gender, cost])
            
                self.wait_to_click(locators.BACK)
                back = self.find(locators.BACK)
                back.click()
            except NotEligibleAgeError as e:
                print(e)
                break
            except Exception as e:
                print(e)

        file.close()

    def __input_info(self, birthdate: str, gender: int, option):
        """
        생년월일과 성별 정보 입력
        - 각 보험마다 따로 구현 필요
        """
        time.sleep(2)
        birthday_input = self.find(locators.BIRTHDAY_INPUT)
        birthday_input.clear()
        birthday_input.send_keys(birthdate)
        time.sleep(3)
        if gender == '남':
            self.wait_to_click(locators.MALE_BUTTON)
            time.sleep(1)
            select_button = self.find(locators.MALE_BUTTON)
        elif gender == '여':
            self.wait_to_click(locators.FEMALE_BUTTON)
            select_button = self.find(locators.FEMALE_BUTTON)
        
        time.sleep(3)
        select_button.click()
        
        # 직업정보입력
        # 1. 직업찾기
        # self.wait_to_click(locators.JOB_BUTTON) # 버튼을 클릭할 수 있는 지 대기
        time.sleep(1)
        job_botton = self.find(locators.JOB_BUTTON)
        job_botton.click()
        # 2. 직업분류로 찾기
        # self.wait_to_click(locators.JOB_B)
        time.sleep(1)
        job_b = self.find(locators.JOB_B)
        job_b.click()
        # 3. 대분류
        # self.wait_to_click(locators.JOB_SELECT1)
        time.sleep(1)
        job_select1 = self.find(locators.JOB_SELECT1)
        job_select1.click()
        # 3. 중분류
        # self.wait_to_click(locators.JOB_SELECT2)
        time.sleep(1)
        job_select2 = self.find(locators.JOB_SELECT2)
        job_select2.click()
        # 3. 소분류
        # self.wait_to_click(locators.JOB_SELECT3)
        time.sleep(1)
        job_select3 = self.find(locators.JOB_SELECT3)
        job_select3.click()
        # 3. 직업명
        # self.wait_to_click(locators.JOB_SELECT4)
        time.sleep(1)
        job_select4 = self.find(locators.JOB_SELECT4)
        job_select4.click()
        # 4. 동의 체크
        # self.wait_to_click(locators.JOB_AGREE)
        time.sleep(1)
        job_agree = self.find(locators.JOB_AGREE)
        job_agree.click()
        # 5. 확인
        # self.wait_to_click(locators.JOB_CHECK)
        time.sleep(1)
        job_check = self.find(locators.JOB_CHECK)
        job_check.click()

        time.sleep(2)
        check_button = self.find(locators.CHECK_BUTTON)
        check_button.click()

        # 이벤트 팝업 닫기
        # self.wait_to_click(locators.EVENT_CLOSE)
        time.sleep(5)
        event_close = self.find(locators.EVENT_CLOSE)
        event_close.click()

        # 10년
        time.sleep(2)
        self.wait_to_click(locators.TWENTY)
        time.sleep(2)
        ten = self.find(locators.TWENTY)
        ten.click()
        time.sleep(3)
        # 실손, 고급 체크
        if option == 'simple':
            self.wait_to_click(locators.SIMPLE_SELECT)
            time.sleep(4)
            simple_select = self.find(locators.SIMPLE_SELECT)
            simple_select.click()

        if option == 'premium':
            self.wait_to_click(locators.PREMIUM_SELECT)
            time.sleep(4)
            premium_select = self.find(locators.PREMIUM_SELECT)
            premium_select.click()
        time.sleep(4)
    def __check_eligibility(self, age):
        """
        해당 연령으로 가입이 가능한지 확인.
        - 틀릴 경우 예외를 돌려준다.
        - 각 보험마다 따로 구현 필요.
        """
        try:
            alert = self.driver.switch_to.alert
        except:
            return
        else:
            alert.accept()
            raise NotEligibleAgeError('', age)
        
    def __gather_data(self):
        """
        데이터를 찾아서 반환.
        - 각 보험마다 따로 구현 필요.
        """
        time.sleep(2)
        print(self.cost_locator)
        cost = self.find(self.cost_locator).text[:-1]
        print(cost)
        data = int(cost.replace(',', ''))
        print(data)
        time.sleep(3)
        return data
