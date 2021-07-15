let productsCreate = {
    acessories: 
        ["Bolsa bege", "Colar com pingente", "Mochila aventureiro", 
        "Bolsa pequena", "Sapato rosa choque", "Óculos de sol"],
    blouses:
        ["Blusa mostarda", "Cropped babado", "Jaqueta jeans", 
        "Blusa branca manga longa", "Blusa branca de botão", 
        "Blusa listrada", "Blusa com flores", "Blusa azul bordada"],
    dresses:
        ["Vestido nude", "Vestido azul longo", "Vestido com fenda rosé", 
        "Vestido azul com flores", "Vestido em crochê", "Vestido social", 
        "Vestido festa", "Vestido creme com flores", "Vestido branco babado", "Vestido azul com fenda"],
    pants: 
        ["Calça jeans escura", "Calça jeans jogger", "Calça social bege", 
        "Calça jeans social", "Calça jeans cobre", "Calça jeans clara", "Calça florida"],
    underwear:
        ["Sutiã branco de renda", "Sutiã preto de renda", "Body branco de renda",
        "Conjunto tanga e sutiã branco", "Conjunto tanga e sutiã preto", 
        "Conjunto tanga e sutiã preto de renda", "Sutiã preto de renda nadador"],
    sessions: function() {
        for(let i = 0; i < this.acessories.length; i++) {
            productsCreate.products("acessories", "acessories" + i, this.acessories[i]);
        }
        for(let i = 0; i < this.blouses.length; i++) {
            productsCreate.products("blouses", "blouses" + i, this.blouses[i]);
        }
        for(let i = 0; i < this.dresses.length; i++) {
            productsCreate.products("dresses", "dresses" + i, this.dresses[i]);
        }
        for(let i = 0; i < this.pants.length; i++) {
            productsCreate.products("pants", "pants" + i, this.pants[i]);
        }
        for(let i = 0; i < this.underwear.length; i++) {
            productsCreate.products("underwear", "underwear" + i, this.underwear[i]);
        }
    },
    products: function(session, image, name) {
        products.push({
            Session: session,
            Ref: Math.floor(Math.random() * 1000000), 
            NameRef: "Imagem-do-produto", 
            ImageURL: `./images/products/${image}.jpg`, 
            Price: Number((Math.random() * 230 + 70).toFixed(2)),
            Name: name,
        },)
    },
}

let products = [];
productsCreate.sessions();