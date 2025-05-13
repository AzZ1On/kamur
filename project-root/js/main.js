function filterMeshes() {
  const type = document.getElementById("mesh-type").value;
  const cards = document.querySelectorAll(".mesh-card");
  cards.forEach(card => {
    card.style.display = (type === "all" || card.dataset.type === type) ? "block" : "none";
  });
}
document.addEventListener("DOMContentLoaded", filterMeshes);

function includeHTML(selector, filePath) {
  fetch(filePath)
    .then(response => response.text())
    .then(html => {
      document.querySelector(selector).innerHTML = html;
    })
    .catch(err => console.error(`Ошибка загрузки ${filePath}:`, err));
}

document.addEventListener("DOMContentLoaded", () => {
  includeHTML("#header", "includes/header.html");
  includeHTML("#footer", "includes/footer.html");
});

// Обработка кнопок "Подробнее"
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function () {
    const card = this.closest('.product-card');
    const type = card.querySelector('.product-title')?.textContent;
    const size = card.querySelector('select')?.value;
    alert(`Вы выбрали: ${type} сетка, размер ${size}`);
  });
});
