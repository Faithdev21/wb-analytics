# 📈 Wildberries Analytics

Аналитическая платформа для сбора, хранения и визуализации информации о товарах с Wildberries.

### 🚀 Возможности:
- 📊 Гистограмма распределения цен по товарам
- 📈 Линейная зависимость скидки от рейтинга
- 🔍 Фильтрация по цене, рейтингу, количеству отзывов
- 📥 Парсинг товаров по поисковому запросу
- 📋 Таблица с сортировкой и пагинацией

---

## 📸 Скриншоты


---

## 🧰 Технологии

**Backend:**
- Python 3.x
- Django
- Django REST Framework (DRF)
- SQLite
- Celery + Redis (для парсинга по расписанию, опционально)
- BeautifulSoup (или Requests/Playwright) для парсинга

**Frontend:**
- React + MUI
- Chart.js (react-chartjs-2)
- Axios

**DevOps:**
- Docker, docker-compose
- Swagger/OpenAPI
- .env

---

## ⚙️ Установка и запуск

### 🐳 Быстрый запуск в Docker

```bash
git clone https://github.com/your-name/wb-analytics.git
cd wb-analytics

cp .env.example .env
docker-compose up --build
```

После запуска:

- 🌐 Frontend: [http://localhost:3000](http://localhost:3000)
- ⚙️ API: [http://localhost:8000/api/products/](http://localhost:8000/api/products/)
- 📚 Документация API Swagger: [http://localhost:8000/swagger/](http://localhost:8000/swagger/)

---

### 🛠 .env пример:

```env
DEBUG=1

POSTGRES_DB=wb_analytics
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=db
POSTGRES_PORT=5432

DJANGO_SECRET_KEY=your_secret_key_here
DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1 [::1]
```

---

## 📡 Парсинг товаров с Wildberries

Вы можете запустить парсинг по ключевому слову:

```bash
docker-compose exec backend python manage.py parse_wildberries "смартфоны"
```

Товары сохраняются в базу данных с полями:
- Название
- Цена и цена со скидкой
- Рейтинг
- Кол-во отзывов

---

## 🎨 Фильтрация и визуализация

Фронтенд позволяет:

- Выбрать минимальную цену, рейтинг, количество отзывов
- Отфильтровать таблицу и обновить данные
- Построить графики:
  - **Гистограмма по цене**
  - **Линейный график скидка vs рейтинг**

---

## 🔗 API

Пример запроса:

```
GET /api/products/?min_price=1000&min_rating=4.2&min_reviews=50
```

### Пример JSON:

```json
{
  "id": 102,
  "name": "Смартфон Samsung Galaxy",
  "price": 29990,
  "discount_price": 24990,
  "rating": 4.6,
  "review_count": 1240
}
```

---

## 📁 Структура проекта

```bash
.
├── backend/
│   ├── manage.py
│   ├── products/          # Модель товара, сериализаторы, views
│   ├── parser/            # Скрипт парсера с Wildberries
│   ├── core/              # Настройки Django
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── ...
├── docker-compose.yml
├── .env
├── Dockerfile
└── README.md
```

---

## 🧪 Тесты

```bash
docker-compose exec backend python manage.py test
```

---

## 💬 Контакты

Разработчик: [@your_tg_username](https://t.me/your_tg_username)  
По вопросам: issues / pull requests welcome!

---

## ✅ Планы на будущее

- [ ] 🔄 Автоматический парсинг по расписанию (Celery + Redis)
- [ ] 📊 Больше графиков: "рейтинги по бренду", "динамика цен"
- [ ] 📱 Мобильная адаптация
- [ ] 🔐 Авторизация и дашборды по пользователям

---

MIT License
```

---

## 💡 Подсказки

### 1. Сохрани файл как:

```
📁 корень проекта
└── README.md
```

### 2. Создай `.env.example`

Если у тебя есть `.env`, скопируй его и назови `.env.example`, чтобы другие знали, как запустить проект.

---

## Хочешь?

- Настрою CI/CD (GitHub Actions)
- Добавлю поддержку `.env.production` + билд webpack
- Залью проект на Render / Railway / VPS

✍️ Пиши, и сделаем полный deploy-план!