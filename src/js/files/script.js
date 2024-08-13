// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

const tg = window.Telegram.WebApp;
tg.ready();
console.log(tg.initDataUnsafe); // информация о пользователе

const initToggles = () => {
  const toggles = document.querySelectorAll('[data-toggle]');

  toggles.forEach(toggle => {
    const toggleType = toggle.getAttribute('data-toggle');
    if (toggleType === 'dropdown') {
      initDropdown(toggle);
    } else if (toggleType === 'offcanvas') {
      initOffcanvas(toggle);
    }
  });
};

const initDropdown = (toggleButton) => {
  const dropdown = toggleButton.closest('[data-dropdown]');
  const menu = dropdown.querySelector('[data-dropdown-menu]');

  if (!menu) {
    console.warn('Dropdown menu not found');
    return;
  }

  const toggleDropdown = (event) => {
    event.preventDefault();
    const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
    toggleButton.setAttribute('aria-expanded', !isExpanded);
    menu.classList.toggle('show', !isExpanded);
    toggleButton.classList.toggle('active', !isExpanded);

    if (!isExpanded) {
      const handleOutsideClick = (event) => {
        if (!dropdown.contains(event.target)) {
          toggleButton.setAttribute('aria-expanded', 'false');
          menu.classList.remove('show');
          toggleButton.classList.remove('active');
          document.removeEventListener('click', handleOutsideClick);
        }
      };

      document.addEventListener('click', handleOutsideClick);
    }
  };

  toggleButton.addEventListener('click', toggleDropdown);
};

const initOffcanvas = (toggleButton) => {
  const targetId = toggleButton.getAttribute('data-offcanvas-target');
  const offcanvasWrap = document.querySelector(targetId);
  const offcanvas = offcanvasWrap?.querySelector('.offcanvas-wrapper');
  const backdrop = document.querySelector('.offcanvas-backdrop');

  if (!offcanvas || !backdrop) {
    console.warn('Offcanvas target or backdrop not found');
    return;
  }

  const closeAllOffcanvases = () => {
    document.querySelectorAll('.offcanvas-wrapper').forEach(wrapper => {
      wrapper.parentElement.classList.remove('show');
    });
    document.documentElement.classList.remove('offcanvas-show');
    document.documentElement.classList.remove('lock');
  };

  const toggleOffcanvas = (event) => {
    event.preventDefault();
    event.stopPropagation(); // Prevent the click event from propagating up and triggering the document's click handler

    const isExpanded = offcanvasWrap.classList.contains('show');

    if (isExpanded) {
      closeAllOffcanvases();
    } else {
      closeAllOffcanvases();

      offcanvasWrap.classList.add('show');
      document.documentElement.classList.add('offcanvas-show');
      document.documentElement.classList.add('lock');
    }
  };

  const handleBackdropClick = (event) => {
    if (event.target === backdrop) {
      closeAllOffcanvases();
    }
  };

  // Safely add event listener to backdrop
  backdrop.addEventListener('click', handleBackdropClick);

  // Close offcanvas when clicking close buttons inside offcanvas
  const closeButtons = offcanvas.querySelectorAll('[data-close]');
  closeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent the click event from propagating up and triggering the document's click handler
      closeAllOffcanvases();
    });
  });

  // Toggle offcanvas when clicking the toggle button
  toggleButton.addEventListener('click', toggleOffcanvas);
};

document.addEventListener('DOMContentLoaded', () => {
  initToggles();
});