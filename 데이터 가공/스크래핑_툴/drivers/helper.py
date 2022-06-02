from enum import Enum, auto
from pathlib import Path
from selenium import webdriver


class Browser(Enum):
    CHROME = auto()
    FIREFOX = auto()


def get_driver(BROWSER):
    """
    user_settings에 적힌 브라우저 종류에 맞는 웹 드라이버를 실행합니다.
    """
    # Chrome
    if BROWSER == Browser.CHROME:
        options = webdriver.ChromeOptions()
        options.add_argument(
            '--no-first-run --no-service-autorun --password-store=basic'
        )
        driver_path = f'{Path(__file__).parent}/chromedriver.exe'  # 드라이버 경로 설정
        driver = webdriver.Chrome(executable_path=driver_path, options=options)

    # Firefox
    elif BROWSER == Browser.FIREFOX:
        driver_path = f'{Path(__file__).parent}/geckodriver.exe'  # 드라이버 경로 설정
        driver = webdriver.Firefox(executable_path=driver_path)

    return driver
