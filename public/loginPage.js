'use strict'

let netUser = new UserForm();
netUser.loginFormCallback = (data) => ApiConnector.login(data, answer);
netUser.registerFormCallback = (data) => ApiConnector.register(data, answer);

function answer(result) {
  console.log(result)
  if (result.success === true) {
    location.reload();
  } else {
    alert(result.error);
  }
}



