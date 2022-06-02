from django.urls import path
from . import views

app_name = 'search'

urlpatterns = [
    # 1차 검색
    path('default/<int:age>/<int:gender>/', views.default),
    # 2차 검색
    path('detail/<int:age>/<int:gender>/<int:py>/', views.detail),
    # 세부보험 
    path('product/<str:product_code>/<int:age>/<str:gender>/<int:py>', views.product),
    # 보험 비교 
    path('compare/<int:age>/<int:gender>/<str:codes>', views.compare)    
]