/**
 * ============================================================================
 * RoomFinder Maharashtra - Zero Brokerage Student Housing Platform
 * Final Year University Project (B.Tech / B.E. Computer Science & Engg)
 * Student: Abhirathod | Guide: Final Year Project Committee
 * ============================================================================
 */

// ============================================================================
// 1. BACKEND API CONFIGURATION
// ============================================================================
// Connect your Python Flask, Node.js Express, Django, or PHP backend here.
// Set USE_BACKEND to true once your backend server is running.
const CONFIG = {
  // Set your backend URL (e.g. Flask on 5000, Express on 3000, or XAMPP on 80)
  API_BASE_URL:'https://roomfinder-backend-1lpf.onrender.com/api',

  // Toggle backend integration:
  // If true: sends live HTTP fetch() requests to your backend.
  // If false or if backend is offline: smoothly falls back to localStorage/mock data
  // so your college viva / presentation demo NEVER fails!
  USE_BACKEND: true,
};

// ============================================================================
// 2. INITIAL SEED DATA (Maharashtra Cities & Student Rooms)
// ============================================================================
const DEFAULT_PROPERTIES = [
  {
    id: 'p_ramtek_1',
    landlordName: 'Anil Deshmukh',
    landlordPhone: '9422114455',
    title: 'Spacious 2BHK Flat near KITS Engineering College',
    propertyType: '2BHK',
    city: 'Ramtek, Dist. Nagpur',
    locality: 'KITS College Road',
    address: 'Near K.I.T.S College Campus, Ramtek, Dist. Nagpur, MH 441106',
    rent: 7800,
    deposit: 15000,
    furnishing: 'Semi-Furnished',
    baths: 2,
    areaSqFt: 880,
    description: 'Perfect for students of KITS Ramtek. Walking distance to campus gate and Ramtek bus station. Sweet borewell water, inverter backup, and bike parking.',
    amenities: ['WiFi', '24x7 Water', 'Power Backup', 'Bike Parking', 'Geyser'],
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    verified: true,
    status: 'available',
  },
  {
    id: 'p_ramtek_2',
    landlordName: 'Rameshwar Tembhre',
    landlordPhone: '9823055667',
    title: 'Budget 1RK Room for 2 Students (Mansar Road)',
    propertyType: '1RK',
    city: 'Ramtek, Dist. Nagpur',
    locality: 'Mansar Road',
    address: 'Mansar Road, Near Ramtek Bus Stand, Dist. Nagpur, MH 441106',
    rent: 3200,
    deposit: 6000,
    furnishing: 'Unfurnished',
    baths: 1,
    areaSqFt: 280,
    description: 'Budget-friendly 1RK room. Walking distance from Ramtek ST bus stand. Ideal for 1-2 college boys or diploma trainees. 24-hour sweet well water.',
    amenities: ['24x7 Water', 'Bike Parking'],
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    verified: true,
    status: 'available',
  },
  {
    id: 'p_ramtek_3',
    landlordName: 'Sunita Tai Wanjari',
    landlordPhone: '9890123456',
    title: 'Girls Student PG with Home Cooked Tiffin',
    propertyType: 'PG',
    city: 'Ramtek, Dist. Nagpur',
    locality: 'Gandhi Chowk',
    address: 'Opposite Nagar Parishad, Gandhi Chowk, Ramtek, MH 441106',
    rent: 4200,
    deposit: 8000,
    furnishing: 'Fully Furnished',
    baths: 2,
    areaSqFt: 650,
    description: 'Safe, verified PG home for female students of KITS Ramtek. CCTV monitored entrance, RO drinking water, bed, mattress, and study table included.',
    amenities: ['WiFi', '24x7 Water', 'CCTV Security', 'Power Backup'],
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    verified: true,
    status: 'available',
  },
  {
    id: 'p_nagpur_1',
    landlordName: 'Rajesh Agrawal',
    landlordPhone: '9822334455',
    title: 'Modern 1BHK Flat near Sitabuldi Metro Station',
    propertyType: '1BHK',
    city: 'Nagpur',
    locality: 'Sitabuldi',
    address: 'Near Sitabuldi Interchange Metro Station, Nagpur, MH 440012',
    rent: 8500,
    deposit: 16000,
    furnishing: 'Semi-Furnished',
    baths: 1,
    areaSqFt: 520,
    description: 'Prime location right at Sitabuldi interchange. Quick commute to Dharampeth colleges and IT parks. Clean building with elevator.',
    amenities: ['WiFi', '24x7 Water', 'Lift', 'Bike Parking'],
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    verified: true,
    status: 'available',
  },
  {
    id: 'p_pune_1',
    landlordName: 'Suresh Patil',
    landlordPhone: '9123456780',
    title: 'Cozy 1RK Studio Room in Kothrud for Students',
    propertyType: '1RK',
    city: 'Pune',
    locality: 'Kothrud',
    address: 'Near MIT College Road, Paud Road, Kothrud, Pune, MH 411038',
    rent: 7500,
    deposit: 15000,
    furnishing: 'Semi-Furnished',
    baths: 1,
    areaSqFt: 340,
    description: 'Very popular student neighborhood. Walk to MIT World Peace University and Cummins College. High-speed fiber internet and hot water geyser installed.',
    amenities: ['WiFi', 'Geyser', '24x7 Water', 'Bike Parking'],
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
    verified: true,
    status: 'available',
  },
  {
    id: 'p_mumbai_1',
    landlordName: 'Mahesh Sawant',
    landlordPhone: '9820011223',
    title: 'Shared Bachelor PG Room near Dadar Station',
    propertyType: 'PG',
    city: 'Mumbai',
    locality: 'Dadar West',
    address: 'Near Sena Bhavan, Dadar West, Mumbai, MH 400028',
    rent: 8900,
    deposit: 15000,
    furnishing: 'Fully Furnished',
    baths: 2,
    areaSqFt: 450,
    description: 'Central location in Dadar with direct suburban train connectivity across Western & Central lines. Fully air conditioned with daily cleaning service.',
    amenities: ['WiFi', 'AC', '24x7 Water', 'Power Backup', 'CCTV Security'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    verified: true,
    status: 'available',
  },
];

// ============================================================================
// 3. APPLICATION STATE
// ============================================================================
let state = {
  properties: [],
  favorites: [],
  visits: [],
  currentRole: 'tenant', // 'tenant' | 'landlord' | 'admin'
  filters: {
    city: '',
    maxRent: '',
    type: '',
    quickTab: 'all',
  },
  activeChatProperty: null,
};

// ============================================================================
// 4. BACKEND CONNECTION & FETCH CLIENT
// ============================================================================

/**
 * Loads properties from either backend API or LocalStorage/Defaults
 */
async function loadProperties() {
  if (CONFIG.USE_BACKEND) {
    try {
      const res = await fetch(`${CONFIG.API_BASE_URL}/properties`);

      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }

      const data = await res.json();

      state.properties = Array.isArray(data)
        ? data
        : data.properties || data.data || [];

      showToast('Connected to backend server!', 'success');
      renderProperties();
      return;

    } catch (err) {
      console.error('Backend connection failed:', err);
      showToast('Backend connection failed!', 'error');
    }
  }

  const saved = localStorage.getItem('roomfinder_properties');

  if (saved) {
    try {
      state.properties = JSON.parse(saved);
    } catch (e) {
      state.properties = DEFAULT_PROPERTIES;
    }
  } else {
    state.properties = DEFAULT_PROPERTIES;
    savePropertiesLocally();
  }

  renderProperties();
}

/**
 * Saves properties to LocalStorage
 */
async function apiAddProperty(propertyData) {
  if (CONFIG.USE_BACKEND) {
    try {
      const res = await fetch(`${CONFIG.API_BASE_URL}/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(propertyData)
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || `HTTP ${res.status}`);
      }

      const responseData = await res.json();

      const savedProperty =
        responseData.property ||
        responseData.data ||
        responseData;

      state.properties = state.properties.filter(
        p => p.id !== savedProperty.id
      );

      state.properties.unshift(savedProperty);

      renderProperties();

      return savedProperty;

    } catch (err) {
      console.error('Backend POST failed:', err);

      showToast(
        'Property server par save nahi hui!',
        'error'
      );

      return null;
    }
  }

  state.properties.unshift(propertyData);
  savePropertiesLocally();
  renderProperties();

  return propertyData;
}

/**
 * Schedules a visit via backend or local storage
 */
async function apiScheduleVisit(visitData) {
  if (CONFIG.USE_BACKEND) {
    try {
      const res = await fetch(`${CONFIG.API_BASE_URL}/visits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(visitData)
      });

      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }

      const responseData = await res.json();

      const savedVisit =
        responseData.visit ||
        responseData.data ||
        responseData;

      state.visits.push(savedVisit);

      return savedVisit;

    } catch (err) {
      console.error('Visit request failed:', err);

      showToast('Visit server par save nahi hui!', 'error');

      return null;
    }
  }

  state.visits.push(visitData);

  localStorage.setItem(
    'roomfinder_visits',
    JSON.stringify(state.visits)
  );

  return visitData;
}
// ============================================================================
// 5. UI RENDERING & FILTERING
// ============================================================================

/**
 * Renders the property cards onto the grid
 */
function renderProperties() {
  const grid = document.getElementById('propertyGrid');
  const noResults = document.getElementById('noResults');
  if (!grid) return;

  const filtered = state.properties.filter((prop) => {
    // City filter
    if (state.filters.city && !prop.city.toLowerCase().includes(state.filters.city.toLowerCase())) {
      return false;
    }
    // Max Rent filter
    if (state.filters.maxRent && prop.rent > Number(state.filters.maxRent)) {
      return false;
    }
    // Room Type filter
    if (state.filters.type && prop.propertyType !== state.filters.type) {
      return false;
    }
    // Quick Tabs
    if (state.filters.quickTab === 'ramtek' && !prop.city.includes('Ramtek')) {
      return false;
    }
    if (state.filters.quickTab === 'under5k' && prop.rent > 5000) {
      return false;
    }
    if (state.filters.quickTab === 'pg' && prop.propertyType !== 'PG') {
      return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }

  noResults.style.display = 'none';

  grid.innerHTML = filtered
    .map((prop) => {
      const isFav = state.favorites.includes(prop.id);
      return `
      <div class="property-card" id="card_${prop.id}">
        <div class="card-image-wrap">
          <img src="${prop.image || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'}" alt="${prop.title}" class="card-img" />
          <span class="badge-zero-brokerage">0% Brokerage</span>
          <span class="badge-verified"><i class="fa-solid fa-shield-check"></i> Verified Owner</span>
          <button class="fav-btn ${isFav ? 'is-fav' : ''}" onclick="toggleFavorite('${prop.id}')" title="Save Room">
            <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>
          </button>
        </div>

        <div class="card-body">
          <div class="price-row">
            <div>
              <span class="card-rent">₹${prop.rent.toLocaleString('en-IN')}</span>
              <span class="card-rent-period">/ month</span>
            </div>
            <span class="card-deposit">Deposit: ₹${prop.deposit.toLocaleString('en-IN')}</span>
          </div>

          <h3 class="card-title">${prop.title}</h3>
          <div class="card-address">
            <i class="fa-solid fa-location-dot"></i>
            <span>${prop.locality}, ${prop.city}</span>
          </div>

          <div class="card-specs">
            <div class="spec-item"><i class="fa-solid fa-door-open"></i> <strong>${prop.propertyType}</strong></div>
            <div class="spec-item"><i class="fa-solid fa-bath"></i> <strong>${prop.baths} Bath</strong></div>
            <div class="spec-item"><i class="fa-solid fa-couch"></i> <strong>${prop.furnishing}</strong></div>
          </div>

          <div class="card-amenities">
            ${(prop.amenities || []).slice(0, 4).map((a) => `<span class="amenity-chip"><i class="fa-solid fa-check"></i> ${a}</span>`).join('')}
          </div>

          <div class="card-actions">
            <button class="btn-visit" onclick="openScheduleVisitModal('${prop.id}')">
              <i class="fa-solid fa-calendar-check"></i> Schedule Visit
            </button>
            <button class="btn-chat" onclick="openChatModal('${prop.id}')">
              <i class="fa-solid fa-comment-dots"></i> Direct Chat
            </button>
          </div>
        </div>
      </div>
    `;
    })
    .join('');
}

/**
 * Triggers search when inputs or dropdowns change
 */
function applyFilters() {
  state.filters.city = document.getElementById('searchCity').value;
  state.filters.maxRent = document.getElementById('searchMaxRent').value;
  state.filters.type = document.getElementById('searchType').value;
  renderProperties();
}

/**
 * Filter directly by clicking a city pill
 */
function filterByCity(cityName) {
  document.getElementById('searchCity').value = cityName;
  state.filters.city = cityName;
  state.filters.quickTab = 'all';
  updateTabButtons();
  renderProperties();

  const sec = document.getElementById('properties-section');
  if (sec) sec.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Filter by quick category tab
 */
function setQuickTab(tab, el) {
  state.filters.quickTab = tab;
  document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
  if (el) el.classList.add('active');
  renderProperties();
}

function updateTabButtons() {
  document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
  const first = document.querySelector('.tab-btn');
  if (first) first.classList.add('active');
}

function resetAllFilters() {
  document.getElementById('searchCity').value = '';
  document.getElementById('searchMaxRent').value = '';
  document.getElementById('searchType').value = '';
  state.filters = { city: '', maxRent: '', type: '', quickTab: 'all' };
  updateTabButtons();
  renderProperties();
}

// ============================================================================
// 6. ZERO BROKERAGE SAVINGS CALCULATOR
// ============================================================================
function updateCalculator(rentVal) {
  const rent = Number(rentVal);
  document.getElementById('sliderRentVal').innerText = `₹ ${rent.toLocaleString('en-IN')} / mo`;
  document.getElementById('traditionalFee').innerText = `₹ ${rent.toLocaleString('en-IN')}`;
  document.getElementById('savingsAmount').innerText = `₹ ${rent.toLocaleString('en-IN')}`;
}

// ============================================================================
// 7. ROLE SWITCHING (Tenant, Landlord, Admin)
// ============================================================================
function switchRole(role) {
  state.currentRole = role;
  document.querySelectorAll('.role-btn').forEach((b) => b.classList.remove('active'));
  event.target.closest('.role-btn').classList.add('active');

  const roleText = document.getElementById('currentRoleText');
  const adminBtn = document.getElementById('adminNavBtn');

  if (role === 'tenant') {
    roleText.innerText = 'Tenant (Student)';
    adminBtn.style.display = 'none';
    showToast('Switched to Tenant Mode: Explore zero brokerage rooms!', 'info');
  } else if (role === 'landlord') {
    roleText.innerText = 'Landlord (Property Owner)';
    adminBtn.style.display = 'none';
    showToast('Switched to Landlord Mode: You can post free rooms!', 'info');
  } else if (role === 'admin') {
    roleText.innerText = 'Administrator (University Monitor)';
    adminBtn.style.display = 'inline-flex';
    showToast('Admin Mode Active: Access moderation & stats console', 'success');
  }
}

// ============================================================================
// 8. SCHEDULE VISIT MODAL & LOGIC
// ============================================================================
let activeVisitProp = null;

function openScheduleVisitModal(propId) {
  activeVisitProp = state.properties.find((p) => p.id === propId);
  if (!activeVisitProp) return;

  document.getElementById('visitPropTitle').innerText = activeVisitProp.title;
  document.getElementById('visitPropAddress').innerText = `${activeVisitProp.locality}, ${activeVisitProp.city}`;
  
  // Set default date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  document.getElementById('visitDate').value = tomorrow.toISOString().split('T')[0];

  openModal('visitModal');
}

async function handleScheduleVisitSubmit(e) {
  e.preventDefault();
  const newVisit = {
    id: 'visit_' + Date.now(),
    propertyId: activeVisitProp.id,
    propertyTitle: activeVisitProp.title,
    tenantName: document.getElementById('visitTenantName').value,
    tenantPhone: document.getElementById('visitTenantPhone').value,
    date: document.getElementById('visitDate').value,
    timeSlot: document.getElementById('visitTimeSlot').value,
    notes: document.getElementById('visitNotes').value,
    status: 'Confirmed',
    createdAt: new Date().toISOString(),
  };

  await apiScheduleVisit(newVisit);
  closeModal('visitModal');
  showToast(`Visit scheduled for ${newVisit.date}! Owner will call you.`, 'success');
  e.target.reset();
}

// ============================================================================
// 9. POST FREE PROPERTY (LANDLORD)
// ============================================================================
function openAddPropertyModal() {
  openModal('addPropertyModal');
}

async function handleAddPropertySubmit(e) {
  e.preventDefault();
  const rent = Number(document.getElementById('newRent').value);

  // Student cap validation rule: max ₹10,000
  if (rent < 2000 || rent > 10000) {
    showToast('RoomFinder Policy: Monthly rent must be between ₹2,000 and ₹10,000!', 'error');
    return;
  }

  // Selected amenities
  const checkedBoxes = document.querySelectorAll('input[name="amenity"]:checked');
  const amenities = Array.from(checkedBoxes).map((c) => c.value);

  const newProperty = {
    id: 'p_user_' + Date.now(),
    title: document.getElementById('newTitle').value,
    city: document.getElementById('newCity').value,
    locality: document.getElementById('newLocality').value,
    address: `${document.getElementById('newLocality').value}, ${document.getElementById('newCity').value}`,
    propertyType: document.getElementById('newType').value,
    rent: rent,
    deposit: Number(document.getElementById('newDeposit').value),
    furnishing: document.getElementById('newFurnishing').value,
    landlordName: document.getElementById('newLandlordName').value,
    landlordPhone: document.getElementById('newLandlordPhone').value,
    description: document.getElementById('newDescription').value || 'Affordable room for students & bachelors with 0% brokerage.',
    amenities: amenities.length ? amenities : ['24x7 Water', 'WiFi'],
    baths: 1,
    areaSqFt: 400,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    verified: true,
    status: 'available',
  };

  await apiAddProperty(newProperty);
  closeModal('addPropertyModal');
  showToast('Room published successfully with 100% Zero Brokerage!', 'success');
  e.target.reset();
  renderProperties();

  // Scroll to properties
  const sec = document.getElementById('properties-section');
  if (sec) sec.scrollIntoView({ behavior: 'smooth' });
}

// ============================================================================
// 10. DIRECT CHAT MODAL
// ============================================================================
function openChatModal(propId) {
  const prop = state.properties.find((p) => p.id === propId);
  if (!prop) return;

  state.activeChatProperty = prop;
  document.getElementById('chatOwnerName').innerText = `${prop.landlordName} (Owner)`;
  document.getElementById('chatPropertyTitle').innerText = prop.title;

  const thread = document.getElementById('chatThread');
  thread.innerHTML = `
    <div class="chat-bubble bubble-received">
      Namaste! I am ${prop.landlordName}. Thank you for reaching out regarding "${prop.title}". What would you like to know?
    </div>
  `;

  openModal('chatModal');
}

function handleSendChat(e) {
  e.preventDefault();
  const input = document.getElementById('chatInput');
  const userMsg = input.value.trim();
  if (!userMsg) return;

  const thread = document.getElementById('chatThread');

  // Tenant sent message
  const sentDiv = document.createElement('div');
  sentDiv.className = 'chat-bubble bubble-sent';
  sentDiv.innerText = userMsg;
  thread.appendChild(sentDiv);

  input.value = '';
  thread.scrollTop = thread.scrollHeight;

  // Simulated landlord reply
  setTimeout(() => {
    const replyDiv = document.createElement('div');
    replyDiv.className = 'chat-bubble bubble-received';
    replyDiv.innerText = `Yes, this room is currently available! Direct zero-brokerage visit is possible tomorrow. You can also call me directly at ${state.activeChatProperty.landlordPhone}.`;
    thread.appendChild(replyDiv);
    thread.scrollTop = thread.scrollHeight;
  }, 1000);
}

// ============================================================================
// 11. FAVORITES SYSTEM
// ============================================================================
function toggleFavorite(propId) {
  const index = state.favorites.indexOf(propId);
  if (index === -1) {
    state.favorites.push(propId);
    showToast('Saved to your favorites!', 'success');
  } else {
    state.favorites.splice(index, 1);
    showToast('Removed from favorites', 'info');
  }

  localStorage.setItem('roomfinder_favorites', JSON.stringify(state.favorites));
  document.getElementById('favCount').innerText = state.favorites.length;
  renderProperties();
}

function openFavoritesModal() {
  const list = document.getElementById('favList');
  document.getElementById('favModalCount').innerText = state.favorites.length;

  const favProps = state.properties.filter((p) => state.favorites.includes(p.id));

  if (favProps.length === 0) {
    list.innerHTML = `<p style="padding: 20px; text-align: center; color: #64748b;">No saved rooms yet. Click the heart icon on any room to save it!</p>`;
  } else {
    list.innerHTML = favProps
      .map(
        (p) => `
      <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid #e2e8f0;">
        <div>
          <strong style="font-size:13px; color:#0f172a;">${p.title}</strong>
          <div style="font-size:11.5px; color:#64748b;">${p.locality}, ${p.city} &bull; <strong>₹${p.rent.toLocaleString('en-IN')}/mo</strong></div>
        </div>
        <button class="btn-primary" style="padding:4px 10px; font-size:11px;" onclick="closeModal('favModal'); openScheduleVisitModal('${p.id}')">
          Visit
        </button>
      </div>
    `
      )
      .join('');
  }

  openModal('favModal');
}

// ============================================================================
// 12. ADMIN MODERATION PANEL
// ============================================================================
function openAdminModal() {
  document.getElementById('adminTotalProps').innerText = state.properties.length;
  document.getElementById('adminTotalVisits').innerText = state.visits.length;

  const tbody = document.getElementById('adminTableBody');
  tbody.innerHTML = state.properties
    .map(
      (p) => `
    <tr>
      <td><strong>${p.title}</strong></td>
      <td>${p.city}</td>
      <td>₹${p.rent.toLocaleString('en-IN')}</td>
      <td>${p.landlordName} (${p.landlordPhone})</td>
      <td><span style="color:#10b981; font-weight:700;"><i class="fa-solid fa-check-circle"></i> Verified</span></td>
      <td>
        <button style="background:#fee2e2; color:#b91c1c; padding:3px 8px; border-radius:3px; font-size:11px; font-weight:600;" onclick="deleteProperty('${p.id}')">
          Delete
        </button>
      </td>
    </tr>
  `
    )
    .join('');

  openModal('adminModal');
}

function deleteProperty(id) {
  if (confirm('Are you sure you want to remove this property listing?')) {
    state.properties = state.properties.filter((p) => p.id !== id);
    savePropertiesLocally();
    renderProperties();
    openAdminModal();
    showToast('Listing removed by administrator', 'info');
  }
}

// ============================================================================
// 13. MODAL HELPERS & TOASTS
// ============================================================================
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = 'flex';
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = 'none';
}

// Close modals when clicking on background overlay
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.style.display = 'none';
  }
});

// Close on Escape key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay').forEach((m) => (m.style.display = 'none'));
  }
});

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${type === 'success' ? 'fa-circle-check text-green' : type === 'error' ? 'fa-triangle-exclamation text-danger' : 'fa-circle-info'}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ============================================================================
// 14. INITIALIZATION ON PAGE LOAD
// ============================================================================

document.addEventListener('DOMContentLoaded', async () => {

  // Load saved favorites
  const savedFavs = localStorage.getItem('roomfinder_favorites');

  if (savedFavs) {
    try {
      state.favorites = JSON.parse(savedFavs);

      const favCount = document.getElementById('favCount');

      if (favCount) {
        favCount.innerText = state.favorites.length;
      }

    } catch (e) {
      console.error('Favorites loading error:', e);
    }
  }

  // Load saved visits
  const savedVisits = localStorage.getItem('roomfinder_visits');

  if (savedVisits) {
    try {
      state.visits = JSON.parse(savedVisits);
    } catch (e) {
      console.error('Visits loading error:', e);
    }
  }

  // Load properties from Render backend
  await loadProperties();

  // Initialize savings calculator
  updateCalculator(6000);

});