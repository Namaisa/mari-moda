const body = document.getElementsByTagName("body")[0];

window.addEventListener("load", () => {
    menu.headerNavContainer = document.querySelector(".headerNavContainer");
    window.screen.availWidth <= 750?
        menu.mobile():
        menu.web();
    pElemCreate.sessions();
})

let menu = {
    headerNavContainer: null,
    headerNav: null,
    list: {
        ul: function(fatherElem) {
            let ul = document.createElement("ul");
            fatherElem.appendChild(ul);
    
            menu.list.li("home", "Página inicial", ul);
            menu.list.li("blouses", "Blusas", ul);
            menu.list.li("dresses", "Vestidos", ul);
            menu.list.li("pants", "Calças", ul);
            menu.list.li("underwear", "Roupa íntima", ul);
            menu.list.li("acessories", "Acessórios", ul);
        },
        li: function(dataPage, text, fatherElem) {
            let li = document.createElement("li");
            li.classList.add("headerNavItem");
            li.dataset.page = dataPage;
            li.innerText = text;
            li.addEventListener("click", menuInt.selection.page);
            fatherElem.appendChild(li);
        }
    },
    mobile: function() {
        createElem.class("headerNavColor", "div", "headerNavColor", "", menu.headerNavContainer);
        createElem.class("headerNav", "div", "headerNav", "", menu.headerNavContainer);

        menu.headerNav = document.querySelector(".headerNav");

        let button = document.createElement("div");
        button.id = "mobileMenuButton";
        button.addEventListener("click", menuInt.mobile.showMenu.verify, true);
        menu.headerNav.appendChild(button);

        createElem.class("asset1", "div", "asset1", "", button);
        createElem.class("asset2", "div", "asset2", "", button);
        createElem.class("asset3", "div", "asset3", "", button);

        let ulContainer = document.createElement("div");
        ulContainer.id = "ulContainer";
        menu.headerNav.appendChild(ulContainer);

        let x = document.createElement("p");
        x.classList.add("closeMenuButton");
        x.innerText = "x";
        x.addEventListener("click", () => menuInt.mobile.showMenu.verify(false));
        ulContainer.appendChild(x);

        menu.list.ul(ulContainer);
    },
    web: function() {
        createElem.class("headerNavColor", "div", "headerNavColor", "", menu.headerNavContainer);

        let pageSelected = document.createElement("div");
        pageSelected.id = "pageSelected";
        menu.headerNavContainer.appendChild(pageSelected);

        createElem.class("headerNav", "div", "headerNav", "", menu.headerNavContainer);

        menu.headerNav = document.querySelector(".headerNav");
        menu.list.ul(menu.headerNav);
    }
}

let createElem = {
    class: function(elemName, type, className, text, fatherElem) {
            elemName = document.createElement(type);
            elemName.classList.add(className);
            elemName.innerHTML = text;
            fatherElem.appendChild(elemName); 
    },
    image: function(className, src, alt, fatherElem) {
            image = document.createElement("img");
            image.classList.add(className);
            image.src = src;
            image.alt = alt;
            fatherElem.appendChild(image); 
    },
}

let pElemCreate = {
    lNumb: 4,
    sessions: function() {
        const highlightProducts = document.getElementById("highlightProducts"),
        blousesProducts = document.getElementById("blousesProducts"),
        dressesProducts = document.getElementById("dressesProducts"),
        acessoriesProducts = document.getElementById("acessoriesProducts");

        if (window.screen.availWidth <= 750) {
            pElemCreate.lNumb = 3;
        }
        for(let i = 0; i < this.lNumb - 1; i++) {
            pElemCreate.productContainer(products[i].NameRef, i, highlightProducts, 
                products[i].ImageURL, products[i].Price, products[i].Name);
        }
        pElemCreate.limit(blousesProducts, "blouses");
        pElemCreate.limit(dressesProducts, "dresses");
        pElemCreate.limit(acessoriesProducts, "acessories");
    },
    limit: function(sectionElem, sectionName) {
        let cont = 0;
        for(let i = 0; i < products.length; i++) {
            if(products[i].Session === sectionName) {
                cont++;
                if(cont < this.lNumb) {
                    pElemCreate.productContainer(products[i].NameRef, i, sectionElem, 
                        products[i].ImageURL, products[i].Price, products[i].Name);
                }
            }
        }
    },
    productImage: "",
    productContainer: function(nm, index, fatherElem, imgSrc, value, pName) {
        let productContainer = document.createElement("section");
        productContainer.classList.add("productContainer");
        fatherElem.appendChild(productContainer);
        
        createElem.image("productImage", imgSrc, nm, productContainer);

        createElem.class("productName", "h3", "productName", pName, productContainer);
    
        let pValue = value.toFixed(2).toString().split("."),
        pVText = `<span>R$</span>${pValue[0]}<span>,${pValue[1]}</span>`;
        
        createElem.class("productValue", "p", "productValue", pVText, productContainer);

        let add = document.createElement("div");
        add.classList.add("add");
        add.dataset.showText = false;
        add.addEventListener("click", () => { bagSystem.add.verify(index) });
        add.addEventListener("mouseover", addButton.getTarget);
        add.addEventListener("mouseout", addButton.getTarget);
        productContainer.appendChild(add);
    
        let addIcon = document.createElement("img");
        addIcon.classList.add("addIcon");
        addIcon.src = "./images/add_circle.svg";
        add.appendChild(addIcon);
    
        let addText = document.createElement("div");
        addText.classList.add("addText");
        add.appendChild(addText);
    
        let text = document.createElement("p");
        text.innerText = "Adicionar à sacola";
        addText.appendChild(text);
    }
}

let bagCreate = {
    container: null,
    bag: function() {
        bagCreate.container = document.createElement("div");
        bagCreate.container.id = "shopBagContainer";
        bagCreate.container.addEventListener("click", shopListInt.open);
        body.appendChild(bagCreate.container);

        createElem.image("shopBag", "./images/shopping_bag.svg", "Ícone de sacola de compras", shopBagContainer);
    },
    shopList: document.getElementById("shopList"),
    getProducts: function() {
        bagCreate.shopList.innerHTML = "";

        if(bagSystem.products.length < 1) {
            bagCreate.emptyMessage();
        }

        bagSystem.products.forEach(item => {
            let i = item.Index;
            bagCreate.items(products[i].Name, products[i].Ref, item.Amount, i,
                products[i].ImageURL, products[i].Price);
        })
        bagSystem.amount.value();
    },
    items: function(name, ref, amount, index, imageURL, price) {
        let sbItem = document.createElement("div");
        sbItem.classList.add("sbItem");
        sbItem.dataset.itemIndex = index;
        bagCreate.shopList.appendChild(sbItem);

        createElem.image("itemImage", imageURL, name, sbItem);

        let itemDiv = document.createElement("div");
        itemDiv.classList.add("itemNameRefAndAmount");
        sbItem.appendChild(itemDiv);

        createElem.class("itemSBName", "h4", "itemSBName", name, itemDiv);
        createElem.class("itemRef", "p", "itemRef", "Ref: " + ref, itemDiv);

        let amountDiv = document.createElement("div");
        amountDiv.classList.add("amountDiv");
        itemDiv.appendChild(amountDiv);

        bagCreate.amountButton("p", "lessButton", index, "-", amountDiv);

        let amountElem = document.createElement("p");
        amountElem.classList.add("productAmount");
        amountElem.dataset.itemIndex = index;
        amountElem.innerText = amount;
        amountDiv.appendChild(amountElem);

        bagCreate.amountButton("p", "moreButton", index, "+", amountDiv);

        let priceText = "<small>R$</small>" + price.toFixed(2).toString().split(".");
        createElem.class("itemPrice", "p", "itemPrice", priceText, sbItem);

        let bin = document.createElement("img");
        bin.classList.add("itemBin");
        bin.dataset.itemIndex = index;
        bin.src = "./images/delete.svg";
        bin.addEventListener("click", () => { deleteFunctions.createAlert(index) });
        sbItem.appendChild(bin);
    },
    amountButton: function(elemType, className, index, text, fatherElem) {
        let addOrRemoveButton = document.createElement(elemType);
        addOrRemoveButton.classList.add(className);
        addOrRemoveButton.dataset.itemIndex = index;
        addOrRemoveButton.innerText = text;
        addOrRemoveButton.addEventListener("click", bagSystem.amount.set);
        fatherElem.appendChild(addOrRemoveButton);
    },
    emptyMessage: function() {
        let emptySB = document.createElement("div");
        emptySB.id = "emptySB";
        bagCreate.shopList.appendChild(emptySB)

        createElem.image("mariDollSad", "./images/mari-doll-sad.svg", "Mascote Mari triste", emptySB);

        let p = document.createElement("p");
        p.innerHTML = "Sua bolsa de compras está vazia!<br>";
        emptySB.appendChild(p);

        let span = document.createElement("span");
        span.innerText = "Continue navegando";
        span.addEventListener("click", shopListInt.close);
        p.appendChild(span);
    }
}