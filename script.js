function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

function updateCheckmarkIcons(theme) {
  const checkmarkIcons = document.querySelectorAll('img[src*="checkmark"]');
  checkmarkIcons.forEach(icon => {
    if (theme === 'dark') {
      if (icon.src.includes('checkmark.png')) {
        icon.src = icon.src.replace('checkmark.png', 'checkmark-i.png');
      }
    } else { 
      if (icon.src.includes('checkmark-i.png')) {
        icon.src = icon.src.replace('checkmark-i.png', 'checkmark.png');
      }
    }
  });
}

function initDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
  
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateCheckmarkIcons(currentTheme); 
  
  if (currentTheme === 'dark') {
    darkModeToggle.checked = true;
    darkModeToggleMobile.checked = true;
  }
  
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateCheckmarkIcons(newTheme); 

    darkModeToggle.checked = newTheme === 'dark';
    darkModeToggleMobile.checked = newTheme === 'dark';
  }
  
  darkModeToggle.addEventListener('change', toggleTheme);
  darkModeToggleMobile.addEventListener('change', toggleTheme);
}

document.addEventListener('DOMContentLoaded', initDarkMode);

document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, 
  });

  const observeAndStagger = (selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
      el.classList.add('hidden');
      el.style.transitionDelay = `${index * 50}ms`;
      observer.observe(el);
    });
  };

  observeAndStagger(`
    #profile .section__pic-container,
    #profile .section__text > *
  `);
  observeAndStagger(`
    #about .section__text__p1,
    #about .title,
    #about .section-container > *
  `);
  observeAndStagger(`
    #experience .section__text__p1,
    #experience .title,
    #experience .experience-details-container
  `);
  observeAndStagger(`
    #projects .section__text__p1,
    #projects .title,
    #projects .about-containers > .details-container
  `);
  observeAndStagger(`
    #contact .section__text__p1,
    #contact .title,
    #contact .contact-info-section,
    #contact .contact-form-section
  `);
});

const startTime = Date.now();

window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');

  const hideLoader = () => {
    if (preloader) {
      preloader.classList.add('hidden');
    }
  };

  const elapsedTime = Date.now() - startTime;
  const minimumTime = 3000;
  
  const remainingTime = Math.max(0, minimumTime - elapsedTime);

  setTimeout(hideLoader, remainingTime);
});

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const serviceID = 'service_zffamkn';
      const templateID = 'template_vk97hjj';
      const publicKey = 'I74UbT1MTIC4yFPq-';

      const formData = new FormData(this);
      
      if (!formData.get('name') || !formData.get('email') || !formData.get('subject') || !formData.get('message')) {
        showNotification('Please fill in all fields', 'error');
        return;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.get('email'))) {
        showNotification('Please enter a valid email address', 'error');
        return;
      }

      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.querySelector('span').textContent;
      
      submitButton.querySelector('span').textContent = 'Sending...';
      submitButton.disabled = true;

      const templateParams = {
        name: formData.get('name'),
        email: formData.get('email'),
        title: formData.get('subject'),
        message: formData.get('message'),
        time: new Date().toLocaleString(),
      };

      emailjs.init(publicKey);
      emailjs.send(serviceID, templateID, templateParams)
        .then(() => {
          submitButton.querySelector('span').textContent = originalText;
          submitButton.disabled = false;
          showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
          contactForm.reset();
        }, (err) => {
          submitButton.querySelector('span').textContent = originalText;
          submitButton.disabled = false;
          showNotification('Failed to send message. Please try again later.', 'error');
          console.error('EmailJS Error:', err);
        });
    });
  }
});

function showNotification(message, type = 'info') {

  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <span class="notification-message">${message}</span>
    <button class="notification-close">&times;</button>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);

  const closeNotification = () => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 400); 
  };
  

  const closeButton = notification.querySelector('.notification-close');
  closeButton.addEventListener('click', closeNotification);
  
 
  setTimeout(closeNotification, 5000);
}


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId.length > 1) { 
      document.querySelector(targetId).scrollIntoView({
        behavior: 'smooth'
      });
    } else { 
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  });
});

(function() {
  const originalTitle = document.title;
  const comebackMessage = "Come back! 👋";

  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      document.title = comebackMessage;
    } else {
      document.title = originalTitle;
    }
  });
})();
