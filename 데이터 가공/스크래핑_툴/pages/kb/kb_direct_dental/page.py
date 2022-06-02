import csv
import time

from ...base.elements import DOWNLOAD_FOLDER
from ...base.exceptions import NotEligibleAgeError
from ...base.page import BasePage
from . import elements
from . import locators

# cost_locator을 9개로 나누어서 값을 넣어줘야 한다.
# 이후 CSV를 정리하는 방법으로.

class KBDirectDentalPage(BasePage):
    def __init__(self, driver, year):
        """
        option
        - 'standard': 표준 보장형
        - 'premium': 고급 보장형
        - 'fast': 실속 보장형
        """
        super().__init__(driver)

        self.year = year
        if year == 15:
            self.year_select_button = locators.FIFTEEN_DUE
        elif year == 20:
            self.year_select_button = locators.TWENTY_DUE


    def scrape(self, input_pairs, ):
        self.go_to_url(elements.URL)

        download_folder = self.make_directory(DOWNLOAD_FOLDER)

        fast_info = []
        standard_info = []
        premium_info = []

        
        for age, birthdate, gender in input_pairs:
            self.wait_to_click(locators.JOB_INPUT)
            job_input = self.find(locators.JOB_INPUT)
            
            self.__input_info(birthdate, gender)

            if job_input == None:
                self.__input_job()

            try:
                self.__check_eligibility(age)
                costs = self.__gather_data(gender)

                premium_info.append([age, gender, costs[0]])
                standard_info.append([age, gender, costs[1]])
                fast_info.append([age, gender, costs[2]])

            except NotEligibleAgeError as e:
                print(e)
                break
            except Exception as e:
                print(e)
        
        
        for i in range(3):
            file = open(
                f'{download_folder}/{__class__.__name__}_{self.year}_{i}.csv', 
                'w', 
                newline='',
                encoding='UTF8'
            )
            csv_writer = csv.writer(file)

            if i == 0:
                csv_writer.writerows(premium_info)
            elif i == 1:
                csv_writer.writerows(standard_info)
            elif i == 2:
                csv_writer.writerows(fast_info)

            file.close()

    def __input_info(self, birthdate: str, gender: int):
        """
        생년월일과 성별 정보 입력
        - 각 보험마다 따로 구현 필요
        """
        if gender == '남':
            self.wait_to_click(locators.MALE_BUTTON)
            select_button = self.find(locators.MALE_BUTTON)
            
            self.wait_to_click(locators.BIRTHDAY_INPUT)
            birthday_input = self.find(locators.BIRTHDAY_INPUT)
            birthday_input.clear()
            time.sleep(2)
            birthday_input.send_keys(birthdate)
            time.sleep(2)
        elif gender == '여':
            self.wait_to_click(locators.FEMALE_BUTTON)
            select_button = self.find(locators.FEMALE_BUTTON)
        select_button.click()
        
        check_button = self.find(locators.CHECK_BUTTON)
        check_button.click()

    def __input_job(self):
        # 직업 대분류>중분류>소분류를 입력
        self.wait_to_click(locators.JOB_BIG)
        job_big = self.find(locators.JOB_BIG)
        job_big.click()

        self.wait_to_click(locators.JOB_MID)
        job_mid = self.find(locators.JOB_MID)
        job_mid.click()

        self.wait_to_click(locators.JOB_SM)
        job_sm = self.find(locators.JOB_SM)
        job_sm.click()

        self.wait_to_click(locators.JOB_NAME)
        job_name = self.find(locators.JOB_NAME)
        job_name.click()

        self.wait_to_click(locators.JOB_CHECK_BUTTON)
        job_check_button = self.find(locators.JOB_CHECK_BUTTON)
        job_check_button.click()

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
        
    def __gather_data(self, gender):
        """
        데이터를 찾아서 반환.
        - 각 보험마다 따로 구현 필요.
        """
        
        # 10년, 15년, 20년
            
        # 알림창 끄기
        #1. 표준형
        #2. 고급형
        #3. 실속형

        # 납입기간 15년 change
        # 납입기간 20년 change


        if self.year != 10:
            # 15년이나 20년 버튼을 클릭
            self.wait_to_click(self.year_select_button)
            year_button = self.find(self.year_select_button)
            # 해당 기간이 아예 없는 경우, 0원들을 반환
            if year_button:
                year_button.click()

                time.sleep(2)
                alert_button = self.find(locators.ALERT_CHECK)
                alert_button.click()

        if not year_button:
            costs = [0] * 3
        else:
            costs = []

            cost_locators = (
                locators.PREMIUM_PLAN,
                locators.STANDARD_PLAN, 
                locators.FAST_PLAN, 
            )

            time.sleep(5)
            for locator in cost_locators:

                self.wait_to_click(locator)
                cost = self.find(locator)
                # 고급형이 없는 경우 있음
                # -> 데이터가 없으면 0으로
                if cost == None:
                    cost = 0
                else:
                    cost = int(cost.text.replace(',', '').replace('원', ''))
                costs.append(cost)

        self.wait_to_click(locators.CHANGE_BUTTON)
        change_button = self.find(locators.CHANGE_BUTTON)
        change_button.click()

        self.wait_to_click(locators.CHANGE_YES)
        change_yes = self.find(locators.CHANGE_YES)
        change_yes.click()

        return costs