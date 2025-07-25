// Particles.js initialization
particlesJS('particles-js', {
  particles: {
    number: {
      value: window.innerWidth < 700 ? 50 : 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: '#4cc9f0'
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000'
      },
      polygon: {
        nb_sides: 5
      }
    },
    opacity: {
      value: 0.3,
      random: true,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 10,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#4cc9f0',
      opacity: 0.2,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse'
      },
      onclick: {
        enable: true,
        mode: 'push'
      }
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      }
    }
  },
  retina_detect: true
});

// Diagnostic: Prevent unintended redirects in .contact section
document.querySelector('.contact').addEventListener('click', (event) => {
  const target = event.target;
  const githubUrl = 'https://github.com/Rahulchowdary03/real-time-chat-server';
  
  // Allow clicks only on form inputs, submit button, or fallback email link
  if (!target.closest('.contact-form') && !target.closest('.fallback-contact a')) {
    event.preventDefault();
    event.stopPropagation();
    console.log('Blocked unintended click in .contact section. Target:', target);
    if (target.href === githubUrl || target.closest(`a[href="${githubUrl}"]`)) {
      console.warn('Attempted redirect to GitHub repository blocked:', githubUrl);
    }
  }
});

// Animated text for .animated-text
const allElements = document.querySelectorAll('.animated-text');
if (allElements.length > 0) {
  allElements.forEach((element) => {
    const txtElement = element;
    const wordsList = txtElement.getAttribute('data-words');
    if (!wordsList) {
      console.warn('No data-words attribute found on .animated-text element:', element);
      return;
    }
    const words = wordsList.split(', ');
    let wordsCount = 0;

    function entry() {
      if (wordsCount < words.length) {
        let word = words[wordsCount];
        let txtArr = word.split('');
        let count = 0;

        txtElement.textContent = '';
        txtArr.forEach((letter) => {
          let _letter = letter === ' ' ? ' ' : letter;
          txtElement.innerHTML += `<span>${_letter}</span>`;
        });

        let spans = txtElement.childNodes;
        const letterInterval = setInterval(activeLetter, 70);

        function activeLetter() {
          spans[count].classList.add('active');
          count++;
          if (count === spans.length) {
            clearInterval(letterInterval);
            setTimeout(() => {
              eraseText();
            }, 2000);
          }
        }

        function eraseText() {
          let removeInterval = setInterval(removeLetter, 40);
          count--;

          function removeLetter() {
            spans[count].classList.remove('active');
            count--;
            if (count === -1) {
              clearInterval(removeInterval);
              wordsCount++;
              entry();
            }
          }
        }
      } else {
        wordsCount = 0;
        entry();
      }
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      txtElement.textContent = words[0];
    } else {
      entry();
    }
  });
}

// Education section toggle
function toggleDetails(id) {
  const details = document.getElementById(id);
  if (!details) {
    console.error(`Details element with id "${id}" not found.`);
    return;
  }
  const btn = details.previousElementSibling;
  if (!btn || !btn.classList.contains('degree-btn')) {
    console.error(`Button for details id "${id}" not found or invalid.`);
    return;
  }
  const isOpen = details.style.display === 'block';

  // Close all other open details
  document.querySelectorAll('.education-details').forEach((detail) => {
    detail.style.display = 'none';
    const otherBtn = detail.previousElementSibling;
    if (otherBtn && otherBtn.classList.contains('degree-btn')) {
      otherBtn.querySelector('span').textContent = '▼';
      otherBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Toggle the clicked details
  details.style.display = isOpen ? 'none' : 'block';
  btn.querySelector('span').textContent = isOpen ? '▼' : '▲';
  btn.setAttribute('aria-expanded', !isOpen);
}

// Event delegation for education buttons
document.addEventListener('DOMContentLoaded', () => {
  const educationList = document.querySelector('.education-list');
  if (!educationList) {
    console.error('Education list not found in the DOM.');
    return;
  }

  educationList.addEventListener('click', (event) => {
    const btn = event.target.closest('.degree-btn');
    if (btn) {
      const id = btn.getAttribute('aria-controls');
      toggleDetails(id);
    }
  });
});

// Form submission handler
window.addEventListener('load', function() {
  const form = document.getElementById('contact-form');
  const successMessage = document.getElementById('form-success');
  const fallbackContact = document.querySelector('.fallback-contact');
  if (!form) {
    console.error('Contact form not found.');
    fallbackContact.style.display = 'block';
    return;
  }

  form.addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const githubUrl = 'https://github.com/Rahulchowdary03/real-time-chat-server';

    if (!name || !email || !message) {
      alert('Please fill out all fields.');
      return;
    }
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const response = await fetch('https://formspree.io/f/mldlroqg', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message
        })
      });

      if (response.ok) {
        form.style.display = 'none';
        successMessage.style.display = 'block';
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Get Started Now';
        setTimeout(() => {
          successMessage.style.display = 'none';
          form.style.display = 'flex';
        }, 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Formspree error:', error);
      alert('Failed to send message. Please try again or use the email link below.');
      fallbackContact.style.display = 'block';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Get Started Now';
    }

    // Prevent any redirect to GitHub
    if (window.location.href.includes(githubUrl)) {
      console.warn('Blocked attempt to redirect to GitHub:', githubUrl);
      window.location.href = window.location.pathname; // Stay on current page
    }
  });
});

// Override window.location to catch GitHub redirects
(function() {
  const originalSet = Object.getOwnPropertyDescriptor(window.location, 'href').set;
  const githubUrl = 'https://github.com/Rahulchowdary03/real-time-chat-server';
  Object.defineProperty(window.location, 'href', {
    set: function(value) {
      if (value === githubUrl) {
        console.warn('Blocked window.location.href redirect to:', githubUrl);
        return;
      }
      originalSet.call(window.location, value);
    }
  });
})();