// Products Data
const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 859.99,
      description: "High-quality sound, noise-cancelling, and long battery life.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 1229.99,
      description: "Track your fitness, receive notifications, and more.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: 939.99,
      description: "Portable speaker with crisp sound and deep bass.",
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 4,
      name: "Laptop Backpack",
      price: 545.99,
      description: "Stylish and durable backpack with laptop compartment.",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 5,
      name: "Wireless Mouse",
      price: 324.99,
      description: "Ergonomic design with long battery life.",
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 6,
      name: "Portable Charger",
      price: 829.99,
      description: "10000mAh power bank for charging on the go.",
      image: "https://images.unsplash.com/photo-1597764690528-7a6d05f3f627?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 7,
      name: "Fitness Tracker",
      price: 949.99,
      description: "Monitor your heart rate, steps, and sleep patterns.",
      image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 8,
      name: "E-Reader",
      price: 1089.99,
      description: "Read comfortably with paper-like display.",
      image: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];
  
  // Cart functionality
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // DOM Elements
  const cartCountElement = document.getElementById('cart-count');
  const productListElement = document.getElementById('product-list');
  const cartItemsElement = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');
  const checkoutBtn = document.getElementById('checkout-btn');
  
  // Initialize the page
  document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    // Check which page we're on
    if (productListElement) {
      renderProducts();
    }
    
    if (cartItemsElement) {
      renderCart();
    }
    
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', checkout);
    }
  });
  
  // Render products on products page
  function renderProducts() {
    let html = '';
    
    // Get only 4 featured products for home page if it's index.html
    const isHomePage = window.location.pathname.includes('index.html');
    const productsToShow = isHomePage ? products.slice(0, 4) : products;
    
    productsToShow.forEach(product => {
      html += `
        <div class="product-card">
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}" />
          </div>
          <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <span class="price">₹${product.price.toFixed(2)}</span>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <a href="product-detail.html?id=${product.id}">View Details</a>
          </div>
        </div>
      `;
    });
    
    productListElement.innerHTML = html;
  }
  
  // Add to cart function
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1
      });
    }
    
    updateCart();
    alert(`${product.name} added to cart!`);
  }
  
  // Update cart in localStorage and UI
  function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    if (cartItemsElement) {
      renderCart();
    }
  }
  
  // Update cart count in header
  function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cart-count');
    
    cartCountElements.forEach(element => {
      element.textContent = count;
    });
  }
  
  // Render cart items on cart page
  function renderCart() {
    if (cart.length === 0) {
      cartItemsElement.innerHTML = '<p>Your cart is empty. <a href="products.html">Continue shopping</a></p>';
      totalPriceElement.textContent = '0.00';
      return;
    }
    
    let html = '';
    let total = 0;
    
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      
      html += `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" />
          <div class="cart-item-info">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
          </div>
          <div class="cart-item-price">₹${itemTotal.toFixed(2)}</div>
          <div class="quantity-control">
            <button onclick="updateQuantity(${item.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateQuantity(${item.id}, 1)">+</button>
            <button class="remove-item" onclick="removeFromCart(${item.id})">&times;</button>
          </div>
        </div>
      `;
    });
    
    cartItemsElement.innerHTML = html;
    totalPriceElement.textContent = total.toFixed(2);
  }
  
  // Update item quantity in cart
  function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCart();
    }
  }
  
  // Remove item from cart
  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
  }
  
  // Checkout function
  function checkout() {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    alert(`Order placed! Total: ₹${totalPriceElement.textContent}`);
    cart = [];
    updateCart();
  }
  
  // For product detail page
  function renderProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      window.location.href = 'products.html';
      return;
    }
    
    const container = document.getElementById('product-info');
    
    if (container) {
      container.innerHTML = `
        <div class="product-detail-card">
          <img src="${product.image}" alt="${product.name}" />
          <div class="detail-text">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <span class="price">₹${product.price.toFixed(2)}</span>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <a href="products.html" class="back-link">Back to Products</a>
          </div>
        </div>
      `;
    }
  }
  
  // Call renderProductDetail if we're on the product detail page
  if (window.location.pathname.includes('product-detail.html')) {
    renderProductDetail();
  }