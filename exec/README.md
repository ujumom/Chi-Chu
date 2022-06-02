## 프로젝트명

빅데이터 치아 보험 추천 서비스, 치츄 (Chi Chu)



### AWS

```
웹 접속 주소 : http://j6d206.p.ssafy.io/
mobaxterm으로 접속 시 : ssh -i J6D204T.pem ubuntu@j6d206.p.ssafy.io
```



### MYSQL workbench 접속

```
mysql 'version': '8.0.28-0ubuntu0.20.04.3'

host : 'chichu@221.153.81.232'
user_name : chichu
user_password : ssafy
port : 3306
```



### 라이브러리 설치, 코드 실행

```
[back build] 
/S06P22D206/back
$ pip install -r requirements.txt
/S06P22D206/back/chichu
$ python manage.py makemigrations
$ python manage.py migrate
$ python manage.py runserver


[front build]
/S06P22D206/frontend
$ npm i 
$ npm start
```



### jenkins <=> gitlab

```
[jenkins]
주소 : http://j6d206.p.ssafy.io:9090/
- id : chichu
- pw : ssafy
- token : 729482e3c7a0000401f32fecf080e172

[gitlab]
- gitlab webhook : http://j6d206.p.ssafy.io:9090/project/chichu
- gitlab token : RrGRjYjnXr9XxUexxUE3
```



### nginx_proxy 설정

#### nginx.conf

```
user nginx; 
worker_processes auto; 
worker_priority 0; 

error_log /var/log/nginx/error.log notice;
pid /var/run/nginx.pid;

events {
	worker_connections 1024; ## Default: 1024, 현 서버는 RAM 8GB라 상향조정
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
    
    access_log /var/log/nginx/access.log main;
    
    sendfile on;
    keepalive_timeout 65;
    server_tokens off;
    
    upstream frontend {
        server front:3000;
        keepalive 32;
    }    
    
    upstream backend {
        server back:8000;
        keepalive 32;
    }
    
    include /etc/nginx/conf.d/*.conf;
}

```



#### nginx/conf.d/default.conf

```
server {
    listen 80;
    listen [::]:80;
    server_name j6d206.p.ssafy.io;

    #access_log /var/log/nginx/host.access.log main;

    location / {
        proxy_pass http://frontend;
    }

    location /api/ {
        proxy_pass http://backend;
    }

    #error_page 404 /404.html;
    # redirect server error pages to the static page /50x.html
    #

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }

}
```



### DB 덤프파일 설치

```none
sudo mysqldump  -h 127.0.0.1 --user=chichu -p --all-databases > all_databases.sql
```





