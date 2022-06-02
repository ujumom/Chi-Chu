from django.conf import settings
import pymysql

def schedule_api():
    host = "j6d206.p.ssafy.io"
    user = "chichu"
    pw = "ssafy"
    db = "chichu"
    charset = 'UTF8'

    conn = pymysql.connect(host = host, user = user, password = pw, db = db, charset = charset)
    curs = conn.cursor(pymysql.cursors.DictCursor)

    try:
        update_index_sqls = [
            f"UPDATE PRODUCT_RATE SET TOTAL_INDEX = ROUND((2*COMPANY_INDEX+3*PRODUCT_INDEX+USER_INDEX)/6, 2)"
        ]
        for SQL in update_index_sqls: curs.execute(SQL)
        conn.commit()
    except:
        conn.rollback()

    curs.close
    conn.close