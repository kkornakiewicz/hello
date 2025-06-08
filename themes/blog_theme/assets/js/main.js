document.addEventListener('DOMContentLoaded', function() {
  const hamburgerButton = document.querySelector('.hamburger-button');
  const hamburgerNav = document.querySelector('.hamburger-nav');
  
  if (hamburgerButton && hamburgerNav) {
    hamburgerButton.addEventListener('click', function() {
      this.classList.toggle('active');
      hamburgerNav.classList.toggle('active');
    });
  }
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!hamburgerButton.contains(event.target) && !hamburgerNav.contains(event.target)) {
      hamburgerButton.classList.remove('active');
      hamburgerNav.classList.remove('active');
    }
  });
  
  // Copy URL functionality
  const copyButton = document.querySelector('.copy-url');
  if (copyButton) {
    copyButton.addEventListener('click', function() {
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        this.classList.add('copied');
        setTimeout(() => this.classList.remove('copied'), 2000);
      });
    });
  }
}); 