# Card validation

## Project Setup

```sh
npm install
```

```sh
npm install --global yarn
```

```sh
yarn install
```

### Start Development version

```sh
npm run dev
```

# Описание проекта

## структура проекта

1. Каталог товаров
2. Страница просмотра товаров
3. Корзина
4. Страница оформления заказа
5. Страница оплаты заказа

## Используемые технологии

1. Vue.js 3 - фреймворк для написания фронтенд приложений.
2. axios - HTTP-клиент для Node.js. В проекте используется для записи данных в базу данных.
3. sqlite - Node.js библиотека для работы с SQLite базами данных.
4. TypeScript - язык программирования на котором был написан проект. TypeScript расширяет возможности JavaScript.
5. pinia - расширение для Vue.js. Используется для сохранения информации в localStorage браузера. В проекте используется для хранения информации о товарах + для сохранения корзины.
6. vue-router - Расширение для Vue.js. Используется в создании Single Page Application(SPA). SPA - это приложения с обновлением информации без перезагрузки страницы.

## Работа приложения

Для запуска проекта используется команда `npm run dev`, которая запустить dev версию приложения без компиляции в обычный html, css и js. После этого в консоли с запущенной командой по запуску приложения будет отображаться ссылка на это приложение. Если перейти по ней, откроется сайт.

Каталог товаров записан в pinia. в формате массива объектов, описанных с помощью TypeScript. Описание товара <Вставить код из файла src/types/TProduct>. Каталог товаров  <Вставить код из файла src/stores/productStore>.

По клику на карточку товара открывается страница просмотра данного товара. На странице доступна кнопка "Купить", которая добавляет товар в корзину.

Описание корзины <Вставить код из файла src/stores/cartStore>.

Описание объекта корзины <Вставить код из файла src/types/TCart>.

Если товар находится в корзине, то вместо кнопки "Купить", будут отображаться кнопки плюс и минус. Также будет отображаться текущее число экземпляров в корзине.

В шапке сайта есть иконка корзины, которая активна только втом случае, если в корзину добавлен хотя бы один товар.

На странице корзины есть возможность посмотреть информацию о добавленных товарах, а также их количество и стоимость. В нижней части страницы отображается итоговая цена и кнопка "Оформить", по клику на которую открывется форма оформления заказа.

На странице оформления заказа находятся поля ввода имени, фамилии, адреса и почты. По клику на кнопку "Продолжить", открывается форма для заполнения данных карты. По клику на кнопку "Готово", очищается корзина и в базу данных записывается информация о пользователе, введенная на странице оформления заказа.