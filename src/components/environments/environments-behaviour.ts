// Interaction logic ported from the Veltform-Environments package (climate.js, plants.js).
// Document/window listeners are bound to an AbortSignal so they detach on route change.
/* eslint-disable */
// @ts-nocheck

export function initClimate(root: HTMLElement, signal: AbortSignal) {
  const document = root.ownerDocument;
  const explorer = root.querySelector('.climate-explorer');
  if (!explorer) return;
  const triggers = [...explorer.querySelectorAll('[data-climate]')];
  const selectors = [...explorer.querySelectorAll('.climate-selector')];
  const images = [...explorer.querySelectorAll('[data-image]')];
  const details = [...explorer.querySelectorAll('[data-detail]')];
  const slots = [1, 2, 3, 2];
  let active = -1;
  let pinned = false;
  let suppressFocus = false;
  
  function show(index) {
    active = index;
    explorer.dataset.active = index < 0 ? 'none' : String(index);
    for (const image of images) {
      const value = Number(image.dataset.image);
      image.classList.toggle('is-muted', index >= 0 && value !== index);
      image.classList.toggle('is-covered', index >= 0 && value === slots[index]);
    }
    details.forEach((detail, i) => { detail.hidden = i !== index; });
    for (const trigger of triggers) {
      const selected = Number(trigger.dataset.climate) === index;
      trigger.setAttribute('aria-expanded', String(selected));
      const symbol = trigger.querySelector('.selector-symbol');
      if (symbol) symbol.textContent = selected ? '−' : '+';
    }
  }
  
  function close(restoreFocus = false) {
    const previous = active;
    pinned = false;
    show(-1);
    if (restoreFocus && previous >= 0) {
      suppressFocus = true;
      selectors[previous].focus({ preventScroll: true });
      suppressFocus = false;
    }
  }
  
  for (const trigger of triggers) {
    const index = Number(trigger.dataset.climate);
    trigger.addEventListener('pointerenter', event => {
      if (event.pointerType === 'touch') return;
      if (active !== index) pinned = false;
      show(index);
    });
    trigger.addEventListener('focus', () => {
      if (!suppressFocus) show(index);
    });
    trigger.addEventListener('click', () => {
      if (active === index && pinned) close();
      else { pinned = true; show(index); }
    });
  }
  
  explorer.querySelectorAll('[data-neighbour]').forEach(button => {
    const index = Number(button.dataset.neighbour);
    button.addEventListener('pointerenter', event => {
      if (event.pointerType === 'touch') return;
      pinned = false;
      show(index);
    });
    button.addEventListener('click', () => {
      pinned = true;
      selectors[index].focus({ preventScroll: true });
      show(index);
    });
  });
  
  explorer.addEventListener('pointerleave', () => {
    if (!pinned && !explorer.contains(document.activeElement)) close();
  });
  explorer.addEventListener('focusout', event => {
    if (!explorer.contains(event.relatedTarget)) close();
  });
  explorer.querySelectorAll('.close-panel').forEach(button => {
    button.addEventListener('click', () => close(true));
  });
  selectors.forEach((selector, index) => {
    selector.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % selectors.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + selectors.length - 1) % selectors.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = selectors.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      pinned = false;
      selectors[next].focus();
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && active >= 0) { event.preventDefault(); close(true); }
  }, { signal });
  document.addEventListener('pointerdown', event => {
    if (!explorer.contains(event.target)) close();
  }, { signal });
}

export function initPlants(root: HTMLElement, signal: AbortSignal) {
  const document = root.ownerDocument;
  const cards = [...root.querySelectorAll('.plant-card')];
  if (!cards.length) return;
  const collections = [...root.querySelectorAll('.plant-collection')];
  const details = new Map(cards.map(card => [card, card.querySelector('.plant-info')]));
  let active = null;
  let pinned = false;
  let suppressFocus = false;
  let dismissed = null;
  let hoverPausedUntil = 0;
  
  function contains(card, target) {
    return card.contains(target) || details.get(card).contains(target);
  }
  
  function ownsFocus(card) {
    return contains(card, document.activeElement);
  }
  
  function position(card) {
    const info = details.get(card);
    if (pinned) {
      info.style.width = '';
      info.style.left = '';
      info.style.top = '';
      return;
    }
    const box = card.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth;
    const panelWidth = Math.min(310, viewportWidth - 32);
    const left = Math.max(16, Math.min(box.left, viewportWidth - 16 - panelWidth));
    info.style.width = `${panelWidth}px`;
    info.style.left = `${left}px`;
    const height = info.offsetHeight;
    const top = Math.max(16, Math.min(box.top, window.innerHeight - 16 - height));
    info.style.top = `${top}px`;
  }
  
  function close(restoreFocus = false, explicit = false) {
    if (!active) return;
    const previous = active;
    active = null;
    pinned = false;
    previous.classList.remove('is-open');
    previous.classList.remove('is-click-open');
    const info = details.get(previous);
    info.hidden = true;
    // Return hover details from outside the scrolling row to their original card.
    if (info.parentElement !== previous) previous.appendChild(info);
    previous.querySelector('.plant-trigger').setAttribute('aria-expanded', 'false');
    if (explicit) dismissed = previous;
    if (restoreFocus) {
      suppressFocus = true;
      previous.querySelector('.plant-trigger').focus({ preventScroll: true });
      suppressFocus = false;
    }
  }
  
  function show(card, keepOpen = false) {
    if (active !== card) {
      close();
      active = card;
      card.classList.add('is-open');
      card.querySelector('.plant-trigger').setAttribute('aria-expanded', 'true');
    }
    pinned = keepOpen;
    card.classList.toggle('is-click-open', pinned);
    const info = details.get(card);
    // A floating hover panel must escape overflow clipping. Clicked details
    // stay inside the row, where their full height participates in page layout.
    const host = pinned ? card : root;
    if (info.parentElement !== host) host.appendChild(info);
    info.hidden = false;
    position(card);
  }
  
  function refreshControls(collection) {
    const grid = collection.querySelector('.plant-grid');
    const end = Math.max(0, grid.scrollWidth - grid.clientWidth);
    collection.querySelector('[data-direction="-1"]').disabled = grid.scrollLeft <= 1;
    collection.querySelector('[data-direction="1"]').disabled = grid.scrollLeft >= end - 1;
  }
  
  function scrollPlants(grid, direction) {
    if (active && grid.contains(active)) close(false, true);
    hoverPausedUntil = Date.now() + 200;
    const first = grid.querySelector('.plant-card');
    const gap = parseFloat(window.getComputedStyle(grid).columnGap) || 0;
    const stride = first.getBoundingClientRect().width + gap;
    const step = stride * Math.max(1, Math.floor(grid.clientWidth / stride));
    grid.scrollBy({
      left: direction * step,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  }
  
  for (const collection of collections) {
    const grid = collection.querySelector('.plant-grid');
    collection.querySelectorAll('.plant-scroll').forEach(button => {
      button.addEventListener('click', () => scrollPlants(grid, Number(button.dataset.direction)));
    });
    grid.addEventListener('scroll', () => {
      hoverPausedUntil = Date.now() + 200;
      refreshControls(collection);
      if (active && grid.contains(active) && !pinned) {
        if (ownsFocus(active)) position(active);
        else close(false, true);
      }
    }, { passive: true });
    grid.addEventListener('keydown', event => {
      if (event.target !== grid) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        scrollPlants(grid, event.key === 'ArrowLeft' ? -1 : 1);
      } else if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault();
        if (active && grid.contains(active)) close(false, true);
        grid.scrollTo({ left: event.key === 'Home' ? 0 : grid.scrollWidth });
      }
    });
    refreshControls(collection);
  }
  
  for (const card of cards) {
    const trigger = card.querySelector('.plant-trigger');
    const info = details.get(card);
    const hover = event => {
      if (event.pointerType === 'touch' || dismissed === card || Date.now() < hoverPausedUntil || active === card) return;
      show(card);
    };
    trigger.addEventListener('pointerenter', hover);
    trigger.addEventListener('pointermove', hover);
    trigger.addEventListener('focus', () => {
      if (!suppressFocus && !(active === card && pinned)) { dismissed = null; show(card); }
    });
    trigger.addEventListener('click', () => {
      if (active === card && pinned) close(false, true);
      else { dismissed = null; show(card, true); }
    });
    card.addEventListener('pointerleave', event => {
      if (dismissed === card) dismissed = null;
      if (active === card && !pinned && !contains(card, event.relatedTarget) && !ownsFocus(card)) close();
    });
    info.addEventListener('pointerleave', event => {
      if (active === card && !pinned && !contains(card, event.relatedTarget) && !ownsFocus(card)) close();
    });
    const leaveFocus = event => {
      if (active === card && !contains(card, event.relatedTarget)) close();
    };
    card.addEventListener('focusout', leaveFocus);
    info.addEventListener('focusout', leaveFocus);
    info.querySelector('.plant-close').addEventListener('click', () => close(true, true));
  }
  
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && active) {
      event.preventDefault();
      close(true, true);
    }
  }, { signal });
  document.addEventListener('pointerdown', event => {
    if (active && !contains(active, event.target)) close();
  }, { signal });
  window.addEventListener('resize', () => {
    collections.forEach(refreshControls);
    if (active) position(active);
  }, { signal });
  window.addEventListener('wheel', () => {
    hoverPausedUntil = Date.now() + 200;
    if (active && !pinned) close(false, true);
  }, { passive: true, signal });
  window.addEventListener('scroll', () => {
    if (active && !pinned) close();
  }, { passive: true, signal });
}
