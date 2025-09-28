// BerryTrip - Funcionalidad de Reservas
class BookingManager {
    constructor() {
        this.accommodations = [
            {
                id: 1,
                name: 'Hotel Rosa Madrid Centro',
                location: 'Madrid, España',
                price: 89,
                rating: 4.8,
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
                verified: true,
                womenOnly: true,
                safetyFeatures: ['Cámaras 24/7', 'Recepción 24h', 'Zona segura'],
                reviews: 124
            },
            {
                id: 2,
                name: 'Hostel Luna Barcelona',
                location: 'Barcelona, España',
                price: 45,
                rating: 4.6,
                image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400',
                verified: true,
                womenOnly: true,
                safetyFeatures: ['Solo mujeres', 'Código de acceso', 'Tranquilo'],
                reviews: 89
            },
            {
                id: 3,
                name: 'Apartamento Seguro Valencia',
                location: 'Valencia, España',
                price: 65,
                rating: 4.9,
                image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
                verified: true,
                womenOnly: false,
                safetyFeatures: ['Verificado por mujeres', 'Zona segura', 'Cerca transporte'],
                reviews: 156
            },
            {
                id: 4,
                name: 'Casa Rosa París',
                location: 'París, Francia',
                price: 120,
                rating: 4.7,
                image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=400',
                verified: true,
                womenOnly: true,
                safetyFeatures: ['Solo mujeres', 'Seguridad 24h', 'Cerca metro'],
                reviews: 203
            },
            {
                id: 5,
                name: 'Hostel Seguro Roma',
                location: 'Roma, Italia',
                price: 55,
                rating: 4.5,
                image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
                verified: true,
                womenOnly: false,
                safetyFeatures: ['Verificado', 'Zona segura', 'Recepción amigable'],
                reviews: 98
            },
            {
                id: 6,
                name: 'Hotel Luna Berlín',
                location: 'Berlín, Alemania',
                price: 75,
                rating: 4.8,
                image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
                verified: true,
                womenOnly: true,
                safetyFeatures: ['Solo mujeres', 'Cámaras', 'Tranquilo'],
                reviews: 167
            }
        ];
        this.filteredAccommodations = [...this.accommodations];
    }

    loadBookingSection() {
        const bookingSection = document.getElementById('booking-section');
        if (!bookingSection) return;

        if (!app.user) {
            bookingSection.innerHTML = this.getUnauthorizedHTML();
            return;
        }

        bookingSection.innerHTML = this.getBookingHTML();
        this.setupBookingEvents();
        this.renderAccommodations();
    }

    getUnauthorizedHTML() {
        return `
            <div class="bg-berry-50 rounded-2xl p-8 text-center">
                <svg class="w-16 h-16 text-berry-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                <h3 class="text-2xl font-semibold text-gray-900 mb-4">Inicia sesión para hacer reservas</h3>
                <p class="text-gray-600 mb-6">Necesitas estar registrada para acceder a nuestros alojamientos verificados</p>
            </div>
        `;
    }

    getBookingHTML() {
        return `
            <div class="space-y-8">
                <!-- Barra de búsqueda -->
                <div class="bg-white rounded-2xl p-6 shadow-lg">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div class="relative">
                            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                            <input type="text" id="search-input" placeholder="¿A dónde quieres ir?" class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berry-500 focus:border-transparent">
                        </div>
                        
                        <div class="relative">
                            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            <input type="date" id="checkin-date" class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berry-500 focus:border-transparent">
                        </div>
                        
                        <div class="relative">
                            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            <input type="date" id="checkout-date" class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berry-500 focus:border-transparent">
                        </div>
                        
                        <button id="search-btn" class="berry-gradient text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                            Buscar
                        </button>
                    </div>
                </div>

                <!-- Filtros -->
                <div class="flex flex-wrap gap-4 justify-center">
                    <button class="filter-btn active" data-filter="all" class="flex items-center px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"></path>
                        </svg>
                        Todos
                    </button>
                    <button class="filter-btn" data-filter="women-only" class="flex items-center px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                        </svg>
                        Solo mujeres
                    </button>
                    <button class="filter-btn" data-filter="verified" class="flex items-center px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                        </svg>
                        Verificados
                    </button>
                    <button class="filter-btn" data-filter="top-rated" class="flex items-center px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                        </svg>
                        Mejor valorados
                    </button>
                </div>

                <!-- Lista de alojamientos -->
                <div id="accommodations-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Se llena dinámicamente -->
                </div>
            </div>
        `;
    }

    setupBookingEvents() {
        // Búsqueda
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        
        if (searchInput) {
            searchInput.addEventListener('input', () => this.filterAccommodations());
        }
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.filterAccommodations());
        }

        // Filtros
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active', 'bg-berry-500', 'text-white'));
                e.target.classList.add('active', 'bg-berry-500', 'text-white');
                this.filterAccommodations(e.target.dataset.filter);
            });
        });
    }

    filterAccommodations(filter = 'all') {
        const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
        
        this.filteredAccommodations = this.accommodations.filter(acc => {
            const matchesSearch = acc.name.toLowerCase().includes(searchTerm) || 
                                acc.location.toLowerCase().includes(searchTerm);
            
            let matchesFilter = true;
            switch(filter) {
                case 'women-only':
                    matchesFilter = acc.womenOnly;
                    break;
                case 'verified':
                    matchesFilter = acc.verified;
                    break;
                case 'top-rated':
                    matchesFilter = acc.rating >= 4.7;
                    break;
                default:
                    matchesFilter = true;
            }
            
            return matchesSearch && matchesFilter;
        });
        
        this.renderAccommodations();
    }

    renderAccommodations() {
        const grid = document.getElementById('accommodations-grid');
        if (!grid) return;

        grid.innerHTML = this.filteredAccommodations.map(acc => `
            <div class="accommodation-card bg-white rounded-2xl shadow-lg overflow-hidden">
                <div class="relative">
                    <img src="${acc.image}" alt="${acc.name}" class="w-full h-48 object-cover">
                    ${acc.verified ? `
                        <div class="absolute top-4 right-4">
                            <div class="verified-badge">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                </svg>
                                Verificado
                            </div>
                        </div>
                    ` : ''}
                    ${acc.womenOnly ? `
                        <div class="absolute top-4 left-4">
                            <div class="bg-berry-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                                </svg>
                                Solo Mujeres
                            </div>
                        </div>
                    ` : ''}
                </div>
                
                <div class="p-6">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-xl font-semibold text-gray-900">${acc.name}</h3>
                        <div class="text-right">
                            <div class="text-2xl font-bold text-berry-600">€${acc.price}</div>
                            <div class="text-sm text-gray-500">por noche</div>
                        </div>
                    </div>
                    
                    <div class="flex items-center text-gray-600 mb-3">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span class="text-sm">${acc.location}</span>
                    </div>
                    
                    <div class="flex items-center mb-4">
                        <div class="flex items-center">
                            ${Array.from({length: 5}, (_, i) => `
                                <svg class="w-4 h-4 ${i < Math.floor(acc.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                                </svg>
                            `).join('')}
                        </div>
                        <span class="ml-2 text-sm text-gray-600">${acc.rating} (${acc.reviews} reseñas)</span>
                    </div>
                    
                    <div class="space-y-2 mb-4">
                        ${acc.safetyFeatures.map(feature => `
                            <div class="flex items-center text-sm text-gray-600">
                                <svg class="w-3 h-3 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                </svg>
                                ${feature}
                            </div>
                        `).join('')}
                    </div>
                    
                    <button onclick="app.showAccommodationDetails(${acc.id})" class="w-full berry-gradient text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                        Ver Detalles
                    </button>
                </div>
            </div>
        `).join('');
    }

    showAccommodationDetails(id) {
        const accommodation = this.accommodations.find(acc => acc.id === id);
        if (!accommodation) return;

        // Crear modal de detalles
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6 border-b border-gray-200">
                    <div class="flex items-center justify-between">
                        <h2 class="text-2xl font-bold text-gray-900">${accommodation.name}</h2>
                        <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="p-6">
                    <img src="${accommodation.image}" alt="${accommodation.name}" class="w-full h-64 object-cover rounded-lg mb-6">
                    <div class="space-y-4">
                        <div class="flex justify-between items-center">
                            <span class="text-3xl font-bold text-berry-600">€${accommodation.price}</span>
                            <span class="text-sm text-gray-500">por noche</span>
                        </div>
                        <p class="text-gray-600">${accommodation.location}</p>
                        <div class="flex items-center">
                            <div class="flex items-center">
                                ${Array.from({length: 5}, (_, i) => `
                                    <svg class="w-5 h-5 ${i < Math.floor(accommodation.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                                    </svg>
                                `).join('')}
                            </div>
                            <span class="ml-2 text-sm text-gray-600">${accommodation.rating} (${accommodation.reviews} reseñas)</span>
                        </div>
                        <div class="space-y-2">
                            <h3 class="font-semibold text-gray-900">Características de Seguridad:</h3>
                            ${accommodation.safetyFeatures.map(feature => `
                                <div class="flex items-center text-sm text-gray-600">
                                    <svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                    </svg>
                                    ${feature}
                                </div>
                            `).join('')}
                        </div>
                        <button class="w-full berry-gradient text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                            Hacer Reserva
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
}

// Extender la clase principal
BerryTripApp.prototype.loadBookingSection = function() {
    const bookingManager = new BookingManager();
    bookingManager.loadBookingSection();
};

BerryTripApp.prototype.showAccommodationDetails = function(id) {
    const bookingManager = new BookingManager();
    bookingManager.showAccommodationDetails(id);
};
