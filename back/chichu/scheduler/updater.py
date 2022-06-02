from apscheduler.schedulers.background import BackgroundScheduler
from .jobs import schedule_api

scheduler = BackgroundScheduler(timezone='Asia/Seoul')
job = None

def start():
    global job
    job = scheduler.add_job(schedule_api, 'interval', weeks=16, id='update_index')
    try:
        scheduler.start()
    except:
        pass