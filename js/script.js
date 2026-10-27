// HERO TECH - GROUP DISCOUNT CALCULATOR

const discountForm = document.getElementById("discountForm");
const resultPanel = document.getElementById("resultPanel");

// Fictional equipment prices in Malaysian Ringgit (RM).
const equipmentCatalog = {
    shield: { name: "Energy Shield", price: 150 },
    gloves: { name: "Superpower Gloves", price: 250 },
    jetpack: { name: "Jetpack", price: 500 },
    suit: { name: "Advanced Hero Suit", price: 800 }
};

// Display money consistently with two decimal places.
function formatMoney(amount) {
    return "RM " + amount.toLocaleString("en-MY", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Determine the discount rate from the quantity purchased.
function getDiscountRate(quantity) {
    if (quantity >= 10) {
        return 0.15;
    } else if (quantity >= 5) {
        return 0.10;
    } else if (quantity >= 3) {
        return 0.05;
    } else {
        return 0;
    }
}

// Read, validate, calculate and display results when form is submitted.
discountForm.addEventListener("submit", function (event) {
    event.preventDefault();
    resultPanel.hidden = true;

    // STEP 1: Read form values using the DOM.
    const customerName = document.getElementById("customerName").value.trim();
    const customerEmail = document.getElementById("customerEmail").value.trim();
    const equipmentCode = document.getElementById("equipment").value;
    const quantityInput = document.getElementById("quantity").value.trim();
    const quantity = Number(quantityInput);

    // STEP 2: Validate required fields, email and numeric range.
    if (customerName === "") {
        alert("Please enter your name.");
        document.getElementById("customerName").focus();
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (customerEmail === "" || !emailPattern.test(customerEmail)) {
        alert("Please enter a valid email address.");
        document.getElementById("customerEmail").focus();
        return;
    }

    if (!Object.hasOwn(equipmentCatalog, equipmentCode)) {
        alert("Please select superhero equipment.");
        document.getElementById("equipment").focus();
        return;
    }

    if (quantityInput === "" || !Number.isInteger(quantity) || quantity < 1 || quantity > 100) {
        alert("Quantity must be a whole number from 1 to 100.");
        document.getElementById("quantity").focus();
        return;
    }

    // STEP 3: Apply the group discount rules.
    const item = equipmentCatalog[equipmentCode];
    const subtotal = item.price * quantity;
    const discountRate = getDiscountRate(quantity);
    const savings = subtotal * discountRate;
    const finalAmount = subtotal - savings;

    // STEP 4: Display customer inputs and calculated amounts.
    document.getElementById("resultName").textContent = customerName;
    document.getElementById("resultEmail").textContent = customerEmail;
    document.getElementById("resultEquipment").textContent = item.name;
    document.getElementById("resultQuantity").textContent = quantity;
    document.getElementById("resultUnitPrice").textContent = formatMoney(item.price);
    document.getElementById("resultSubtotal").textContent = formatMoney(subtotal);
    document.getElementById("resultDiscountRate").textContent = (discountRate * 100) + "%";
    document.getElementById("resultSavings").textContent = formatMoney(savings);
    document.getElementById("resultFinalAmount").textContent = formatMoney(finalAmount);

    resultPanel.hidden = false;
    alert("Calculation complete! Your group discount has been applied.");
    resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
});

// Hide any old result when the form is cleared.
discountForm.addEventListener("reset", function () {
    resultPanel.hidden = true;
});
