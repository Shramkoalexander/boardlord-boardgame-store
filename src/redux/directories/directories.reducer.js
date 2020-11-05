const initialState = {
  mainMenu: [
    { path: "shop", title: "Магазин" },
    { path: "about", title: "О компании" },
    { path: "discounts", title: "Скидки" },
    { path: "delivery", title: "Доставка" },
    { path: "payment", title: "Оплата" },
  ],
  categories: [
    { path: "cooperative", title: "Кооперативные" },
    { path: "party", title: "Игры для вечеринок" },
    { path: "two-players", title: "Игра на двоих" },
    { path: "family", title: "Семейные" },
    { path: "economic", title: "Экономические" },
    { path: "strategic", title: "Стратегические" },
    { path: "abstract-and-logic", title: "Абстрактные" },
  ],

  selections: [
    { path: "top", title: "Топ игр" },
    { path: "new-games", title: "Новинки" },
    { path: "discounts", title: "Скидки" },
  ],

  other: [
    { path: "all-games", title: "Все игры" },
    { path: "search", title: "Результаты поиска" },
    { path: "cart", title: "Корзина" },
    { path: "favorites", title: "Избранное" },
    { path: "sign-in", title: "Вход в личный кабинет" },
    { path: "sign-up", title: "Регистрация" },
  ],
};

const directoriesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

export default directoriesReducer;
