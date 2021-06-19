'use strict'
//Реализация страницы «Вход и регистрация»
let netUser = new UserForm();
netUser.loginFormCallback = (data) => ApiConnector.login(data, answerLogin);
netUser.registerFormCallback = (data) => ApiConnector.register(data, answerRegistrator);

function answerLogin(result) {
  if (result.success === true) {
    location.reload();
  } else {
    netUser.setLoginErrorMessage(result.error);
  }
}

function answerRegistrator(result) {
  if (result.success === true) {
    location.reload();
  } else {
    netUser.setRegisterErrorMessage(result.error);
  }
}



