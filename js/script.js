//menu toggle
const menuToggle = document.querySelector('.toggle');
          const showcase = document.querySelector('.showcase');
    
          menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            showcase.classList.toggle('active');

          })

//disable scrolling when navbar is opened
const scrollToggleButton = document.getElementById("toggleButton");

scrollToggleButton.addEventListener("click", function () {
    const body = document.body;
    if (body.style.overflow === "hidden") {
        body.style.overflow = "auto"; // Enable scrolling
    } else {
        body.style.overflow = "hidden"; // Disable scrolling
    }
});

//video slider
document.addEventListener("DOMContentLoaded", function () {
    const carousel = new Flickity(".carousel", {
      cellAlign: "left",
      contain: true,
      wrapAround: true,
      draggable: true,
      autoPlay: 5000,
      prevNextButtons: false,
      pageDots: true,
      pageDotPosition: "center"
    });
});

const cartList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const totalQuantity = document.getElementById('total-quantity');
const quantityElement = document.getElementById('quantity');
const minusButton = document.getElementById('minus');
const plusButton = document.getElementById('plus');


function updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total-quantity', JSON.stringify(overallQuantity));
}

const cartItemsContainer = document.getElementById('cart-items');
    const totalQuantityElement = document.getElementById('total-quantity');
    const cartTotalElement = document.getElementById('cart-total');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = ''; // Clear the existing cart items
    
        let totalQuantity = 0;
        let totalAmount = 0;

        if (cart.length === 0) {
            const emptyCartMessage = document.createElement('p');
            emptyCartMessage.textContent = 'Your cart is empty.';
            cartItemsContainer.appendChild(emptyCartMessage);
    
            totalQuantityElement.textContent = '0';
            cartTotalElement.textContent = '$0';
            return;
        }
    
        cart.forEach(item => {
            const cartItemElement = document.createElement('li');
            cartItemElement.classList.add('cart-item'); // Add a class for styling
    
            // Create a container for item details (left side)
            const itemDetailsContainer = document.createElement('div');
            itemDetailsContainer.classList.add('item-details');
    
            // Display item name and price on the left side
            const itemDetails = document.createElement('p');
            itemDetails.textContent = `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`;
            itemDetailsContainer.appendChild(itemDetails);
    
            cartItemElement.appendChild(itemDetailsContainer);
    
            // Create plus and minus buttons container (right side)
            const buttonsContainer = document.createElement('div');
            buttonsContainer.classList.add('quantity-control');
    
            // Minus button
            const minusButton = document.createElement('button');
            minusButton.innerText = '-';
            minusButton.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    removeItemFromCart(item);
                }
                updateCartDisplay();
            });
    
            // Quantity element
            const quantityElement = document.createElement('span');
            quantityElement.innerText = item.quantity;
    
            // Plus button
            const plusButton = document.createElement('button');
            plusButton.innerText = '+';
            plusButton.addEventListener('click', () => {
                item.quantity++;
                updateCartDisplay();
            });
    
            buttonsContainer.appendChild(minusButton);
            buttonsContainer.appendChild(quantityElement);
            buttonsContainer.appendChild(plusButton);
    
            cartItemElement.appendChild(buttonsContainer);
    
            cartItemsContainer.appendChild(cartItemElement);
    
            // Update total variables
            totalQuantity += item.quantity;
            totalAmount += item.price * item.quantity;
        });
    
        totalQuantityElement.textContent = totalQuantity.toString();
        cartTotalElement.textContent = `$${totalAmount.toFixed(2)}`;
    
        // Save updated cart to local storage
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    

    updateCartDisplay(); // Call this function to initialize the cart display




function removeItemFromCart(item) {
    const itemIndex = cart.indexOf(item);

    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
        updateCartDisplay();
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}




// Function to update the cart
function updateCart(button) {
    const foodItem = button.closest('.food-items');
    const itemName = foodItem.querySelector('h5').textContent;
    const itemPrice = parseFloat(foodItem.querySelector('.price').textContent.replace('$', ''));
    const itemImage = foodItem.querySelector('img').src;

    // Check if the item is already in the cart
    const existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        // If the item already exists, update its quantity
        const quantity = parseInt(foodItem.querySelector('.quantity').textContent);
        existingItem.quantity = quantity;
    } else {
        // If the item is not in the cart, add it with the specified quantity
        const quantity = parseInt(foodItem.querySelector('.quantity').textContent);
        cart.push({ name: itemName, price: itemPrice, image: itemImage, quantity: quantity });
    }

    // Update local storage
    updateLocalStorage();

    // Update the cart display
    updateCartDisplay();

    // Update the checkout page's displayed details
    updateCheckoutPage(); // Call the function to display order details on the checkout page
}


// Add an event listener to each "Add To Cart" button
const addToCartButtons = document.querySelectorAll('.shop-item-button');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get the product details
        const foodItem = button.parentElement.parentElement;
        const itemName = foodItem.querySelector('h5').textContent;
        const itemPrice = parseFloat(button.getAttribute('data-price')); // Get the item price from the data attribute
        const itemImage = foodItem.querySelector('img').src;

        // Check if the item is already in the cart
        const existingItem = cart.find(item => item.name === itemName);

        if (existingItem) {
            // If the item already exists, increment its quantity
            existingItem.quantity++;
        } else {
            // If the item is not in the cart, add it with quantity 1
            cart.push({ name: itemName, price: itemPrice, image: itemImage, quantity: 1 });
        }

        // Update local storage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update the cart display
        updateCartDisplay();
    });
});

function updateCheckoutPage() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    displayOrderDetails(cart);
}

updateCartDisplay(); // Call this function to initialize the cart display








const shoppingCart = document.querySelector('.shopping-cart');
const initialTop = 140; // Set the initial position here (adjust as needed)
const minTopPercentage = 150; // Minimum top position as a percentage
const maxTopPercentage = 300; // Maximum top position as a percentage

window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY || window.pageYOffset;
    const viewportHeight = window.innerHeight;

    // Calculate the minimum and maximum top positions based on percentages
    const minTop = (minTopPercentage / 100) * viewportHeight;
    const maxTop = (maxTopPercentage / 100) * viewportHeight;

    // Calculate the new top position, constrained by the min and max values
    const newTop = Math.min(maxTop, Math.max(minTop, initialTop + scrollPosition - 20));

    shoppingCart.style.top = newTop + 'px';
});



const arrowElement = document.querySelector('.arrow');

arrowElement.addEventListener('click', function() {
    const scrollPosition = window.innerHeight; // Set to 100vh

    // Use smooth scrolling to scroll to the calculated position
    window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth' // Adds smooth scrolling animation
    });
});

window.addEventListener("scroll", function() {
    var elementToHide = document.getElementById("elementToHide");
    if (elementToHide) {
        elementToHide.style.display = "none"; // Hide the element when any scrolling occurs
    }
});










