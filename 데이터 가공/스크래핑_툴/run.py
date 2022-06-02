"""
스크래핑을 실행시키는 파일.
Selenium 패키지가 필요하므로,
쉘에서 pip install selenium 입력.
"""

import time

from drivers.helper import get_driver
from pages.lina.lina_direct_dental.page import LinaDirectDentalPage
from pages.kb.kb_direct_dental.page import KBDirectDentalPage
from pages.kyobo.kyobo_direct_dental.page import KyoboDirectDentalPage
<<<<<<< Updated upstream
from pages.samsung_life.samsung_direct_dental.page import SamsungDirectDentalPage
=======
from pages.samsung_fire.page import SamsungFireDirectDentalPage
>>>>>>> Stashed changes
from user_settings import BROWSER
from utils.timer import Timer


def main():
    # 사용하는 브라우저에 맞춰 드라이버 실행
    driver = get_driver(BROWSER)  

    # 대상 연령대 (20세부터 80세까지)
    age_list = list(range(20, 81, 5))
    
    # 연령, 생년, 성별로 이루어진 리스트 반환
    # yymmdd는 6자리, YYYYmmdd는 8자리 생년월일
    input_pairs_yymmdd = Timer().get_birth_gender_pairs(
        age_list,
        date_format=r'%y%m%d'
    )
    input_pairs_YYYYmmdd = Timer().get_birth_gender_pairs(
        age_list,
        date_format=r'%Y%m%d'
    )

    # 원하는 보험 페이지에 맞춰 클래스 작성하기.
    # 스크래핑이 끝났으면 주석 처리로 실행 막기.

    # 라이나 다이렉트 치아보험 (기본형)
    # LinaDirectDentalPage(driver, 'standard').scrape(input_pairs_yymmdd)

    # 라이나 다이렉트 치아보험 (집중보장형)
    # LinaDirectDentalPage(driver, 'premium').scrape(input_pairs_yymmdd)

    # KB
    # KBDirectDentalPage(driver, year=20).scrape(input_pairs_YYYYmmdd)

    # 교보 라이프플래닛
    # KyoboDirectDentalPage(driver, 20).scrape(input_pairs_YYYYmmdd)

<<<<<<< Updated upstream
    # 삼성생명
    # SamsungDirectDentalPage(driver, 'economical').scrape(input_pairs_YYYYmmdd)
    SamsungDirectDentalPage(driver, 'premium').scrape(input_pairs_YYYYmmdd)
=======
    # 삼성화재
    SamsungFireDirectDentalPage(driver, 'standard').scrape(input_pairs_YYYYmmdd, 'standard')
>>>>>>> Stashed changes

    time.sleep(5)
    driver.quit()


if __name__ == "__main__":
    main()
