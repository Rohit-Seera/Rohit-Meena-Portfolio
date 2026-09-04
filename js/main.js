(() => {
  const data = window.portfolioData;
  const projectRoot = document.querySelector('#projects');
  const experienceRoot = document.querySelector('#experience');
  const description = document.querySelector('#mode-description');
  const modeButtons = [...document.querySelectorAll('.mode-button')];
  const dialog = document.querySelector('#project-dialog');
  const dialogContent = document.querySelector('#dialog-content');
  let mode = 'engineer';

  const render = () => {
    const current = data[mode];
    description.textContent = current.description;
    projectRoot.innerHTML = current.projects.map((project, index) => `
      <article class="project-card reveal" style="--i:${index}" data-id="${project.id}" tabindex="0">
        <div class="project-visual visual-${project.visual}"><span class="project-number">${project.number}</span><div class="visual-orb"></div><div class="visual-lines"></div><p>${project.metric}</p></div>
        <div class="project-info"><div class="project-top"><p>${project.kind}</p><span>OPEN ↗</span></div><h3>${project.name}</h3><p class="project-hook">${project.hook}</p><div class="tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div></div>
      </article>`).join('');
    experienceRoot.innerHTML = current.experience.map(item => `<article><span>${item.year}</span><h3>${item.role}</h3><p><strong>${item.place}</strong>${item.note}</p></article>`).join('');
    document.title = mode === 'engineer' ? 'Rohit Meena — AI Engineer' : 'Rohit Meena — VFX & Editor';
    observeReveals();
  };

  const openProject = (id) => {
    const project = data[mode].projects.find(item => item.id === id);
    if (!project) return;
    dialogContent.innerHTML = `<p class="eyebrow"><span>${project.number}</span> ${project.kind}</p><h2>${project.name}</h2><p class="dialog-hook">${project.hook}</p><p>${project.details}</p><div class="tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div><p class="dialog-metric">${project.metric}</p>`;
    dialog.showModal();
  };

  modeButtons.forEach(button => button.addEventListener('click', () => {
    mode = button.dataset.mode;
    modeButtons.forEach(item => { const selected = item === button; item.classList.toggle('is-active', selected); item.setAttribute('aria-selected', selected); });
    document.body.dataset.mode = mode;
    render();
  }));
  projectRoot.addEventListener('click', event => { const card = event.target.closest('.project-card'); if (card) openProject(card.dataset.id); });
  projectRoot.addEventListener('keydown', event => { if ((event.key === 'Enter' || event.key === ' ') && event.target.closest('.project-card')) { event.preventDefault(); openProject(event.target.closest('.project-card').dataset.id); } });
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

  const glow = document.querySelector('.cursor-glow');
  const portrait = document.querySelector('.portrait-card');
  let pointerX = 0, pointerY = 0, frame;
  window.addEventListener('pointermove', event => {
    pointerX = event.clientX / window.innerWidth - .5; pointerY = event.clientY / window.innerHeight - .5;
    if (!frame) frame = requestAnimationFrame(() => { document.documentElement.style.setProperty('--mouse-x', `${(pointerX + .5) * 100}%`); document.documentElement.style.setProperty('--mouse-y', `${(pointerY + .5) * 100}%`); portrait.style.setProperty('--tilt-x', `${pointerY * -5}deg`); portrait.style.setProperty('--tilt-y', `${pointerX * 6}deg`); portrait.style.setProperty('--eye-x', `${pointerX * 7}px`); portrait.style.setProperty('--eye-y', `${pointerY * 4}px`); frame = null; });
  });
  window.addEventListener('pointerleave', () => portrait.removeAttribute('style'));
  if (window.matchMedia('(pointer: fine)').matches) glow.classList.add('enabled');

  let observer;
  function observeReveals() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible')); return; }
    if (observer) observer.disconnect();
    observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .13 });
    document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => observer.observe(el));
  }
  render();
})();
