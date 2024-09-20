let openshoping = document.querySelector('.shopping-card');
let list = document.querySelector('.list');
let listcard = document.querySelector('.listcard');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

let Products = [
    { id: 1, name: 'Muesli Fitness Energy, gluten free', image: '01s.png', price: 2.15, kg: '500g' },
    { id: 2, name: 'Fresh orange Klementina, Spain', image: '02s.png', price: 3.12, kg: '1kg' },
    { id: 3, name: 'Pepsi soda classic, can classic', image: '03s.png', price: 0.80, kg: '330ml' },
    { id: 4, name: 'Mozzarella mini cheese Granaloro', image: 'images/04s.png', price: 2.99, kg: '250g' },
    { id: 5, name: 'Coconut, Indonesia fresh and Pure', image: 'images/05s.png', price: 1.24, kg: '1 coconut' },
    { id: 6, name: 'Pesto sauce Barilla with parmesan and basil', image: 'images/06s.png', price: 3.95, kg: '200g' },
    { id: 7, name: 'Fresh mango, Spain or fruits', image: 'images/07s.png', price: 1.99, kg: '1 mango' },
    { id: 8, name: 'Fresh green asparagus, bunch', image: '08s.png', price: 2.40, kg: '300g' },
];

let listcards = [];

function initapp() {
    Products.forEach((value, key) => {
        let newdiv = document.createElement('div');
        newdiv.classList.add('item');
        newdiv.innerHTML = `
            <div><img src="${value.image}" alt="${value.name}"/></div>
            <div class="title">${value.name}</div>
            <div class="price">$${value.price.toFixed(2)}</div>
            <button onclick="addtocart(${key})">+</button>
            <span class="kg">${value.kg}</span>
        `;
        list.appendChild(newdiv);
    });
}

function addtocart(key) {
    let product = Products[key];
    if (!listcards[product.id]) {
        listcards[product.id] = { ...product, quantity: 1 };
    } else {
        listcards[product.id].quantity++;
    }
    reloadcart();
}

function reloadcart() {
    listcard.innerHTML = '';
    let count = 0;
    let totalprice = 0;

    Object.values(listcards).forEach((value) => {
        if (value) {
            let newdiv = document.createElement('li');
            newdiv.innerHTML = `
                <div><img src="${value.image}" alt="${value.name}"/></div>
                <div>${value.name}</div>
                <div>$${(value.price * value.quantity).toFixed(2)}</div>
                <div>Quantity: ${value.quantity}</div>
                <div>
                    <button onclick="changeQuantity(${value.id}, ${value.quantity - 1})">-</button>
                    <span>${value.quantity}</span>
                    <button onclick="changeQuantity(${value.id}, ${value.quantity + 1})">+</button>
                </div>
            `;
            listcard.appendChild(newdiv);

            count += value.quantity;
            totalprice += value.price * value.quantity;  
        }
    });

    total.textContent = Total: $${totalprice.toFixed(2)}; 
    quantity.textContent = count;
}

function changeQuantity(id, qty) {
    if (qty <= 0) {
        delete listcards[id];
    } else {
        listcards[id].quantity = qty;
    }
    reloadcart();
}

initapp();