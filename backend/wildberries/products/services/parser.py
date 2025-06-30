import requests

from api.constants import ZERO, HUNDRED, DEFAULT_SPP, DELAY, START_PAGE
from products.models import Product
import time


def extract_price_from_sizes(sizes):
    """
    Перебирает sizes и возвращает первую найденную валидную цену и скидку.
    """
    for size in sizes:
        price_data = size.get("price")
        if price_data:
            basic_price = price_data.get("basic", ZERO) / HUNDRED
            discount_price = price_data.get("product", ZERO) / HUNDRED
            if basic_price > ZERO and discount_price > ZERO:
                return basic_price, discount_price
    return 0, 0


def parse_products(keyword="смартфон", dest="-1257786", spp=DEFAULT_SPP, delay=DELAY):
    """
    Парсит товары Wildberries по ключевому слову.
    Автоматически проходит все страницы пока возвращаются товары.
    """
    Product.objects.all().delete()
    print(f"🧹 После удаления товаров в БД: {Product.objects.count()}")
    headers = {
        'User-Agent': (
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
            'AppleWebKit/537.36 (KHTML, like Gecko) '
            'Chrome/122.0.0.0 Safari/537.36'
        )
    }

    total_saved = 0
    page = START_PAGE

    while True:
        print(f"\n🔍 Парсим «{keyword}», страница {page}")
        url = 'https://search.wb.ru/exactmatch/ru/common/v5/search'
        params = {
            'query': keyword,
            'page': page,
            'sort': 'popular',
            'resultset': 'catalog',
            'spp': spp,
            'dest': dest,
        }

        try:
            response = requests.get(url, headers=headers, params=params, timeout=10)
        except requests.RequestException as e:
            print(f"❌ Ошибка запроса: {e}")
            break

        if response.status_code != 200:
            print(f"❌ HTTP ошибка: {response.status_code}")
            break

        try:
            data = response.json()
        except Exception as e:
            print(f"❌ Ошибка парсинга JSON: {e}")
            break

        products = data.get("data", {}).get("products", [])
        print(f"📦 Найдено товаров на странице: {len(products)}")

        if not products:
            print("✅ Парсинг завершён: больше товаров нет.")
            break

        for item in products:
            name = item.get("name", "Без названия")
            wb_id = item.get("id")

            if not wb_id:
                print(f"⚠️ Пропущен товар без ID: {name}")
                continue

            sizes = item.get("sizes", [])
            price, discount_price = extract_price_from_sizes(sizes)

            if price == 0 or discount_price == 0:
                print(f"⛔ Пропущен без цены: {name}")
                continue

            rating = item.get("reviewRating", 0.0)
            reviews = item.get("feedbacks", ZERO)

            obj, created = Product.objects.update_or_create(
                wb_id=wb_id,
                defaults={
                    'name': name,
                    'price': price,
                    'discount_price': discount_price,
                    'rating': rating,
                    'review_count': reviews
                }
            )

            action = "✨ Добавлен" if created else "🔁 Обновлён"
            print(f"{action}: {name} | {price}₽ → {discount_price}₽ | ★ {rating} | 💬 {reviews}")
            total_saved += 1

        page += 1
        time.sleep(delay)

    print(f"\n✅ Всего обработано товаров: {total_saved}")
