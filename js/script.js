
document.addEventListener('DOMContentLoaded', function() {
  // Define o ano atual no rodapé
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Alternador de Tema
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Verifica preferência de tema salva ou usa preferência do sistema
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
    themeIcon.classList.remove('lucide-moon');
    themeIcon.classList.add('lucide-sun');
  }
  
  themeToggle.addEventListener('click', function() {
    const isDark = document.documentElement.classList.toggle('dark');
    
    if (isDark) {
      themeIcon.classList.remove('lucide-moon');
      themeIcon.classList.add('lucide-sun');
      localStorage.setItem('theme', 'dark');
    } else {
      themeIcon.classList.remove('lucide-sun');
      themeIcon.classList.add('lucide-moon');
      localStorage.setItem('theme', 'light');
    }
  });
  document.getElementById("theme-toggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
    const themeIcon = document.getElementById("theme-icon");
    if (document.body.classList.contains("dark-theme")) {
      themeIcon.textContent = "☀️";
    } else {
      themeIcon.textContent = "🌙";
    }
  });
  
  // Alternador do Menu Mobile
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  menuToggle.addEventListener('click', function() {
    mainNav.style.display = mainNav.style.display === 'flex' ? 'none' : 'flex';
  });
  
 //script carrossel
 document.addEventListener('DOMContentLoaded', function() {
  const carouselItems = document.querySelectorAll('.carousel-item');
  let currentItem = 0;

  function showNextItem() {
    //remove a classe do item atualmente ativo
    carouselItems[currentItem].classList.remove('active');

    //avança para o proximo item
    currentItem(currentItem + 1) % carouselItems.length;

    //adiciona a classe active a um novo item
    carouselItems[currentItem].classList.add('active');
  }

  //inicia o carrossel (muda a cada 5 segundos)
setInterval(showNextItem, 5000);

  //garante que o primeiro item está ativo
  carouselItems[0].classList.add('active');
});


  // Exercício de Respiração
  const breathingCircle = document.getElementById('breathing-circle');
  const breathingText = document.getElementById('breathing-text');
  const breathingToggle = document.getElementById('breathing-toggle');
  const breathingTechnique = document.getElementById('breathing-technique');
  const breathingDescription = document.getElementById('breathing-description');
  
  let breathingInterval;
  let isBreathingActive = false;
  let breathingTimer = 0;
  
  const techniques = {
    '4-7-8': {
      inhale: 4,
      hold: 7,
      exhale: 8,
      description: 'Inspire por 4 segundos, segure por 7 segundos, expire por 8 segundos.'
    },
    'box': {
      inhale: 4,
      hold: 4,
      exhale: 4,
      holdAfterExhale: 4,
      description: 'Inspire por 4 segundos, segure por 4 segundos, expire por 4 segundos, segure por 4 segundos.'
    },
    'calm': {
      inhale: 6,
      hold: 0,
      exhale: 6,
      description: 'Inspire lentamente por 6 segundos, expire lentamente por 6 segundos.'
    }
  };
  
  breathingTechnique.addEventListener('change', function() {
    const technique = breathingTechnique.value;
    breathingDescription.textContent = techniques[technique].description;
    
    if (isBreathingActive) {
      stopBreathingExercise();
      startBreathingExercise();
    }
  });
  
  breathingToggle.addEventListener('click', function() {
    if (isBreathingActive) {
      stopBreathingExercise();
    } else {
      startBreathingExercise();
    }
  });
  
  function startBreathingExercise() {
    isBreathingActive = true;
    breathingToggle.textContent = 'Parar';
    breathingTimer = 0;
    
    breathingInterval = setInterval(updateBreathingExercise, 1000);
  }
  
  function stopBreathingExercise() {
    isBreathingActive = false;
    breathingToggle.textContent = 'Iniciar';
    breathingText.textContent = 'Prepare-se';
    breathingCircle.style.width = '200px';
    breathingCircle.style.height = '200px';
    
    clearInterval(breathingInterval);
  }
  
  function updateBreathingExercise() {
    const technique = techniques[breathingTechnique.value];
    breathingTimer++;
    
    // Técnica 4-7-8
    if (breathingTechnique.value === '4-7-8') {
      if (breathingTimer <= technique.inhale) {
        breathingText.textContent = 'Inspire';
        const progress = breathingTimer / technique.inhale;
        const size = 200 + (100 * progress);
        breathingCircle.style.width = `${size}px`;
        breathingCircle.style.height = `${size}px`;
      } else if (breathingTimer <= technique.inhale + technique.hold) {
        breathingText.textContent = 'Segure';
      } else if (breathingTimer <= technique.inhale + technique.hold + technique.exhale) {
        breathingText.textContent = 'Expire';
        const progress = (breathingTimer - technique.inhale - technique.hold) / technique.exhale;
        const size = 300 - (100 * progress);
        breathingCircle.style.width = `${size}px`;
        breathingCircle.style.height = `${size}px`;
      } else {
        breathingTimer = 0;
      }
    }
    
    // Respiração Quadrada
    if (breathingTechnique.value === 'box') {
      if (breathingTimer <= technique.inhale) {
        breathingText.textContent = 'Inspire';
        const progress = breathingTimer / technique.inhale;
        const size = 200 + (100 * progress);
        breathingCircle.style.width = `${size}px`;
        breathingCircle.style.height = `${size}px`;
      } else if (breathingTimer <= technique.inhale + technique.hold) {
        breathingText.textContent = 'Segure';
      } else if (breathingTimer <= technique.inhale + technique.hold + technique.exhale) {
        breathingText.textContent = 'Expire';
        const progress = (breathingTimer - technique.inhale - technique.hold) / technique.exhale;
        const size = 300 - (100 * progress);
        breathingCircle.style.width = `${size}px`;
        breathingCircle.style.height = `${size}px`;
      } else if (breathingTimer <= technique.inhale + technique.hold + technique.exhale + technique.holdAfterExhale) {
        breathingText.textContent = 'Segure';
      } else {
        breathingTimer = 0;
      }
    }
    
    // Respiração Calma
    if (breathingTechnique.value === 'calm') {
      if (breathingTimer <= technique.inhale) {
        breathingText.textContent = 'Inspire';
        const progress = breathingTimer / technique.inhale;
        const size = 200 + (100 * progress);
        breathingCircle.style.width = `${size}px`;
        breathingCircle.style.height = `${size}px`;
      } else if (breathingTimer <= technique.inhale + technique.exhale) {
        breathingText.textContent = 'Expire';
        const progress = (breathingTimer - technique.inhale) / technique.exhale;
        const size = 300 - (100 * progress);
        breathingCircle.style.width = `${size}px`;
        breathingCircle.style.height = `${size}px`;
      } else {
        breathingTimer = 0;
      }
    }
  }
  
  // Timer de Foco
  const timerDisplay = document.getElementById('timer-display');
  const timerToggle = document.getElementById('timer-toggle');
  const timerReset = document.getElementById('timer-reset');
  const focusSlider = document.getElementById('focus-slider');
  const breakSlider = document.getElementById('break-slider');
  const focusLengthDisplay = document.getElementById('focus-length');
  const breakLengthDisplay = document.getElementById('break-length');
  const timerDescription = document.getElementById('timer-description');
  
  let minutes = 25;
  let seconds = 0;
  let timerInterval;
  let isTimerActive = false;
  let isTimerPaused = false;
  let sessionType = 'focus'; // foco ou pausa
  let focusLength = 25;
  let breakLength = 5;
  
  focusSlider.addEventListener('input', function() {
    focusLength = parseInt(this.value);
    focusLengthDisplay.textContent = focusLength;
    
    if (sessionType === 'focus' && !isTimerActive) {
      minutes = focusLength;
      seconds = 0;
      updateTimerDisplay();
    }
  });
  
  breakSlider.addEventListener('input', function() {
    breakLength = parseInt(this.value);
    breakLengthDisplay.textContent = breakLength;
    
    if (sessionType === 'break' && !isTimerActive) {
      minutes = breakLength;
      seconds = 0;
      updateTimerDisplay();
    }
  });
  
  timerToggle.addEventListener('click', function() {
    if (!isTimerActive) {
      startTimer();
    } else if (isTimerPaused) {
      resumeTimer();
    } else {
      pauseTimer();
    }
  });
  
  timerReset.addEventListener('click', resetTimer);
  
  function startTimer() {
    isTimerActive = true;
    isTimerPaused = false;
    timerToggle.innerHTML = '<i class="lucide-pause"></i> Pausar';
    
    timerInterval = setInterval(updateTimer, 1000);
  }
  
  function pauseTimer() {
    isTimerPaused = true;
    timerToggle.innerHTML = '<i class="lucide-play"></i> Continuar';
    
    clearInterval(timerInterval);
  }
  
  function resumeTimer() {
    isTimerPaused = false;
    timerToggle.innerHTML = '<i class="lucide-pause"></i> Pausar';
    
    timerInterval = setInterval(updateTimer, 1000);
  }
  
  function resetTimer() {
    clearInterval(timerInterval);
    isTimerActive = false;
    isTimerPaused = false;
    
    if (sessionType === 'focus') {
      minutes = focusLength;
    } else {
      minutes = breakLength;
    }
    
    seconds = 0;
    timerToggle.innerHTML = '<i class="lucide-play"></i> Iniciar';
    updateTimerDisplay();
  }
  
  function updateTimer() {
    if (seconds === 0) {
      if (minutes === 0) {
        // Timer completado
        clearInterval(timerInterval);
        playAlarmSound();
        
        // Alterna o tipo de sessão
        if (sessionType === 'focus') {
          sessionType = 'break';
          minutes = breakLength;
          timerDescription.textContent = 'Faça uma pausa para descansar.';
        } else {
          sessionType = 'focus';
          minutes = focusLength;
          timerDescription.textContent = 'Concentre-se na sua tarefa até o timer acabar.';
        }
        
        seconds = 0;
        isTimerActive = false;
        timerToggle.innerHTML = '<i class="lucide-play"></i> Iniciar';
        updateTimerDisplay();
      } else {
        minutes--;
        seconds = 59;
        updateTimerDisplay();
      }
    } else {
      seconds--;
      updateTimerDisplay();
    }
  }
  
  function updateTimerDisplay() {
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  
  function playAlarmSound() {
    const audio = new Audio('https://soundbible.com/mp3/service-bell_daniel_simion.mp3');
    audio.play().catch(e => console.log('Falha ao reproduzir áudio:', e));
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Sound data
  const sounds = {
    rain: {
      name: 'Chuva',
      url: "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-112294/zapsplat_nature_rain_medium_light_house_roof_ext_112299.mp3"
    },
    forest: {
      name: 'Floresta',
      url: 'https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-112294/zapsplat_nature_australia_forest_summer_insects_cicada_distant_birds_002_112474.mp3'
    },
    waves: {
      name: 'Ondas',
      url: 'https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-344-audio/344_audio_AMBSea_EXT_Quiet_Beach_Morning_Waves_Sand_Wind_Edited_344_Audio_UK_Seaside_Town_and_Theme_Park_1701.mp3'
    },
    fire: {
      name: 'Lareira',
      url: 'https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-gma/gma_fire_burning_flames_crackle_loop_01_351.mp3'
    },
    birds: {
      name: 'Pássaros',
      url: 'https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-dylan-barfield/dylan_barfield_AMBTrop_QLD_Rainforest_quiet_morning_ambience_dB_AUS_112.mp3'
    }
  };

  // Elementos do DOM
  const soundButtons = document.querySelectorAll('.btn-sound');
  const soundToggle = document.getElementById('sound-toggle');
  const soundToggleIcon = document.getElementById('sound-toggle-icon');
  const currentSoundDisplay = document.getElementById('current-sound');
  const soundMute = document.getElementById('sound-mute');
  const volumeIcon = document.getElementById('volume-icon');
  const volumeSlider = document.getElementById('volume-slider');

  // Estado do player
  let currentAudio = null;
  let isPlaying = false;
  let currentVolume = 0.5;
  let currentSound = 'rain';

  // Inicializa o áudio
  function initAudio(soundKey) {
    // Pausa e descarta o áudio atual, se existir
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }

    // Cria novo elemento de áudio
    currentAudio = new Audio(sounds[soundKey].url);
    currentAudio.volume = currentVolume;
    currentAudio.loop = true;
    currentSound = soundKey;
    currentSoundDisplay.textContent = sounds[soundKey].name;

    // Configura eventos do áudio
    currentAudio.addEventListener('play', () => {
      isPlaying = true;
      updatePlayIcon();
    });

    currentAudio.addEventListener('pause', () => {
      isPlaying = false;
      updatePlayIcon();
    });

    // Se estava tocando, continua a reprodução
    if (isPlaying) {
      currentAudio.play().catch(e => {
        console.error("Erro ao reproduzir áudio:", e);
        isPlaying = false;
        updatePlayIcon();
      });
    }
  }

  // Atualiza ícone de play/pause
  function updatePlayIcon() {
    if (isPlaying) {
      soundToggleIcon.classList.remove('lucide-play');
      soundToggleIcon.classList.add('lucide-pause');
    } else {
      soundToggleIcon.classList.remove('lucide-pause');
      soundToggleIcon.classList.add('lucide-play');
    }
  }

  // Alterna entre play/pause
  function togglePlayPause() {
    if (!currentAudio) {
      initAudio(currentSound);
    }

    if (isPlaying) {
      currentAudio.pause();
    } else {
      currentAudio.play().catch(e => {
        console.error("Erro ao reproduzir áudio:", e);
        // Mostra alerta apenas se for uma restrição de autoplay
        if (e.name === 'NotAllowedError') {
          alert('Por favor, clique no botão "Play" para iniciar o som.');
        }
      });
    }
  }

  // Alterna mudo
  function toggleMute() {
    if (!currentAudio) return;

    if (currentAudio.volume > 0) {
      currentAudio.volume = 0;
      volumeIcon.classList.remove('lucide-volume-2', 'lucide-volume-1');
      volumeIcon.classList.add('lucide-volume-x');
    } else {
      currentAudio.volume = currentVolume;
      updateVolumeIcon();
    }
  }

  // Atualiza volume
  function updateVolume() {
    currentVolume = volumeSlider.value / 100;
    if (currentAudio) {
      currentAudio.volume = currentVolume;
    }
    updateVolumeIcon();
  }

  // Atualiza ícone de volume
  function updateVolumeIcon() {
    if (currentVolume === 0) {
      volumeIcon.classList.remove('lucide-volume-1', 'lucide-volume-2');
      volumeIcon.classList.add('lucide-volume-x');
    } else if (currentVolume < 0.5) {
      volumeIcon.classList.remove('lucide-volume-x', 'lucide-volume-2');
      volumeIcon.classList.add('lucide-volume-1');
    } else {
      volumeIcon.classList.remove('lucide-volume-x', 'lucide-volume-1');
      volumeIcon.classList.add('lucide-volume-2');
    }
  }

  // Define o botão ativo
  function setActiveButton(soundKey) {
    soundButtons.forEach(button => {
      const buttonSound = button.getAttribute('data-sound');
      const isActive = buttonSound === soundKey;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', isActive.toString());
    });
  }

  // Event Listeners
  soundButtons.forEach(button => {
    button.addEventListener('click', function() {
      const soundKey = this.getAttribute('data-sound');
      initAudio(soundKey);
      setActiveButton(soundKey);
    });
  });

  soundToggle.addEventListener('click', togglePlayPause);
  soundMute.addEventListener('click', toggleMute);
  volumeSlider.addEventListener('input', updateVolume);

  // Inicialização
  initAudio(currentSound);
  setActiveButton(currentSound);
  updateVolumeIcon();
  updatePlayIcon();
});
 // Script para o accordion
    document.addEventListener('DOMContentLoaded', function() {
      const accordionItems = document.querySelectorAll('.accordion-item');
      
      accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
          // Fecha todos os outros itens
          accordionItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
            }
          });
          
          // Alterna o item clicado
          item.classList.toggle('active');
        });
      });
      
      // Abre o primeiro item por padrão
      if (accordionItems.length > 0) {
        accordionItems[0].classList.add('active');
      }
      
      // Define a data de atualização
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      document.getElementById('privacy-date').textContent = formattedDate;
    });
    document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const menuIcon = document.getElementById('menu-icon');
  
  // Alternar menu mobile
  mobileMenuToggle.addEventListener('click', function() {
    mobileNav.classList.toggle('active');
    
    // Animação do ícone
    if (mobileNav.classList.contains('active')) {
      menuIcon.classList.remove('lucide-menu');
      menuIcon.classList.add('lucide-x');
      document.body.style.overflow = 'hidden'; // Trava o scroll
    } else {
      menuIcon.classList.remove('lucide-x');
      menuIcon.classList.add('lucide-menu');
      document.body.style.overflow = ''; // Libera o scroll
    }
  });
  
  // Fechar menu ao clicar em um link (mobile)
  const mobileLinks = document.querySelectorAll('.mobile-nav .nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileNav.classList.remove('active');
      menuIcon.classList.remove('lucide-x');
      menuIcon.classList.add('lucide-menu');
      document.body.style.overflow = ''; // Libera o scroll
    });
  });
  
  // Fechar menu ao redimensionar para desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 992) {
      mobileNav.classList.remove('active');
      menuIcon.classList.remove('lucide-x');
      menuIcon.classList.add('lucide-menu');
      document.body.style.overflow = ''; // Libera o scroll
    }
  });
});