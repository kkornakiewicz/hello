document.addEventListener('DOMContentLoaded', function() {
  const hamburgerButton = document.querySelector('.hamburger-button');
  const hamburgerNav = document.querySelector('.hamburger-nav');
  
  hamburgerButton.addEventListener('click', function() {
    this.classList.toggle('active');
    hamburgerNav.classList.toggle('active');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!hamburgerButton.contains(event.target) && !hamburgerNav.contains(event.target)) {
      hamburgerButton.classList.remove('active');
      hamburgerNav.classList.remove('active');
    }
  });
}); 