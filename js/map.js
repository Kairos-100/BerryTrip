// BerryTrip - Funcionalidad del Mapa
class MapManager {
    constructor() {
        this.map = null;
        this.userLocation = null;
        this.nearbyUsers = [];
        this.isMapVisible = false;
    }

    loadMapSection() {
        const mapSection = document.getElementById('map-section');
        if (!mapSection) return;

        if (!app.user) {
            mapSection.innerHTML = this.getUnauthorizedHTML();
            return;
        }

        mapSection.innerHTML = this.getMapHTML();
        this.setupMapEvents();
    }

    getUnauthorizedHTML() {
        return `
            <div class="bg-berry-50 rounded-2xl p-8 text-center">
                <svg class="w-16 h-16 text-berry-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                <h3 class="text-2xl font-semibold text-gray-900 mb-4">Inicia sesión para acceder al mapa</h3>
                <p class="text-gray-600 mb-6">Necesitas estar registrada para ver y compartir tu ubicación de forma segura</p>
            </div>
        `;
    }

    getMapHTML() {
        return `
            <div class="space-y-6">
                <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button id="toggle-map" class="flex items-center px-6 py-3 rounded-xl font-semibold transition-all berry-gradient text-white hover:opacity-90">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                        Mostrar Mapa
                    </button>
                    <div id="map-status" class="hidden flex items-center text-sm text-gray-600">
                        <svg class="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                        </svg>
                        Tu ubicación está protegida y encriptada
                    </div>
                </div>
                <div id="map-container" class="hidden">
                    <div id="map" class="h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-lg"></div>
                    <div id="nearby-users" class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"></div>
                </div>
            </div>
        `;
    }

    setupMapEvents() {
        const toggleBtn = document.getElementById('toggle-map');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleMap());
        }
    }

    toggleMap() {
        const mapContainer = document.getElementById('map-container');
        const toggleBtn = document.getElementById('toggle-map');
        const mapStatus = document.getElementById('map-status');

        if (!this.isMapVisible) {
            this.showMap();
            mapContainer.classList.remove('hidden');
            mapStatus.classList.remove('hidden');
            toggleBtn.innerHTML = `
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                </svg>
                Ocultar Mapa
            `;
            toggleBtn.className = 'flex items-center px-6 py-3 rounded-xl font-semibold transition-all bg-red-100 text-red-700 hover:bg-red-200';
        } else {
            this.hideMap();
            mapContainer.classList.add('hidden');
            mapStatus.classList.add('hidden');
            toggleBtn.innerHTML = `
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                Mostrar Mapa
            `;
            toggleBtn.className = 'flex items-center px-6 py-3 rounded-xl font-semibold transition-all berry-gradient text-white hover:opacity-90';
        }
    }

    showMap() {
        this.isMapVisible = true;
        this.getUserLocation();
        this.loadNearbyUsers();
        this.initMap();
    }

    hideMap() {
        this.isMapVisible = false;
        if (this.map) {
            this.map.remove();
            this.map = null;
        }
    }

    getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.userLocation = [position.coords.latitude, position.coords.longitude];
                    this.updateMap();
                },
                (error) => {
                    console.error('Error obteniendo ubicación:', error);
                    // Usar ubicación por defecto (Madrid)
                    this.userLocation = [40.4168, -3.7038];
                    this.updateMap();
                }
            );
        } else {
            // Usar ubicación por defecto
            this.userLocation = [40.4168, -3.7038];
            this.updateMap();
        }
    }

    loadNearbyUsers() {
        // Simular usuarios cercanos
        this.nearbyUsers = [
            {
                id: 1,
                name: 'María',
                location: [40.4168, -3.7038],
                lastSeen: 'Hace 2 horas',
                status: 'online'
            },
            {
                id: 2,
                name: 'Ana',
                location: [41.3851, 2.1734],
                lastSeen: 'Hace 1 hora',
                status: 'online'
            },
            {
                id: 3,
                name: 'Laura',
                location: [40.4168, -3.7038],
                lastSeen: 'Hace 30 min',
                status: 'online'
            }
        ];
        this.updateNearbyUsersList();
    }

    initMap() {
        if (!this.map) {
            const mapElement = document.getElementById('map');
            if (!mapElement) return;

            this.map = L.map('map').setView(this.userLocation || [40.4168, -3.7038], 10);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map);

            this.addMarkers();
        }
    }

    addMarkers() {
        if (!this.map) return;

        // Icono personalizado para el usuario
        const userIcon = L.divIcon({
            className: 'custom-icon',
            html: `
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#ec4899" stroke="#be185d" stroke-width="2"/>
                    <circle cx="12" cy="9" r="3" fill="white"/>
                    <path d="M7 20.5C7 16.5 9.5 14 12 14s5 2.5 5 6.5" stroke="white" stroke-width="2" fill="none"/>
                </svg>
            `,
            iconSize: [25, 25],
            iconAnchor: [12, 12],
            popupAnchor: [0, -12]
        });

        // Icono para otros usuarios
        const otherUserIcon = L.divIcon({
            className: 'custom-icon other-user',
            html: `
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#0ea5e9" stroke="#0369a1" stroke-width="2"/>
                    <circle cx="12" cy="9" r="3" fill="white"/>
                    <path d="M7 20.5C7 16.5 9.5 14 12 14s5 2.5 5 6.5" stroke="white" stroke-width="2" fill="none"/>
                </svg>
            `,
            iconSize: [25, 25],
            iconAnchor: [12, 12],
            popupAnchor: [0, -12]
        });

        // Marcador del usuario
        if (this.userLocation) {
            L.marker(this.userLocation, { icon: userIcon })
                .addTo(this.map)
                .bindPopup(`
                    <div class="text-center">
                        <h3 class="font-semibold text-berry-600">Tu ubicación</h3>
                        <p class="text-sm text-gray-600">Estás aquí</p>
                    </div>
                `);
        }

        // Marcadores de usuarios cercanos
        this.nearbyUsers.forEach(user => {
            L.marker(user.location, { icon: otherUserIcon })
                .addTo(this.map)
                .bindPopup(`
                    <div class="text-center">
                        <h3 class="font-semibold text-safety-600">${user.name}</h3>
                        <p class="text-sm text-gray-600">${user.lastSeen}</p>
                        <div class="flex items-center justify-center mt-2">
                            <div class="w-2 h-2 rounded-full mr-2 ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}"></div>
                            <span class="text-xs text-gray-500">${user.status === 'online' ? 'En línea' : 'Desconectada'}</span>
                        </div>
                    </div>
                `);
        });
    }

    updateMap() {
        if (this.map && this.userLocation) {
            this.map.setView(this.userLocation, 10);
            this.addMarkers();
        }
    }

    updateNearbyUsersList() {
        const container = document.getElementById('nearby-users');
        if (!container) return;

        container.innerHTML = this.nearbyUsers.map(user => `
            <div class="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-berry-100 rounded-full flex items-center justify-center">
                        <svg class="w-5 h-5 text-berry-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                        </svg>
                    </div>
                    <div>
                        <h4 class="font-semibold text-gray-900">${user.name}</h4>
                        <p class="text-sm text-gray-600">${user.lastSeen}</p>
                        <div class="flex items-center mt-1">
                            <div class="w-2 h-2 rounded-full mr-2 ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}"></div>
                            <span class="text-xs text-gray-500">${user.status === 'online' ? 'En línea' : 'Desconectada'}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Extender la clase principal
BerryTripApp.prototype.loadMapSection = function() {
    const mapManager = new MapManager();
    mapManager.loadMapSection();
};
