'use strict'

let logoutUser = new LogoutButton();
logoutUser.action = () => ApiConnector.logout(answer);

let rates = new RatesBoard();

function answer(result) {
  if (result.success === true) {
    location.reload();
  }  
}

ApiConnector.current(result =>{
  if (result.success === true) {
    ProfileWidget.showProfile(result.data);
  }
});


function getCurrency() {
  ApiConnector.getStocks(result => {
    if (result.success === true) {
      rates.clearTable();
      rates.fillTable(result.data);
    }
  });
}

getCurrency();
let timerCurrency = setInterval(getCurrency, 60000);

let money = new MoneyManager();

let favorites = new FavoritesWidget();
ApiConnector.getFavorites(result => {
  if (result.success === true) {
    favorites.clearTable();
    favorites.fillTable(result.data);
  }
});