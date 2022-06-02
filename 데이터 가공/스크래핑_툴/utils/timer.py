from datetime import datetime
from pytz import timezone


class Timer:
    """시간 체크 관련 모듈"""
    def __init__(self) -> None:
        # 현재 시간
        self.now = datetime.now(timezone('Asia/Seoul'))
    
    def get_birth_gender_pairs(self, age_list, date_format=r'%y%m%d'):
        """
        연령들을 생년월일로 바꾼 후,
        성별(남, 여)과 결합해 반환하는 함수
        """
        genders = ('남', '여')
        birthdate_list = [
            (age, self.convert_age_to_birthdate(age, date_format))
            for age in age_list
        ]
        birth_gender_pairs = [
            (age, birthdate, gender)
            for age, birthdate in birthdate_list
            for gender in genders
        ]
        return birth_gender_pairs

    def convert_age_to_birthdate(self, age: int, date_format=r'%y%m%d'):
        """
        해당 연령의 생년월일을 반환하는 함수
        ### Parameters
        - date_format: datetime 모듈의 strfttime 형식과 같음.
            - 예) '%y%m%d' (소문자 y) => 950101
            - 예) '%Y%m%d' (대문자 Y) => 19950101
        """
        birth = self.now.replace(year=self.now.year - age, month=1, day=1)
        return birth.strftime(date_format)


if __name__ == '__main__':
    timer = Timer()
    print(timer.convert_age_to_birthdate(29))

    age_list = [3, 10]
    for age in age_list:
        print(timer.convert_age_to_birthdate(age))
    
    birth_list = [timer.get_birth_gender_pairs(age_list)]
    print(birth_list)