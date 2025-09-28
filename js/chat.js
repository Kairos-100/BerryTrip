// BerryTrip - Funcionalidad del Chat
class ChatManager {
    constructor() {
        this.currentChat = null;
        this.countries = [
            { code: 'ES', name: 'España', cities: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla'] },
            { code: 'FR', name: 'Francia', cities: ['París', 'Lyon', 'Marsella', 'Toulouse'] },
            { code: 'IT', name: 'Italia', cities: ['Roma', 'Milán', 'Nápoles', 'Florencia'] },
            { code: 'DE', name: 'Alemania', cities: ['Berlín', 'Múnich', 'Hamburgo', 'Colonia'] }
        ];
        this.chats = [
            {
                id: 'madrid',
                name: 'Madrid, España',
                participants: 24,
                lastMessage: '¡Hola! ¿Alguien conoce algún lugar seguro para cenar?',
                lastTime: '2 min',
                unread: 3
            },
            {
                id: 'barcelona',
                name: 'Barcelona, España',
                participants: 18,
                lastMessage: 'Recomendaciones de transporte nocturno por favor',
                lastTime: '15 min',
                unread: 0
            },
            {
                id: 'paris',
                name: 'París, Francia',
                participants: 31,
                lastMessage: '¿Alguien va al Louvre mañana?',
                lastTime: '1 hora',
                unread: 7
            }
        ];
        this.messages = [
            {
                id: 1,
                user: 'María',
                message: '¡Hola chicas! ¿Alguien conoce algún lugar seguro para cenar en el centro?',
                time: '14:30',
                isOwn: false
            },
            {
                id: 2,
                user: 'Ana',
                message: 'Sí! Te recomiendo el restaurante "La Rosa" en la calle Mayor, es muy seguro y la comida está deliciosa',
                time: '14:32',
                isOwn: false
            },
            {
                id: 3,
                user: 'Tú',
                message: '¡Perfecto! Muchas gracias Ana, voy a buscarlo',
                time: '14:35',
                isOwn: true
            },
            {
                id: 4,
                user: 'Laura',
                message: 'También está "Casa Segura" cerca de la plaza, tienen muy buena seguridad',
                time: '14:37',
                isOwn: false
            }
        ];
    }

    loadChatSection() {
        const chatSection = document.getElementById('chat-section');
        if (!chatSection) return;

        if (!app.user) {
            chatSection.innerHTML = this.getUnauthorizedHTML();
            return;
        }

        chatSection.innerHTML = this.getChatHTML();
        this.setupChatEvents();
        this.renderChats();
    }

    getUnauthorizedHTML() {
        return `
            <div class="bg-berry-50 rounded-2xl p-8 text-center">
                <svg class="w-16 h-16 text-berry-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                <h3 class="text-2xl font-semibold text-gray-900 mb-4">Inicia sesión para acceder al chat</h3>
                <p class="text-gray-600 mb-6">Únete a la conversación con otras mujeres viajeras</p>
            </div>
        `;
    }

    getChatHTML() {
        return `
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Lista de chats -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-2xl shadow-lg p-6">
                        <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <svg class="w-5 h-5 mr-2 text-berry-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                            </svg>
                            Chats Disponibles
                        </h3>
                        
                        <!-- Selector de país y ciudad -->
                        <div class="space-y-4 mb-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">País</label>
                                <select id="country-select" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berry-500 focus:border-transparent">
                                    <option value="">Selecciona un país</option>
                                    ${this.countries.map(country => `
                                        <option value="${country.code}">${country.name}</option>
                                    `).join('')}
                                </select>
                            </div>
                            
                            <div id="city-field" class="hidden">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
                                <select id="city-select" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berry-500 focus:border-transparent">
                                    <option value="">Selecciona una ciudad</option>
                                </select>
                            </div>
                        </div>

                        <!-- Lista de chats -->
                        <div id="chats-list" class="space-y-3">
                            <!-- Se llena dinámicamente -->
                        </div>
                    </div>
                </div>

                <!-- Chat activo -->
                <div class="lg:col-span-2">
                    <div class="bg-white rounded-2xl shadow-lg h-[600px] flex flex-col">
                        <div id="chat-placeholder" class="flex-1 flex items-center justify-center text-gray-500">
                            <div class="text-center">
                                <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                </svg>
                                <p class="text-lg">Selecciona un chat para comenzar</p>
                            </div>
                        </div>
                        <div id="active-chat" class="hidden flex-1 flex flex-col">
                            <!-- Contenido del chat activo -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupChatEvents() {
        // Selector de país
        const countrySelect = document.getElementById('country-select');
        if (countrySelect) {
            countrySelect.addEventListener('change', (e) => this.handleCountryChange(e.target.value));
        }

        // Selector de ciudad
        const citySelect = document.getElementById('city-select');
        if (citySelect) {
            citySelect.addEventListener('change', (e) => this.handleCityChange(e.target.value));
        }
    }

    handleCountryChange(countryCode) {
        const cityField = document.getElementById('city-field');
        const citySelect = document.getElementById('city-select');
        
        if (countryCode) {
            const country = this.countries.find(c => c.code === countryCode);
            citySelect.innerHTML = `
                <option value="">Selecciona una ciudad</option>
                ${country.cities.map(city => `
                    <option value="${city}">${city}</option>
                `).join('')}
            `;
            cityField.classList.remove('hidden');
        } else {
            cityField.classList.add('hidden');
        }
    }

    handleCityChange(city) {
        if (city) {
            // Buscar o crear chat para la ciudad seleccionada
            const chatId = city.toLowerCase().replace(/\s+/g, '');
            let chat = this.chats.find(c => c.id === chatId);
            
            if (!chat) {
                // Crear nuevo chat
                chat = {
                    id: chatId,
                    name: `${city}, ${this.countries.find(c => c.cities.includes(city))?.name}`,
                    participants: Math.floor(Math.random() * 20) + 5,
                    lastMessage: '¡Bienvenida al chat!',
                    lastTime: 'Ahora',
                    unread: 0
                };
                this.chats.unshift(chat);
            }
            
            this.selectChat(chat);
        }
    }

    renderChats() {
        const chatsList = document.getElementById('chats-list');
        if (!chatsList) return;

        chatsList.innerHTML = this.chats.map(chat => `
            <div onclick="chatManager.selectChat('${chat.id}')" class="p-4 rounded-lg cursor-pointer transition-colors ${this.currentChat === chat.id ? 'bg-berry-50 border-2 border-berry-200' : 'bg-gray-50 hover:bg-gray-100'}">
                <div class="flex justify-between items-start mb-2">
                    <h4 class="font-semibold text-gray-900">${chat.name}</h4>
                    ${chat.unread > 0 ? `<span class="bg-berry-500 text-white text-xs px-2 py-1 rounded-full">${chat.unread}</span>` : ''}
                </div>
                <p class="text-sm text-gray-600 mb-2 line-clamp-2">${chat.lastMessage}</p>
                <div class="flex justify-between items-center text-xs text-gray-500">
                    <span class="flex items-center">
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                        </svg>
                        ${chat.participants} mujeres
                    </span>
                    <span>${chat.lastTime}</span>
                </div>
            </div>
        `).join('');
    }

    selectChat(chatId) {
        const chat = this.chats.find(c => c.id === chatId);
        if (!chat) return;

        this.currentChat = chatId;
        this.renderChats();
        this.renderActiveChat(chat);
    }

    renderActiveChat(chat) {
        const chatPlaceholder = document.getElementById('chat-placeholder');
        const activeChat = document.getElementById('active-chat');
        
        chatPlaceholder.classList.add('hidden');
        activeChat.classList.remove('hidden');
        
        activeChat.innerHTML = `
            <!-- Header del chat -->
            <div class="p-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                    <h3 class="font-semibold text-gray-900">${chat.name}</h3>
                    <p class="text-sm text-gray-600">${chat.participants} mujeres en línea</p>
                </div>
                <div class="flex space-x-2">
                    <button class="p-2 text-gray-400 hover:text-gray-600">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                    </button>
                    <button class="p-2 text-gray-400 hover:text-gray-600">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Mensajes -->
            <div id="messages-container" class="flex-1 p-4 overflow-y-auto space-y-4">
                ${this.messages.map(msg => `
                    <div class="flex ${msg.isOwn ? 'justify-end' : 'justify-start'}">
                        <div class="chat-message ${msg.isOwn ? 'own' : 'other'} max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                            ${!msg.isOwn ? `<p class="text-xs font-semibold mb-1 opacity-75">${msg.user}</p>` : ''}
                            <p class="text-sm">${msg.message}</p>
                            <p class="text-xs mt-1 opacity-75">${msg.time}</p>
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- Input de mensaje -->
            <div class="p-4 border-t border-gray-200">
                <div class="flex space-x-2">
                    <div class="flex-1 flex items-center space-x-2">
                        <input type="text" id="message-input" placeholder="Escribe tu mensaje..." class="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berry-500 focus:border-transparent">
                        <button class="p-3 text-gray-400 hover:text-gray-600">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </button>
                        <button class="p-3 text-gray-400 hover:text-gray-600">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                        </button>
                    </div>
                    <button onclick="chatManager.sendMessage()" class="berry-gradient text-white p-3 rounded-lg hover:opacity-90 transition-opacity">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        // Configurar eventos del chat activo
        const messageInput = document.getElementById('message-input');
        if (messageInput) {
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }
    }

    sendMessage() {
        const messageInput = document.getElementById('message-input');
        const message = messageInput.value.trim();
        
        if (!message) return;

        // Agregar mensaje a la lista
        const newMessage = {
            id: this.messages.length + 1,
            user: 'Tú',
            message: message,
            time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
            isOwn: true
        };
        
        this.messages.push(newMessage);
        
        // Actualizar la vista
        this.renderActiveChat(this.chats.find(c => c.id === this.currentChat));
        
        // Limpiar input
        messageInput.value = '';
        
        // Simular respuesta automática
        setTimeout(() => {
            const responses = [
                '¡Gracias por compartir!',
                'Muy buena información',
                '¡Excelente recomendación!',
                'Lo tendré en cuenta',
                '¡Gracias!'
            ];
            
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            const responseMessage = {
                id: this.messages.length + 1,
                user: 'María',
                message: randomResponse,
                time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
                isOwn: false
            };
            
            this.messages.push(responseMessage);
            this.renderActiveChat(this.chats.find(c => c.id === this.currentChat));
        }, 2000);
    }
}

// Crear instancia global
const chatManager = new ChatManager();

// Extender la clase principal
BerryTripApp.prototype.loadChatSection = function() {
    chatManager.loadChatSection();
};
