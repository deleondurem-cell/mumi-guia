let currentAudio = null;
let currentActiveButton = null;

function toggleAudio(audioPath, buttonElement) {
  // Pausar si el mismo audio ya se encuentra en reproducción
  if (currentAudio && !currentAudio.paused && currentActiveButton === buttonElement) {
    currentAudio.pause();
    resetAudioButton(buttonElement);
    return;
  }

  // Detener pistas previas
  stopAudio();

  currentAudio = new Audio(audioPath);
  currentActiveButton = buttonElement;

  const textSpan = buttonElement.querySelector('.btn-text');
  if (textSpan) {
    buttonElement.dataset.originalText = textSpan.textContent;
    textSpan.textContent = 'Reproduciendo audio...';
  }
  buttonElement.classList.add('playing');

  currentAudio.play().catch(error => {
    console.warn('Audio no disponible aún en la ruta:', audioPath);
    // Vuelve al texto normal de inmediato sin lanzar alertas invasivas en pantalla
    resetAudioButton(buttonElement);
  });

  currentAudio.onended = () => {
    resetAudioButton(buttonElement);
  };
}

function stopAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  if (currentActiveButton) {
    resetAudioButton(currentActiveButton);
  }
}

function resetAudioButton(buttonElement) {
  if (buttonElement) {
    const textSpan = buttonElement.querySelector('.btn-text');
    if (textSpan && buttonElement.dataset.originalText) {
      textSpan.textContent = buttonElement.dataset.originalText;
    }
    buttonElement.classList.remove('playing');
  }
  currentActiveButton = null;
  currentAudio = null;
}

function goToScreen(screenNumber) {
  stopAudio();

  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });

  const target = document.getElementById('screen-' + screenNumber);
  if (target) {
    target.classList.add('active');
  }

  window.scrollTo(0, 0);
}
