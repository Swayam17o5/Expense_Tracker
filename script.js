document.addEventListener("DOMContentLoaded", function () {
  const expenseForm = document.getElementById("expense-form");
  const expenseName = document.getElementById("expense-name");
  const expenseAmt = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmtDisplay = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let totalAmount = calculateTotal();

  renderExpenses();

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = expenseName.value.trim();
    const amount = parseFloat(expenseAmt.value.trim());

    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        name: name,
        amount: amount,
      };
      expenses.push(newExpense);
      saveExpensesToLocal();
      updateTotal();
      renderExpenses();

      // Clear input
      expenseName.value = "";
      expenseAmt.value = "";
    }
  });

  function calculateTotal() {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  function updateTotal() {
    totalAmount = calculateTotal();
    totalAmtDisplay.textContent = `${totalAmount.toFixed(2)}`;
  }

  function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const li = document.createElement("li"); // You missed assigning this
      li.innerHTML = `
        ${expense.name} - $${expense.amount}
        <button data-id="${expense.id}">Delete</button>
      `;
      expenseList.appendChild(li);

      // Add delete functionality
      li.querySelector("button").addEventListener("click", () => {
        expenses = expenses.filter((item) => item.id !== expense.id);
        saveExpensesToLocal();
        updateTotal();
        renderExpenses();
      });
    });
  }

  function saveExpensesToLocal() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  // Initial total amount display
  updateTotal();
});
