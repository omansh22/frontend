const Data = [
    {
        id: 1,
        name: 'Pizza',
        price: 55,
        ratting: 5,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam dolore, quas voluptatem suscipit',
        imageUrl: 'assets/pizza.jpg'
    },
    {
        id: 2,
        price: 10,
        name: 'Waffles',
        ratting: 4,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam dolore, quas voluptatem suscipit',
        imageUrl: 'assets/waffles.jpg'
    }
]

const menuContainer = document.getElementById('menu-container');
const createElement = (tag) => {return document.createElement(tag)};

rendermenu = (menuData)=> {
    menuData.forEach(currentMenu => {
    const name = createElement('SPAN');
    name.classList.add('bold');
    name.innerText = currentMenu.name;

    const price = createElement('DIV');
    price.classList.add('bold');
    price.innerText = currentMenu.price;


    const namePrice = createElement('DIV');
    namePrice.appendChild(name);
    namePrice.appendChild(price);

    const ratting = getRatting(currentMenu.ratting);



    const buttoncont = createElement('DIV')
    buttoncont.classList.add('butdiv');

    const minusb= createElement('BUTTON');
    minusb.classList.add('minus');
    minusb.innerHTML='-';
    minusb.addEventListener('click',()=>{handleminus(currentMenu)})

    const addcart = createElement('BUTTON');
    addcart.classList.add('button');
    addcart.innerHTML='Add';
    addcart.addEventListener('click',()=>{addtocart(currentMenu)});
    addcart.id = "cart-info"+currentMenu.id;

    
    const plusb = createElement('BUTTON');
    plusb.classList.add('plus');
    plusb.innerHTML='+';
    plusb.addEventListener('click',()=>{handleplus(currentMenu)});



    buttoncont.appendChild(minusb);
    buttoncont.appendChild(addcart);
    buttoncont.appendChild(plusb);

 
    const namePriceRatting = createElement('DIV');
    namePriceRatting.classList.add('name-price-ratting');
    namePriceRatting.appendChild(namePrice);
    namePriceRatting.appendChild(ratting);



    const menuDescription = createElement('DIV');
    menuDescription.classList.add('menu-description');
    menuDescription.appendChild(namePriceRatting);

    const image = createElement('IMG');
    image.src = currentMenu.imageUrl;
    image.classList.add('menu-image');

    image.style.width = 100

    const menu = createElement('DIV');
    menu.classList.add('menu');
    menu.appendChild(image);
    menu.appendChild(menuDescription);
    menu.appendChild(buttoncont);
    

    menuContainer.appendChild(menu);
})
}
rendermenu(Data);

const cartcontainer= document.getElementById('cartcontainer');

renderCart=()=>{
    cartcontainer.innerHTML='';
Object.keys(cart).forEach( cartid =>{
    
    const _cartItems = cart[cartid];

    

    let imgC = document.createElement('IMG');
    imgC.classList.add('imgCart');
    imgC.src= _cartItems.imageUrl;
    
    let nameC = document.createElement('DIV');
    nameC.classList.add('nameCart');
    nameC.innerHTML= _cartItems.name;

    let priceC= document.createElement('DIV');
    priceC.classList.add('priceCart');
    priceC.innerHTML='Price: '+ _cartItems.price;

    let quantityC= document.createElement('DIV');
    quantityC.classList.add('quantityCart');

    const cartButtons= document.createElement('DIV');
    cartButtons.classList.add('cartButtons');

    const minusC= document.createElement('BUTTON');
    minusC.classList.add('cartMinus');
    minusC.innerHTML= '-';
    cartButtons.appendChild(minusC);
    minusC.addEventListener('click',()=>{minuscart(_cartItems)});

    const removeC= document.createElement('BUTTON');
    removeC.classList.add('removeC');
    removeC.innerHTML= 'Remove';
    cartButtons.appendChild(removeC);
    removeC.id= "Cinfo"+ _cartItems.id;

    const addC= document.createElement('BUTTON');
    addC.classList.add('addC');
    addC.innerHTML= '+';
    cartButtons.appendChild(addC);
    addC.addEventListener('click',()=>{addcart(_cartItems)});



    let cartData= document.createElement('DIV');
    cartData.classList.add('cartcont');

    cartData.appendChild(imgC);
    cartData.appendChild(nameC);
    cartData.appendChild(priceC);
    cartData.appendChild(quantityC);


    cartcontainer.appendChild(cartData);
    cartcontainer.appendChild(cartButtons);


})
}

minuscart=(menu) =>{
    if(cart[menu.id]){
        quantity= cart[menu.id].quantity -1;
    }
    if(cart[menu.id].quantity<=0){
        quantity= 0;
    }
    cart[menu.id]={...menu, quantity: quantity};
    console.log(quantity);
    const quantView = document.getElementById('Cinfo'+menu.id);
    quantView.innerHTML= 'Quantity:' +quantity;
    const adddata= document.getElementById('cart-info'+menu.id);
    adddata.innerHTML='Quantity:' +quantity;
    


}

function myFunction() {


    const filterMenuData = Data.filter(function (item) {
        const selected = document.getElementById("search").value;
        return item.name.toLowerCase().includes(selected);


    });
    menuContainer.innerHTML = '';
    console.log(filterMenuData);
    rendermenu(filterMenuData)

    console.log(filterMenuData);
}


addcart=(menu)=>
    {
        if(cart[menu.id])
        {
            quantity= cart[menu.id].quantity+1;
        }
        cart[menu.id]={...menu, quantity: quantity};        
        console.log(quantity);
        const quantView = document.getElementById('Cinfo'+menu.id);
        quantView.innerHTML= 'Quantity:' +quantity;
        const adddata= document.getElementById('cart-info'+menu.id);
        adddata.innerHTML='Quantity:' +quantity;
        


     }



function getRatting(ratting) {
    const star = createElement('DIV');
    star.classList.add('star');

    const filledStar = createElement('SPAN');
    filledStar.classList.add('fa', 'fa-star', 'checked');


    const unfilledStar = createElement('SPAN');
    unfilledStar.classList.add('fa', 'fa-star');

    for(let i = 1; i <= 5; i++) {
        if(i <= ratting) {
            star.appendChild(filledStar.cloneNode(true));
        } else {
            star.appendChild(unfilledStar.cloneNode(true));
        }
        console.log(star);
    }

    return star;

}
/*
sort_data = () => {
    const sorted_data= Data.sort( function(a,b){
        return a.price-b.price;
    })
    menuContainer.innerHTML='';
    debugger;
    rendermenu(sorted_data);
}
*/
let sortdata=false;
price_b = () => {
    if(sortdata==false){
        const sorteddata =Data.sort(function(a,b){
        return a.price-b.price;});
        menuContainer.innerHTML='';
        rendermenu(sorteddata);
        sortdata=true;
    }
    else{
        const sorteddata =Data.sort(function(a,b){
            return b.price-a.price;
        });
        menuContainer.innerHTML='';
        rendermenu(sorteddata);
        sortdata=false;
    }
    
}

Ratings=()=>{
    const rate= Data.sort(function(a,b){
        return a.ratting-b.ratting;
    })
    menuContainer.innerHTML='';
    rendermenu(rate);
    
}


const cart={};
addtocart=(menu)=>{
    let quantity=1;
    if(cart[menu.id]){
        quantity = cart[menu.id].quantity + 1;
    }
    cart[menu.id]={...menu, quantity: quantity}
    console.log(cart);
    }

    handleplus=(menu)=>
    {
        let quantity=1;
        if(cart[menu.id])
        {
        quantity= cart[menu.id].quantity+1;
        }
        cart[menu.id]={...menu, quantity: quantity}
        console.log(cart);
        const adddata= document.getElementById('cart-info'+menu.id);
        adddata.innerHTML= 'Quantity:' +quantity;
        


     }
     handleminus=(menu)=>{
        if(cart[menu.id]){
            quantity= cart[menu.id].quantity -1;
        }
        if(cart[menu.id].quantity <=1){
            quantity=0
        }
        cart[menu.id]={...menu, quantity: quantity}
        console.log(cart);
        debugger;
    
        const adddata= document.getElementById('cart-info'+menu.id);
        adddata.innerHTML = 'Quantity:' +quantity;
    
     }
     handlecart=()=>{
       renderCart();

   }



