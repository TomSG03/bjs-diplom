'use strict'

//Выход из личного кабинета
let logoutUser = new LogoutButton();

logoutUser.action = () => ApiConnector.logout((result) => { 
   if (result.success === true) {
    location.reload();
   }});

//Получение текущих курсов валюты
let rates = new RatesBoard();

rates.getCurrency = () => {
  ApiConnector.getStocks(result => {
    if (result.success === true) {
      rates.clearTable();
      rates.fillTable(result.data);
    }
  });
};

rates.getCurrency();
let timerCurrency = setInterval(rates.getCurrency, 60000);

//Получение информации о пользователе
ApiConnector.current(result => {
  if (result.success === true) {
    ProfileWidget.showProfile(result.data);
  }
});

//Операции с деньгами
let money = new MoneyManager();
money.addMoneyCallback = (data) => ApiConnector.addMoney(data, money.workMoney) 
money.conversionMoneyCallback  = (data) => ApiConnector.convertMoney(data, money.workMoney) 
money.sendMoneyCallback  = (data) => ApiConnector.transferMoney(data, money.workMoney) 

money.workMoney = (result) => {
  if (result.success === true) {
    ProfileWidget.showProfile(result.data);
    money.setMessage(result.success, 'Успешно');
  } else  {
    money.setMessage(result.success, result.error);
  } 
}

//Работа с избранным
let favorites = new FavoritesWidget();
ApiConnector.getFavorites(result => favorites.workFavorites(result));
favorites.addUserCallback = (data) => ApiConnector.addUserToFavorites(data, favorites.workFavorites)
favorites.removeUserCallback = (data) => ApiConnector.removeUserFromFavorites(data, favorites.workFavorites)

favorites.workFavorites = (result) => {
  if (result.success === true) {
    favorites.clearTable();
    favorites.fillTable(result.data);
    favorites.setMessage(result.success, 'Успешно');
    money.updateUsersList(result.data);
  } else  {
    favorites.setMessage(result.success, result.error);
  }
} 

