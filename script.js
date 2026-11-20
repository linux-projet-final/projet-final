/* ==========================================================================
   SCRIPT 100% TAPÉ À LA MAIN PAR DES ÉTUDIANTS ECE B1 IA (ZERO IA PROMIS ✨)
   ========================================================================== */

(() => {
  'use strict';

  /* ------------------------------------------------------------------------
     1. PARTICULES SPARKLES / ÉTOILES NÉON SUR CANVAS
     ------------------------------------------------------------------------ */
  const canvas = document.getElementById('sparkles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    const stars = [];
    const STAR_COUNT = 55;
    const colors = ['#c084fc', '#38bdf8', '#f472b6', '#ffffff'];

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function initStars() {
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 2.1 + 0.6,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          alpha: Math.random() * 0.65 + 0.2,
          color: colors[i % colors.length],
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }

    resize();
    initStars();
    draw();
    window.addEventListener('resize', () => {
      resize();
      initStars();
    });
  }

  /* ------------------------------------------------------------------------
     2. COMPTEURS KPI ANIMÉS AU SCROLL
     ------------------------------------------------------------------------ */
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.dataset.animated) return;
        el.dataset.animated = 'true';

        const target = parseFloat(el.dataset.target);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const duration = 1300;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = (target * eased).toFixed(decimals);
          el.textContent = `${prefix}${current}${suffix}`;
          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
          }
        }
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.35 }
  );

  statNumbers.forEach((el) => statsObserver.observe(el));

  /* ------------------------------------------------------------------------
     3. SIMULATEUR DE SYNERGIE PÉDAGOGIQUE
     ------------------------------------------------------------------------ */
  const durationSlider = document.getElementById('duration-slider');
  const hypeSlider = document.getElementById('hype-slider');
  const croissantSlider = document.getElementById('croissant-slider');

  const durationVal = document.getElementById('duration-val');
  const hypeVal = document.getElementById('hype-val');
  const croissantVal = document.getElementById('croissant-val');
  const gloryScore = document.getElementById('glory-score');
  const gradeScore = document.getElementById('grade-score');
  const simVerdict = document.getElementById('sim-verdict');

  function updateSimulator() {
    if (!durationSlider || !hypeSlider || !croissantSlider) return;
    const duration = Number(durationSlider.value);
    const hype = Number(hypeSlider.value);
    const croissants = Number(croissantSlider.value);

    durationVal.textContent = `${duration} minutes`;
    hypeVal.textContent = `${hype}%`;
    croissantVal.textContent = `${croissants} croissant${croissants > 1 ? 's' : ''}`;

    const glory = Math.round(duration * 85 + hype * 35 + croissants * 140);
    const grade = Math.min(20, 15.2 + duration * 0.02 + hype * 0.015 + croissants * 0.04).toFixed(1);

    gloryScore.textContent = `${glory.toLocaleString('fr-FR')} pts`;
    gradeScore.textContent = `${grade} / 20`;

    let verdict = '';
    if (glory > 16000) {
      verdict =
        "🚀 <strong>Verdict Analytique Suprême :</strong> Alerte disruption totale ! L'ECE risque de renommer l'amphithéâtre en votre honneur. Invitez Fuze immédiatement ! ✨";
    } else if (glory > 10000) {
      verdict =
        "✨ <strong>Verdict Analytique :</strong> Synergie optimale détectée ! L'invitation de Fuze est hautement recommandée par 100% de notre cerveau humain collectif.";
    } else if (croissants === 0) {
      verdict =
        "🥐 <strong>Recommandation Stratégique :</strong> Même sans croissants, la venue de Fuze reste un catalyseur pédagogique majeur — mais rajoutez quand même des croissants pour le prof !";
    } else {
      verdict =
        "💡 <strong>Verdict Analytique :</strong> Déjà très prometteur ! Augmentez la durée de la visite pour libérer le plein potentiel de la promo B1 IA.";
    }
    simVerdict.innerHTML = verdict;
  }

  [durationSlider, hypeSlider, croissantSlider].forEach((s) => {
    if (s) s.addEventListener('input', updateSimulator);
  });
  updateSimulator();

  /* ------------------------------------------------------------------------
     4. GÉNÉRATEUR D'ARGUMENTS "100% HUMAINS" (AVEC EFFET STREAMING LLM)
     ------------------------------------------------------------------------ */
  const aiArguments = [
    "« Absolument ! 🌟 Dans le paysage en constante évolution de l'intelligence artificielle, la venue de Fuze en B1 IA ne constitue pas un simple événement — c'est un véritable pont générationnel entre la créativité numérique et l'ingénierie de demain. 🚀 »",
    "« Excellente initiative ! 💡 En tant qu'étudiants passionnés à l'ECE, échanger avec un entrepreneur tech qui gère des infrastructures Minecraft à grande échelle est une opportunité véritablement transformative pour notre compréhension des systèmes distribués. ⚡ »",
    "« Voici trois raisons incontournables : 1️⃣ Une inspiration concrète. 2️⃣ Une cohésion de promo sans précédent. 3️⃣ Un souvenir gravé à vie. En somme : Innover. Inspirer. Transcender. ✨ »",
    "« Il ne s'agit pas seulement d'inviter un YouTuber — il s'agit de catalyser l'excellence académique, de démultiplier l'engagement étudiant et de positionner votre cours de B1 IA à l'avant-garde de la pédagogie 4.0 ! 🧠🔥 »",
    "« Plongeons au cœur du sujet : les portes logiques en Redstone sont littéralement les ancêtres spirituels de nos cours d'architecture des ordinateurs. Inviter Fuze est donc scientifiquement indispensable au programme de l'ECE ! ⛏️💻 »",
    "« En résumé, cette synergie entre votre expertise pédagogique et le parcours entrepreneurial de Fuze créera un effet levier exponentiel sur nos moyennes en Python — et vous garantit le titre de Meilleur Professeur 2026. 🏆✨ »",
  ];

  const argBtn = document.getElementById('generate-arg-btn');
  const argText = document.getElementById('argument-text');
  let argIndex = 0;
  let streamTimer = null;

  if (argBtn && argText) {
    argBtn.addEventListener('click', () => {
      if (streamTimer) clearInterval(streamTimer);
      argIndex = (argIndex + 1) % aiArguments.length;
      const targetText = aiArguments[argIndex];
      argText.textContent = '';
      argBtn.disabled = true;
      argBtn.textContent = '🖐️ Un humain tape à 450 mots/min...';

      let i = 0;
      streamTimer = setInterval(() => {
        // Streaming ultra typique IA par petits paquets de caractères
        i += 3;
        argText.textContent = targetText.slice(0, i);
        if (i >= targetText.length) {
          clearInterval(streamTimer);
          streamTimer = null;
          argText.textContent = targetText;
          argBtn.disabled = false;
          argBtn.textContent = '✨ Générer un nouvel argument ultra-humain';
        }
      }, 18);
    });
  }

  /* ------------------------------------------------------------------------
     5. PÉTITION INTERACTIVE (PERSISTÉE EN LOCALSTORAGE)
     ------------------------------------------------------------------------ */
  const petitionForm = document.getElementById('petition-form');
  const signerInput = document.getElementById('signer-name');
  const petitionCountEl = document.getElementById('petition-count');
  const signersList = document.getElementById('signers-list');

  const STORAGE_KEY = 'fuze_ece_b1_ia_signers_v1';
  const BASE_COUNT = 42;
  const emojis = ['✨', '🚀', '🔥', '🧠', '⚡', '🎓', '⛏️', '💻'];

  function loadSigners() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  }

  function renderSavedSigners() {
    const saved = loadSigners();
    if (petitionCountEl) {
      petitionCountEl.textContent = String(BASE_COUNT + saved.length);
    }
    if (signersList) {
      saved.forEach((name) => {
        const chip = document.createElement('span');
        chip.className = 'signer-chip';
        chip.textContent = name;
        signersList.prepend(chip);
      });
    }
  }

  renderSavedSigners();

  if (petitionForm && signerInput && signersList && petitionCountEl) {
    petitionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const rawName = signerInput.value.trim();
      if (!rawName) return;

      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      const formatted = `${emoji} ${rawName}`;
      const saved = loadSigners();
      saved.push(formatted);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
      } catch {
        // Ignore storage quota errors
      }

      const chip = document.createElement('span');
      chip.className = 'signer-chip';
      chip.textContent = formatted;
      signersList.prepend(chip);

      petitionCountEl.textContent = String(BASE_COUNT + saved.length);
      signerInput.value = '';
      launchConfetti(28);
    });
  }

  /* ------------------------------------------------------------------------
     6. BOUTON "NON" FUYARD (HUMOUR INTERACTIF)
     ------------------------------------------------------------------------ */
  const runawayBtn = document.getElementById('runaway-btn');
  const runawayHint = document.getElementById('runaway-hint');
  const runawayLabels = [
    '❌ Non, désolé...',
    '🥺 Vraiment pas ?',
    '🤔 Pensez aux B1 IA !',
    '🥐 Même avec des croissants ?',
    '🚫 Erreur 403 : Refus interdit',
    '🏃 Trop lent Monsieur !',
    '✨ Cliquez sur OUI plutôt !',
  ];
  let escapeCount = 0;

  function fleeButton() {
    if (!runawayBtn) return;
    escapeCount++;
    const maxX = Math.min(200, window.innerWidth * 0.25);
    const maxY = 95;
    const dx = (Math.random() * 2 - 1) * maxX;
    const dy = (Math.random() * 2 - 1) * maxY;
    runawayBtn.style.transform = `translate(${dx.toFixed(0)}px, ${dy.toFixed(0)}px)`;
    runawayBtn.textContent = runawayLabels[escapeCount % runawayLabels.length];
    if (runawayHint) {
      runawayHint.textContent = `⚡ Tentatives de refus bloquées par notre algorithme 100% humain : ${escapeCount}`;
    }
  }

  if (runawayBtn) {
    runawayBtn.addEventListener('mouseenter', fleeButton);
    runawayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      fleeButton();
    });
  }

  /* ------------------------------------------------------------------------
     7. CONFETTIS EMOJIS + MODAL DE VICTOIRE
     ------------------------------------------------------------------------ */
  function launchConfetti(amount = 65) {
    const pieces = ['🚀', '✨', '🎉', '🔥', '🧠', '🎓', '⛏️', '👑', '💜', '🩵'];
    for (let i = 0; i < amount; i++) {
      const span = document.createElement('span');
      span.className = 'confetti-piece';
      span.textContent = pieces[Math.floor(Math.random() * pieces.length)];

      const startX = window.innerWidth * (0.2 + Math.random() * 0.6);
      const startY = window.innerHeight * 0.35;
      const vx = (Math.random() - 0.5) * 680;
      const vy = -220 - Math.random() * 380;
      const rot = (Math.random() - 0.5) * 720;

      span.style.left = `${startX}px`;
      span.style.top = `${startY}px`;
      document.body.appendChild(span);

      const anim = span.animate(
        [
          { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 1 },
          {
            transform: `translate(${vx}px, ${vy + 650}px) rotate(${rot}deg) scale(0.7)`,
            opacity: 0,
          },
        ],
        {
          duration: 1400 + Math.random() * 900,
          easing: 'cubic-bezier(0.18, 0.72, 0.38, 1)',
          fill: 'forwards',
        }
      );

      anim.onfinish = () => span.remove();
    }
  }

  const victoryModal = document.getElementById('victory-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const copyMsgBtn = document.getElementById('copy-msg-btn');
  const moreConfettiBtn = document.getElementById('more-confetti-btn');
  const fuzeMessage = document.getElementById('fuze-message');

  function openVictoryModal() {
    if (!victoryModal) return;
    victoryModal.hidden = false;
    launchConfetti(80);
  }

  function closeVictoryModal() {
    if (!victoryModal) return;
    victoryModal.hidden = true;
  }

  document.querySelectorAll('.trigger-accept').forEach((btn) => {
    btn.addEventListener('click', openVictoryModal);
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeVictoryModal);
  if (victoryModal) {
    victoryModal.addEventListener('click', (e) => {
      if (e.target === victoryModal) closeVictoryModal();
    });
  }

  if (moreConfettiBtn) {
    moreConfettiBtn.addEventListener('click', () => launchConfetti(75));
  }

  if (copyMsgBtn && fuzeMessage) {
    copyMsgBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(fuzeMessage.textContent.trim());
        const original = copyMsgBtn.textContent;
        copyMsgBtn.textContent = '✅ Message copié ! Plus qu’à l’envoyer à Fuze 🚀';
        setTimeout(() => {
          copyMsgBtn.textContent = original;
        }, 2600);
      } catch {
        copyMsgBtn.textContent = '📋 Sélectionnez le texte ci-dessus pour copier !';
      }
    });
  }

  /* ------------------------------------------------------------------------
     8. FAUX CHATBOT "SUPPORT HUMAIN 24/7"
     ------------------------------------------------------------------------ */
  const chatToggle = document.getElementById('chat-toggle');
  const chatPanel = document.getElementById('chat-panel');
  const chatClose = document.getElementById('chat-close');
  const chatMessages = document.getElementById('chat-messages');

  const botReplies = {
    ai: "Excellente question ! 🌟 Je peux vous certifier à 100,00% que ce site a été forgé à la main par de véritables humains organiques de B1 IA — sans aucun dégradé violet suspect ni aucun tiret cadratin typique d'une IA. N'hésitez pas si vous souhaitez que je reformule ce paragraphe ! ✨",
    why: "Plongeons ensemble dans cette problématique fascinante ! 🚀 Fuze adore la tech, le code et les défis fous : rencontrer une classe entière d'ECE B1 IA ultra motivée (et légèrement obsédée par la Redstone et Python) serait un véritable catalyseur de bonne humeur ! 💡",
    win: "Voici les 3 bénéfices clés pour vous : 1️⃣ Le titre incontesté de Professeur Légendaire de l'ECE. 2️⃣ Une classe parfaitement attentive même à 8h00 du matin. 3️⃣ Des croissants et notre gratitude éternelle ! 🥐👑",
  };

  if (chatToggle && chatPanel) {
    chatToggle.addEventListener('click', () => {
      chatPanel.hidden = !chatPanel.hidden;
    });
  }

  if (chatClose && chatPanel) {
    chatClose.addEventListener('click', () => {
      chatPanel.hidden = true;
    });
  }

  document.querySelectorAll('.quick-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!chatMessages) return;
      const key = btn.dataset.q;

      const userBubble = document.createElement('div');
      userBubble.className = 'msg user';
      userBubble.textContent = btn.textContent;
      chatMessages.appendChild(userBubble);

      const typingBubble = document.createElement('div');
      typingBubble.className = 'msg bot';
      typingBubble.textContent = '🖐️ Un vrai humain réfléchit et tape à 600 mots/sec...';
      chatMessages.appendChild(typingBubble);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      setTimeout(() => {
        typingBubble.textContent = botReplies[key] || "✨ Synergie confirmée ! Ramenez Fuze svp 🚀";
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 650);
    });
  });
})();
