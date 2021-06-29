//'use strict'
//Реализация страницы «Вход и регистрация»
let netUser = new UserForm();

const answerLogin = (result) => result.success === true ? location.reload() : netUser.setLoginErrorMessage(result.error);
const answerRegistrator = (result) => result.success === true ? location.reload() : netUser.setLoginErrorMessage(result.error);

netUser.loginFormCallback = (data) => ApiConnector.login(data, answerLogin);
netUser.registerFormCallback = (data) => ApiConnector.register(data, answerRegistrator);



