# BEAM

Бэкенд интернет-каталога мебели на **Nuxt 4 (Nitro)** с базой данных, загрузкой изображений и админскими методами.

## Стек

- **Nuxt 4 / Nitro** — фреймворк и серверный движок (`server/`)
- **PostgreSQL + Drizzle ORM** — база данных и миграции
- **MinIO / S3** — хранилище изображений (публичный bucket)
- **zod** — валидация запросов
- Авторизация — нативная: сессия через h3 `useSession` (зашифрованная HttpOnly-кука), хеш пароля через `node:crypto` (scrypt)
- Документация API — встроенный в Nitro OpenAPI + Scalar

## Структура

```
server/
  api/         # тонкие роуты по ресурсам: categories, products, catalog, contacts, media, auth
  services/    # бизнес-логика + работа с БД: catalog, categories, products, contacts, auth
  validation/  # zod-схемы по сущностям: common, categories, products, contacts, auth
  db/          # схема Drizzle, подключение, миграции (migrate.ts), сидер (seed.ts)
  utils/       # cross-cutting: respond (ok-обёртка + defineApiHandler), s3, auth
shared/        # общие типы (auto-import на клиенте и сервере)
drizzle/       # сгенерированные SQL-миграции
drizzle.config.ts
db.docker-compose.yaml   # инфраструктура: postgres + minio
docker-compose.yaml      # полный стек: app + postgres + minio
Dockerfile
BEAM.postman_collection.json
```

Роуты тонкие: `defineRouteMeta` (OpenAPI) + валидация (zod) + вызов сервиса. Вся логика и работа с БД — в `services/`; защита админских мутаций — в обёртке `defineApiHandler` (`{ admin: true }`). Серверные импорты идут через алиас `~~/server/...` и `~~/shared/...` (без относительных путей).

## Быстрый старт

```bash
# 1. переменные окружения
cp .env.example .env        # при необходимости отредактируйте значения

# 2. зависимости
npm install

# 3. инфраструктура (postgres + minio в Docker)
npm run db:up

# 4. таблицы и тестовые данные
npm run migrate
npm run seed

# 5. dev-сервер на http://localhost:3000
npm run dev
```

- Документация API (Scalar): `http://localhost:3000/_scalar`
- OpenAPI-спека: `http://localhost:3000/_openapi.json`
- Консоль MinIO: `http://localhost:9001` (логин/пароль из `.env`)
- Админ-пароль для `login` — значение `ADMIN_PASSWORD` из `.env`

## npm-скрипты

| Скрипт | Назначение |
|---|---|
| `npm run dev` | dev-сервер |
| `npm run build` / `npm run preview` | прод-сборка / локальный предпросмотр |
| `npm run db:up` | поднять postgres + minio (`db.docker-compose.yaml`) |
| `npm run db:down` | остановить и удалить инфраструктуру |
| `npm run db:generate` | сгенерировать SQL-миграцию из изменений схемы |
| `npm run migrate` | применить миграции |
| `npm run seed` | заполнить БД тестовыми данными |
| `npm run db:studio` | Drizzle Studio — GUI для просмотра данных БД |

## API

Доступ задаётся HTTP-методом: `GET` — публично, мутации (`POST/PUT/DELETE`) — только с сессией админа.

**Публичные**

| Метод | Назначение |
|---|---|
| `GET /api/categories` | список категорий |
| `GET /api/products/:id` | товар по id (полный) |
| `GET /api/catalog` | плоский каталог: категория → её товары → … (товары без категории в конце) |
| `GET /api/contacts` | список контактов |

**Админские** (требуют сессию)

| Метод | Назначение |
|---|---|
| `POST /api/auth/login` · `POST /api/auth/logout` | вход / выход |
| `POST·PUT·DELETE /api/categories[/:id]` | CRUD категорий (delete → 409, если есть товары) |
| `POST·PUT·DELETE /api/products[/:id]` | CRUD товаров |
| `POST·PUT·DELETE /api/contacts[/:id]` | CRUD контактов |
| `POST /api/media/upload` | загрузка картинки (`multipart/form-data`, поле `file`) → `{ src, alt }` |

Загрузка изображений: грузим файл через `media/upload`, получаем `{ src, alt }` и подставляем `src` в `previewImages` / `category.images` / `variations[].colors[].images` при создании/обновлении.

## Формат ответов

Все ответы API приходят в едином виде (HTTP-статусы при этом остаются осмысленными):

```jsonc
// успех
{ "ok": true, "data": <тело>, "meta"?: { ... } }

// ошибка
{ "ok": false, "error": { "code": 404, "message": "Product not found" } }
```

- списки → `data` = массив, одиночная сущность → `data` = объект;
- `delete` → `data: { id }`; `login` / `logout` → `data: null`;
- `media/upload` → `data: { src, alt }`.

Типы `ApiSuccess<T>` / `ApiError` / `ApiResponse<T>` доступны из [shared/types.ts](shared/types.ts) (авто-импорт на клиенте). Этот формат формируется обёрткой `defineApiHandler` в [server/utils/respond.ts](server/utils/respond.ts), она же централизованно проверяет админскую сессию (`{ admin: true }`).

> Краевой случай: ошибки до входа в роут (несуществующий путь → 404, неподдержанный метод → 405) отдаются в стандартном формате Nitro, а не в формате `{ ok, ... }`.

## Ручное тестирование

Импортируйте [BEAM.postman_collection.json](BEAM.postman_collection.json) в Postman и прогоните сверху вниз (login → создать категорию → загрузить картинку → создать товар → каталог). Сессионная кука после логина подхватывается автоматически.

## Запуск всего в Docker

```bash
docker compose up --build
```

Поднимает `app + postgres + minio`; миграции и сид прогоняются автоматически (one-shot сервис `migrate`). Приложение — на `http://localhost:3000`.

## Переменные окружения

См. [.env.example](.env.example): `DATABASE_URL`, `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_DB` (нужны docker-compose), `AUTH_SECRET` (≥32 символов), `ADMIN_PASSWORD`, `S3_ENDPOINT`, `S3_PUBLIC_URL`, `S3_BUCKET`, `S3_ACCESS_KEY`, `S3_SECRET_KEY`.
