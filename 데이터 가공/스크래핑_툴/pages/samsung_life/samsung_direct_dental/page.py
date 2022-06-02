"""
라이나 다이렉트 치아보험을 스크래핑하는 클래스.

scrape 부분은 공통이고, 각자 페이지에 따라
나머지 메서드들을 구현
"""

import csv
import time

from ...base.elements import DOWNLOAD_FOLDER
from ...base.exceptions import NotEligibleAgeError
from ...base.page import BasePage
from . import elements
from . import locators


class SamsungDirectDentalPage(BasePage):
    def __init__(self, driver, option: str):
        """
        인스턴스 생성 시 스크래핑 옵션 주기

        option
        - 'economical': 실속 보장형
        - 'standard': 기본 보장형
        - 'premium': 집중 보장형
        """
        super().__init__(driver)

        # 옵션에 따라 어느 CSS를 가져와야 할지 정함
        self.option = option
        if option == 'economical':
            self.plan_locator = locators.ECONOMICAL_PLAN_BUTTON
            self.cost_locator = locators.ECONOMICAL_PLAN_COST
        elif option == 'standard':
            self.plan_locator = locators.STANDARD_PLAN_BUTTON
            self.cost_locator = locators.STANDARD_PLAN_COST
        elif option == 'premium':
            self.plan_locator = locators.PREMIUM_PLAN_BUTTON
            self.cost_locator = locators.PREMIUM_PLAN_COST
        
    def scrape(self, input_pairs):
        # 해당 URL로 이동
        self.go_to_url(elements.URL)
        self.close_popup()

        ins_amount_500 = []
        ins_amount_1000 = []
        
        for age, birthdate, gender in input_pairs:
            try:
                # 가입자 연령과 성별 입력
                self.__input_info(birthdate, gender)
                # 연령이 가입 범위에 있는지 확인
                self.__check_eligibility(age)
                # 데이터를 수집
                data = self.__gather_data()
                # CSV 파일에 한 줄씩 기록
                ins_amount_500.append((age, gender, data[0]))
                ins_amount_1000.append((age, gender, data[1]))
            except NotEligibleAgeError as e:
                # 가입 범위에서 벗어난 경우 반복문 종료
                print(e)
                break
            except Exception as e:
                print(e)
                break
        
        self.__save_data(
            (500, ins_amount_500), 
            (1000, ins_amount_1000)
        )
        
    def __input_info(self, birthdate: str, gender: int):
        """
        생년월일과 성별 정보 입력
        - 각 보험마다 따로 구현 필요
        """
        if gender == '남':
            # 해당 버튼 찾기
            select_button = self.find(locators.MALE_BUTTON)
        elif gender == '여':
            select_button = self.find(locators.FEMALE_BUTTON)
        # 버튼 클릭
        select_button.click()

        # 생년월일 버튼 찾기
        birthday_input = self.find(locators.BIRTHDAY_INPUT)
        # 생년월일 버튼 안 텍스트 비우기
        birthday_input.clear()
        # 생년월일 버튼에 생년월일 입력
        birthday_input.send_keys(birthdate)
        
        # NOTE: 직업을 입력하는 경우 따로 구현 필요

    
    def __check_eligibility(self, age):
        """
        해당 연령으로 가입이 가능한지 확인.
        - 틀릴 경우 예외를 돌려준다.
        - 각 보험마다 따로 구현 필요.
        """
        try:
            # 라이나는 가입할 수 없는 경우 Alert 창이 뜸.
            # 그래서 일단 Alert 창이 있는지 확인
            alert = self.driver.switch_to.alert
        except:
            # Alert 창이 없으면 에러가 뜸.
            # 즉, 가입 가능한 경우는 에러 회피로 처리.
            
            # 보험료 확인 버튼 찾아 누르기
            check_button = self.find(locators.CHECK_BUTTON)
            if check_button:
                check_button.click()
        else:
            # 가입할 수 없으면 알림 창이 뜸.
            # 이 알림창의 '확인'을 눌러서 끄기
            alert.accept()
            # 오류를 전달
            raise NotEligibleAgeError('', age)
        
    def __gather_data(self):
        """
        가격이 있는 CSS 위치를 찾고, 
        데이터를 찾아서 반환.
        - .text 속성을 참조하면 텍스트만 가져올 수 있음.
        - 각 보험마다 따로 구현 필요.
        """
        time.sleep(3)
        self.wait_to_click(self.plan_locator)
        plan_select_button = self.find(self.plan_locator)
        plan_select_button.click()

        costs = []

        for locator in (locators.AMOUNT_INSURED_500, locators.AMOUNT_INSURED_1000):
            self.scroll_to_element(locators.SELECT_BOX)
            amount_select = self.find(locator)
            if not amount_select:
                costs.append(0)
                continue            
            amount_select.click()

            recalculate_button = self.find(locators.RECALCULATE_BUTTON)
            if recalculate_button.is_enabled():
                recalculate_button.click()
                time.sleep(2)
            
            self.scroll_to_element(self.cost_locator)
            cost = self.find(self.cost_locator).text
            # 쉼표를 제거하고 정수형으로 변환
            cost = int(cost.replace(',', ''))
            costs.append(cost)
        
        self.find(locators.CLOSE_BUTTON).click()
        self.wait_to_click(locators.CHANGE_INPUT_BUTTON)
        self.find(locators.CHANGE_INPUT_BUTTON).click()

        return costs

    def __save_data(self, *arr):
        # 다운로드 폴더 만들기
        download_folder = self.make_directory(DOWNLOAD_FOLDER)

        for amount, data in arr:
            # CSV 파일 생성
            file = open(
                f'{download_folder}/{__class__.__name__}_{self.option}_{amount}.csv', 
                mode='a', 
                newline='', 
                encoding='UTF8'
            )
            csv_writer = csv.writer(file)
            csv_writer.writerows(data)
            file.close()
