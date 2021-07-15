let bagSystem = {
    products: [],
    add: {
        counter: null,
        verify: function(i) {
            bagSystem.add.addInProducts(Number(i));
            if(!bagSystem.add.counter) { 
                bagCreate.bag(); 
                setTimeout(bagCounterInt.create, 500);
            } else {
                setTimeout(() => { bagCounterInt.refresh(/* bagSystem.add.counter */) }, 500);
            }
        },
        addInProducts: function(index) {
            let productInBag = false;
            bagSystem.products.forEach(p => {
                if(p.Index === index) {
                    ++p.Amount;
                    productInBag = true;
                }
            })
            if(!productInBag) {
                bagSystem.products.push({
                    Index: index,
                    Amount: 1,
                })
            }
        }
    },
    amount: {
        set: function(e) {
            let index = Number(e.target.dataset.itemIndex),
            signal = e.target.innerText;

            bagSystem.products.forEach(item => {
                if(item.Index === index) {
                    if(signal === "-") {
                        if(item.Amount > 1) {
                            --item.Amount;
                            bagSystem.amount.show(index, item.Amount);
                        } else if(item.Amount === 1) {
                            let indexSB = bagSystem.products.indexOf(item);
                            removeProductAlert.alert(indexSB, index);
                        }
                    } else if(signal === "+") {
                        ++item.Amount;
                        bagSystem.amount.show(index, item.Amount);
                    }
                }
            })
            bagSystem.amount.value();
            bagCounterInt.refresh();
        },
        show: function(index, itemAmount) {
            const productAmount = document.querySelectorAll(".productAmount");
            productAmount.forEach(amt => {
                if(Number(amt.dataset.itemIndex) === index) {
                    amt.innerText = itemAmount;
                }
            })
        },
        value: function() {
            let total = 0;
            bagSystem.products.forEach(p => {
                total += p.Amount * products[p.Index].Price;
            })
            const showTotal = document.querySelector("#showShopSum > strong");
            showTotal.innerHTML = total.toFixed(2).toString().split(".");
        }
    }   
}

let deleteFunctions = {
    createAlert: function(index) {
        bagSystem.products.forEach(item => {
            if(item.Index === index) {
                let indexSB = bagSystem.products.indexOf(item);
                removeProductAlert.alert(indexSB, index);
            }
        })
    },
    del: function(indexSB, index) {
        bagSystem.products.splice(indexSB, 1);
        const sbItem = document.querySelectorAll(".sbItem");
        sbItem.forEach(e => {
            if(Number(e.dataset.itemIndex) === Number(index)) {
                e.parentNode.removeChild(e);
            }
        })
        bagSystem.amount.value();

        if(bagSystem.products.length < 1) {
            bagCreate.emptyMessage();
        }
        bagCounterInt.refresh();
    }
}

window.addEventListener("load", () => { 
        const buyButton = document.getElementById("finishBuy");
        buyButton.addEventListener("click", finishBuy.alert);
})

let finishBuy = {
    phoneNumber: null,
    alertState: false,
    alert: function() {
        if(!finishBuy.phoneNumber && finishBuy.alertState === false) {
            finishBuy.alertState = true;
            baloons.create("botTextsDoll", "Clicar nesse botão irá te direcionar para o Whatsapp da loja, insira seu número do Whatsapp ou de algum amigo com o DDD à seguir para testar (use apenas números sem espaços).");
            setTimeout(() => {
                phoneNumberCreate.input();
            }, 1000)
        }
    },
    buy: function() {
        finishBuy.alertState = false;
        if (bagSystem.products.length > 0) {
            baloons.create("botTextsDoll", "Obrigada por realizar sua compra conosco! 😍<br>Volte sempre!");
            let productsList = "";
            bagSystem.products.forEach(p => {
                let i = p.Index,
                price = products[i].Price.toFixed(2).toString().split(".");
                productsList += `${products[i].Name} - Ref: ${products[i].Ref} - ${p.Amount}x R$${price} %0A`;
            })
            let text = 
                `*CONFIRMAÇÃO DO PEDIDO*%0A%0AProdutos:%0A%0A${productsList}%0AEm breve você receberá uma mensagem para prosseguir com a compra. Por favor aguarde..`;
            window.open(`https://wa.me/55${finishBuy.phoneNumber}?text=${text}`);
        }
        finishBuy.phoneNumber = null;
    }
}