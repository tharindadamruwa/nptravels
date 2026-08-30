(function () {
  'use strict';

  function scrollToId(id) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ===== Logo / footer logo → scroll home =====
  document.getElementById('logo-btn').addEventListener('click', function () { scrollToId('home'); });
  document.getElementById('footer-logo').addEventListener('click', function () { scrollToId('home'); });
  document.getElementById('btn-scroll-intro').addEventListener('click', function () { scrollToId('why'); });
  document.getElementById('btn-hero-estimate').addEventListener('click', function () { scrollToId('calculator'); });

  // ===== Mobile menu =====
  var menuOpen = false;
  var mobileMenuBtn = document.getElementById('mobile-menu-btn');
  var mobileNav = document.getElementById('mobile-nav');
  var iconMenu = document.getElementById('icon-menu');
  var iconClose = document.getElementById('icon-close');

  function setMenu(open) {
    menuOpen = open;
    mobileNav.hidden = !open;
    iconMenu.style.display = open ? 'none' : '';
    iconClose.style.display = open ? '' : 'none';
    mobileMenuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  mobileMenuBtn.addEventListener('click', function () { setMenu(!menuOpen); });
  mobileNav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });

  // ===== WhatsApp links =====
  document.getElementById('link-hero-whatsapp').href = whatsappLink('Hello NP Travels, I am planning a trip from Kalutara and would love some local advice.');
  document.getElementById('link-how-whatsapp').href = whatsappLink('Hello NP Travels, I have a question about exploring Kalutara.');

  // ===== State =====
  var state = {
    vehicleId: vehicles[1].id,
    days: 3,
    groupSize: 2,
    guide: true,
    airport: false,
    attractionFilter: 'All',
  };

  function getSelectedVehicle() {
    for (var i = 0; i < vehicles.length; i++) {
      if (vehicles[i].id === state.vehicleId) return vehicles[i];
    }
    return vehicles[1];
  }

  // ===== Render vehicles (storefront cards) =====
  var vehicleGrid = document.getElementById('vehicle-grid');

  function renderVehicleGrid() {
    vehicleGrid.innerHTML = '';
    vehicles.forEach(function (vehicle, index) {
      var article = document.createElement('article');
      article.className = 'vehicle-card' + (vehicle.id === state.vehicleId ? ' selected' : '');
      article.setAttribute('data-testid', 'card-vehicle-' + vehicle.id);

      var badgeText = index === 0 ? 'Most local' : (vehicle.seats > 5 ? 'Group favourite' : 'Easy choice');

      article.innerHTML =
        '<button class="select-vehicle" data-testid="button-select-vehicle-' + vehicle.id + '">' +
          '<div class="vehicle-image-wrap">' +
            '<img src="' + vehicle.image + '" alt="' + vehicle.name + ' available from NP Travels" />' +
            '<div class="vehicle-accent" style="background:linear-gradient(to bottom right,' + vehicle.accentFrom + ',' + vehicle.accentTo + ')"></div>' +
            '<span class="vehicle-badge">' + badgeText + '</span>' +
          '</div>' +
          '<div class="vehicle-body">' +
            '<div class="vehicle-body-top">' +
              '<div><h3>' + vehicle.name + '</h3><p>' + vehicle.detail + '</p></div>' +
              '<span class="vehicle-car-icon"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 17H3v-6l2-5h13l2 5v6h-2"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/></svg></span>' +
            '</div>' +
            '<div class="vehicle-meta">' +
              '<span class="seats"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> up to ' + vehicle.seats + '</span>' +
              '<span class="price">' + formatLkr(vehicle.pricePerDay) + '<small> / day</small></span>' +
            '</div>' +
          '</div>' +
        '</button>';

      article.querySelector('.select-vehicle').addEventListener('click', function () {
        state.vehicleId = vehicle.id;
        renderAll();
        scrollToId('calculator');
      });

      vehicleGrid.appendChild(article);
    });
  }

  // ===== Attractions =====
  var attractionGrid = document.getElementById('attraction-grid');
  var filterButtons = document.querySelectorAll('.filter-btn');

  function renderAttractions() {
    var filtered = attractions.filter(function (a) {
      return state.attractionFilter === 'All' || a.category === state.attractionFilter;
    });

    attractionGrid.innerHTML = '';
    filtered.forEach(function (attraction) {
      var article = document.createElement('article');
      article.className = 'attraction-card';
      article.setAttribute('data-testid', 'card-attraction-' + attraction.id);
      article.innerHTML =
        '<img src="' + attraction.image + '" alt="' + attraction.name + '" />' +
        '<div class="attraction-overlay"></div>' +
        '<div class="attraction-content">' +
          '<span class="attraction-tag">' + attraction.tag + '</span>' +
          '<div>' +
            '<p class="attraction-distance"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg> ' + attraction.distance + '</p>' +
            '<h3>' + attraction.name + '</h3>' +
            '<p>' + attraction.description + '</p>' +
            '<a href="' + attraction.mapsUrl + '" target="_blank" rel="noreferrer" data-testid="link-map-' + attraction.id + '">Open in Google Maps ' +
              '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>' +
            '</a>' +
          '</div>' +
        '</div>';
      attractionGrid.appendChild(article);
    });
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      state.attractionFilter = btn.getAttribute('data-filter');
      filterButtons.forEach(function (b) { b.classList.toggle('active', b === btn); });
      renderAttractions();
    });
  });

  // ===== Calculator =====
  var calcVehicleGrid = document.getElementById('calc-vehicle-grid');
  var groupSizeInput = document.getElementById('group-size');
  var groupSizeValue = document.getElementById('group-size-value');
  var groupHint = document.getElementById('group-hint');
  var daysInput = document.getElementById('trip-days');
  var daysValue = document.getElementById('days-value');
  var guideCheckbox = document.getElementById('input-add-guide');
  var airportCheckbox = document.getElementById('input-airport-pickup');
  var summaryLines = document.getElementById('summary-lines');
  var summaryCaption = document.getElementById('summary-caption');
  var estimateTotal = document.getElementById('text-estimate-total');

  function renderCalcVehicleGrid() {
    calcVehicleGrid.innerHTML = '';
    vehicles.forEach(function (vehicle) {
      var btn = document.createElement('button');
      btn.className = 'calc-vehicle-btn' + (vehicle.id === state.vehicleId ? ' selected' : '');
      btn.setAttribute('data-testid', 'button-calculator-' + vehicle.id);
      btn.innerHTML =
        '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 17H3v-6l2-5h13l2 5v6h-2"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/></svg>' +
        '<span class="name">' + vehicle.name + '</span>' +
        '<span class="seats">' + vehicle.seats + ' seats</span>';
      btn.addEventListener('click', function () {
        state.vehicleId = vehicle.id;
        renderAll();
      });
      calcVehicleGrid.appendChild(btn);
    });
  }

  function updateCalculator() {
    var vehicle = getSelectedVehicle();
    var guideFee = state.guide ? pricing.guideFee : 0;
    var airportFee = state.airport ? pricing.airportPickupFee : 0;
    var groupCharge = Math.max(0, state.groupSize - pricing.includedTravelers) * pricing.extraTravelerFeePerDay * state.days;
    var estimate = vehicle.pricePerDay * state.days + guideFee + airportFee + groupCharge;

    groupSizeInput.value = state.groupSize;
    groupSizeValue.textContent = state.groupSize + ' ' + (state.groupSize === 1 ? 'traveler' : 'travelers');
    groupHint.innerHTML = 'Includes ' + pricing.includedTravelers + ' travelers. Extra travelers add ' + formatLkr(pricing.extraTravelerFeePerDay) + ' per day each.';

    daysInput.value = state.days;
    daysValue.textContent = state.days + ' ' + (state.days === 1 ? 'day' : 'days');

    guideCheckbox.checked = state.guide;
    airportCheckbox.checked = state.airport;

    var lines = '';
    lines += '<div class="line"><span>Vehicle \u00b7 ' + state.days + ' days</span><span>' + formatLkr(vehicle.pricePerDay * state.days) + '</span></div>';
    lines += '<div class="line"><span>Guide fee</span><span>' + formatLkr(guideFee) + '</span></div>';
    lines += '<div class="line"><span>Group charges</span><span>' + formatLkr(groupCharge) + '</span></div>';
    if (state.airport) {
      lines += '<div class="line"><span>Airport pickup</span><span>' + formatLkr(airportFee) + '</span></div>';
    }
    summaryLines.innerHTML = lines;

    summaryCaption.textContent = vehicle.name + ' \u00b7 ' + state.groupSize + ' travelers \u00b7 ' + state.days + ' days';
    estimateTotal.textContent = formatLkr(estimate);

    return estimate;
  }

  document.getElementById('group-dec').addEventListener('click', function () {
    state.groupSize = Math.max(1, state.groupSize - 1);
    updateCalculator();
  });
  document.getElementById('group-inc').addEventListener('click', function () {
    state.groupSize = Math.min(12, state.groupSize + 1);
    updateCalculator();
  });
  groupSizeInput.addEventListener('input', function () {
    state.groupSize = Number(groupSizeInput.value);
    updateCalculator();
  });

  document.getElementById('days-dec').addEventListener('click', function () {
    state.days = Math.max(1, state.days - 1);
    updateCalculator();
  });
  document.getElementById('days-inc').addEventListener('click', function () {
    state.days = Math.min(14, state.days + 1);
    updateCalculator();
  });
  daysInput.addEventListener('input', function () {
    state.days = Number(daysInput.value);
    updateCalculator();
  });

  guideCheckbox.addEventListener('change', function () {
    state.guide = guideCheckbox.checked;
    updateCalculator();
  });
  airportCheckbox.addEventListener('change', function () {
    state.airport = airportCheckbox.checked;
    updateCalculator();
  });

  document.getElementById('button-send-estimate').addEventListener('click', function () {
    var vehicle = getSelectedVehicle();
    var estimate = updateCalculator();
    var message = 'Hello NP Travels, I\'d like to ask about a ' + state.days + '-day trip with the ' + vehicle.name +
      ' for ' + state.groupSize + ' ' + (state.groupSize === 1 ? 'traveler' : 'travelers') +
      '. My estimate is ' + formatLkr(estimate) + '. Please help me confirm the details.';
    window.open(whatsappLink(message), '_blank', 'noopener,noreferrer');
  });

  // ===== Payment: copy bank number =====
  var copyBtn = document.getElementById('button-copy-account');
  var iconCopy = document.getElementById('icon-copy');
  var iconCheck = document.getElementById('icon-check');
  var copyLabel = document.getElementById('copy-label');

  copyBtn.addEventListener('click', function () {
    var text = paymentDetails.accountNumber;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(function () {});
    }
    iconCopy.style.display = 'none';
    iconCheck.style.display = '';
    copyLabel.textContent = 'Copied';
    window.setTimeout(function () {
      iconCopy.style.display = '';
      iconCheck.style.display = 'none';
      copyLabel.textContent = 'Copy';
    }, 1800);
  });

  // ===== Contact form =====
  var contactForm = document.getElementById('contact-form');
  var contactSuccess = document.getElementById('contact-success');

  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    contactForm.hidden = true;
    contactSuccess.hidden = false;
  });

  document.getElementById('button-send-another').addEventListener('click', function () {
    contactForm.reset();
    contactForm.hidden = false;
    contactSuccess.hidden = true;
  });

  // ===== Initial render =====
  function renderAll() {
    renderVehicleGrid();
    renderCalcVehicleGrid();
    updateCalculator();
  }

  renderAll();
  renderAttractions();
})();
