FROM python:3.9

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

ENTRYPOINT python chichu/manage.py runserver 0:8000