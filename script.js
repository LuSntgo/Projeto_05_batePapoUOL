const allMessages = "";
let userName = { name: ""}

const login = document.querySelector(".loginScreen");
const loading = document.querySelector(".loading");

function loginScreen() {
    const nameInput = document.querySelector(".nickname").value;
    userName = {name: nameInput};
    login.classList.add("hide");
    loading.classList.remove("hide");

    setTimeout(startChat,3000);
    promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants",userName );
    
    promise.then(startChat);
    promise.catch(error);
}


function startChat(){
    const chatList = document.querySelector(".chat");
    loading.classList.add("hide");
    chatList.classList.remove("hide");
    setInterval(conected,5000); 
}
function conected () {
    axios.post("https://mock-api.driven.com.br/api/v4/uol/status",userName);
}

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

/*function statusType(response){
    if (type === "status")

}*/
//criar uma tela de login


function reloadPage () {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");

    promise.then(sucess); 
    promise.catch(error);
    
      } 
reloadPage();


//enter in the chat with enter
function pressEnter(){
    const keyEnter = event.keyCode;
      
    if (keyEnter === 13) {
        loginScreen();
    }
}
