class NotEligibleAgeError(Exception):
    def __init__(self, message, age: int):
        message = f'{age}는 가입 불가'
        super().__init__(message)

class NoDataError(Exception):
    def __init__(self, message):
        message = '데이터 없음'
        super().__init__(message)