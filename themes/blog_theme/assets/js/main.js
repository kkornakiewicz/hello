document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.querySelector('.theme-toggle');
  const themeToggleMenu = document.querySelector('.theme-toggle-menu');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Function to update theme toggle text
  function updateThemeToggleText() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    if (themeToggleMenu) {
      themeToggleMenu.textContent = currentTheme === 'dark' ? 'light mode 🌕' : 'dark mode 🌑';
    }
  }
  
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (prefersDarkScheme.matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  
  // Initial theme toggle text update
  updateThemeToggleText();
  
  // Toggle theme function
  function toggleTheme(e) {
    if (e) e.preventDefault();
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleText();
  }
  
  // Theme toggle event listeners
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  if (themeToggleMenu) {
    themeToggleMenu.addEventListener('click', toggleTheme);
  }
  
  // Random prompt animation
  let promptInterval;
  const hamburgerNav = document.querySelector('.hamburger-nav');
  const navLinks = hamburgerNav ? hamburgerNav.querySelectorAll('a') : [];
  
  function startPromptAnimation() {
    if (!hamburgerNav || !navLinks.length) return;
    
    function movePrompt() {
      // Remove prompt from all links
      navLinks.forEach(link => link.classList.remove('prompt-active'));
      
      // Add prompt to random link
      const randomIndex = Math.floor(Math.random() * navLinks.length);
      navLinks[randomIndex].classList.add('prompt-active');
    }
    
    // Initial prompt
    movePrompt();
    
    // Move prompt every 3-5 seconds
    promptInterval = setInterval(() => {
      movePrompt();
    }, Math.random() * 2000 + 3000); // Random interval between 3-5 seconds
  }
  
  function stopPromptAnimation() {
    if (promptInterval) {
      clearInterval(promptInterval);
      navLinks.forEach(link => link.classList.remove('prompt-active'));
    }
  }
  
  // Close menu when clicking outside
  const hamburgerButton = document.querySelector('.hamburger-button');
  
  if (hamburgerButton && hamburgerNav) {
    hamburgerButton.addEventListener('click', function() {
      this.classList.toggle('active');
      hamburgerNav.classList.toggle('active');
      
      if (hamburgerNav.classList.contains('active')) {
        startPromptAnimation();
      } else {
        stopPromptAnimation();
      }
    });
  }
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!hamburgerButton.contains(event.target) && !hamburgerNav.contains(event.target)) {
      hamburgerButton.classList.remove('active');
      hamburgerNav.classList.remove('active');
      stopPromptAnimation();
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