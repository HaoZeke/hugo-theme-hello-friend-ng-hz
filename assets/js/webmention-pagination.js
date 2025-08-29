document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("webmentions");
  if (!container) {
    return;
  }

  const repliesContainer = container.querySelector(".webmentions__conversation");
  if (!repliesContainer) {
    return;
  }

  const replies = repliesContainer.querySelectorAll(".webmention");
  const paginationControls = container.querySelector(".webmentions__pagination");
  const REPLIES_PER_PAGE = 5; // You can change this number
  const totalPages = Math.ceil(replies.length / REPLIES_PER_PAGE);

  if (totalPages <= 1) {
    if (paginationControls) {
      paginationControls.style.display = "none";
    }
    return;
  }

  let currentPage = 1;

  const showPage = (page) => {
    const start = (page - 1) * REPLIES_PER_PAGE;
    const end = start + REPLIES_PER_PAGE;

    replies.forEach((reply, index) => {
      reply.style.display = index >= start && index < end ? "flex" : "none";
    });

    // Update active state on page buttons
    const pageButtons = paginationControls.querySelectorAll("[data-page]");
    pageButtons.forEach((button) => {
      button.classList.toggle("button--active", parseInt(button.dataset.page) === page);
    });

    // Update disabled state on prev/next buttons
    paginationControls.querySelector("[data-prev]").disabled = page === 1;
    paginationControls.querySelector("[data-next]").disabled = page === totalPages;
  };

  const createPagination = () => {
    let buttonsHTML = `
      <button class="button" data-prev>&larr; Newer</button>
      <div class="webmentions__pagination__pages">
    `;
    for (let i = 1; i <= totalPages; i++) {
      buttonsHTML += `<button class="button" data-page="${i}">${i}</button>`;
    }
    buttonsHTML += `
      </div>
      <button class="button" data-next>Older &rarr;</button>
    `;
    paginationControls.innerHTML = buttonsHTML;

    paginationControls.addEventListener("click", (e) => {
      if (e.target.matches("[data-page]")) {
        currentPage = parseInt(e.target.dataset.page);
      } else if (e.target.matches("[data-prev]")) {
        currentPage = Math.max(1, currentPage - 1);
      } else if (e.target.matches("[data-next]")) {
        currentPage = Math.min(totalPages, currentPage + 1);
      }
      showPage(currentPage);
    });
  };

  createPagination();
  showPage(1); // Show the first page initially
});
