import os
import time
from typing import Tuple

from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException


class BasePage:       
    def __init__(self, driver: webdriver.Chrome):
        self.driver = driver
        self.wait = WebDriverWait(self.driver, 10)
        self.action = ActionChains(self.driver)
    
    def find(self, locator: Tuple[str, str]) -> WebElement:
        """
        원하는 Web Element를 찾습니다. 
        
        없으면 오류를 내는 대신에 None을 반환합니다.
        """
        # https://stackoverflow.com/questions/9567069/checking-if-element-exists-with-python-selenium
        try:
            element = self.driver.find_element(locator[0], locator[1])
        except NoSuchElementException as err:
            print(f'오류: 다음 요소를 찾을 수 없음 - {locator[1]}')
            return None
        return element
    
    def go_to_url(self, url: str):
        self.driver.get(url)
    
    def close_popup(self):
        # 모든 창이 전부 뜰 때까지 대기
        current_handles = self.driver.window_handles
        if len(current_handles) == 1:
            time.sleep(2)

        for handle in current_handles:
            # 첫 번째 창이 아닌 경우 
            if handle != current_handles[0]: 
                # 해당 창으로 옮겨간 후 창 닫기
                self.driver.switch_to.window(handle)
                self.driver.close()
        
        self.driver.switch_to.window(current_handles[0])

    def switch_window(self, target_title: str):
        # https://www.selenium.dev/documentation/webdriver/browser_manipulation/
        # window_handle은 브라우저 타이틀 X => 아래와 같은 고유 ID를 가짐
        # CDwindow-5B3C6A7CFB7405E93DF9899E9AF87311

        # Wait for the new window or tab
        self.wait.until(EC.number_of_windows_to_be(2))

        # Store the ID of the original window
        original_window = self.driver.current_window_handle

        # Loop through until we find a new window handle
        for window_handle in self.driver.window_handles:
            if window_handle != original_window:
                self.driver.switch_to.window(window_handle)

                # Wait for the new tab to finish loading content
                # self.wait.until(EC.title_is("SeleniumHQ Browser Automation"))
                
                # 추가: 원하는 페이지 타이틀이 포함되어 있나 확인
                if target_title in self.driver.title:
                    return

        print('No such title:', target_title)

    def wait_to_change(self, prev_value, locator):
        """
        이전 값과 달라질 때까지 기다립니다.
        1. 먼저 이전 값을 변수에 담아둡니다.
        2. 그 후 이 메서드에 이전 값과, 
        값이 변경되는 위치의 locator를 넣어줍니다.
        3. 값이 변경될 때까지 대기합니다.
        """
        for i in range(1, 4):
            time.sleep(i)
            # 새로운 값을 받아옴
            new_value = self.find(locator)
            # 새로운 값이 있고, 공백이 아니고, 이전 값과 다르면
            if (
                new_value and 
                new_value.text and 
                new_value.text != prev_value
            ):
                # 반환
                return True

    def scroll_to_element(self, locator):
        """
        해당 요소가 있는 곳까지 스크롤을 움직입니다.
        """
        element = self.find(locator)
        # 요소가 있을 때만
        if element:
            try:
                # 해당 요소까지 이동
                self.action.move_to_element(element).perform()
            except:
                # 이미 화면 내에 있는 경우, 패스
                return

    def wait_to_see(self, locator):
        self.wait.until(EC.presence_of_element_located(locator))

    def wait_to_click(self, locator):
        for i in range(1, 4):
            time.sleep(i)
            element = self.find(locator)
            if element:
                break

    def make_directory(self, dir_path):
        # 폴더가 이미 있으면 오류, 없으면 새로 만들기
        try:
            if not os.path.exists(dir_path):
                os.makedirs(dir_path)
        except OSError as e:
            print(e)

        return dir_path
