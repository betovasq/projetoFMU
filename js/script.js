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

// Reprodutor de Sons
  const soundButtons = document.querySelectorAll('.btn-sound');
  const soundToggle = document.getElementById('sound-toggle');
  const soundToggleIcon = document.getElementById('sound-toggle-icon');
  const volumeSlider = document.getElementById('volume-slider');
  const soundMute = document.getElementById('sound-mute');
  const volumeIcon = document.getElementById('volume-icon');
  const currentSoundDisplay = document.getElementById('current-sound');
  const audioPlayer = document.getElementById('audio-player');

  let isPlaying = false;
  let isMuted = false;
  let currentSound = 'rain';
  let volume = 50;

  const sounds = {
    'rain': {
      name: 'Chuva',
      url: 'https://soundbible.com/mp3/rain_thunder-Mike_Koenig-739006097.mp3'
    },
    'forest': {
      name: 'Floresta',
      url: 'https://soundbible.com/mp3/forest_amb-Mike_Koenig-1833732834.mp3'
    },
    'waves': {
      name: 'Ondas',
      url: 'https://soundbible.com/mp3/Ocean_Waves-Mike_Koenig-980635569.mp3'
    },
    'fire': {
      name: 'Lareira',
      url: 'https://soundbible.com/mp3/Fire_Burning-JaBa-810606592.mp3'
    },
    'birds': {
      name: 'Pássaros',
      url: 'https://soundbible.com/mp3/songbird-Daniel_Simion-1851957503.mp3'
    }
  };
  // Define o som inicial
  audioPlayer.src = sounds[currentSound].url;
  audioPlayer.volume = volume / 100;

  soundButtons.forEach(button => {
    button.addEventListener('click', function() {
      const soundId = this.getAttribute('data-sound');

      // Atualiza o botão ativo
      soundButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      });
      this.classList.add('active');
      this.setAttribute('aria-pressed', 'true');

      // Atualiza o som atual
      currentSound = soundId;
      currentSoundDisplay.textContent = sounds[soundId].name;

      // Atualiza a fonte de áudio
      audioPlayer.src = sounds[soundId].url;

      // Se já estiver tocando, continua tocando o novo som
      if (isPlaying) {
        audioPlayer.play().catch(e => console.log('Falha ao reproduzir áudio:', e));
      }
    });
  });
  soundToggle.addEventListener('click', function() {
    if (isPlaying) {
      audioPlayer.pause();
      soundToggleIcon.classList.remove('lucide-pause');
      soundToggleIcon.classList.add('lucide-play');
      soundToggle.setAttribute('aria-label', 'Reproduzir som');
    } else {
      audioPlayer.play().catch(e => console.log('Falha ao reproduzir áudio:', e));
      soundToggleIcon.classList.remove('lucide-play');
      soundToggleIcon.classList.add('lucide-pause');
      soundToggle.setAttribute('aria-label', 'Pausar som');
    }

    isPlaying = !isPlaying;
  });

  volumeSlider.addEventListener('input', function() {
    volume = this.value;
    audioPlayer.volume = volume / 100;

    // Atualiza o botão de mudo se o volume for alterado
    if (volume === 0) {
      volumeIcon.classList.remove('lucide-volume-2');
      volumeIcon.classList.add('lucide-volume-x');
      isMuted = true;
    } else if (isMuted) {
      volumeIcon.classList.remove('lucide-volume-x');
      volumeIcon.classList.add('lucide-volume-2');
      isMuted = false;
    }
  });

  soundMute.addEventListener('click', function() {
    if (isMuted) {
      audioPlayer.volume = volume / 100;
      volumeIcon.classList.remove('lucide-volume-x');
      volumeIcon.classList.add('lucide-volume-2');
      soundMute.setAttribute('aria-label', 'Silenciar');
    } else {
      audioPlayer.volume = 0;
      volumeIcon.classList.remove('lucide-volume-2');
      volumeIcon.classList.add('lucide-volume-x');
      soundMute.setAttribute('aria-label', 'Ativar som');
    }

    isMuted = !isMuted;
  });