"use strict" ;


// Hacer que el carrito aparezca y desaparezca de la izquierda
const carBtn= document.getElementById("cartBtn");
const wrapperSide=document.getElementById("wrapper__sidebar");

carBtn.addEventListener('click',function(e){
   
    wrapperSide.classList.toggle('wrapper__sidebar');
    
})

const carClose=document.querySelector(".wrapper-close")

carClose.addEventListener('click',function(e){
    wrapperSide.classList.remove('wrapper__sidebar');
})


// Hacer que aparezca los productos en la sección Our products

const products =[
    {
        id:1,
        name: 'Drills 3/8 inch - Steel',
        price: 7,
        image: 'https://source.unsplash.com/xoxnfVIE7Qw',
        description:'Drill for steel, 3/8 inch diameter, tungsten coating' 

    },
    {
        id: 2,
        name: 'Steel structure H - 3 M',
        price:750,
        image: 'https://source.unsplash.com/VNlZmgQ5iVc',
        description: 'Construction steel structure; H reference, with 3 meters length'
    },
    {
        id:3,
        name: 'Screw M8 milimeter',
        price: 1.5,
        image:'https://source.unsplash.com/tvczNEOPVDo',
        description: 'Screw for wood, M8 milimeter, in steel, in plastic, in tugnsten coating'
    }
];

const productSite=document.querySelector(".product-site");

let productsHTML ='';

for(let product of products){
    productsHTML += `
    <div class="product-card">
    <div class="product-card-image">
        <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="product-card-name">
        <h3>${product.name}</h3>
    </div>
    <div class="product-card-info">
        <p>${product.description}</p>
        <p><span>$ ${product.price} USD</span></p>
    </div>
    <div class="cart-add">
        <button class="cart-add-btn" data-id="${product.id}">Add to cart</button>
    </div>
</div>`
}

productSite.insertAdjacentHTML('beforeend', productsHTML);

// Agregar productos a el carrito

let cart = []

function find(id) {
  for (let product of products) {
    if (product.id === id) {
      return product
    }
  }
}

function addToCart(id) {
  const product = find(id)
  cart.push(product)
}

productSite.addEventListener('click', function (e) {
  if (e.target.closest('.cart-add-btn')) {
    const id = e.target.closest('.cart-add-btn').dataset.id
    addToCart(+id)
    renderCart()
  }
})

const wrapperCart = document.getElementById('wrapper-cart')

function renderCart() {
  let cartHTML = ''

  for (let product of cart) {
    cartHTML += `
    <div class="product-card">
    <div class="product-card-image">
        <img src="${product?.image}" alt="${product.name}" class="cart__item-img-item">
    </div>
    <div class="product-card-name cart__item-title">
        <h3>${product.name}</h3>
    </div>
    <div class="product-card-info cart__item-text">
        <p>${product.description}</p>
        <p class="cart__item-btn-text"><span>$ ${product.price}</span></p>
    </div>
    <div class="cart-add">
        <button class="cart__item-btn-item" data-id="${product.id}">
            <i class='bx bx-x'></i>
        </button>
    </div>
</div>
    `
  }
  const cartTotal = document.getElementById('cart-total')

  wrapperCart.innerHTML = cartHTML.length > 0 ? cartHTML : '<p>No hay productos</p>'
  cartTotal.innerHTML = `$ ${sumTotal()}`
}

renderCart()

function sumTotal() {
  let sum = 0
  for (let product of cart) {
    sum += product.price
  }
  return sum
}

function removeFromCart (id) {
  let newArr = []
  for (let product of cart) {
    if(product.id !== id) {
      newArr.push(product)
    }
  }
  cart = newArr
}

wrapperCart.addEventListener('click', function (e) {
  if (e.target.closest('.cart__item-btn-item')) {
    const id = e.target.closest('.cart__item-btn-item').dataset.id
    removeFromCart(+id)
    renderCart()
  }
})

const checkout = document.getElementById('checkout')

checkout.addEventListener('click', function (e) {
  if(e.target.closest('.wrapper__sidebar-cart-btn-link')) {
    alert('Gracias por tu compra')
    cart = []
    renderCart()
  }
})



