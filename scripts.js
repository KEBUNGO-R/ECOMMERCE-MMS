function filterProducts() {
    const category = document.getElementById('category').value;
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        if (category === 'all' || product.getAttribute('data-category') === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show');
}

document.getElementById("checkoutForm").addEventListener("submit", function(event) {
    // Example of simple client-side validation
    if (!this.checkValidity()) {
        event.preventDefault();
        alert("Please fill out all required fields.");
    } else {
        event.preventDefault(); // Prevent the default form submission

        // Display a confirmation message
        alert("Thank you for your order! Your order has been placed successfully.");

        // Optionally, you can clear the form fields after submission
        this.reset();
    }
});

// Add code to dynamically display order summary and payment options
// Example: Displaying a simple order summary
const orderSummary = document.getElementById('orderSummary');
orderSummary.innerHTML = `
    <h3>Order Summary</h3>
    <p>Product 1: $10.00</p>
    <p>Product 2: $20.00</p>
    <p>Total: $30.00</p>
`;

// Example: Displaying simple payment options
const paymentOptions = document.getElementById('paymentOptions');
paymentOptions.innerHTML = `
    <h3>Payment Options</h3>
    <label><input type="radio" name="payment" value="credit" required> Credit Card</label><br>
    <label><input type="radio" name="payment" value="paypal" required> PayPal</label>
`;
document.getElementById("checkoutForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    if (!this.checkValidity()) {
        alert("Please fill out all required fields.");
    } else {
        // Collect form data
        const formData = new FormData(this);

        // Convert form data to JSON
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Send data to the server
        fetch('https://your-server-endpoint.com/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert("Thank you for your order! Your order has been placed successfully.");
            this.reset(); // Optionally clear the form fields after submission
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("There was an error placing your order. Please try again.");
        });
    }
});