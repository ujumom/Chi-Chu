from rest_framework.decorators import api_view
from rest_framework.response import Response
import pymysql

# 필요한 기본 DB 
host = "j6d206.p.ssafy.io" #접속할 db의 host명
user = "chichu" #접속할 db의 user명
pw = "ssafy" #접속할 db의 password
db = "chichu" #접속할 db의 table명 (실제 데이터가 추출되는 table)
charset = 'UTF8'

# 나이바꾸기 함수
def change_age(age):
    if age <= 20:
        return 20
    elif 20 < age <= 25:
        return 25
    elif 25 < age <= 30:
        return 30
    elif 30 < age <= 35:
        return 35
    elif 35 < age <= 40:
        return 40
    elif 40 < age <= 45:
        return 45
    elif 45 < age <= 50:
        return 50
    elif 50 < age <= 55:
        return 55
    elif 55 < age <= 60:
        return 60
    elif 60 < age <= 65:
        return 65
    elif 65 < age <= 70:
        return 70

# 1 - 1차 검색
@api_view(['GET'])
def default(request, age, gender):
    popular_list = []
    reasonable_list = []
    high_ci_list = []
    cheap_list = []
    high_coverage_list = []

    # 사용자 나이 바꾸기
    age = change_age(age)    

    #DB에 접속
    conn = pymysql.connect( host= host, user = user, password = pw, db = db, charset="utf8")
    # Connection 으로부터 Cursor 생성 > dictionary 형태로 만들기
    curs = conn.cursor(pymysql.cursors.DictCursor)

    
     # 3. SQL문 작성
    # (1) 인기 상품 : 성별 + 연령 + 유저지수 가장 높은 상품 순서대로
    popular_sql =f"""
    SELECT 
        G.PRODUCT_CODE AS product_code,
        G.PRODUCT_NAME as product_name, 
        G.USER_INDEX as user_index,
        G.TOTAL_INDEX as total_index,
        G.COMPANY_CODE AS company_code,
        G.COMPANY_NAME AS company_name,
        G.SUBTYPE_CODE as subtype_code,
        G.SUBTYPE_NAME as subtype_name,
        G.RATE AS rate,
        G.PY AS py,
        GROUP_CONCAT(G.option_code) AS option_code, 
        GROUP_CONCAT(G.option_name) AS option_name
        FROM ( SELECT DISTINCT ANY_VALUE(A.PRODUCT_CODE) AS product_code, 
            ANY_VALUE(C.PRODUCT_NAME) as product_name,
            ANY_VALUE(D.COMPANY_CODE) as company_code,
            ANY_VALUE(D.COMPANY_NAME) as company_name,
            ANY_VALUE(C.SUBTYPE_CODE) as subtype_code,
            ANY_VALUE(F.SUBTYPE_NAME) as subtype_name,
            ANY_VALUE(B.RATE) as rate,
            ANY_VALUE(B.PY) as py,
            ANY_VALUE(E.OPTION_CODE) as option_code,
            ANY_VALUE(E.OPTION_NAME) as option_name,
            ANY_VALUE(B.USER_INDEX) as user_index,
            ANY_VALUE(B.TOTAL_INDEX) as total_index
            FROM
            PRODUCT_OPTION A, 
            PRODUCT_RATE B,
            PRODUCT C,
            COMPANY D,
            DB_OPTION E,
            PRODUCT_SUBTYPE F
            WHERE A.PRODUCT_CODE = B.PRODUCT_CODE 
            AND B.PRODUCT_CODE = C.PRODUCT_CODE
            AND C.COMPANY_CODE = D.COMPANY_CODE
            AND A.OPTION_CODE = E.OPTION_CODE
            AND C.SUBTYPE_CODE = F.SUBTYPE_CODE
            AND AGE = {age}
            AND GENDER = {gender}
        ) G
    GROUP BY chichu.G.USER_INDEX
    ORDER BY chichu.G.USER_INDEX DESC 
    LIMIT 6;
    """

    # (2) 가성비 : 성별 + 연령 + [보장금액 COVERAGE SUM / 월 보험료  * 가입기간 ]

    reasonable_sql = f"""
    SELECT DISTINCT ANY_VALUE(A.PRODUCT_CODE) AS product_code, 
        ANY_VALUE(A.COVERAGE / (B.PY * B.RATE)) as reasonable,
        ANY_VALUE(C.PRODUCT_NAME) as product_name,
        ANY_VALUE(D.COMPANY_CODE) as company_code,
        ANY_VALUE(D.COMPANY_NAME) as company_name,
        ANY_VALUE(C.SUBTYPE_CODE) as subtype_code,
        ANY_VALUE(E.SUBTYPE_NAME) as subtype_name,
        ANY_VALUE(B.RATE) as rate,
        ANY_VALUE(B.TOTAL_INDEX) as total_index,
        ANY_VALUE(B.PY) as py,
        ANY_VALUE(A.OPTION_CODE) as option_code,
        ANY_VALUE(A.OPTION_NAME) as option_name
        FROM
            ( SELECT PRODUCT_CODE, GROUP_CONCAT(OPTION_CODE) AS OPTION_CODE, GROUP_CONCAT(OPTION_NAME) AS OPTION_NAME, 
                SUM(COVERAGE) AS COVERAGE FROM (
                SELECT P.PRODUCT_CODE, P.OPTION_CODE, O.OPTION_NAME, P.COVERAGE
                FROM PRODUCT_OPTION P, DB_OPTION O
                WHERE P.OPTION_CODE = O.OPTION_CODE
                )
        PRODUCT_OPTION GROUP BY PRODUCT_CODE) A, 
        PRODUCT_RATE B,
        PRODUCT C,
        COMPANY D,
        PRODUCT_SUBTYPE E
        WHERE A.PRODUCT_CODE = B.PRODUCT_CODE 
        AND B.PRODUCT_CODE = C.PRODUCT_CODE
        AND C.COMPANY_CODE = D.COMPANY_CODE
        AND C.SUBTYPE_CODE = E.SUBTYPE_CODE
        AND AGE = {age}
        AND GENDER = {gender}
        ORDER BY reasonable DESC
        LIMIT 6;
    """


    # (3) 치츄 지수 높은 순 (DEFAULT PY = 10 )
    high_ci_sql = f"""
        SELECT 
        G.PRODUCT_CODE AS product_code,
        G.PRODUCT_NAME as product_name, 
        G.TOTAL_INDEX as total_index,
        G.COMPANY_CODE AS company_code,
        G.COMPANY_NAME AS company_name,
        G.SUBTYPE_CODE as subtype_code,
        G.SUBTYPE_NAME as subtype_name,
        G.PY AS py,
        G.RATE AS rate,
        GROUP_CONCAT(G.option_code) AS option_code, 
        GROUP_CONCAT(G.option_name) AS option_name
        FROM ( SELECT DISTINCT ANY_VALUE(A.PRODUCT_CODE) AS product_code, 
            ANY_VALUE(C.PRODUCT_NAME) as product_name,
            ANY_VALUE(D.COMPANY_CODE) as company_code,
            ANY_VALUE(D.COMPANY_NAME) as company_name,
            ANY_VALUE(C.SUBTYPE_CODE) as subtype_code,
            ANY_VALUE(F.SUBTYPE_NAME) as subtype_name,
            ANY_VALUE(B.RATE) as rate,
            ANY_VALUE(B.PY) as py,
            ANY_VALUE(E.OPTION_CODE) as option_code,
            ANY_VALUE(E.OPTION_NAME) as option_name,
            ANY_VALUE(B.TOTAL_INDEX) as total_index
            FROM
            PRODUCT_OPTION A, 
            PRODUCT_RATE B,
            PRODUCT C,
            COMPANY D,
            DB_OPTION E,
            PRODUCT_SUBTYPE F
            WHERE A.PRODUCT_CODE = B.PRODUCT_CODE 
            AND B.PRODUCT_CODE = C.PRODUCT_CODE
            AND C.COMPANY_CODE = D.COMPANY_CODE
            AND A.OPTION_CODE = E.OPTION_CODE
            AND C.SUBTYPE_CODE = F.SUBTYPE_CODE
            AND AGE = {age}
            AND GENDER = {gender}
            AND PY = 10
        ) G
    GROUP BY chichu.G.TOTAL_INDEX
    ORDER BY chichu.G.TOTAL_INDEX DESC 
    """
    
    # (4) 보험료 낮은 순 [성별, 나이, py 10, 일반형]
    cheap_sql = f"""
    SELECT 
        G.PRODUCT_CODE AS product_code,
        G.PRODUCT_NAME as product_name, 
        G.COMPANY_CODE AS company_code,
        G.COMPANY_NAME AS company_name,
        G.SUBTYPE_CODE as subtype_code,
        G.SUBTYPE_NAME as subtype_name,
        G.RATE AS rate,
        G.TOTAL_INDEX AS total_index,
        G.PY AS py,
        GROUP_CONCAT(G.option_code) AS option_code, 
        GROUP_CONCAT(G.option_name) AS option_name
        FROM ( SELECT DISTINCT ANY_VALUE(A.PRODUCT_CODE) AS product_code, 
            ANY_VALUE(C.PRODUCT_NAME) as product_name,
            ANY_VALUE(D.COMPANY_CODE) as company_code,
            ANY_VALUE(D.COMPANY_NAME) as company_name,
            ANY_VALUE(C.SUBTYPE_CODE) as subtype_code,
            ANY_VALUE(F.SUBTYPE_NAME) as subtype_name,
            ANY_VALUE(B.RATE) as rate,
            ANY_VALUE(B.PY) as py,
            ANY_VALUE(B.TOTAL_INDEX) as total_index,
            ANY_VALUE(E.OPTION_CODE) as option_code,
            ANY_VALUE(E.OPTION_NAME) as option_name
            FROM
            PRODUCT_OPTION A, 
            PRODUCT_RATE B,
            PRODUCT C,
            COMPANY D,
            DB_OPTION E,
            PRODUCT_SUBTYPE F
            WHERE A.PRODUCT_CODE = B.PRODUCT_CODE 
            AND B.PRODUCT_CODE = C.PRODUCT_CODE
            AND C.COMPANY_CODE = D.COMPANY_CODE
            AND A.OPTION_CODE = E.OPTION_CODE
            AND C.SUBTYPE_CODE = F.SUBTYPE_CODE
            AND AGE = {age}
            AND GENDER = {gender}
            AND PY = 10
        ) G
    GROUP BY chichu.G.PRODUCT_CODE
    ORDER BY chichu.G.RATE 
    """

    # (5) 보장금액 높은 순
    high_coverage_sql = f"""
    SELECT DISTINCT ANY_VALUE(A.PRODUCT_CODE) AS product_code, 
        ANY_VALUE(A.COVERAGE) as coverage,
        ANY_VALUE(C.PRODUCT_NAME) as product_name,
        ANY_VALUE(D.COMPANY_CODE) as company_code,
        ANY_VALUE(D.COMPANY_NAME) as company_name,
        ANY_VALUE(C.SUBTYPE_CODE) as subtype_code,
        ANY_VALUE(E.SUBTYPE_NAME) as subtype_name,
        ANY_VALUE(B.RATE) as rate,
        ANY_VALUE(B.PY) as py,
        ANY_VALUE(B.TOTAL_INDEX) as total_index,
        ANY_VALUE(A.OPTION_CODE) as option_code,
        ANY_VALUE(A.OPTION_NAME) as option_name
        FROM
            ( SELECT PRODUCT_CODE, GROUP_CONCAT(OPTION_CODE) AS OPTION_CODE, GROUP_CONCAT(OPTION_NAME) AS OPTION_NAME, 
                SUM(COVERAGE) AS COVERAGE FROM (
                SELECT P.PRODUCT_CODE, P.OPTION_CODE, O.OPTION_NAME, P.COVERAGE
                FROM PRODUCT_OPTION P, DB_OPTION O
                WHERE P.OPTION_CODE = O.OPTION_CODE
                )
        PRODUCT_OPTION GROUP BY PRODUCT_CODE) A, 
        PRODUCT_RATE B,
        PRODUCT C,
        COMPANY D,
        PRODUCT_SUBTYPE E
        WHERE A.PRODUCT_CODE = B.PRODUCT_CODE 
        AND B.PRODUCT_CODE = C.PRODUCT_CODE
        AND C.COMPANY_CODE = D.COMPANY_CODE
        AND C.SUBTYPE_CODE = E.SUBTYPE_CODE
        AND AGE = {age}
        AND GENDER = {gender}
        AND PY = 10
        ORDER BY COVERAGE DESC
    """ 

    curs.execute(popular_sql)
    for row in curs:
        row['option_code'] = row['option_code'].split(',')
        row['option_name'] = row['option_name'].split(',')
        popular_list.append(row)
    

    curs.execute(reasonable_sql)
    for row in curs:
        row['option_code'] = row['option_code'].split(',')
        row['option_name'] = row['option_name'].split(',')
        reasonable_list.append(row)

    curs.execute(high_ci_sql)
    for row in curs:
        row['option_code'] = row['option_code'].split(',')
        row['option_name'] = row['option_name'].split(',')
        high_ci_list.append(row)

    curs.execute(cheap_sql)
    for row in curs:
        row['option_code'] = row['option_code'].split(',')
        row['option_name'] = row['option_name'].split(',')
        cheap_list.append(row)

    curs.execute(high_coverage_sql)
    for row in curs:
        row['option_code'] = row['option_code'].split(',')
        row['option_name'] = row['option_name'].split(',')
        high_coverage_list.append(row)

    # db 접속 종료
    curs.close()
    conn.close()

    data = {
        'popular': popular_list,
        'reasonable' : reasonable_list,
        'chichu' : high_ci_list,
        'cheap' : cheap_list,
        'coverage' : high_coverage_list
    }

    print(len(popular_list))
    print(len(high_ci_list))
    print(len(cheap_list))
    print(len(high_coverage_list))
    return Response(data)


# 2차 검색
@api_view(['GET'])
def detail(request, gender, age, py):
    # 리스트에 담기 ?
    popular_list = []
    reasonable_list = []
    high_ci_list = []
    cheap_list = []
    high_coverage_list = []
    
    age = change_age(age)   

    #DB에 접속
    conn = pymysql.connect( host= host, user = user, password = pw, db = db, charset="utf8")
    # Connection 으로부터 Cursor 생성 > dictionary 형태로 만들기
    curs = conn.cursor(pymysql.cursors.DictCursor) 

    popular_sql =f"""
    SELECT 
        G.PRODUCT_CODE AS product_code,
        G.PRODUCT_NAME as product_name, 
        G.USER_INDEX as user_index,
        G.TOTAL_INDEX as total_index,
        G.COMPANY_CODE AS company_code,
        G.COMPANY_NAME AS company_name,
        G.SUBTYPE_CODE as subtype_code,
        G.SUBTYPE_NAME as subtype_name,
        G.RATE AS rate,
        G.PY AS py,
        GROUP_CONCAT(G.option_code) AS option_code, 
        GROUP_CONCAT(G.option_name) AS option_name
        FROM ( SELECT DISTINCT ANY_VALUE(A.PRODUCT_CODE) AS product_code, 
            ANY_VALUE(C.PRODUCT_NAME) as product_name,
            ANY_VALUE(D.COMPANY_CODE) as company_code,
            ANY_VALUE(D.COMPANY_NAME) as company_name,
            ANY_VALUE(C.SUBTYPE_CODE) as subtype_code,
            ANY_VALUE(F.SUBTYPE_NAME) as subtype_name,
            ANY_VALUE(B.RATE) as rate,
            ANY_VALUE(B.PY) as py,
            ANY_VALUE(E.OPTION_CODE) as option_code,
            ANY_VALUE(E.OPTION_NAME) as option_name,
            ANY_VALUE(B.USER_INDEX) as user_index,
            ANY_VALUE(B.TOTAL_INDEX) as total_index
            FROM
            PRODUCT_OPTION A, 
            PRODUCT_RATE B,
            PRODUCT C,
            COMPANY D,
            DB_OPTION E,
            PRODUCT_SUBTYPE F
            WHERE A.PRODUCT_CODE = B.PRODUCT_CODE 
            AND B.PRODUCT_CODE = C.PRODUCT_CODE
            AND C.COMPANY_CODE = D.COMPANY_CODE
            AND A.OPTION_CODE = E.OPTION_CODE
            AND C.SUBTYPE_CODE = F.SUBTYPE_CODE
            AND AGE = {age}
            AND GENDER = {gender}
        ) G
    GROUP BY chichu.G.USER_INDEX
    ORDER BY chichu.G.USER_INDEX DESC 
    LIMIT 6;
    """

    # (2) 가성비 : 성별 + 연령 + [보장금액 COVERAGE SUM / 월 보험료  * 가입기간 ]

    reasonable_sql = f"""
    SELECT DISTINCT ANY_VALUE(A.PRODUCT_CODE) AS product_code, 
        ANY_VALUE(A.COVERAGE / (B.PY * B.RATE)) as reasonable,
        ANY_VALUE(C.PRODUCT_NAME) as product_name,
        ANY_VALUE(D.COMPANY_CODE) as company_code,
        ANY_VALUE(D.COMPANY_NAME) as company_name,
        ANY_VALUE(C.SUBTYPE_CODE) as subtype_code,
        ANY_VALUE(E.SUBTYPE_NAME) as subtype_name,
        ANY_VALUE(B.RATE) as rate,
        ANY_VALUE(B.TOTAL_INDEX) as total_index,
        ANY_VALUE(B.PY) as py,
        ANY_VALUE(A.OPTION_CODE) as option_code,
        ANY_VALUE(A.OPTION_NAME) as option_name
        FROM
            ( SELECT PRODUCT_CODE, GROUP_CONCAT(OPTION_CODE) AS OPTION_CODE, GROUP_CONCAT(OPTION_NAME) AS OPTION_NAME, 
                SUM(COVERAGE) AS COVERAGE FROM (
                SELECT P.PRODUCT_CODE, P.OPTION_CODE, O.OPTION_NAME, P.COVERAGE
                FROM PRODUCT_OPTION P, DB_OPTION O
                WHERE P.OPTION_CODE = O.OPTION_CODE
                )
        PRODUCT_OPTION GROUP BY PRODUCT_CODE) A, 
        PRODUCT_RATE B,
        PRODUCT C,
        COMPANY D,
        PRODUCT_SUBTYPE E
        WHERE A.PRODUCT_CODE = B.PRODUCT_CODE 
        AND B.PRODUCT_CODE = C.PRODUCT_CODE
        AND C.COMPANY_CODE = D.COMPANY_CODE
        AND C.SUBTYPE_CODE = E.SUBTYPE_CODE
        AND AGE = {age}
        AND GENDER = {gender}
        ORDER BY reasonable DESC
        LIMIT 6;
    """

    # (1) 치츄 지수 높은 순
    high_ci_sql = f"""
SELECT 
        G.PRODUCT_CODE AS product_code,
        G.PRODUCT_NAME as product_name, 
        G.TOTAL_INDEX as total_index,
        G.COMPANY_CODE AS company_code,
        G.COMPANY_NAME AS company_name,
        G.SUBTYPE_CODE as subtype_code,
        G.SUBTYPE_NAME as subtype_name,
        G.PY AS py,
        G.RATE AS rate,
        GROUP_CONCAT(G.option_code) AS option_code, 
        GROUP_CONCAT(G.option_name) AS option_name
        FROM ( SELECT DISTINCT ANY_VALUE(A.PRODUCT_CODE) AS product_code, 
            ANY_VALUE(C.PRODUCT_NAME) as product_name,
            ANY_VALUE(D.COMPANY_CODE) as company_code,
            ANY_VALUE(D.COMPANY_NAME) as company_name,
            ANY_VALUE(C.SUBTYPE_CODE) as subtype_code,
            ANY_VALUE(F.SUBTYPE_NAME) as subtype_name,
            ANY_VALUE(B.RATE) as rate,
            ANY_VALUE(B.PY) as py,
            ANY_VALUE(E.OPTION_CODE) as option_code,
            ANY_VALUE(E.OPTION_NAME) as option_name,
            ANY_VALUE(B.TOTAL_INDEX) as total_index
            FROM
            PRODUCT_OPTION A, 
            PRODUCT_RATE B,
            PRODUCT C,
            COMPANY D,
            DB_OPTION E,
            PRODUCT_SUBTYPE F
            WHERE A.PRODUCT_CODE = B.PRODUCT_CODE 
            AND B.PRODUCT_CODE = C.PRODUCT_CODE
            AND C.COMPANY_CODE = D.COMPANY_CODE
            AND A.OPTION_CODE = E.OPTION_CODE
            AND C.SUBTYPE_CODE = F.SUBTYPE_CODE
            AND AGE = {age}
            AND GENDER = {gender}
            AND PY = {py}
        ) G
    GROUP BY chichu.G.TOTAL_INDEX
    ORDER BY chichu.G.TOTAL_INDEX DESC 
    """
    
    # (2) 보험료 낮은 순 [성별, 나이, py 10, 일반형]
    cheap_sql = f"""
    SELECT 
        G.PRODUCT_CODE AS product_code,
        G.PRODUCT_NAME as product_name, 
        G.COMPANY_CODE AS company_code,
        G.COMPANY_NAME AS company_name,
        G.SUBTYPE_CODE as subtype_code,
        G.SUBTYPE_NAME as subtype_name,
        G.RATE AS rate,
        G.TOTAL_INDEX AS total_index,
        G.PY AS py,
        GROUP_CONCAT(G.option_code) AS option_code, 
        GROUP_CONCAT(G.option_name) AS option_name
        FROM ( SELECT DISTINCT ANY_VALUE(A.PRODUCT_CODE) AS product_code, 
            ANY_VALUE(C.PRODUCT_NAME) as product_name,
            ANY_VALUE(D.COMPANY_CODE) as company_code,
            ANY_VALUE(D.COMPANY_NAME) as company_name,
            ANY_VALUE(C.SUBTYPE_CODE) as subtype_code,
            ANY_VALUE(F.SUBTYPE_NAME) as subtype_name,
            ANY_VALUE(B.RATE) as rate,
            ANY_VALUE(B.PY) as py,
            ANY_VALUE(B.TOTAL_INDEX) as total_index,
            ANY_VALUE(E.OPTION_CODE) as option_code,
            ANY_VALUE(E.OPTION_NAME) as option_name
            FROM
            PRODUCT_OPTION A, 
            PRODUCT_RATE B,
            PRODUCT C,
            COMPANY D,
            DB_OPTION E,
            PRODUCT_SUBTYPE F
            WHERE A.PRODUCT_CODE = B.PRODUCT_CODE 
            AND B.PRODUCT_CODE = C.PRODUCT_CODE
            AND C.COMPANY_CODE = D.COMPANY_CODE
            AND A.OPTION_CODE = E.OPTION_CODE
            AND C.SUBTYPE_CODE = F.SUBTYPE_CODE
            AND AGE = {age}
            AND GENDER = {gender}
            AND PY = {py}
        ) G
    GROUP BY chichu.G.PRODUCT_CODE
    ORDER BY chichu.G.RATE 
    """

    # (3) 보장금액 높은 순
    high_coverage_sql = f"""
SELECT DISTINCT ANY_VALUE(A.PRODUCT_CODE) AS product_code, 
        ANY_VALUE(A.COVERAGE) as coverage,
        ANY_VALUE(C.PRODUCT_NAME) as product_name,
        ANY_VALUE(D.COMPANY_CODE) as company_code,
        ANY_VALUE(D.COMPANY_NAME) as company_name,
        ANY_VALUE(C.SUBTYPE_CODE) as subtype_code,
        ANY_VALUE(E.SUBTYPE_NAME) as subtype_name,
        ANY_VALUE(B.RATE) as rate,
        ANY_VALUE(B.PY) as py,
        ANY_VALUE(B.TOTAL_INDEX) as total_index,
        ANY_VALUE(A.OPTION_CODE) as option_code,
        ANY_VALUE(A.OPTION_NAME) as option_name
        FROM
            ( SELECT PRODUCT_CODE, GROUP_CONCAT(OPTION_CODE) AS OPTION_CODE, GROUP_CONCAT(OPTION_NAME) AS OPTION_NAME, 
                SUM(COVERAGE) AS COVERAGE FROM (
                SELECT P.PRODUCT_CODE, P.OPTION_CODE, O.OPTION_NAME, P.COVERAGE
                FROM PRODUCT_OPTION P, DB_OPTION O
                WHERE P.OPTION_CODE = O.OPTION_CODE
                )
        PRODUCT_OPTION GROUP BY PRODUCT_CODE) A, 
        PRODUCT_RATE B,
        PRODUCT C,
        COMPANY D,
        PRODUCT_SUBTYPE E
        WHERE A.PRODUCT_CODE = B.PRODUCT_CODE 
        AND B.PRODUCT_CODE = C.PRODUCT_CODE
        AND C.COMPANY_CODE = D.COMPANY_CODE
        AND C.SUBTYPE_CODE = E.SUBTYPE_CODE
        AND AGE = {age}
        AND GENDER = {gender}
        AND PY = {py}
        ORDER BY COVERAGE DESC
    """ 

    curs.execute(popular_sql)
    for row in curs:
        row['option_code'] = row['option_code'].split(',')
        row['option_name'] = row['option_name'].split(',')
        popular_list.append(row)
    

    curs.execute(reasonable_sql)
    for row in curs:
        row['option_code'] = row['option_code'].split(',')
        row['option_name'] = row['option_name'].split(',')
        reasonable_list.append(row)

    curs.execute(high_ci_sql)
    for row in curs:
        row['option_code'] = row['option_code'].split(',')
        row['option_name'] = row['option_name'].split(',')
        high_ci_list.append(row)

    curs.execute(cheap_sql)
    for row in curs:
        row['option_code'] = row['option_code'].split(',')
        row['option_name'] = row['option_name'].split(',')
        cheap_list.append(row)

    curs.execute(high_coverage_sql)
    for row in curs:
        row['option_code'] = row['option_code'].split(',')
        row['option_name'] = row['option_name'].split(',')
        high_coverage_list.append(row)

    # db 접속 종료
    curs.close()
    conn.close()

    data = {
        'popular': popular_list,
        'reasonable' : reasonable_list,
        'chichu' : high_ci_list,
        'cheap' : cheap_list,
        'coverage' : high_coverage_list
    }
    return Response(data)


# 3  - 세부 보험 상품
@api_view(['GET'])
def product(request, product_code, age, gender, py):
    age = change_age(age)

    conn = pymysql.connect(host= host, user = user, password = pw, db = db, charset=charset)

    curs_proc = conn.cursor()
    age_init = str(age)[0]
    age1 = int(age_init + '0')
    age2 = int(age_init + '5')
    SQL = f"CALL UPDATE_HIT('{product_code}', {age}, {gender}, {py}, {age1}, {age2})"
    try:
        curs_proc.execute(SQL)
        conn.commit()
    except:
        conn.rollback()
    curs_proc.close()

    curs = conn.cursor(pymysql.cursors.DictCursor) 

    SQL1 = f"SELECT C.PRODUCT_CODE, PRODUCT_NAME, COMPANY_CODE, COMPANY_NAME, SUBTYPE_CODE, PRODUCT_LINK, AGE, GENDER, PY, RATE, COMPANY_INDEX, PRODUCT_INDEX, USER_INDEX, TOTAL_INDEX FROM (SELECT A.PRODUCT_CODE AS PRODUCT_CODE, PRODUCT_NAME, A.COMPANY_CODE AS COMPANY_CODE, COMPANY_NAME, SUBTYPE_CODE, PRODUCT_LINK FROM PRODUCT AS A JOIN COMPANY AS B ON A.COMPANY_CODE = B.COMPANY_CODE) AS C JOIN PRODUCT_RATE AS D ON C.PRODUCT_CODE = D.PRODUCT_CODE WHERE C.PRODUCT_CODE = '{product_code}' AND AGE = {age} AND GENDER = {gender} AND PY = {py}"
    SQL2 = f"SELECT PRODUCT_OPTION AS NAME, CAST(COVERAGE*10000 AS SIGNED INTEGER) AS COVERAGE FROM PRODUCT_OPTION WHERE PRODUCT_CODE='{product_code}'"
    SQL3 = f"SELECT OPTION_NAME AS NAME, CAST(SUM(COVERAGE)*10000 AS SIGNED INTEGER) AS COVERAGE FROM (SELECT A.PRODUCT_OPTION, A.COVERAGE, B.OPTION_NAME, B.OPTION_GROUP_CODE, B.OPTION_GROUP_NAME FROM (SELECT * FROM PRODUCT_OPTION WHERE PRODUCT_CODE='{product_code}') AS A JOIN DB_OPTION AS B ON A.OPTION_CODE = B.OPTION_CODE) AS C GROUP BY OPTION_NAME LIMIT 0, 1000"
    SQL4 = f"SELECT AA AS NAME, DD AS COVERAGE, DD/BB AS RATE  FROM (SELECT OPTION_GROUP_NAME AS AA, SUM(COVERAGE) AS BB     FROM (SELECT A.PRODUCT_OPTION, A.COVERAGE, B.OPTION_NAME, B.OPTION_GROUP_CODE, B.OPTION_GROUP_NAME     FROM PRODUCT_OPTION AS A JOIN DB_OPTION AS B ON A.OPTION_CODE = B.OPTION_CODE) AS C              GROUP BY OPTION_GROUP_NAME) C,              (SELECT OPTION_GROUP_NAME AS CC, SUM(COVERAGE) AS DD      FROM (SELECT A.PRODUCT_OPTION, A.COVERAGE, B.OPTION_NAME, B.OPTION_GROUP_CODE, B.OPTION_GROUP_NAME         FROM (SELECT * FROM PRODUCT_OPTION WHERE PRODUCT_CODE='{product_code}') AS A         JOIN DB_OPTION AS B ON A.OPTION_CODE = B.OPTION_CODE) AS C      GROUP BY OPTION_GROUP_NAME) D  WHERE AA = CC AND AA != '기타 보장' LIMIT 0, 1000"
    SQL5 = f"SELECT AGE_CAT, ROUND(COUNT(*) / SUM(COUNT(*)) OVER()*100, 2) AS RATE FROM (SELECT CASE  WHEN AGE < 20 THEN 10     WHEN AGE < 30 AND AGE >= 20 THEN 20     WHEN AGE < 40 AND AGE >= 30 THEN 30     WHEN AGE < 50 AND AGE >= 40 THEN 40     WHEN AGE < 60 AND AGE >= 50 THEN 50     WHEN AGE < 70 AND AGE >= 60 THEN 60     ELSE 70 END AS AGE_CAT FROM (SELECT USER_CODE FROM (SELECT CONTRACT_PK FROM PRODUCT_CONTRACT WHERE PRODUCT_CODE='{product_code}') AS A JOIN CONTRACT AS B ON A.CONTRACT_PK=B.CONTRACT_PK) AS C JOIN USER AS D ON C.USER_CODE=D.USER_CODE) AS E GROUP BY AGE_CAT"
    SQL6 = f"SELECT CAST(TRUNCATE(@ROWNUM:=@ROWNUM+1, 0) AS CHAR(5)) AS ID, D.OPTION_NAME  FROM DB_OPTION AS D, ( SELECT @ROWNUM := 0) R WHERE D.OPTION_NAME IN ('임플란트',  '틀니', '브릿지', '충전치료', '신경치료', '잇몸질환', '치조골 이식수술', '스케일링', '치아골절 진단비', 'X-RAY 촬영', '아말감', '레진') LIMIT 0, 1000"

    base = []
    option_detail = []
    option = []
    group_option = []
    age_rate = []
    option_column = []

    curs.execute(SQL1)
    for row in curs: base.append(row)

    curs.execute(SQL2)
    for row in curs: option_detail.append(row)

    curs.execute(SQL3)
    for row in curs: option.append(row)

    curs.execute(SQL4)
    for row in curs: group_option.append(row)

    curs.execute(SQL5)
    for row in curs: age_rate.append(row)

    curs.execute(SQL6)
    for row in curs: option_column.append(row)

    curs.close()
    conn.close()

    data = {
        'base': base,
        'option': option,
        'option_detail': option_detail,
        'option_group': group_option,
        'age_rate': age_rate,
        'option_column': option_column
    }
    return Response(data)
     

# 4 - 보험비교
@api_view(['GET'])
def compare(request, age, gender, codes):
    age = change_age(age)  
    
    # 비교할 상품의 갯수 (2개, 3개)
    if len(codes) == 12:
        p1 = codes[:6]
        p2 = codes[6:]

    elif len(codes) == 18:
        p1 = codes[:6]
        p2 = codes[6:12]
        p3 = codes[12:]


    # 가져와야할 목록
    # 1. 회사, 치츄 목록 : product_code, company_name, company_code, total_index
    company_list = []
    list0 = []
    list1 = []
    list2 = []
    list3 = []
    list4 = []

    #DB에 접속
    conn = pymysql.connect( host= host, user = user, password = pw, db = db, charset="utf8")
    curs = conn.cursor(pymysql.cursors.DictCursor)

    if len(codes) == 18:
        company_sql = f"""
        SELECT DISTINCT A.PRODUCT_CODE AS product_code,
        B.PRODUCT_NAME AS product_name,
        C.COMPANY_CODE as company_code,
        C.COMPANY_NAME as company_name
        
        FROM PRODUCT_RATE A, 
        PRODUCT B,
        COMPANY C

        WHERE AGE = {age}
        AND GENDER = {gender}
        AND A.PRODUCT_CODE = B.PRODUCT_CODE
        AND B.COMPANY_CODE = C.COMPANY_CODE 
        AND A.PRODUCT_CODE IN ('{p1}', '{p2}', '{p3}')
        """

        list0_sql = f"""
        SELECT DISTINCT A.PRODUCT_CODE AS product_code,
        A.TOTAL_INDEX AS total_index 
        
        FROM PRODUCT_RATE A, 
        PRODUCT B
        WHERE AGE = {age}
        AND GENDER = {gender}
        AND A.PRODUCT_CODE = B.PRODUCT_CODE
        AND A.PRODUCT_CODE IN ('{p1}', '{p2}', '{p3}')
        """

        
        # 2. 치아보철치료비(OPTION_GROUP_CODE : A9509) > PRODUCT_CODE, OPTION_NAME, COVERAGE 
        list1_sql = f"""
        SELECT E.OPTION_CODE as option_code, 
        E.OPTION_NAME as option_name, 
        GROUP_CONCAT(E.PRODUCT_CODE) as product_code, 
        GROUP_CONCAT(E.COVERAGE) as coverage 
        FROM (SELECT D.OPTION_CODE, D.OPTION_NAME, D.PRODUCT_CODE, SUM(D.COVERAGE) AS COVERAGE
        FROM (SELECT A.PRODUCT_CODE, C.OPTION_NAME, B.OPTION_CODE, B.COVERAGE 
        FROM PRODUCT_RATE A, PRODUCT_OPTION B, DB_OPTION C
        WHERE A.PRODUCT_CODE = B.PRODUCT_CODE AND
        B.OPTION_CODE = C.OPTION_CODE
        AND C.OPTION_GROUP_CODE = 'A9509' 
        AND A.GENDER = {gender}
        AND A.AGE= {age}
        AND A.PRODUCT_CODE IN ('{p1}', '{p2}', '{p3}')) D
        GROUP BY D.OPTION_CODE, D.PRODUCT_CODE
        ORDER BY D.OPTION_CODE) E 
        GROUP BY E.OPTION_CODE
        """
        
        # list1_sql = f"""
        # SELECT PRODUCT_CODE, GROUP_CONCAT(OPTION_NAME ORDER BY OPTION_NAME) AS OPTION_NAME, GROUP_CONCAT(COVERAGE ORDER BY OPTION_NAME) AS COVERAGE
        # FROM(
        # SELECT DISTINCT IFNULL(I.PRODUCT_CODE, 'E10001') AS PRODUCT_CODE, J.OPTION_NAME AS OPTION_NAME, IFNULL(SUM(I.COVERAGE) OVER(PARTITION BY I.OPTION_CODE), 0) AS COVERAGE
        # FROM
        # (SELECT G.PRODUCT_CODE, H.OPTION_CODE AS OPTION_CODE, G.COVERAGE
        # FROM
        # (SELECT E.PRODUCT_CODE, F.COVERAGE, F.OPTION_CODE
        #     FROM PRODUCT_RATE AS E
        #     RIGHT JOIN PRODUCT_OPTION AS F
        #     ON E.PRODUCT_CODE = F.PRODUCT_CODE
        #     WHERE E.AGE = 20 AND E.GENDER = 1 AND E.PRODUCT_CODE = 'E10001') AS G
        # RIGHT JOIN
        # (SELECT DISTINCT C.OPTION_CODE, OPTION_NAME
        # FROM (SELECT DISTINCT A.PRODUCT_CODE, A.OPTION_CODE, B.OPTION_NAME, A.COVERAGE
        #     FROM PRODUCT_OPTION AS A
        #     JOIN DB_OPTION AS B
        #     ON A.OPTION_CODE = B.OPTION_CODE) AS C
        # RIGHT JOIN PRODUCT_RATE AS D
        # ON C.PRODUCT_CODE = D.PRODUCT_CODE
        # WHERE D.AGE = 20 AND D.GENDER = 1 AND D.PRODUCT_CODE IN ('E10001', 'E10002', 'E10003')) AS H
        # ON G.OPTION_CODE = H.OPTION_CODE) AS I
        # JOIN DB_OPTION AS J
        # ON I.OPTION_CODE = J.OPTION_CODE) AS K
        # GROUP BY PRODUCT_CODE
        # UNION
        # SELECT PRODUCT_CODE, GROUP_CONCAT(OPTION_NAME ORDER BY OPTION_NAME), GROUP_CONCAT(COVERAGE ORDER BY OPTION_NAME)
        # FROM(
        # SELECT DISTINCT IFNULL(I.PRODUCT_CODE, 'E10002') AS PRODUCT_CODE, J.OPTION_NAME AS OPTION_NAME, IFNULL(SUM(I.COVERAGE) OVER(PARTITION BY I.OPTION_CODE), 0) AS COVERAGE
        # FROM
        # (SELECT G.PRODUCT_CODE, H.OPTION_CODE AS OPTION_CODE, G.COVERAGE
        # FROM
        # (SELECT E.PRODUCT_CODE, F.COVERAGE, F.OPTION_CODE
        #     FROM PRODUCT_RATE AS E
        #     RIGHT JOIN PRODUCT_OPTION AS F
        #     ON E.PRODUCT_CODE = F.PRODUCT_CODE
        #     WHERE E.AGE = 20 AND E.GENDER = 1 AND E.PRODUCT_CODE = 'E10002') AS G
        # RIGHT JOIN
        # (SELECT DISTINCT C.OPTION_CODE, OPTION_NAME
        # FROM (SELECT DISTINCT A.PRODUCT_CODE, A.OPTION_CODE, B.OPTION_NAME, A.COVERAGE
        #     FROM PRODUCT_OPTION AS A
        #     JOIN DB_OPTION AS B
        #     ON A.OPTION_CODE = B.OPTION_CODE) AS C
        # RIGHT JOIN PRODUCT_RATE AS D
        # ON C.PRODUCT_CODE = D.PRODUCT_CODE
        # WHERE D.AGE = 20 AND D.GENDER = 1 AND D.PRODUCT_CODE IN ('E10001', 'E10002', 'E10003')) AS H
        # ON G.OPTION_CODE = H.OPTION_CODE) AS I
        # JOIN DB_OPTION AS J
        # ON I.OPTION_CODE = J.OPTION_CODE) AS K
        # GROUP BY PRODUCT_CODE
        # UNION
        # SELECT PRODUCT_CODE, GROUP_CONCAT(OPTION_NAME ORDER BY OPTION_NAME), GROUP_CONCAT(COVERAGE ORDER BY OPTION_NAME)
        # FROM(
        # SELECT DISTINCT IFNULL(I.PRODUCT_CODE, 'E10003') AS PRODUCT_CODE, J.OPTION_NAME AS OPTION_NAME, IFNULL(SUM(I.COVERAGE) OVER(PARTITION BY I.OPTION_CODE), 0) AS COVERAGE
        # FROM
        # (SELECT G.PRODUCT_CODE, H.OPTION_CODE AS OPTION_CODE, G.COVERAGE
        # FROM
        # (SELECT E.PRODUCT_CODE, F.COVERAGE, F.OPTION_CODE
        #     FROM PRODUCT_RATE AS E
        #     RIGHT JOIN PRODUCT_OPTION AS F
        #     ON E.PRODUCT_CODE = F.PRODUCT_CODE
        #     WHERE E.AGE = 20 AND E.GENDER = 1 AND E.PRODUCT_CODE = 'E10003') AS G
        # RIGHT JOIN
        # (SELECT DISTINCT C.OPTION_CODE, OPTION_NAME
        # FROM (SELECT DISTINCT A.PRODUCT_CODE, A.OPTION_CODE, B.OPTION_NAME, A.COVERAGE
        #     FROM PRODUCT_OPTION AS A
        #     JOIN DB_OPTION AS B
        #     ON A.OPTION_CODE = B.OPTION_CODE) AS C
        # RIGHT JOIN PRODUCT_RATE AS D
        # ON C.PRODUCT_CODE = D.PRODUCT_CODE
        # WHERE D.AGE = 20 AND D.GENDER = 1 AND D.PRODUCT_CODE IN ('E10001', 'E10002', 'E10003')) AS H
        # ON G.OPTION_CODE = H.OPTION_CODE) AS I
        # JOIN DB_OPTION AS J
        # ON I.OPTION_CODE = J.OPTION_CODE) AS K
        # GROUP BY PRODUCT_CODE
        # """

        # AND A.PRODUCT_CODE IN ('E10001', 'E10002', 'E10003')) D
        
        list2_sql = f"""
        SELECT E.OPTION_CODE as option_code, E.OPTION_NAME as option_name, GROUP_CONCAT(E.PRODUCT_CODE) as product_code, GROUP_CONCAT(E.COVERAGE) as coverage 
        FROM (SELECT D.OPTION_CODE, D.OPTION_NAME, D.PRODUCT_CODE, SUM(D.COVERAGE) AS COVERAGE
        FROM (SELECT A.PRODUCT_CODE, C.OPTION_NAME, B.OPTION_CODE, B.COVERAGE 
        FROM PRODUCT_RATE A, PRODUCT_OPTION B, DB_OPTION C
        WHERE A.PRODUCT_CODE = B.PRODUCT_CODE AND
        B.OPTION_CODE = C.OPTION_CODE
        AND C.OPTION_GROUP_CODE = 'A9500' 
        AND A.GENDER = {gender} 
        AND A.AGE={age}
        AND A.PRODUCT_CODE IN ('{p1}', '{p2}', '{p3}')) D
        GROUP BY D.OPTION_CODE, D.PRODUCT_CODE
        ORDER BY D.OPTION_CODE) E 
        GROUP BY E.OPTION_CODE
        """
        list3_sql = f"""
        SELECT E.OPTION_CODE as option_code, E.OPTION_NAME as option_name, GROUP_CONCAT(E.PRODUCT_CODE) as product_code, GROUP_CONCAT(E.COVERAGE) as coverage 
        FROM (SELECT D.OPTION_CODE, D.OPTION_NAME, D.PRODUCT_CODE, SUM(D.COVERAGE) AS COVERAGE
        FROM (SELECT A.PRODUCT_CODE, C.OPTION_NAME, B.OPTION_CODE, B.COVERAGE 
        FROM PRODUCT_RATE A, PRODUCT_OPTION B, DB_OPTION C
        WHERE A.PRODUCT_CODE = B.PRODUCT_CODE AND
        B.OPTION_CODE = C.OPTION_CODE
        AND C.OPTION_GROUP_CODE = 'A9508' 
        AND A.GENDER = {gender} AND A.AGE= {age}
        AND A.PRODUCT_CODE IN ('{p1}', '{p2}', '{p3}')) D
        GROUP BY D.OPTION_CODE, D.PRODUCT_CODE
        ORDER BY D.OPTION_CODE) E 
        GROUP BY E.OPTION_CODE
        """
        list4_sql = f"""
        SELECT PRODUCT_CODE AS product_code, RATE as rate   
        FROM PRODUCT_RATE A
        WHERE PRODUCT_CODE IN ('{p1}', '{p2}', '{p3}')
        AND AGE = {age}
        AND GENDER = {gender}
        ORDER BY PRODUCT_CODE
        """
        curs.execute(company_sql)
        for row in curs:
            company_list.append(row)


        curs.execute(list0_sql)
        for row in curs:
            list0.append(row)

        curs.execute(list4_sql)
        for row in curs:
            list4.append(row)

        curs.execute(list1_sql)
        for row in curs:
            row['product_code'] = row['product_code'].split(',')
            row['coverage'] = row['coverage'].split(',')
            list1.append(row)

        curs.execute(list2_sql)
        for row in curs:
            row['product_code'] = row['product_code'].split(',')
            row['coverage'] = row['coverage'].split(',')
            list2.append(row)


        curs.execute(list3_sql)
        for row in curs:
            row['product_code'] = row['product_code'].split(',')
            row['coverage'] = row['coverage'].split(',')
            list3.append(row)

        # db 접속 종료
        curs.close()
        conn.close()

        data = {
            'company': company_list,
            '치츄지수' : list0,
            '가격' : list4,
            '치아보철치료' : list1,
            '치아보존치료' : list2,
            '치수치료': list3
        }
        return Response(data)

    else:
        # 회사, 치츄 지수 
        company_sql = f"""
        SELECT DISTINCT A.PRODUCT_CODE AS product_code,
        B.PRODUCT_NAME AS product_name,
        C.COMPANY_CODE as company_code,
        C.COMPANY_NAME as company_name
        
        FROM PRODUCT_RATE A, 
        PRODUCT B,
        COMPANY C

        WHERE AGE = {age}
        AND GENDER = {gender}
        AND A.PRODUCT_CODE = B.PRODUCT_CODE
        AND B.COMPANY_CODE = C.COMPANY_CODE 
        AND A.PRODUCT_CODE IN ('{p1}', '{p2}')
        """

        list0_sql = f"""
        SELECT DISTINCT A.PRODUCT_CODE AS product_code,
        A.TOTAL_INDEX AS total_index 
        
        FROM PRODUCT_RATE A, 
        PRODUCT B
        WHERE AGE = {age}
        AND GENDER = {gender}
        AND A.PRODUCT_CODE = B.PRODUCT_CODE
        AND A.PRODUCT_CODE IN ('{p1}', '{p2}')
        """

        list4_sql = f"""
        SELECT PRODUCT_CODE AS product_code, RATE as rate   
        FROM PRODUCT_RATE A
        WHERE PRODUCT_CODE IN ('{p1}', '{p2}')
        AND AGE = {age}
        AND GENDER = {gender}
        ORDER BY PRODUCT_CODE
        """
        # 2. 치아보철치료비
        list1_sql = f"""
        SELECT E.OPTION_CODE as option_code, E.OPTION_NAME as option_name, GROUP_CONCAT(E.PRODUCT_CODE) as product_code, GROUP_CONCAT(E.COVERAGE) as coverage 
        FROM (SELECT D.OPTION_CODE, D.OPTION_NAME, D.PRODUCT_CODE, SUM(D.COVERAGE) AS COVERAGE
        FROM (SELECT A.PRODUCT_CODE, C.OPTION_NAME, B.OPTION_CODE, B.COVERAGE 
        FROM PRODUCT_RATE A, PRODUCT_OPTION B, DB_OPTION C
        WHERE A.PRODUCT_CODE = B.PRODUCT_CODE AND
        B.OPTION_CODE = C.OPTION_CODE
        AND C.OPTION_GROUP_CODE = 'A9509' 
        AND A.GENDER = {gender}
        AND A.AGE= {age}
        AND A.PRODUCT_CODE IN ('{p1}', '{p2}')) D
        GROUP BY D.OPTION_CODE, D.PRODUCT_CODE
        ORDER BY D.OPTION_CODE) E 
        GROUP BY E.OPTION_CODE
        """
        
        
        
        list2_sql = f"""
        SELECT E.OPTION_CODE as option_code, E.OPTION_NAME as option_name, GROUP_CONCAT(E.PRODUCT_CODE) as product_code, GROUP_CONCAT(E.COVERAGE) as coverage 
        FROM (SELECT D.OPTION_CODE, D.OPTION_NAME, D.PRODUCT_CODE, SUM(D.COVERAGE) AS COVERAGE
        FROM (SELECT A.PRODUCT_CODE, C.OPTION_NAME, B.OPTION_CODE, B.COVERAGE 
        FROM PRODUCT_RATE A, PRODUCT_OPTION B, DB_OPTION C
        WHERE A.PRODUCT_CODE = B.PRODUCT_CODE AND
        B.OPTION_CODE = C.OPTION_CODE
        AND C.OPTION_GROUP_CODE = 'A9500' 
        AND A.GENDER = {gender} 
        AND A.AGE={age}
        AND A.PRODUCT_CODE IN ('{p1}', '{p2}')) D
        GROUP BY D.OPTION_CODE, D.PRODUCT_CODE
        ORDER BY D.OPTION_CODE) E 
        GROUP BY E.OPTION_CODE
        """

        list3_sql = f"""
        SELECT E.OPTION_CODE as option_code, E.OPTION_NAME as option_name, GROUP_CONCAT(E.PRODUCT_CODE) as product_code, GROUP_CONCAT(E.COVERAGE) as coverage 
        FROM (SELECT D.OPTION_CODE, D.OPTION_NAME, D.PRODUCT_CODE, SUM(D.COVERAGE) AS COVERAGE
        FROM (SELECT A.PRODUCT_CODE, C.OPTION_NAME, B.OPTION_CODE, B.COVERAGE 
        FROM PRODUCT_RATE A, PRODUCT_OPTION B, DB_OPTION C
        WHERE A.PRODUCT_CODE = B.PRODUCT_CODE AND
        B.OPTION_CODE = C.OPTION_CODE
        AND C.OPTION_GROUP_CODE = 'A9508' 
        AND A.GENDER = {gender} AND A.AGE= {age}
        AND A.PRODUCT_CODE IN ('{p1}', '{p2}')) D
        GROUP BY D.OPTION_CODE, D.PRODUCT_CODE
        ORDER BY D.OPTION_CODE) E 
        GROUP BY E.OPTION_CODE
        """

        curs.execute(company_sql)
        for row in curs:
            company_list.append(row)

        curs.execute(list0_sql)
        for row in curs:
            list0.append(row)
            
        curs.execute(list4_sql)
        for row in curs:
            list4.append(row)
        curs.execute(list1_sql)
        for row in curs:
            row['product_code'] = row['product_code'].split(',')
            row['coverage'] = row['coverage'].split(',')
            list1.append(row)

        curs.execute(list2_sql)
        for row in curs:
            row['product_code'] = row['product_code'].split(',')
            row['coverage'] = row['coverage'].split(',')
            list2.append(row)


        curs.execute(list3_sql)
        for row in curs:
            row['product_code'] = row['product_code'].split(',')
            row['coverage'] = row['coverage'].split(',')
            list3.append(row)

        # db 접속 종료
        curs.close()
        conn.close()

        data = {
            'company': company_list,
            '치츄지수' : list0,
            '가격' : list4,
            '치아보철치료' : list1,
            '치아보존치료' : list2,
            '치수치료': list3
        }

        return Response(data)     
