from django.urls import path
from . import views

urlpatterns = [
    path("signup/", views.user_signup),
    path("login/", views.users_login),

    path("products/add-product/", views.add_product),
    path("products/get-products/", views.get_products),

    path("receipts/add-receipt/", views.add_receipt),
    path("receipts/get-receipts/", views.get_receipts),
]