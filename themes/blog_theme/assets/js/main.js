document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.querySelector('.theme-toggle');
  const themeToggleMenu = document.querySelector('.theme-toggle-menu');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const hamburgerButton = document.querySelector('.hamburger-button');
  const hamburgerNav = document.querySelector('.hamburger-nav');
  
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
  
  // Random blinking prompt animation
  let promptInterval;
  let hoverTimeout;
  
  function startPromptAnimation() {
    const links = document.querySelectorAll('.hamburger-nav a');
    if (!links.length) return;
    
    function movePrompt() {
      // Remove prompt from all links
      links.forEach(link => {
        link.classList.remove('prompt-active');
        link.setAttribute('tabindex', '-1');
      });
      
      // Add prompt to random link
      const randomLink = links[Math.floor(Math.random() * links.length)];
      randomLink.classList.add('prompt-active');
      randomLink.setAttribute('tabindex', '0');
      randomLink.focus();
    }
    
    // Initial prompt
    movePrompt();
    
    // Move prompt every 3-5 seconds
    promptInterval = setInterval(movePrompt, Math.random() * 2000 + 3000);
  }
  
  function stopPromptAnimation() {
    if (promptInterval) {
      clearInterval(promptInterval);
      promptInterval = null;
    }
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      hoverTimeout = null;
    }
    document.querySelectorAll('.hamburger-nav a').forEach(link => {
      link.classList.remove('prompt-active');
      link.setAttribute('tabindex', '-1');
    });
  }
  
  // Add hover behavior for sidepanel links
  if (hamburgerNav) {
    hamburgerNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('mouseenter', () => {
        // Clear any existing timeouts
        if (hoverTimeout) {
          clearTimeout(hoverTimeout);
          hoverTimeout = null;
        }
        
        // Stop the random animation
        if (promptInterval) {
          clearInterval(promptInterval);
          promptInterval = null;
        }
        
        // Remove prompt from all links
        hamburgerNav.querySelectorAll('a').forEach(l => {
          l.classList.remove('prompt-active');
          l.setAttribute('tabindex', '-1');
        });
        
        // Add prompt to hovered link
        link.classList.add('prompt-active');
        link.setAttribute('tabindex', '0');
        link.focus();
      });
      
      link.addEventListener('mouseleave', () => {
        // Remove prompt from hovered link
        link.classList.remove('prompt-active');
        link.setAttribute('tabindex', '-1');
        
        // Wait 1 second before restarting random prompt animation
        hoverTimeout = setTimeout(() => {
          startPromptAnimation();
        }, 1000);
      });

      // Add keyboard navigation
      link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && link.classList.contains('prompt-active')) {
          e.preventDefault();
          link.click();
        }
      });
    });
  }
  
  // Hamburger menu toggle
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
    if (hamburgerButton && hamburgerNav && 
        !hamburgerButton.contains(event.target) && 
        !hamburgerNav.contains(event.target)) {
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