// =============================================
// MAIN - JavaScript Global
// =============================================

class App {
  constructor() {
    this.init();
  }

  init() {
    this.setupSidebar();
    this.setupFAB();
    this.setupHeaderActions();
  }

  setupSidebar() {
    const currentPage = window.location.pathname.split('/').pop();
    const sidebarItems = document.querySelectorAll('.sidebar__item');
    
    sidebarItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href && href.includes(currentPage)) {
        item.classList.add('sidebar__item--active');
      }
    });
  }

  setupFAB() {
    const fab = document.querySelector('.fab');
    if (fab) {
      fab.addEventListener('click', () => {
        alert('Fonctionnalité de messagerie à implémenter');
      });
    }
  }

  setupHeaderActions() {
    const notificationBtn = document.querySelector('.header__notification');
    if (notificationBtn) {
      notificationBtn.addEventListener('click', () => {
        alert('Notifications à implémenter');
      });
    }
  }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  new App();
  console.log('Digital Minds App initialized');
});