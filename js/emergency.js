// BerryTrip - Funcionalidad de Emergencia
class EmergencyManager {
    constructor() {
        this.emergencyNumbers = [
            { country: 'España', number: '112', name: 'Emergencias' },
            { country: 'Francia', number: '112', name: 'Urgences' },
            { country: 'Italia', number: '112', name: 'Emergenza' },
            { country: 'Alemania', number: '112', name: 'Notfall' },
            { country: 'Reino Unido', number: '999', name: 'Emergency' },
            { country: 'Estados Unidos', number: '911', name: 'Emergency' },
            { country: 'México', number: '911', name: 'Emergencias' },
            { country: 'Argentina', number: '911', name: 'Emergencias' },
            { country: 'Colombia', number: '123', name: 'Emergencias' },
            { country: 'Chile', number: '133', name: 'Carabineros' }
        ];
        this.isCalling = false;
    }

    openEmergencyModal() {
        const modal = document.getElementById('emergency-modal');
        modal.innerHTML = this.getEmergencyModalHTML();
        modal.classList.remove('hidden');
        this.setupEmergencyEvents();
    }

    closeEmergencyModal() {
        document.getElementById('emergency-modal').classList.add('hidden');
    }

    getEmergencyModalHTML() {
        return `
            <div class="p-6 border-b border-gray-200">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-3">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                            </svg>
                        </div>
                        <div>
                            <h2 class="text-2xl font-bold text-red-600">Emergencia</h2>
                            <p class="text-red-100">¿Necesitas ayuda inmediata?</p>
                        </div>
                    </div>
                    <button onclick="emergencyManager.closeEmergencyModal()" class="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <div class="p-6 space-y-6">
                <!-- Información de ubicación -->
                <div class="bg-gray-50 rounded-lg p-4">
                    <h3 class="font-semibold text-gray-900 mb-2 flex items-center">
                        <svg class="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        Tu Ubicación
                    </h3>
                    <p class="text-sm text-gray-600 mb-3">
                        Comparte tu ubicación con las autoridades para recibir ayuda más rápida
                    </p>
                    <button onclick="emergencyManager.shareLocation()" class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        Compartir Ubicación
                    </button>
                </div>

                <!-- Números de emergencia -->
                <div>
                    <h3 class="font-semibold text-gray-900 mb-4 flex items-center">
                        <svg class="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        Llamar a Emergencias
                    </h3>
                    <div class="space-y-3">
                        ${this.emergencyNumbers.map((emergency, index) => `
                            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div>
                                    <p class="font-medium text-gray-900">${emergency.country}</p>
                                    <p class="text-sm text-gray-600">${emergency.name}</p>
                                </div>
                                <button onclick="emergencyManager.callEmergency('${emergency.number}')" 
                                        id="call-btn-${index}"
                                        class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors flex items-center">
                                    <span id="call-text-${index}">
                                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                        </svg>
                                        ${emergency.number}
                                    </span>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Información adicional -->
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div class="flex items-start">
                        <svg class="w-5 h-5 text-yellow-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"></path>
                        </svg>
                        <div>
                            <h4 class="font-semibold text-yellow-800 mb-2">Información Importante</h4>
                            <ul class="text-sm text-yellow-700 space-y-1">
                                <li>• Mantén la calma y habla claramente</li>
                                <li>• Proporciona tu ubicación exacta</li>
                                <li>• Describe la situación de emergencia</li>
                                <li>• No cuelgues hasta que te lo indiquen</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Botón de cierre -->
                <button onclick="emergencyManager.closeEmergencyModal()" class="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium">
                    Cerrar
                </button>
            </div>
        `;
    }

    setupEmergencyEvents() {
        // Los eventos se configuran en el HTML generado
    }

    shareLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    const locationUrl = `https://www.google.com/maps?q=${lat},${lng}`;
                    
                    // Intentar abrir en una nueva pestaña
                    window.open(locationUrl, '_blank');
                    
                    // También copiar al portapapeles si es posible
                    if (navigator.clipboard) {
                        navigator.clipboard.writeText(`${lat}, ${lng}`);
                        app.showNotification('Ubicación copiada al portapapeles', 'success');
                    }
                },
                (error) => {
                    console.error('Error obteniendo ubicación:', error);
                    app.showNotification('No se pudo obtener tu ubicación. Por favor, comparte tu ubicación manualmente.', 'error');
                }
            );
        } else {
            app.showNotification('La geolocalización no está disponible en tu dispositivo', 'error');
        }
    }

    callEmergency(number) {
        if (this.isCalling) return;
        
        this.isCalling = true;
        
        // Actualizar todos los botones de llamada
        this.emergencyNumbers.forEach((_, index) => {
            const btn = document.getElementById(`call-btn-${index}`);
            const text = document.getElementById(`call-text-${index}`);
            
            if (btn && text) {
                btn.disabled = true;
                text.innerHTML = `
                    <svg class="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    Llamando...
                `;
            }
        });
        
        // Simular llamada de emergencia
        setTimeout(() => {
            // Intentar hacer la llamada
            window.open(`tel:${number}`, '_self');
            
            // Restaurar botones después de un tiempo
            setTimeout(() => {
                this.isCalling = false;
                this.emergencyNumbers.forEach((emergency, index) => {
                    const btn = document.getElementById(`call-btn-${index}`);
                    const text = document.getElementById(`call-text-${index}`);
                    
                    if (btn && text) {
                        btn.disabled = false;
                        text.innerHTML = `
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                            ${emergency.number}
                        `;
                    }
                });
                
                this.closeEmergencyModal();
                app.showNotification('Llamada de emergencia iniciada', 'success');
            }, 3000);
        }, 2000);
    }
}

// Crear instancia global
const emergencyManager = new EmergencyManager();

// Extender la clase principal
BerryTripApp.prototype.openEmergencyModal = function() {
    emergencyManager.openEmergencyModal();
};
