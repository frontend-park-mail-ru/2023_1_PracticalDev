# 2023_1_PracticalDev

Проект Pinterest команды "Practical Dev"

[Ссылка на репозиторий по бекенду](https://github.com/go-park-mail-ru/2023_1_PracticalDev)

Ссылка на деплой - [сайт](http://pickpin.ru), [api](http://pickpin.ru/api), [OpenAPI](http://pickpin.ru/api/docs)
## Авторы 

- [Гречко Георгий](https://github.com/geogreck)

- [Кирилл Киселев](https://github.com/t1d333)

- [Евгений Димитриев](https://github.com/UjinIaly)

- [Вячеслав Шагалов](https://github.com/SlavaShagalov)

## Менторы

- [Фарис Набиев](https://github.com/rflban) - Frontend

- [Дмитрий Ильин](https://github.com/Neytrinoo) - Backend



## Руководство по использованию:

|                |                                                                         |
|----------------|-------------------------------------------------------------------------|
| make run       | запуск контейнера с `node js` 19-й версии                               |
| make dev       | запуск фронта для интеграции (требует предварительного запуска бэкенда) |
| make dev-down  | отключение фронта для интеграции                                        |
| make mock      | запуск фронта с моковым бэком на `express js`                           |
| make mock-down | выключение фронта с моковым бэком                                       |

Предварительно нужно прописать npm install (желательно в контейнере, запущенном с помощью make run)

Фронтенд доступен на [localhost](http://localhost) или [localhost:8000](http://localhost:8000)

Бэкенд доступен на [localhost/api](http://localhost/api) или [localhost:8080](http://localhost:8080)

OpenAPI доступен на [localhost/api/docs](http://localhost/api/docs)
