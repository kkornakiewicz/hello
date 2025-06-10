document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.querySelector('.theme-toggle');
  const themeToggleMenu = document.querySelector('.theme-toggle-menu');
  const hamburgerButton = document.querySelector('.hamburger-button');
  const hamburgerNav = document.querySelector('.hamburger-nav');
  
  
  // Function to update theme toggle text
  function updateThemeToggleText() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (themeToggleMenu) {
      themeToggleMenu.textContent = isDark ? 'light mode 🌕' : 'dark mode 🌑';
    }
  }
  
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeToggleText();
  
  // Toggle theme function
  function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    updateThemeToggleText();
  }
  
  // Theme toggle event listeners
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  if (themeToggleMenu) {
    themeToggleMenu.addEventListener('click', toggleTheme);
  }
  
  // Hamburger menu toggle
  if (hamburgerButton && hamburgerNav) {
    hamburgerButton.addEventListener('click', function() {
      this.classList.toggle('active');
      hamburgerNav.classList.toggle('active');
      
      if (hamburgerNav.classList.contains('active')) {
        // Make sidepanel focusable and focus it
        hamburgerNav.setAttribute('tabindex', '0');
        hamburgerNav.focus();
        
        // Clear any existing focus and set focus on first link
        const links = hamburgerNav.querySelectorAll('a');
        links.forEach(link => {
          link.classList.remove('prompt-active');
          link.setAttribute('tabindex', '-1');
        });
        
        const firstLink = links[0];
        if (firstLink) {
          firstLink.classList.add('prompt-active');
          firstLink.setAttribute('tabindex', '0');
          firstLink.focus();
        }
      } else {
        // Clear focus when closing
        const links = hamburgerNav.querySelectorAll('a');
        links.forEach(link => {
          link.classList.remove('prompt-active');
          link.setAttribute('tabindex', '-1');
        });
      }
    });

    // Add keyboard navigation to hamburger button
    hamburgerButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        hamburgerButton.click();
      }
    });
  }
  
  // Add hover behavior for sidepanel links
  if (hamburgerNav) {
    const links = hamburgerNav.querySelectorAll('a');
    
    // Function to move focus and prompt
    function moveFocusAndPrompt(direction) {
      const currentIndex = Array.from(links).findIndex(link => link.classList.contains('prompt-active'));
      let newIndex;
      
      if (direction === 'up') {
        newIndex = currentIndex <= 0 ? links.length - 1 : currentIndex - 1;
      } else {
        newIndex = currentIndex >= links.length - 1 ? 0 : currentIndex + 1;
      }
      
      // Remove prompt from all links
      links.forEach(link => {
        link.classList.remove('prompt-active');
        link.setAttribute('tabindex', '-1');
      });
      
      // Add prompt to new link
      const newLink = links[newIndex];
      newLink.classList.add('prompt-active');
      newLink.setAttribute('tabindex', '0');
      newLink.focus();
    }

    // Function to clear all focus
    function clearAllFocus() {
      links.forEach(link => {
        link.classList.remove('prompt-active');
        link.setAttribute('tabindex', '-1');
      });
    }
    
    // Add hover behavior to links
    let resetTimeout;
    
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        // Clear any existing timeout
        if (resetTimeout) {
          clearTimeout(resetTimeout);
        }
        clearAllFocus();
        link.classList.add('prompt-active');
        link.setAttribute('tabindex', '0');
        link.focus();
      });

    });
    
    // Add keyboard navigation to the sidepanel itself
    hamburgerNav.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        // If no link is currently focused, focus the first one
        if (!hamburgerNav.querySelector('.prompt-active')) {
          clearAllFocus();
          const firstLink = links[0];
          firstLink.classList.add('prompt-active');
          firstLink.setAttribute('tabindex', '0');
          firstLink.focus();
        } else {
          moveFocusAndPrompt(e.key === 'ArrowUp' ? 'up' : 'down');
        }
      } else if (e.key === 'Escape') {
        // Close menu on Escape key
        hamburgerButton.classList.remove('active');
        hamburgerNav.classList.remove('active');
        clearAllFocus();
        hamburgerButton.focus();
      }
    });
  }
  
  // Global keyboard handler for space key
  document.addEventListener('keydown', (e) => {
    if (e.key === ' ' && !e.target.matches('input, textarea')) {
      e.preventDefault();
      if (hamburgerButton) {
        hamburgerButton.click();
      }
    }
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (hamburgerButton && hamburgerNav && 
        !hamburgerButton.contains(event.target) && 
        !hamburgerNav.contains(event.target)) {
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