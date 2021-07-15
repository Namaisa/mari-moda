window.addEventListener("load", () => {
    if(window.screen.availWidth > 750) {
        menuInt.mobileScreen = false;
        menuInt.web.showPageSelected();
    } else {       
        menuInt.mobileScreen = true;
        menuInt.mobile.adjustment();
    }
    shopListInt.loadElements();

    window.onscroll = menuInt.mobile.fixMenu;
})


let menuInt = {
    mobileScreen: null,
    mobile: {
        menuWidth: null,
        ulContainer: null,
        adjustment: function() {
            menuInt.mobile.ulContainer = document.getElementById("ulContainer");
            menuWidth = menuInt.mobile.ulContainer.getBoundingClientRect().width;
            menuInt.mobile.ulContainer.style.transform = `translateX(calc(-${menuWidth}px))`;

            setTimeout(() => {
                menuInt.mobile.ulContainer.style.opacity = "1";
            }, 1000)

            const liHomePage = document.querySelector('[data-page="home"]');
            liHomePage.classList.add("mobileSelected");
        },
        fixMenu: function() {
            const line = document.querySelector(".line"),
            color = document.querySelector(".headerNavColor");

            if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
                line.classList.add("fixMenuLine");
                color.classList.add("fixMenuLineContent");
                menu.headerNav.classList.add("fixMenuLineContent");
            } else {
                line.classList.remove("fixMenuLine");
                color.classList.remove("fixMenuLineContent");
                menu.headerNav.classList.remove("fixMenuLineContent");
            }      
        },
        showMenu: {
            verify: function(status) {
                const button = document.getElementById("mobileMenuButton"),
                asset1 = document.querySelector(".asset1"),
                asset2 = document.querySelector(".asset2"),
                asset3 = document.querySelector(".asset3");

                status? 
                    menuInt.mobile.showMenu.open(button, [asset1, asset2, asset3]):
                    menuInt.mobile.showMenu.close(button, [asset1, asset2, asset3]);
            },
            open: function(button, assets) {
                button.classList.add("menuClick");
                setTimeout(() => {
                    for(let i = 0; i < assets.length; i++) {
                        assets[i].classList.add("assetsActive");
                        assets[i].classList.add(`asset${i + 1}ActiveW`); 
                    }
                }, 600)
                menuInt.mobile.ulContainer.style.transform = "none";
            },
            close: function(button, assets) {
                for(let i = 0; i < assets.length; i++) {
                    assets[i].classList.remove(`asset${i + 1}ActiveW`); 
                }    
                setTimeout(() => {
                    button.classList.remove("menuClick");
                    assets.forEach(a => {
                        a.classList.remove("assetsActive");
                    })
                }, 1000)
                ulContainer.style.transform = `translateX(-${menuWidth}px)`;
            }
        },
        colorSelected: function(elem) {
            const li = document.querySelectorAll(".headerNavItem ");
            li.forEach(i => {
                i.classList.remove("mobileSelected");
            })
            elem.classList.add("mobileSelected");
        }
    },
    web: {
        currentPage: "home",
        pageSelected: null,
        showPageSelected: function() {
            this.pageSelected = document.getElementById("pageSelected");
            let elem = document.querySelector('[data-page="home"]');
            
            this.movePageSelected(elem);
            setTimeout(() => {
                this.pageSelected.style.opacity = "1";
            }, 1000)
        },
        movePageSelected: function(elem) {
            let position = elem.getBoundingClientRect();
            pageSelected.style.width = position.width.toString() + "px";
            pageSelected.style.transform = `translateX(${position.x.toString()}px)`;
        },
    },
    selection: {
        page: function(e) {
            const homePageSection = document.getElementById("homePage"),
            productSections = document.getElementById("productSections");
    
            !menuInt.mobileScreen?
                menuInt.web.movePageSelected(e.target):
                menuInt.mobile.colorSelected(e.target);
            
            let page = e.target.dataset.page;
    
            if(page !== menuInt.web.currentPage) { productSections.innerHTML = ""; }
            
            if(page !== "home" && page !== menuInt.web.currentPage) {
                if (menuInt.web.currentPage === "home") {
                    homePageSection.classList.add("hideHomePage");
                    menuInt.selection.open(page, productSections);
                } else {
                    menuInt.selection.open(page, productSections);
                }
            } else if (menuInt.web.currentPage !== "home" && page === "home") { 
                homePageSection.classList.remove("hideHomePage");
                productSections.classList.remove("showProductSections");
            } 
            menuInt.web.currentPage = page;
        },
        open: function(page, productSections) {
            productSections.classList.add("showProductSections");
            for(let i = 0; i < products.length; i++) {
                if(products[i].Session === page) {
                    pElemCreate.productContainer(products[i].NameRef, i, productSections, 
                        products[i].ImageURL, products[i].Price, products[i].Name);
                }
            }
        }
    }
}

let addButton = {
    getTarget: function(e) {
        if(e.target.classList[0] === "add") {
            addButton.verify(e.target);
        } else if(e.target.classList[0] === "addIcon" || e.target.classList[0] === "addText") {
            addButton.verify(e.target.parentNode);
        }
    },
    verify: function(elem) {
        let addText = elem.children[1],
        text = elem.children[1].firstChild;
        elem.dataset.showText === "false"? 
            addButton.showText(elem, addText, text): addButton.hideText(elem, addText, text);
    },
    showText: function(elem, addText, text) {
        elem.dataset.showText = true;  
        addText.classList.add("addTextOn");
        setTimeout(() => {
            text.classList.add("addTextOnP");
        }, 500) 
    },
    hideText: function(elem, addText, text) {
        if (text) {
            setTimeout(() => {
                text.classList.remove("addTextOnP");
                setTimeout(() => {
                    addText.classList.remove("addTextOn");
                    elem.dataset.showText = false;
                }, 500) 
            }, 3000)
        }
    }
}

let bagCounterInt = {
    create: function() { 
        bagSystem.add.counter = document.createElement("div");
        bagSystem.add.counter.id = "sbCounter";
        bagCreate.container.appendChild(bagSystem.add.counter);

        setTimeout(() => { 
            sbCounter.classList.add("sbCounterFill");
            setTimeout(() => { bagCounterInt.refresh(sbCounter) }, 600)
        }, 200)
    },
    refresh: function() {
        let amountItems = 0;
        bagSystem.products.forEach(p => {
            amountItems += p.Amount;
        })
        bagSystem.add.counter.innerHTML = amountItems;
    }
}

let shopListInt = {
    popup: null,
    shopListPopup: null,
    shopListenItems: null,
    closeShopListPopup: null,
    loadElements: function() {
        shopListInt.popup = document.querySelector(".popup");
        shopListInt.shopListPopup = document.getElementById("shopListPopup");
        shopListInt.shopListenItems = shopListPopup.children;
        shopListInt.closeShopListPopup = document.getElementById("closeShopListPopup");
        shopListInt.closeShopListPopup.addEventListener("click", shopListInt.close);
    },
    open: function() {
        shopListInt.popup.classList.add("showPopup");
        setTimeout(() => { 
            shopListInt.shopListPopup.classList.add("showShopList"); 
            setTimeout(() => { 
                shopListInt.itemsOpacity("1");
                bagCreate.getProducts();
            }, 500)
        }, 200)   
    },
    close: function() {
        shopListInt.itemsOpacity("0");
        bagCreate.shopList.innerHTML = "";

        setTimeout(() => { 
            shopListInt.shopListPopup.classList.remove("showShopList"); 
            setTimeout(() => { 
                shopListInt.popup.classList.remove("showPopup");
            }, 950)
        }, 50)   
    },
    itemsOpacity: function(value) {
        for(let i = 0; i < shopListInt.shopListenItems.length; i++) {
            shopListInt.shopListenItems[i].style.opacity = value;
        } 
    }
}
