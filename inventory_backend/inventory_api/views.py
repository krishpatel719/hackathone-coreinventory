import json
import hashlib

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection, transaction


@csrf_exempt
def user_signup(request):

    if request.method != "POST":
        return JsonResponse({"error": "POST request required"}, status=405)

    try:
        data = json.loads(request.body)

        first_name = data.get("first_name")
        last_name = data.get("last_name")
        email = data.get("email")
        contact_number = data.get("contact_number")
        password = data.get("password")

        if not email or not password:
            return JsonResponse({"error": "Email and password required"}, status=400)

        # Hash password
        hashed_password = hashlib.sha256(password.encode()).hexdigest()

        with connection.cursor() as cursor:

            # Check if user exists
            cursor.execute(
                "SELECT id FROM users WHERE email=%s",
                [email]
            )

            if cursor.fetchone():
                return JsonResponse({"error": "User already exists"}, status=400)

            # Insert user
            cursor.execute(
                """
                INSERT INTO users
                (first_name, last_name, email, contact_number, password)
                VALUES (%s, %s, %s, %s, %s)
                """,
                [first_name, last_name, email, contact_number, hashed_password]
            )

        return JsonResponse({
            "message": "User registered successfully"
        })

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)



@csrf_exempt
def users_login(request):

    if request.method != "POST":
        return JsonResponse({"error": "POST request required"}, status=405)

    try:

        data = json.loads(request.body)

        email = data.get("email")
        password = data.get("password")

        hashed_password = hashlib.sha256(password.encode()).hexdigest()

        with connection.cursor() as cursor:

            cursor.execute(
                """
                SELECT id, first_name, last_name, isAdmin
                FROM users
                WHERE email=%s AND password=%s
                """,
                [email, hashed_password]
            )

            user = cursor.fetchone()

            if not user:
                return JsonResponse({"error": "Invalid email or password"}, status=401)

            return JsonResponse({
                "message": "Login successful",
                "user_id": user[0],
                "first_name": user[1],
                "last_name": user[2],
                "isAdmin": user[3]
            })

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    

# TODO: Add product view

@csrf_exempt
def add_product(request):

    if request.method != "POST":
        return JsonResponse({"error": "POST request required"}, status=405)

    try:
        data = json.loads(request.body)

        name = data.get("name")
        sku = data.get("sku")
        category_id = int(data.get("category_id"))
        unit = data.get("unit")

        warehouse_id = int(data.get("warehouse_id"))
        quantity = int(data.get("quantity"))

        created_by = 1  # replace later with logged-in user id

        if not name or not sku:
            return JsonResponse({"error": "Name and SKU are required"}, status=400)

        with transaction.atomic():

            with connection.cursor() as cursor:

                # Check duplicate SKU
                cursor.execute(
                    "SELECT id FROM products WHERE sku=%s",
                    [sku]
                )
                if cursor.fetchone():
                    return JsonResponse(
                        {"error": "SKU already exists"},
                        status=400
                    )

                # Insert product
                cursor.execute("""
                    INSERT INTO products (name, sku, category_id, unit)
                    VALUES (%s, %s, %s, %s)
                """, [name, sku, category_id, unit])

                product_id = cursor.lastrowid

                # Create stock entry
                cursor.execute("""
                    INSERT INTO stock (product_id, warehouse_id, quantity)
                    VALUES (%s, %s, %s)
                """, [product_id, warehouse_id, quantity])

                # Log stock movement
                cursor.execute("""
                    INSERT INTO stock_movements
                    (product_id, source_warehouse, destination_warehouse, quantity, movement_type, created_by)
                    VALUES (%s, NULL, %s, %s, 'RECEIPT', %s)
                """, [product_id, warehouse_id, quantity, created_by])

        return JsonResponse({
            "message": "Product created successfully",
            "product_id": product_id
        })

    except Exception as e:
        return JsonResponse({
            "error": str(e)
        }, status=500)


def get_products(request):

    try:

        with connection.cursor() as cursor:

            cursor.execute("""
                SELECT p.id, p.name, p.sku, p.category_id, p.unit,
                       IFNULL(s.quantity,0)
                FROM products p
                LEFT JOIN stock s
                ON p.id = s.product_id
            """)

            rows = cursor.fetchall()

        products = []

        for r in rows:
            products.append({
                "id": r[0],
                "name": r[1],
                "sku": r[2],
                "category_id": r[3],
                "unit": r[4],
                "quantity": r[5]
            })

        return JsonResponse({"products": products})

    except Exception as e:

        return JsonResponse({"error": str(e)}, status=500)
    


### Receipt creation view

@csrf_exempt
def add_receipt(request):

    if request.method != "POST":
        return JsonResponse({"error": "POST request required"}, status=405)

    try:

        data = json.loads(request.body)

        supplier_name = data.get("supplier_name")
        warehouse_id = data.get("warehouse_id")
        product_id = data.get("product_id")
        quantity = data.get("quantity")

        # Validate input
        if not supplier_name or not warehouse_id or not product_id or not quantity:
            return JsonResponse({"error": "All fields are required"}, status=400)

        warehouse_id = int(warehouse_id)
        product_id = int(product_id)
        quantity = int(quantity)

        created_by = 1

        with transaction.atomic():

            with connection.cursor() as cursor:

                # Create receipt
                cursor.execute("""
                    INSERT INTO receipts (supplier_name, status, created_by)
                    VALUES (%s, 'DONE', %s)
                """, [supplier_name, created_by])

                receipt_id = cursor.lastrowid


                # Insert receipt item
                cursor.execute("""
                    INSERT INTO receipt_items (receipt_id, product_id, quantity)
                    VALUES (%s, %s, %s)
                """, [receipt_id, product_id, quantity])


                # Check if stock row exists
                cursor.execute("""
                    SELECT id, quantity
                    FROM stock
                    WHERE product_id=%s AND warehouse_id=%s
                """, [product_id, warehouse_id])

                stock = cursor.fetchone()


                if stock:

                    stock_id = stock[0]
                    current_qty = stock[1]
                    new_qty = current_qty + quantity

                    cursor.execute("""
                        UPDATE stock
                        SET quantity=%s
                        WHERE id=%s
                    """, [new_qty, stock_id])

                else:

                    cursor.execute("""
                        INSERT INTO stock (product_id, warehouse_id, quantity)
                        VALUES (%s, %s, %s)
                    """, [product_id, warehouse_id, quantity])


                # Log movement
                cursor.execute("""
                    INSERT INTO stock_movements
                    (product_id, source_warehouse, destination_warehouse, quantity, movement_type, created_by)
                    VALUES (%s, NULL, %s, %s, 'RECEIPT', %s)
                """, [product_id, warehouse_id, quantity, created_by])


        return JsonResponse({
            "message": "Receipt added successfully",
            "receipt_id": receipt_id
        })


    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
def get_receipts(request):

    if request.method != "GET":
        return JsonResponse({"error": "GET required"}, status=405)

    try:

        with connection.cursor() as cursor:

            cursor.execute("""
                SELECT
                    r.id,
                    r.supplier_name,
                    r.status,
                    r.created_at
                FROM receipts r
                ORDER BY r.id DESC
            """)

            rows = cursor.fetchall()

        receipts = []

        for r in rows:

            receipts.append({
                "id": r[0],
                "supplier_name": r[1],
                "status": r[2],
                "created_at": r[3]
            })

        return JsonResponse({
            "receipts": receipts
        })


    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)