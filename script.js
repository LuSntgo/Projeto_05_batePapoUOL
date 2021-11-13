//função para exibir mensagens colocadas no chat
function sucess (response){
const message = response.data;
const ulMessage = document.querySelector(".message");

for (let i = 0; i < message.length; i++) {
    const chat = message[i];
    ulMessage.innerHTML += `<li>${chat.text}</li>`;
    }
}

function error(erro){
    console.log(erro.response);
}
//criar uma tela de login


function reloadPage () {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");

    promise.then(sucess); 
    promise.catch(error);
      } 
reloadPage();

      /*
//enter in the chat with enter
function pressEnter(){
    const keyEnter = event.keyCode;
    const clickButton = document.querySelector(".button")
    
    if (keyEnter === 13) {
        startChat();
    }
}
*/