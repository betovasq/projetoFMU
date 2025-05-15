document.addEventListener('DOMContentLoaded', function() {
  // ========== TEMA ==========
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Verifica preferência de tema
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
    themeIcon.textContent = "☀️";
  }
  
  themeToggle.addEventListener('click', function() {
    const isDark = document.documentElement.classList.toggle('dark');
    
    if (isDark) {
      themeIcon.textContent = "☀️";
      localStorage.setItem('theme', 'dark');
    } else {
      themeIcon.textContent = "🌙";
      localStorage.setItem('theme', 'light');
    }
  });

  // ========== CARROSSEL ==========
  const carouselItems = document.querySelectorAll('.carousel-item');
  let currentItem = 0;

  function showNextItem() {
    carouselItems[currentItem].classList.remove('active');
    currentItem = (currentItem + 1) % carouselItems.length;
    carouselItems[currentItem].classList.add('active');
  }

  // Inicia o carrossel
  if (carouselItems.length > 0) {
    carouselItems[0].classList.add('active');
    setInterval(showNextItem, 100000);
  }

  // ========== EXERCÍCIO DE RESPIRAÇÃO ==========
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
  
  // Atualiza técnica selecionada
  breathingTechnique.addEventListener('change', function() {
    const technique = this.value;
    breathingDescription.textContent = techniques[technique].description;
    
    if (isBreathingActive) {
      stopBreathingExercise();
      startBreathingExercise();
    }
  });
  
  // Controle do exercício
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
        breathingTimer = 0; // Reinicia o ciclo
      }
    }
    
    // Respiração Quadrada
    else if (breathingTechnique.value === 'box') {
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
        breathingTimer = 0; // Reinicia o ciclo
      }
    }
    
    // Respiração Calma
    else if (breathingTechnique.value === 'calm') {
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
        breathingTimer = 0; // Reinicia o ciclo
      }
    }
  }

  // ========== TIMER DE FOCO ==========
  const timerDisplay = document.getElementById('timer-display');
  const timerToggle = document.getElementById('timer-toggle');
  const timerReset = document.getElementById('timer-reset');
  const focusSlider = document.getElementById('focus-slider');
  const breakSlider = document.getElementById('break-slider');
  const focusLengthDisplay = document.getElementById('focus-length');
  const breakLengthDisplay = document.getElementById('break-length');
  const timerDescription = document.getElementById('timer-description');
  
  let minutes = parseInt(focusSlider.value);
  let seconds = 0;
  let timerInterval;
  let isTimerActive = false;
  let isTimerPaused = false;
  let sessionType = 'focus';
  
  // Atualiza sliders
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
  
  // Controles do timer
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
    
    minutes = sessionType === 'focus' ? parseInt(focusSlider.value) : parseInt(breakSlider.value);
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
          minutes = parseInt(breakSlider.value);
          timerDescription.textContent = 'Faça uma pausa para descansar.';
        } else {
          sessionType = 'focus';
          minutes = parseInt(focusSlider.value);
          timerDescription.textContent = 'Concentre-se na sua tarefa até o timer acabar.';
        }
        
        seconds = 0;
        isTimerActive = false;
        timerToggle.innerHTML = '<i class="lucide-play"></i> Iniciar';
        updateTimerDisplay();
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    updateTimerDisplay();
  }
  
  function updateTimerDisplay() {
    const displayMinutes = String(minutes).padStart(2, '0');
    const displaySeconds = String(seconds).padStart(2, '0');
    timerDisplay.textContent = `${displayMinutes}:${displaySeconds}`;
  }
  
  function playAlarmSound() {
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
    audio.play().catch(e => console.log('Falha ao reproduzir áudio:', e));
  }

  // ========== PLAYER DE SONS ==========
  // ... (mantenha o código existente do player de sons) ...
});
document.addEventListener('DOMContentLoaded', function() {
  // Inicializa os ícones Lucide
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Dados dos sons
  const sounds = {
    rain: {
      name: 'Chuva',
      url: 'https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-112294/zapsplat_nature_rain_medium_light_house_roof_ext_112299.mp3'
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
  let currentVolume = volumeSlider.value / 100;
  let currentSoundKey = 'rain';

  // Inicializa o player
  initAudio(currentSoundKey);
  updateVolumeIcon();

  // Função para carregar um áudio
  function initAudio(soundKey) {
    // Pausa e limpa o áudio atual
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }

    // Cria novo elemento de áudio
    currentAudio = new Audio(sounds[soundKey].url);
    currentAudio.volume = currentVolume;
    currentAudio.loop = true;
    currentSoundKey = soundKey;
    currentSoundDisplay.textContent = sounds[soundKey].name;

    // Atualiza botões ativos
    soundButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.sound === soundKey);
      btn.setAttribute('aria-pressed', btn.dataset.sound === soundKey);
    });

    // Se estava tocando, continua a reprodução
    if (isPlaying) {
      playAudio();
    }
  }

  // Função para reproduzir o áudio
  function playAudio() {
    currentAudio.play()
      .then(() => {
        isPlaying = true;
        updatePlayIcon();
      })
      .catch(error => {
        console.error("Erro ao reproduzir áudio:", error);
        // Mostra alerta se for erro de autoplay
        if (error.name === 'NotAllowedError') {
          alert('Por favor, clique no botão Play para iniciar os sons.');
        }
      });
  }

  // Função para pausar o áudio
  function pauseAudio() {
    currentAudio.pause();
    isPlaying = false;
    updatePlayIcon();
  }

  // Atualiza ícone play/pause
  function updatePlayIcon() {
    if (soundToggleIcon) {
      if (isPlaying) {
        soundToggleIcon.classList.replace('lucide-play', 'lucide-pause');
      } else {
        soundToggleIcon.classList.replace('lucide-pause', 'lucide-play');
      }
    }
  }

  // Atualiza ícone de volume
  function updateVolumeIcon() {
    if (!volumeIcon) return;
    
    if (currentVolume === 0) {
      volumeIcon.classList.replace('lucide-volume-2', 'lucide-volume-x');
      volumeIcon.classList.replace('lucide-volume-1', 'lucide-volume-x');
    } else if (currentVolume < 0.5) {
      volumeIcon.classList.replace('lucide-volume-x', 'lucide-volume-1');
      volumeIcon.classList.replace('lucide-volume-2', 'lucide-volume-1');
    } else {
      volumeIcon.classList.replace('lucide-volume-x', 'lucide-volume-2');
      volumeIcon.classList.replace('lucide-volume-1', 'lucide-volume-2');
    }
  }

  // Event Listeners

  // Botões de seleção de som
  soundButtons.forEach(button => {
    button.addEventListener('click', function() {
      const soundKey = this.dataset.sound;
      initAudio(soundKey);
    });
  });

  // Botão play/pause
  if (soundToggle) {
    soundToggle.addEventListener('click', function() {
      if (isPlaying) {
        pauseAudio();
      } else {
        playAudio();
      }
    });
  }

  // Botão mudo
  if (soundMute) {
    soundMute.addEventListener('click', function() {
      if (currentAudio.volume > 0) {
        currentAudio.volume = 0;
        volumeSlider.value = 0;
        currentVolume = 0;
      } else {
        currentAudio.volume = currentVolume || 0.5;
        volumeSlider.value = (currentVolume || 0.5) * 100;
      }
      updateVolumeIcon();
    });
  }

  // Controle de volume
  if (volumeSlider) {
    volumeSlider.addEventListener('input', function() {
      currentVolume = this.value / 100;
      if (currentAudio) {
        currentAudio.volume = currentVolume;
      }
      updateVolumeIcon();
    });
  }
});
// ========== ACCORDION ==========
document.addEventListener('DOMContentLoaded', function() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    header.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });
  
  // Define data de atualização
  const currentDate = new Date();
  document.getElementById('privacy-date').textContent = currentDate.toLocaleDateString('pt-BR');
});

// ========== MENU MOBILE ==========
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const menuIcon = document.getElementById('menu-icon');
  
  mobileMenuToggle.addEventListener('click', function() {
    mobileNav.classList.toggle('active');
    
    if (mobileNav.classList.contains('active')) {
      menuIcon.classList.replace('lucide-menu', 'lucide-x');
      document.body.style.overflow = 'hidden';
    } else {
      menuIcon.classList.replace('lucide-x', 'lucide-menu');
      document.body.style.overflow = '';
    }
  });
});