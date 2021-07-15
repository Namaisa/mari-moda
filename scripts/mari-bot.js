window.addEventListener("load", () => {
    defineEvents();
    setTimeout(reception.getClientName, 3000);
})

function defineEvents() {
    const mariDoll = document.getElementById("mariDoll"),
    closeBotIcon = document.getElementById("closeBotIcon");
    mariDoll.addEventListener("click", baloons.openOrCloseAll, true);
    closeBotIcon.addEventListener("click", () => baloons.openOrCloseAll(false));
}

let baloons = {
    all: null,
    container: null,
    openOrCloseAll: function (open) {
        if(!baloons.all) {
            baloons.all = document.getElementById("mariDollBaloon");
        }
        open? 
            baloons.all.classList.add("showMariDollBaloon"):
            baloons.all.classList.remove("showMariDollBaloon");
    },
    create: function(className, content) {
        baloons.container = document.getElementById("ballonsContainer");
        let baloonBot = document.createElement("div");
        baloonBot.classList.add("botTexts");
        baloonBot.classList.add(className);
        baloonBot.innerHTML = content;
        baloons.container.appendChild(baloonBot);
        baloons.container.scrollTo(0, 99999);
    }
}

let sendButtonState = {
    elem: null,
    active: function(setFunction) {
        if(!sendButton) {
            sendButton = document.getElementById("sendButton");
        }
        sendButton.classList.add("sendButtonActive");
        sendButton.addEventListener("click", setFunction);
    },
    disable: function(setFunction) {
        sendButton.classList.remove("sendButtonActive");
        sendButton.removeEventListener("click", setFunction);
    },
}

var clientAnswerCont;

let reception = {
    mariDollContainer: document.getElementById("mariDollContainer"),
    clientNameInput: "",
    getClientName: function() {
        clientAnswerCont = document.getElementById("clientAnswerCont");
        clientAnswerCont.innerHTML = "";
        
        reception.mariDollContainer.classList.add("showMariDollContainer");
        baloons.openOrCloseAll(true);

        baloons.create("botTextsDoll", "Olá! Qual é o seu nome?");
        
        sendButtonState.active(reception.answer);

        reception.clientNameInput = document.createElement("input");
        reception.clientNameInput.id = "clientName";
        reception.clientNameInput.placeholder = "Insira aqui o seu nome";
        reception.clientNameInput.addEventListener("keypress", e => {
            if(e.keyCode === 13) {
                e.preventDefault();
                reception.answer(); 
            }
        });
        clientAnswerCont.appendChild(reception.clientNameInput);

        baloons.container.scrollTo(0, 99999);
    },
    
    answer: function() {
        let clientName = reception.clientNameInput.value;
        if(clientName.match(/\w/)) {
            baloons.create("botTextsClient", clientName);
            setTimeout(() => {
                baloons.create("botTextsDoll", 
                    `Seja bem vinda ${clientName}! Meu nome é Mari e eu estou aqui para te ajudar!<br>Em caso de dúvida clique em mim.`);
            }, 500);
            clientAnswerCont.removeChild(reception.clientNameInput);
            sendButtonState.disable(reception.answer);
        }
    },
    
}

let removeProductAlert = {
    iSB: "",
    iProd: "",
    alert: function(indexSB, indexProd) {
        removeProductAlert.iSB = indexSB;
        removeProductAlert.iProd = indexProd;
        clientAnswerCont.innerHTML = "";
        
        baloons.openOrCloseAll(true);
        baloons.create("botTextsDoll", "Tem certeza que deseja remover item da sacola?");
        setTimeout(() => {
            removeProductAlert.options("Sim");
            removeProductAlert.options("Não");
        }, 500);
    },
    options: function(text) {
        let button = document.createElement("button");
        button.classList.add("yesOrNotButton");
        button.classList.add("yesOrNotButtonInteractive");
        button.dataset.indexSB = removeProductAlert.iSB;
        button.dataset.indexProd = removeProductAlert.iProd;
        button.innerText = text;
        button.addEventListener("click", removeProductAlert.choice);
        clientAnswerCont.appendChild(button);
        
        baloons.container.scrollTo(0, 99999);
        
    },
    choice: function(e) {
        let button = e.target,
        text = button.innerText,
        indexProd = button.dataset.indexProd;
        
        baloons.create("botTextsClient", text);
        setTimeout(() => {
            if(text === "Sim") {
                deleteFunctions.del(button.dataset.indexSB, indexProd);
                baloons.create("botTextsDoll", `${products[indexProd].Name} foi excluído(a) da sacola 😕`);
            } else if(text === "Não") {
                baloons.create("botTextsDoll", `Fico feliz por não ter desistido de ${products[indexProd].Name}, continue comprando! 😁`);
            }
            
            for(e of button.parentNode.children) {
                e.removeEventListener("click", removeProductAlert.choice);
                e.classList.remove("yesOrNotButtonInteractive");
            }
        }, 500);
    }
}

let phoneNumberCreate = {
    inputElem: "",
    input: function() {
        clientAnswerCont.innerHTML = "";
        baloons.openOrCloseAll(true);
        
        sendButtonState.active(phoneNumberCreate.getNumber);

        phoneNumberCreate.inputElem = document.createElement("input");
        phoneNumberCreate.inputElem.type = "tel";
        phoneNumberCreate.inputElem.id = "phoneNumberInput";
        phoneNumberCreate.inputElem.placeholder = "00 00000-0000";
        phoneNumberCreate.inputElem.addEventListener("keypress", e => {
            if(e.keyCode === 13) {  
                e.preventDefault();
                phoneNumberCreate.getNumber();
            }
        });
        clientAnswerCont.appendChild(phoneNumberCreate.inputElem);
        baloons.container.scrollTo(0, 99999);
    },
    getNumber: function() {
        if(phoneNumberCreate.inputElem.value.match(/\w/) && phoneNumberCreate.inputElem.checkValidity()) {
            finishBuy.phoneNumber = phoneNumberCreate.inputElem.value;
            phoneNumberCreate.baloon();
        }
    },
    baloon: function() {
        baloons.create("botTextsClient", finishBuy.phoneNumber);

        sendButtonState.disable(phoneNumberCreate.baloon);
        clientAnswerCont.innerHTML = "";

        finishBuy.buy();
    }
}