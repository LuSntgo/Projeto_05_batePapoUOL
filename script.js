const allMessages = "";
let message = {from: "",
 to: "",
text: "",
type: "",
time: "" };
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
    setInterval(reloadPage,3000);
    reloadPage();
}
function conected () {
    axios.post("https://mock-api.driven.com.br/api/v4/uol/status",userName);
}

function sendMessage(){
    const messageInput = document.querySelector(".send");
    message.from = userName.name;
    message.text = messageInput.value;
    messageInput.value = "";
    
if(message.to === ""){
    message.to = "Todos";
} if (message.type === ""){
 message.type = "message";
}
    promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages",message );
    promise.then(attMessage);
    promise.catch(error);
}

function attMessage(){
    promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages" );
    promise.then(sucess);
    promise.catch(error);
}


//função para exibir mensagens colocadas no chat
function sucess (response){
const message = response.data;
const ulMessage = document.querySelector(".message");
    ulMessage.innerHTML = ""; 
for (let i = 0; i < message.length; i++) {
      
    if (message[i].type === "message"){
        const from = message[i].from;
        const to = message[i].to;
        const text = message[i].text;
        const time = message[i].time;
        ulMessage.innerHTML += `<li class="message" data-identifier="message"> <p><span class="time"> ${time} </span> <span class= "from"> ${from} </span> para <span class= "to"> ${to} </span> <span class="text"> ${text} </span></p> </li>`;
    }
    if (message[i].type === "status"){
        const from = message[i].from;
        const text = message[i].text;
        const time = message[i].time;
        ulMessage.innerHTML += `<li class="status" data-identifier="message"> <p><span class="time"> ${time} </span> <span class= "from"> ${from} </span> <span class="text"> ${text} </span></p> </li>`;
}
if (message[i].type === "private_message"){
    const from = message[i].from;
    const to = message[i].to;
    const text = message[i].text;
    const time = message[i].time;
    if (userName.name === from || userName.name === to){

        ulMessage.innerHTML += `<li class="private_message" data-identifier="message"> <p><span class="time"> ${time} </span> <span class= "from"> ${from} </span> reservadamente para <span class= "to"> ${to} </span> <span class="text"> ${text} </span></p> </li>`;
   }
}}
        lastMessages = document.querySelector("ul").lastChild;
        lastMessages.scrollIntoView(); 
}
function error(erro){
    console.log(erro.response);
   alert("Poxa, seu nome já está em uso! Escolha outro :(")   
    window.location.reload();
}
function reloadPage () {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");

    promise.then(sucess); 
    promise.catch(error);
     } 

//enter in the chat with enter
function pressEnterLogin(){
    const keyEnter = event.keyCode;
      
    if (keyEnter === 13) {
        loginScreen();
        
    }
}
function pressEnter(){
    const keyEnter = event.keyCode;
      
    if (keyEnter === 13) {
        sendMessage();
        
    }
}
