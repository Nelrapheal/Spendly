if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .then(() => console.log("Service Worker registered"))
    .catch((err) => console.log("Service Worker failed:", err));
}



const num = document.getElementById("num");
const btn = document.getElementById("btn");
const bal = document.getElementById("bal");
const exp = document.getElementById("exp");
const amo = document.getElementById("amo");
const select = document.getElementById("select");
const add = document.getElementById("add");
const ul = document.getElementById("ul");
const totalDisplay = document.getElementById("total");
const reset = document.getElementById("reset");
const tip = document.getElementById("tip");

let balance = 0;
let totalSpent = 0;
let expenses = []; // array to store all expense objects

// ✅ Initialize data from localStorage
function loadData() {
  // If no data in localStorage, start from 0
  balance = parseFloat(localStorage.getItem("amount")) || 0;
  totalSpent = parseFloat(localStorage.getItem("spent")) || 0;
  expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  // Update UI (always show at least ₦0)
  bal.textContent = `Balance: ₦${balance.toLocaleString()}`;
  totalDisplay.textContent = `Total Spent: ₦${totalSpent.toLocaleString()}`;
  ul.innerHTML = "";

  // Recreate saved expenses if any
  if (expenses.length > 0) {
    expenses.forEach((item) =>
      createExpenseItem(item.expense, item.category, item.amount)
    );
  }
}

// ✅ Create list item for each expense
function createExpenseItem(expense, category, amount) {
  const li = document.createElement("li");
  const del = document.createElement("button");

  li.textContent = `${expense} - ${category} = ₦${amount.toLocaleString()}`;
  del.textContent = "❌";
  del.style.marginLeft = "10px";

  // delete event (refund)
  del.onclick = () => {
    balance += amount;
    totalSpent -= amount;
    expenses = expenses.filter(
      (item) =>
        !(
          item.expense === expense &&
          item.amount === amount &&
          item.category === category
        )
    );

    localStorage.setItem("amount", balance);
    localStorage.setItem("spent", totalSpent);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    bal.textContent = `Balance: ₦${balance.toLocaleString()}`;
    totalDisplay.textContent = `Total Spent: ₦${totalSpent.toLocaleString()}`;
    li.remove();
  };

  li.appendChild(del);
  ul.appendChild(li);
}

// ✅ Set balance
btn.addEventListener("click", () => {
  const amount = parseFloat(num.value);

  if (!isNaN(amount)) {
    balance = amount;
    totalSpent = 0;
    expenses = [];

    localStorage.setItem("amount", balance);
    localStorage.setItem("spent", totalSpent);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    bal.textContent = `Balance: ₦${balance.toLocaleString()}`;
    totalDisplay.textContent = `Total Spent: ₦${totalSpent.toLocaleString()}`;
    ul.innerHTML = "";
  } else {
    bal.textContent = "Please enter a valid number!";
  }
});

// ✅ Add expense
add.addEventListener("click", () => {
  const category = select.value;
  const expense = exp.value;
  const amount = parseFloat(amo.value);

  if (category && expense && !isNaN(amount)) {
    balance -= amount;
    totalSpent += amount;

    const newExpense = { expense, category, amount };
    expenses.push(newExpense);

    localStorage.setItem("amount", balance);
    localStorage.setItem("spent", totalSpent);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    bal.textContent = `Balance: ₦${balance.toLocaleString()}`;
    totalDisplay.textContent = `Total Spent: ₦${totalSpent.toLocaleString()}`;

    createExpenseItem(expense, category, amount);

    exp.value = "";
    amo.value = "";
  } else {
    alert("Please fill all fields with valid numbers!");
  }
});

// ✅ Load previous data when page opens
window.addEventListener("load", loadData);

reset.addEventListener("click", () => {
  const confirmDelete = confirm("Are you sure you want to delete all data?");

  if (confirmDelete) {
    localStorage.clear();
    balance = 0;
    totalSpent = 0;
    bal.textContent = "Balance: ₦0";
    totalDisplay.textContent = "Total Spent: ₦0";
    ul.innerHTML = ""; // clear the list

    alert("All data deleted successfully!");
  } else {
    alert("Action cancelled!");
  }
});

const tips = [
  "Only spend money on what you really need.",
  "Set a daily or weekly spending limit and don’t go over.",
  "Avoid eating out too often, cook cheap meals instead.",
  "Track every penny spent to see where your money goes.",
  "Carry only the money you plan to spend each day.",
  "Say no to impulse buys and online shopping temptations.",
  "Use public transport or walk instead of paying for rides.",
  "Limit coffee or snack purchases on campus.",
  "Plan your purchases ahead, never buy on a whim.",
  "Avoid borrowing money unless absolutely necessary.",
  "Compare prices before buying, look for deals.",
  "Stick to your budget, even if friends are spending.",
  "Keep a small emergency fund for unexpected expenses.",
  "Avoid subscriptions you rarely use.",
  "Review your spending weekly and adjust limits if needed."
];


tip.addEventListener('click', () => {
  alert(tips[Math.floor(Math.random()* tips.length)])
});