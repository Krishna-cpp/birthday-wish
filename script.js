document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     🎨 PARTICLE SYSTEM
  ========================== */
  const particlesContainer = document.getElementById("particles");
  
  function createParticles() {
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDuration = (Math.random() * 10 + 10) + "s";
      particle.style.animationDelay = Math.random() * 5 + "s";
      particle.style.width = (Math.random() * 4 + 2) + "px";
      particle.style.height = particle.style.width;
      
      // Random colors for particles
      const colors = ['rgba(255, 255, 255, 0.6)', 'rgba(255, 154, 203, 0.4)', 'rgba(255, 215, 0, 0.4)'];
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      
      particlesContainer.appendChild(particle);
    }
  }

  createParticles();

  /* =========================
     🎊 CONFETTI SYSTEM
  ========================== */
  const confettiContainer = document.getElementById("confetti-container");

  function createConfetti(count = 100) {
    const colors = ['#ff5fa2', '#ff8cc5', '#ffd700', '#ff69b4', '#87ceeb', '#98fb98'];
    
    for (let i = 0; i < count; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      
      // Random properties
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDuration = (Math.random() * 2 + 2) + "s";
      confetti.style.animationDelay = (Math.random() * 0.3) + "s";
      
      // Random shapes
      const shapes = ['circle', 'square', 'rectangle'];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      
      if (shape === 'circle') {
        confetti.style.borderRadius = "50%";
      } else if (shape === 'rectangle') {
        confetti.style.width = "15px";
        confetti.style.height = "8px";
      }
      
      confettiContainer.appendChild(confetti);
      
      // Remove after animation
      setTimeout(() => {
        confetti.remove();
      }, 3000);
    }
  }

  /* =========================
     🔊 SOUND HELPER
  ========================== */
  function playSound(audioId, volume = 0.3) {
    const audio = document.getElementById(audioId);
    if (audio) {
      audio.volume = volume;
      audio.currentTime = 0;
      audio.play().catch(e => console.log("Audio play prevented:", e));
    }
  }

  /* =========================
     🎂 BLOW CANDLES LOGIC
  ========================== */
  const blowBtn = document.getElementById("blow-btn");
  const candle2 = document.getElementById("candle-2");
  const candle0 = document.getElementById("candle-0");
  const flameContainer = document.getElementById("flame-container");

  if (blowBtn && candle2 && candle0) {
    blowBtn.addEventListener("click", () => {
      // Blow out flames
      if (flameContainer) {
        const flames = flameContainer.querySelectorAll('.flame');
        flames.forEach((flame, index) => {
          setTimeout(() => {
            flame.classList.add('blown-out');
          }, index * 100);
        });
        
        setTimeout(() => {
          flameContainer.style.display = 'none';
        }, 600);
      }

      // Change candles to blown state
      setTimeout(() => {
        candle2.src = "assets/stickers/2-blown.png";
        candle0.src = "assets/stickers/0-blown.png";
        
        // Remove flicker animation
        candle2.classList.remove('candle-flicker');
        candle0.classList.remove('candle-flicker');
      }, 400);

      // Play blow sound
      playSound("blow-sound", 0.4);

      // Trigger confetti explosion
      setTimeout(() => {
        createConfetti(150);
      }, 500);

      // Disable button with smooth transition
      blowBtn.disabled = true;
      blowBtn.style.opacity = "0.5";
      blowBtn.style.cursor = "not-allowed";
      blowBtn.querySelector('.button-text').textContent = "Candles Blown! 🎉";
      blowBtn.classList.remove('pulse-animation');

      // Add celebration message
      setTimeout(() => {
        const ageMessage = document.getElementById("age-message");
        if (ageMessage) {
          ageMessage.style.animation = "none";
          setTimeout(() => {
            ageMessage.style.animation = "message-entrance 0.8s ease-out forwards";
          }, 10);
        }
      }, 800);
    });
  }

  /* =========================
     📸 PHOTO SWAP + MESSAGE
  ========================== */
  const photoBtn = document.getElementById("photo-btn");
  const photo1 = document.getElementById("photo-1");
  const photo2 = document.getElementById("photo-2");
  const photoText = document.getElementById("photo-text");

  if (photoBtn && photo1 && photo2 && photoText) {
    photoBtn.addEventListener("click", () => {
      // Play whoosh sound
      playSound("whoosh-sound", 0.3);

      // Disable button
      photoBtn.disabled = true;
      photoBtn.style.pointerEvents = "none";

      // Fade out photo 1
      photo1.style.transition = "opacity 0.5s ease";
      photo1.style.opacity = "0";

      setTimeout(() => {
        photo1.classList.add("hidden");

        // Show photo 2 with animation
        photo2.classList.remove("hidden");
        photo2.style.opacity = "0";
        photo2.style.transition = "opacity 0.8s ease";
        
        setTimeout(() => {
          photo2.style.opacity = "1";
        }, 50);

        // Show message with animation
        setTimeout(() => {
          photoText.classList.remove("hidden");
          photoText.classList.add("fade-in");
          
          // Small confetti celebration
          createConfetti(50);
        }, 400);

        // Hide button with fade
        photoBtn.style.transition = "opacity 0.5s ease";
        photoBtn.style.opacity = "0";
        setTimeout(() => {
          photoBtn.style.display = "none";
        }, 500);
      }, 500);
    });
  }

  /* =========================
     🎀 NAME STICKER EASTER EGG
  ========================== */
  const nameSticker = document.getElementById("name-sticker");
  let nameClickCount = 0;

  if (nameSticker) {
    nameSticker.addEventListener("click", () => {
      nameClickCount++;

      // Create heart particles
      createHeartParticles(nameSticker);

      if (nameClickCount === 1) {
        showCustomAlert("hey you 🌷", 2000);
      } else if (nameClickCount === 3) {
        showCustomAlert("you're clicking a lot! 💕", 2000);
      } else if (nameClickCount === 5) {
        showCustomAlert("okay that's enough clicking 😄", 2500);
        createConfetti(30);
      } else if (nameClickCount >= 7) {
        showCustomAlert("alright alright! you found a secret! 🎉", 3000);
        showAchievement();
        nameClickCount = 0; // Reset
      }
    });
  }

  /* =========================
     💝 HEART PARTICLES
  ========================== */
  function createHeartParticles(element) {
    const rect = element.getBoundingClientRect();
    const hearts = ['💕', '💖', '💗', '💝', '💓'];
    
    for (let i = 0; i < 5; i++) {
      const heart = document.createElement("div");
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.position = "fixed";
      heart.style.left = (rect.left + rect.width / 2) + "px";
      heart.style.top = (rect.top + rect.height / 2) + "px";
      heart.style.fontSize = "24px";
      heart.style.pointerEvents = "none";
      heart.style.zIndex = "9999";
      heart.style.animation = `float-heart ${Math.random() * 1 + 1}s ease-out forwards`;
      
      document.body.appendChild(heart);
      
      setTimeout(() => heart.remove(), 2000);
    }
  }

  // Heart float animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float-heart {
      0% {
        opacity: 1;
        transform: translate(0, 0) scale(1);
      }
      100% {
        opacity: 0;
        transform: translate(${Math.random() * 100 - 50}px, -100px) scale(0.5);
      }
    }
  `;
  document.head.appendChild(style);

  /* =========================
     🥚 KONAMI CODE EASTER EGG
  ========================== */
  const konamiCode = [
    "ArrowUp", "ArrowUp",
    "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight",
    "ArrowLeft", "ArrowRight",
    "b", "a"
  ];

  let konamiInput = [];

  document.addEventListener("keydown", (e) => {
    konamiInput.push(e.key);
    konamiInput = konamiInput.slice(-konamiCode.length);

    if (JSON.stringify(konamiInput) === JSON.stringify(konamiCode)) {
      showCustomAlert("🎮 KONAMI CODE ACTIVATED! 🎮", 3000);
      createConfetti(200);
      showAchievement("Konami Master!");
      
      // Add rainbow effect to title
      const title = document.querySelector('.main-title');
      if (title) {
        title.style.animation = "rainbow-text 2s linear infinite";
      }
      
      konamiInput = []; // Reset
    }
  });

  // Rainbow text animation
  const rainbowStyle = document.createElement('style');
  rainbowStyle.textContent = `
    @keyframes rainbow-text {
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }
  `;
  document.head.appendChild(rainbowStyle);

  /* =========================
     🎭 CAKE CLICK EASTER EGG
  ========================== */
  const cake = document.getElementById("cake");
  let cakeClickCount = 0;

  if (cake) {
    cake.addEventListener("click", () => {
      cakeClickCount++;

      // Add bounce animation
      cake.style.animation = "cake-bounce 0.5s ease";
      setTimeout(() => {
        cake.style.animation = "";
      }, 500);

      if (cakeClickCount === 1) {
        showCustomAlert("kaisa hai cake? 🎂", 2000);
      } else if (cakeClickCount === 3) {
        showCustomAlert("it's a delicious cake! 😋", 2000);
        createConfetti(20);
      } else if (cakeClickCount === 5) {
        showCustomAlert("stop poking the cake! 😄", 2500);
      } else if (cakeClickCount >= 7) {
        showCustomAlert("fine, you can have an extra slice! 🍰", 3000);
        showAchievement("Cake Lover!");
        cakeClickCount = 0;
      }
    });
  }

  // Cake bounce animation
  const cakeBounce = document.createElement('style');
  cakeBounce.textContent = `
    @keyframes cake-bounce {
      0%, 100% { transform: scale(1); }
      25% { transform: scale(0.95) rotate(-2deg); }
      50% { transform: scale(1.05) rotate(2deg); }
      75% { transform: scale(0.98) rotate(-1deg); }
    }
  `;
  document.head.appendChild(cakeBounce);

  /* =========================
     🏆 ACHIEVEMENT SYSTEM
  ========================== */
  function showAchievement(subtitle = "Secret Found!") {
    const badge = document.getElementById("achievement");
    if (badge && badge.classList.contains('hidden')) {
      const badgeSubtitle = badge.querySelector('.badge-subtitle');
      if (badgeSubtitle) {
        badgeSubtitle.textContent = subtitle;
      }
      
      badge.classList.remove('hidden');
      playSound("whoosh-sound", 0.5);
      createConfetti(100);

      setTimeout(() => {
        badge.style.animation = "badge-popup 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) reverse forwards";
        setTimeout(() => {
          badge.classList.add('hidden');
          badge.style.animation = "";
        }, 600);
      }, 3000);
    }
  }

  /* =========================
     💬 CUSTOM ALERT SYSTEM
  ========================== */
  function showCustomAlert(message, duration = 2000) {
    // Remove any existing alerts
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
      existingAlert.remove();
    }

    const alert = document.createElement('div');
    alert.className = 'custom-alert';
    alert.textContent = message;
    alert.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%) translateY(-20px);
      background: linear-gradient(135deg, #ff9acb, #ff7fb8);
      color: white;
      padding: 15px 30px;
      border-radius: 50px;
      box-shadow: 0 10px 30px rgba(255, 95, 162, 0.5);
      z-index: 10001;
      font-family: 'Baloo 2', cursive;
      font-size: 18px;
      font-weight: 600;
      opacity: 0;
      transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      pointer-events: none;
    `;

    document.body.appendChild(alert);

    // Animate in
    setTimeout(() => {
      alert.style.opacity = '1';
      alert.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);

    // Animate out
    setTimeout(() => {
      alert.style.opacity = '0';
      alert.style.transform = 'translateX(-50%) translateY(-20px)';
      setTimeout(() => alert.remove(), 500);
    }, duration);
  }

  /* =========================
     ⌨️ SECRET TYPING EASTER EGG
  ========================== */
  let typedSecret = "";
  const secretWord = "birthday";
  let secretTimeout;

  document.addEventListener("keypress", (e) => {
    clearTimeout(secretTimeout);
    
    typedSecret += e.key.toLowerCase();
    
    // Keep only last 10 characters
    if (typedSecret.length > 10) {
      typedSecret = typedSecret.slice(-10);
    }

    if (typedSecret.includes(secretWord)) {
      showCustomAlert("You typed the magic word! 🎉✨", 3000);
      createConfetti(75);
      typedSecret = "";
    }

    // Reset after 2 seconds of no typing
    secretTimeout = setTimeout(() => {
      typedSecret = "";
    }, 2000);
  });

  /* =========================
     🎵 BACKGROUND MUSIC TOGGLE
     (Optional - commented out by default)
  ========================== */
  /*
  let musicPlaying = false;
  document.addEventListener("click", () => {
    if (!musicPlaying) {
      // You can add background music here
      musicPlaying = true;
    }
  }, { once: true });
  */

  /* =========================
     📱 MOBILE TOUCH OPTIMIZATIONS
  ========================== */
  if ('ontouchstart' in window) {
    // Add touch feedback
    const buttons = document.querySelectorAll('button, .cake, .name-sticker');
    buttons.forEach(btn => {
      btn.addEventListener('touchstart', () => {
        btn.style.transform = 'scale(0.95)';
      });
      btn.addEventListener('touchend', () => {
        btn.style.transform = '';
      });
    });
  }

  /* =========================
     🎨 ENTRANCE ANIMATIONS
  ========================== */
  setTimeout(() => {
    const elements = document.querySelectorAll('.title-container, .name-container, .birthday-stickers, .cake-area, .age-message, .photo-area');
    elements.forEach((el, index) => {
      el.style.opacity = '0';
      setTimeout(() => {
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        el.style.opacity = '1';
      }, index * 100);
    });
  }, 100);

  /* =========================
     🎊 WELCOME CONFETTI
  ========================== */
  setTimeout(() => {
    createConfetti(50);
  }, 1000);

  console.log("🎂 Happy Birthday Page Loaded! 🎉");
  console.log("💡 Try clicking around to find hidden surprises!");
  console.log("🎮 Hint: Try the Konami Code or type 'birthday'");
/* Music Toggle */
  const bgm = document.getElementById("bgm");
  const musicToggle = document.getElementById("music-toggle");
  let musicPlaying = false;

  if (musicToggle && bgm) {
    // Auto-play on first click
    document.addEventListener("click", () => {
      if (!musicPlaying && bgm.src) {
        bgm.volume = 0.2;
        bgm.play().catch(e => console.log("Music blocked"));
        musicPlaying = true;
        musicToggle.classList.add('playing');
      }
    }, { once: true });

    // Toggle button
    musicToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      if (musicPlaying) {
        bgm.pause();
        musicToggle.textContent = "🔇";
        musicToggle.classList.remove('playing');
        musicPlaying = false;
      } else {
        bgm.play().catch(e => console.log("Music blocked"));
        musicToggle.textContent = "🎵";
        musicToggle.classList.add('playing');
        musicPlaying = true;
      }
    });
  }
});