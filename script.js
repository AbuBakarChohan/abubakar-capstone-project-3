
let mark=document.getElementById('sidebar')
mark.style.marginLeft='-100px'
document.getElementById('menu-toggle').addEventListener('click', function() {
   document.getElementById('sidebar').classList.toggle('active');
 mark.style.margin='0px'
 mark.style.transition ='transform 0.5s ease';

 mark.style.width='250px'
 
});

document.getElementById('close-btn').addEventListener('click', function() {
   document.getElementById('sidebar').classList.remove('active');
    mark.style.margin='-300px'
    mark.style.transition ='transform 0.5s ease';
    body.style.opacity='0%'
  
});

let cros=document.getElementById('menu-toggle')
cros.addEventListener('mouseover',function(){
 cros.style.transform='rotatey(60deg)'
 cros.style.transition ='transform 0.3s ease';
 cros.style.color='red'
 cros.style.fontSize='24px'
 
   
});
cros.addEventListener('mouseout',function(){
   cros.style.transform='rotatey(0deg)'
   cros.style.fontSize='24px'
   cros.style. outline='0px ';
    cros.style.color='black'
});



let cart = [];


function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = ` 
       
        </div>`

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p> .....</p>';
        return;
    }

    cart.forEach((item, index) => {
        cartItemsDiv.innerHTML += `
              <div class="d-flex justify-content-between align-items-center mb-3">
                  <img src="${item.img}" alt="${item.name}" style="width: 90px; height: 90px;" class="me-3">
                  <div class="flex-grow-1">${item.name} - $${item.price} x ${item.quantity}</div>
                  <div>
                      <button class="btn mb-2 btn-sm btn-danger " onclick="updateQuantity(${index}, -1)">-</button>
                      <span>${item.quantity}</span>
                      <button class="btn btn-sm btn-success " onclick="updateQuantity(${index}, 1)">+</button>
                  </div>
              </div>
              <hr/>
          `;
    });

    
    updateCartQuantityBadge();
    updateTotalPrice();
}


 document.querySelectorAll('.add-to-cart-btn').forEach(button => {

    button.addEventListener('click', function () {
        const productName = this.getAttribute('data-name');
        const productPrice = parseFloat(this.getAttribute('data-price'));
        const productImg = this.getAttribute('data-img');

        
        const listitem = cart.find(item => item.name === productName);

        if (listitem) {
        
            listitem.quantity += 1;
        } else {
            
            cart.push({
                name: productName,
                price: productPrice,
                img: productImg,
                quantity: 1
            });
        }

        
        updateCartDisplay();
    });
});


function updateQuantity(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1); 
    }
    updateCartDisplay(); 
}

function updateCartQuantityBadge() {
    const cartQuantityBadge = document.getElementById('cartQuantityBadge');
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartQuantityBadge.innerText = totalItems;

    
   
}


function updateTotalPrice() {
    const totalPriceElement = document.getElementById('totalPrice');
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);
    totalPriceElement.innerText = `$${totalPrice}`;
}

// document.getElementById('cartQuantityBadge').style.display = 'flex';