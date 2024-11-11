document.addEventListener('DOMContentLoaded', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    displayOrderDetails(cart);
});
function displayOrderDetails(cart) {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalQuantityElement = document.getElementById('total-quantity');
    const cartTotalElement = document.getElementById('cart-total');

    // Check if the cart is not empty
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalQuantityElement.textContent = '0';
        cartTotalElement.textContent = '$0';
        return;
    }

    // Initialize total variables
    let totalQuantity = 0;
    let totalAmount = 0;
    

    // Iterate through the cart items and display details
    cart.forEach(item => {
        const cartItemElement = document.createElement('li');

        // Display item name, quantity, and price
        const itemDetails = document.createElement('p');
        itemDetails.textContent = `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`;
        cartItemElement.appendChild(itemDetails);

        // Add the cart item to the container
        cartItemsContainer.appendChild(cartItemElement);

        // Update total variables
    
        totalQuantity += item.quantity;
        totalAmount += item.price * item.quantity;

    });

    // Display the total quantity and total price
    totalQuantityElement.textContent = totalQuantity.toString() || '0';
    cartTotalElement.textContent = `$${totalAmount.toFixed(2)}`;
}






