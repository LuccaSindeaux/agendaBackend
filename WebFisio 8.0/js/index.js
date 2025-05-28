document.getElementById("hamburger").addEventListener("click", function () {
  const nav = document.querySelector(".nav-links");
  nav.classList.toggle("active");
  this.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Atualiza dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  // Navegação por dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateSlider();
    });
  });

  // Botões de navegação
  prevBtn.addEventListener("click", () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1;
    updateSlider();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
    updateSlider();
  });

  // Auto-play (opcional)
  setInterval(() => {
    currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
    updateSlider();
  }, 5000);
});


document.addEventListener("DOMContentLoaded", function () {
  const monthYear = document.getElementById("monthYear");
  const daysContainer = document.getElementById("calendarDays");
  const prevBtn = document.getElementById("prevMonth");
  const nextBtn = document.getElementById("nextMonth");

  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  let dataAtual = new Date();

  function renderizarCalendario(data) {
    daysContainer.innerHTML = "";

    const ano = data.getFullYear();
    const mes = data.getMonth();
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    const comecaEm = primeiroDia.getDay(); // 0 = domingo

    monthYear.textContent = `${meses[mes]} ${ano}`;

    for (let i = 0; i < comecaEm; i++) {
      const vazio = document.createElement("div");
      daysContainer.appendChild(vazio);
    }

    for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
      const celula = document.createElement("div");
      celula.textContent = dia;
      daysContainer.appendChild(celula);
    }
  }

  prevBtn.onclick = () => {
    dataAtual.setMonth(dataAtual.getMonth() - 1);
    renderizarCalendario(dataAtual);
  };

  nextBtn.onclick = () => {
    dataAtual.setMonth(dataAtual.getMonth() + 1);
    renderizarCalendario(dataAtual);
  };

  renderizarCalendario(dataAtual);
});

