// BerryTrip - JavaScript para versión HTML estática
// Funcionalidad completa para Hostinger

// Variables globales
let currentUser = null;
let isLoginMode = true;
let isAdminMode = false;
let userLocation = null;
let map = null;
let nearbyUsers = [];
let currentChatRoom = null;
let chatMessages = {};

// Códigos de administrador
const adminCodes = ['BERRY2024', 'ADMIN123', 'VERIFYME'];

// Datos simulados de alojamientos en Seúl
const accommodations = [
    {
        id: 1,
        name: 'Hotel Lotte Seoul Myeongdong',
        location: 'Myeongdong, Seúl, Corea del Sur',
        price: 120,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
        verified: true,
        womenOnly: false,
        safetyFeatures: ['Cámaras 24/7', 'Recepción 24h', 'Zona segura', 'Cerca metro'],
        reviews: 234
    },
    {
        id: 2,
        name: 'Hostel Korea Gangnam',
        location: 'Gangnam, Seúl, Corea del Sur',
        price: 35,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400',
        verified: true,
        womenOnly: true,
        safetyFeatures: ['Solo mujeres', 'Código de acceso', 'Tranquilo', 'WiFi gratis'],
        reviews: 156
    },
    {
        id: 3,
        name: 'Guesthouse Hongdae Women Only',
        location: 'Hongdae, Seúl, Corea del Sur',
        price: 28,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
        verified: true,
        womenOnly: true,
        safetyFeatures: ['Solo mujeres', 'Verificado por mujeres', 'Zona segura', 'Cerca universidad'],
        reviews: 189
    },
    {
        id: 4,
        name: 'Hotel Shilla Seoul',
        location: 'Jung-gu, Seúl, Corea del Sur',
        price: 180,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400',
        verified: true,
        womenOnly: false,
        safetyFeatures: ['5 estrellas', 'Seguridad premium', 'Spa', 'Cerca palacio'],
        reviews: 312
    },
    {
        id: 5,
        name: 'Hostel Insadong Traditional',
        location: 'Insadong, Seúl, Corea del Sur',
        price: 42,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c0a8?w=400',
        verified: true,
        womenOnly: false,
        safetyFeatures: ['Cultura tradicional', 'Zona segura', 'Cerca templos', 'WiFi'],
        reviews: 98
    },
    {
        id: 6,
        name: 'Women Only Guesthouse Itaewon',
        location: 'Itaewon, Seúl, Corea del Sur',
        price: 38,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
        verified: true,
        womenOnly: true,
        safetyFeatures: ['Solo mujeres', 'Zona internacional', 'Cerca restaurantes', 'Seguro'],
        reviews: 145
    }
];

// Datos simulados de chats con mensajes persistentes
const chatRooms = [
    { 
        id: 'ES-madrid', 
        name: 'Madrid, España', 
        participants: 24, 
        lastMessage: '¡Hola! ¿Alguien conoce algún lugar seguro para cenar?', 
        lastTime: '2 min',
        messages: [
            { id: 1, user: 'María', message: '¡Hola chicas! ¿Alguien en Madrid?', time: '10:30', isOwn: false },
            { id: 2, user: 'Ana', message: '¡Hola María! Yo estoy aquí', time: '10:32', isOwn: false },
            { id: 3, user: 'Laura', message: '¿Alguien conoce algún lugar seguro para cenar?', time: '10:35', isOwn: false }
        ]
    },
    { 
        id: 'ES-barcelona', 
        name: 'Barcelona, España', 
        participants: 18, 
        lastMessage: 'Recomendaciones de transporte nocturno por favor', 
        lastTime: '15 min',
        messages: [
            { id: 1, user: 'Carmen', message: '¡Bienvenidas a Barcelona!', time: '09:15', isOwn: false },
            { id: 2, user: 'Sofia', message: '¿Alguien tiene recomendaciones de transporte nocturno?', time: '09:20', isOwn: false },
            { id: 3, user: 'Elena', message: 'El metro es seguro hasta las 12, después mejor taxi', time: '09:25', isOwn: false }
        ]
    },
    { 
        id: 'FR-paris', 
        name: 'París, Francia', 
        participants: 31, 
        lastMessage: '¿Alguien va al Louvre mañana?', 
        lastTime: '1 hora',
        messages: [
            { id: 1, user: 'Marie', message: 'Bonjour! Bienvenue à Paris', time: '08:00', isOwn: false },
            { id: 2, user: 'Claire', message: '¿Alguien va al Louvre mañana?', time: '08:30', isOwn: false },
            { id: 3, user: 'Sophie', message: 'Yo voy! ¿A qué hora?', time: '08:35', isOwn: false }
        ]
    },
    { 
        id: 'KR-seoul', 
        name: 'Seúl, Corea del Sur', 
        participants: 12, 
        lastMessage: '¡Bienvenidas a Seúl!', 
        lastTime: '5 min',
        messages: [
            { id: 1, user: 'Minji', message: '¡Bienvenidas a Seúl!', time: '11:00', isOwn: false },
            { id: 2, user: 'Yuna', message: '¿Alguien conoce Myeongdong?', time: '11:05', isOwn: false },
            { id: 3, user: 'Hana', message: '¡Sí! Es muy seguro y hay mucho que ver', time: '11:10', isOwn: false }
        ]
    },
    { 
        id: 'JP-tokyo', 
        name: 'Tokio, Japón', 
        participants: 8, 
        lastMessage: 'Consejos para el metro de Tokio', 
        lastTime: '30 min',
        messages: [
            { id: 1, user: 'Yuki', message: 'Konnichiwa! Welcome to Tokyo', time: '07:00', isOwn: false },
            { id: 2, user: 'Aiko', message: '¿Alguien tiene consejos para el metro?', time: '07:15', isOwn: false },
            { id: 3, user: 'Sakura', message: 'Es muy seguro, pero evita las horas pico', time: '07:20', isOwn: false }
        ]
    },
    { 
        id: 'US-newyork', 
        name: 'Nueva York, Estados Unidos', 
        participants: 45, 
        lastMessage: 'Central Park es seguro de día', 
        lastTime: '10 min',
        messages: [
            { id: 1, user: 'Sarah', message: 'Welcome to NYC!', time: '06:00', isOwn: false },
            { id: 2, user: 'Jessica', message: '¿Central Park es seguro?', time: '06:30', isOwn: false },
            { id: 3, user: 'Emily', message: 'Sí, es seguro de día, evita la noche', time: '06:35', isOwn: false }
        ]
    }
];

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar iconos de Lucide
    lucide.createIcons();
    
    // Cargar datos persistentes
    loadPersistentData();
    
    // Configurar event listeners
    setupEventListeners();
    
    // Cargar datos del localStorage
    loadUserData();
    
    // Mostrar contenido apropiado
    updateUI();
    
    // Inicializar chat si el usuario está logueado
    if (currentUser) {
        initializeChat();
    }
});

// Cargar datos persistentes del localStorage
function loadPersistentData() {
    // Cargar mensajes de chat guardados
    const savedMessages = localStorage.getItem('berrytrip_chat_messages');
    if (savedMessages) {
        chatMessages = JSON.parse(savedMessages);
    } else {
        // Inicializar con mensajes por defecto
        chatMessages = {};
        chatRooms.forEach(room => {
            chatMessages[room.id] = room.messages || [];
        });
        saveChatMessages();
    }
    
    // Cargar salas de chat guardadas
    const savedRooms = localStorage.getItem('berrytrip_chat_rooms');
    if (savedRooms) {
        const savedChatRooms = JSON.parse(savedRooms);
        // Actualizar salas existentes con mensajes guardados
        savedChatRooms.forEach(savedRoom => {
            const existingRoom = chatRooms.find(room => room.id === savedRoom.id);
            if (existingRoom) {
                existingRoom.messages = chatMessages[savedRoom.id] || [];
                existingRoom.lastMessage = savedRoom.lastMessage || existingRoom.lastMessage;
                existingRoom.lastTime = savedRoom.lastTime || existingRoom.lastTime;
            }
        });
    }
}

// Guardar mensajes de chat en localStorage
function saveChatMessages() {
    localStorage.setItem('berrytrip_chat_messages', JSON.stringify(chatMessages));
}

// Guardar salas de chat en localStorage
function saveChatRooms() {
    const roomsToSave = chatRooms.map(room => ({
        id: room.id,
        name: room.name,
        participants: room.participants,
        lastMessage: room.lastMessage,
        lastTime: room.lastTime
    }));
    localStorage.setItem('berrytrip_chat_rooms', JSON.stringify(roomsToSave));
}

// Inicializar sistema de chat
function initializeChat() {
    if (!currentUser) return;
    
    // Crear interfaz de chat si no existe
    createChatInterface();
    
    // Cargar mensajes existentes
    loadChatMessages();
    
    // Simular usuarios conectados
    simulateConnectedUsers();
}

// Crear interfaz de chat
function createChatInterface() {
    // Mostrar interfaz de chat
    const chatInterface = document.getElementById('chatInterface');
    const loginPrompt = document.getElementById('chatLoginPrompt');
    
    if (chatInterface) {
        chatInterface.classList.remove('hidden');
    }
    
    if (loginPrompt) {
        loginPrompt.style.display = 'none';
    }
    
    // Cargar lista de salas
    updateChatRoomsList();
    
    // Inicializar iconos
    lucide.createIcons();
}

// Seleccionar sala de chat
function selectChatRoom(roomId) {
    currentChatRoom = roomId;
    const room = chatRooms.find(r => r.id === roomId);
    if (!room) return;
    
    // Actualizar UI
    document.getElementById('currentChatName').textContent = room.name;
    document.getElementById('currentChatParticipants').textContent = `${room.participants} participantes`;
    document.getElementById('chatInput').style.display = 'block';
    
    // Resaltar sala seleccionada
    document.querySelectorAll('.chat-room-item').forEach(item => {
        item.classList.remove('bg-berry-50', 'border-berry-200');
        item.classList.add('hover:bg-gray-50');
    });
    
    const selectedRoom = document.querySelector(`[data-room-id="${roomId}"]`);
    if (selectedRoom) {
        selectedRoom.classList.add('bg-berry-50', 'border-berry-200');
        selectedRoom.classList.remove('hover:bg-gray-50');
    }
    
    // Cargar mensajes
    loadChatMessages();
}

// Cargar mensajes del chat
function loadChatMessages() {
    if (!currentChatRoom) return;
    
    const messages = chatMessages[currentChatRoom] || [];
    const messagesContainer = document.getElementById('chatMessages');
    
    if (messages.length === 0) {
        messagesContainer.innerHTML = `
            <div class="text-center text-gray-500 py-8">
                <i data-lucide="message-circle" class="w-12 h-12 mx-auto mb-4 text-gray-300"></i>
                <p>No hay mensajes en esta sala</p>
                <p class="text-sm">¡Sé la primera en escribir!</p>
            </div>
        `;
    } else {
        messagesContainer.innerHTML = messages.map(msg => `
            <div class="mb-4 ${msg.isOwn ? 'flex justify-end' : 'flex justify-start'}">
                <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.isOwn 
                        ? 'bg-berry-500 text-white' 
                        : 'bg-gray-100 text-gray-900'
                }">
                    <div class="flex items-center justify-between mb-1">
                        <span class="text-sm font-medium">${msg.user}</span>
                        <span class="text-xs opacity-75">${msg.time}</span>
                    </div>
                    <p class="text-sm">${msg.message}</p>
                </div>
            </div>
        `).join('');
    }
    
    // Scroll al final
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Inicializar iconos
    lucide.createIcons();
}

// Enviar mensaje
function sendMessage() {
    if (!currentChatRoom || !currentUser) return;
    
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (!message) return;
    
    // Crear mensaje
    const newMessage = {
        id: Date.now(),
        user: currentUser.name,
        message: message,
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
        timestamp: Date.now()
    };
    
    // Agregar mensaje a la sala
    if (!chatMessages[currentChatRoom]) {
        chatMessages[currentChatRoom] = [];
    }
    chatMessages[currentChatRoom].push(newMessage);
    
    // Actualizar sala de chat
    const room = chatRooms.find(r => r.id === currentChatRoom);
    if (room) {
        room.messages = chatMessages[currentChatRoom];
        room.lastMessage = message;
        room.lastTime = 'Ahora';
    }
    
    // Guardar datos
    saveChatMessages();
    saveChatRooms();
    
    // Limpiar input
    messageInput.value = '';
    
    // Recargar mensajes
    loadChatMessages();
    
    // Simular respuesta automática
    setTimeout(() => {
        simulateAutoReply();
    }, 1000 + Math.random() * 2000);
}

// Simular respuesta automática
function simulateAutoReply() {
    if (!currentChatRoom) return;
    
    const autoReplies = [
        '¡Excelente pregunta!',
        '¡Gracias por compartir!',
        '¡Muy útil!',
        '¡Totalmente de acuerdo!',
        '¡Buena idea!',
        '¡Sí, es muy seguro!',
        '¡Lo recomiendo!',
        '¡Perfecto!'
    ];
    
    const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
    const randomUser = ['Ana', 'María', 'Laura', 'Carmen', 'Sofia', 'Elena'][Math.floor(Math.random() * 6)];
    
    const autoMessage = {
        id: Date.now() + 1,
        user: randomUser,
        message: randomReply,
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        isOwn: false,
        timestamp: Date.now()
    };
    
    chatMessages[currentChatRoom].push(autoMessage);
    
    // Actualizar sala
    const room = chatRooms.find(r => r.id === currentChatRoom);
    if (room) {
        room.messages = chatMessages[currentChatRoom];
        room.lastMessage = randomReply;
        room.lastTime = 'Ahora';
    }
    
    saveChatMessages();
    saveChatRooms();
    loadChatMessages();
}

// Manejar tecla Enter en input
function handleMessageKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Refrescar chat
function refreshChat() {
    if (currentChatRoom) {
        loadChatMessages();
        showNotification('Chat actualizado', 'success');
    }
}

// Limpiar chat
function clearChat() {
    if (!currentChatRoom) return;
    
    if (confirm('¿Estás segura de que quieres limpiar este chat?')) {
        chatMessages[currentChatRoom] = [];
        saveChatMessages();
        loadChatMessages();
        showNotification('Chat limpiado', 'success');
    }
}

// Simular usuarios conectados
function simulateConnectedUsers() {
    // Actualizar contadores de participantes
    chatRooms.forEach(room => {
        room.participants = Math.floor(Math.random() * 20) + 5;
    });
    
    // Actualizar UI
    updateChatRoomsList();
}

// Actualizar lista de salas de chat
function updateChatRoomsList() {
    const roomsList = document.getElementById('chatRoomsList');
    if (!roomsList) return;
    
    roomsList.innerHTML = chatRooms.map(room => `
        <div class="chat-room-item p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors" 
             onclick="selectChatRoom('${room.id}')" data-room-id="${room.id}">
            <div class="flex items-center justify-between">
                <div>
                    <h4 class="font-medium text-gray-900">${room.name}</h4>
                    <p class="text-sm text-gray-600">${room.participants} participantes</p>
                </div>
                <div class="text-right">
                    <p class="text-sm text-gray-500">${room.lastTime}</p>
                    <div class="w-2 h-2 bg-green-500 rounded-full mt-1"></div>
                </div>
            </div>
            <p class="text-sm text-gray-600 mt-1 truncate">${room.lastMessage}</p>
        </div>
    `).join('');
}

// Configurar event listeners
function setupEventListeners() {
    // Formulario de autenticación
    const authForm = document.getElementById('authForm');
    if (authForm) {
        authForm.addEventListener('submit', handleAuthSubmit);
    }
    
    // Código de administrador
    const adminCodeInput = document.getElementById('adminCode');
    if (adminCodeInput) {
        adminCodeInput.addEventListener('input', handleAdminCodeChange);
    }
    
    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Manejar envío del formulario de autenticación
function handleAuthSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;
    const name = document.getElementById('userName').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const adminCode = document.getElementById('adminCode').value;
    
    // Validaciones
    if (!email || !password) {
        showNotification('Por favor, completa todos los campos requeridos', 'error');
        return;
    }
    
    if (!isLoginMode) {
        if (!name) {
            showNotification('El nombre es requerido', 'error');
            return;
        }
        if (password !== confirmPassword) {
            showNotification('Las contraseñas no coinciden', 'error');
            return;
        }
    }
    
    // Verificar código de administrador
    if (adminCode && adminCodes.includes(adminCode)) {
        isAdminMode = true;
        currentUser = {
            id: 'admin',
            name: 'Administrador',
            email: email,
            isAdmin: true,
            verified: true
        };
    } else {
        // Simular autenticación normal
        currentUser = {
            id: Date.now(),
            name: name || 'Usuario',
            email: email,
            isAdmin: false,
            verified: true
        };
    }
    
    // Guardar datos del usuario
    saveUserData();
    
    // Cerrar modal y actualizar UI
    closeAuthModal();
    updateUI();
    
    showNotification(`¡Bienvenida ${currentUser.name}!`, 'success');
}

// Manejar cambio en código de administrador
function handleAdminCodeChange(e) {
    const adminCode = e.target.value;
    const adminStatus = document.getElementById('adminStatus');
    
    if (adminCodes.includes(adminCode)) {
        isAdminMode = true;
        adminStatus.classList.remove('hidden');
    } else {
        isAdminMode = false;
        adminStatus.classList.add('hidden');
    }
}

// Abrir modal de autenticación
function openAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

// Cerrar modal de autenticación
function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// Cambiar modo de autenticación
function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    
    const title = document.getElementById('authTitle');
    const subtitle = document.getElementById('authSubtitle');
    const submitButton = document.getElementById('submitButton');
    const toggleButton = document.getElementById('toggleButton');
    const nameField = document.getElementById('nameField');
    const confirmPasswordField = document.getElementById('confirmPasswordField');
    const termsField = document.getElementById('termsField');
    
    if (isLoginMode) {
        title.textContent = 'Iniciar Sesión';
        subtitle.textContent = 'Bienvenida de vuelta';
        submitButton.textContent = 'Iniciar Sesión';
        toggleButton.textContent = '¿No tienes cuenta? Regístrate';
        nameField.classList.add('hidden');
        confirmPasswordField.classList.add('hidden');
        termsField.classList.add('hidden');
    } else {
        title.textContent = 'Crear Cuenta';
        subtitle.textContent = 'Únete a la comunidad';
        submitButton.textContent = 'Crear Cuenta';
        toggleButton.textContent = '¿Ya tienes cuenta? Inicia sesión';
        nameField.classList.remove('hidden');
        confirmPasswordField.classList.remove('hidden');
        termsField.classList.remove('hidden');
    }
}

// Abrir modal de emergencia
function openEmergencyModal() {
    const modal = document.getElementById('emergencyModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

// Cerrar modal de emergencia
function closeEmergencyModal() {
    const modal = document.getElementById('emergencyModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// Obtener ubicación actual
function getCurrentLocation() {
    if (!navigator.geolocation) {
        showNotification('Tu navegador no soporta geolocalización', 'error');
        return;
    }
    
    showNotification('Obteniendo tu ubicación...', 'warning');
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                accuracy: position.coords.accuracy
            };
            
            showNotification('Ubicación obtenida correctamente', 'success');
            
            // Simular usuarios cercanos
            generateNearbyUsers();
        },
        (error) => {
            console.error('Error obteniendo ubicación:', error);
            showNotification('No se pudo obtener tu ubicación', 'error');
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000
        }
    );
}

// Generar usuarios cercanos simulados
function generateNearbyUsers() {
    if (!userLocation) return;
    
    nearbyUsers = [
        {
            id: 1,
            name: 'María',
            distance: 0.5,
            lastSeen: new Date()
        },
        {
            id: 2,
            name: 'Ana',
            distance: 1.2,
            lastSeen: new Date()
        },
        {
            id: 3,
            name: 'Laura',
            distance: 2.1,
            lastSeen: new Date()
        }
    ];
}

// Llamar a emergencias
function callEmergency(number) {
    showNotification(`Llamando a ${number}...`, 'warning');
    
    // Simular llamada
    setTimeout(() => {
        window.open(`tel:${number}`, '_self');
        showNotification('Llamada iniciada', 'success');
    }, 2000);
}

// Alternar visibilidad de contraseña
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(inputId + 'Icon');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.setAttribute('data-lucide', 'eye-off');
    } else {
        input.type = 'password';
        icon.setAttribute('data-lucide', 'eye');
    }
    
    lucide.createIcons();
}

// Scroll a sección
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Actualizar UI según el estado del usuario
function updateUI() {
    if (currentUser) {
        // Usuario logueado
        updateLoggedInUI();
    } else {
        // Usuario no logueado
        updateLoggedOutUI();
    }
}

// Actualizar UI para usuario logueado
function updateLoggedInUI() {
    // Actualizar secciones que requieren login
    updateMapSection();
    updateBookingSection();
    updateChatSection();
    
    // Inicializar chat si no está ya inicializado
    if (currentUser && !document.getElementById('chatRoomsList')) {
        initializeChat();
    }
}

// Actualizar UI para usuario no logueado
function updateLoggedOutUI() {
    // Ocultar interfaz de chat y mostrar prompt de login
    const chatInterface = document.getElementById('chatInterface');
    const loginPrompt = document.getElementById('chatLoginPrompt');
    
    if (chatInterface) {
        chatInterface.classList.add('hidden');
    }
    
    if (loginPrompt) {
        loginPrompt.style.display = 'block';
    }
}

// Actualizar sección del mapa
function updateMapSection() {
    // Implementar funcionalidad del mapa si el usuario está logueado
    console.log('Mapa actualizado para usuario logueado');
}

// Actualizar sección de reservas
function updateBookingSection() {
    // Implementar funcionalidad de reservas si el usuario está logueado
    console.log('Reservas actualizadas para usuario logueado');
}

// Actualizar sección de chat
function updateChatSection() {
    // Si el usuario está logueado, inicializar el chat
    if (currentUser) {
        initializeChat();
    }
}

// Mostrar notificación
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        type === 'warning' ? 'bg-yellow-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    
    notification.innerHTML = `
        <div class="flex items-center">
            <i data-lucide="${type === 'success' ? 'check-circle' : type === 'error' ? 'x-circle' : type === 'warning' ? 'alert-triangle' : 'info'}" class="w-5 h-5 mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Inicializar iconos
    lucide.createIcons();
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Guardar datos del usuario en localStorage
function saveUserData() {
    if (currentUser) {
        localStorage.setItem('berrytrip_user', JSON.stringify(currentUser));
    }
}

// Cargar datos del usuario desde localStorage
function loadUserData() {
    const userData = localStorage.getItem('berrytrip_user');
    if (userData) {
        currentUser = JSON.parse(userData);
    }
}

// Función para calcular distancia entre dos puntos
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
}

// Función para formatear tiempo
function formatTime(timestamp) {
    return new Date(timestamp).toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Función para formatear fecha
function formatDate(timestamp) {
    return new Date(timestamp).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Función para generar ID único
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para validar contraseña
function isValidPassword(password) {
    return password.length >= 6;
}

// Función para sanitizar input
function sanitizeInput(input) {
    return input.replace(/[<>]/g, '');
}

// Función para hacer scroll suave
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Función para detectar si es móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Función para detectar si es tablet
function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

// Función para detectar si es desktop
function isDesktop() {
    return window.innerWidth > 1024;
}

// Función para manejar resize de ventana
function handleResize() {
    // Actualizar UI según el tamaño de pantalla
    if (isMobile()) {
        // Configuraciones para móvil
        console.log('Vista móvil');
    } else if (isTablet()) {
        // Configuraciones para tablet
        console.log('Vista tablet');
    } else {
        // Configuraciones para desktop
        console.log('Vista desktop');
    }
}

// Event listener para resize
window.addEventListener('resize', handleResize);

// Función para manejar errores globales
window.addEventListener('error', function(e) {
    console.error('Error global:', e.error);
    showNotification('Ha ocurrido un error inesperado', 'error');
});

// Función para manejar promesas rechazadas
window.addEventListener('unhandledrejection', function(e) {
    console.error('Promesa rechazada:', e.reason);
    showNotification('Ha ocurrido un error inesperado', 'error');
});

// Función para inicializar el mapa (si se necesita)
function initMap() {
    if (typeof L !== 'undefined' && userLocation) {
        map = L.map('map').setView([userLocation.lat, userLocation.lng], 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        // Agregar marcador del usuario
        L.marker([userLocation.lat, userLocation.lng])
            .addTo(map)
            .bindPopup('Tu ubicación')
            .openPopup();
    }
}

// Función para exportar datos (para desarrollo)
function exportData() {
    const data = {
        user: currentUser,
        location: userLocation,
        nearbyUsers: nearbyUsers,
        timestamp: new Date()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'berrytrip-data.json';
    link.click();
}

// Función para importar datos (para desarrollo)
function importData(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            console.log('Datos importados:', data);
            showNotification('Datos importados correctamente', 'success');
        } catch (error) {
            console.error('Error importando datos:', error);
            showNotification('Error al importar datos', 'error');
        }
    };
    reader.readAsText(file);
}

// Función para limpiar datos
function clearData() {
    if (confirm('¿Estás segura de que quieres limpiar todos los datos?')) {
        localStorage.clear();
        currentUser = null;
        userLocation = null;
        nearbyUsers = [];
        updateUI();
        showNotification('Datos limpiados', 'success');
    }
}

// Función para obtener información del sistema
function getSystemInfo() {
    return {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
        screenWidth: screen.width,
        screenHeight: screen.height,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
    };
}

// Función para hacer backup de datos
function backupData() {
    const data = {
        user: currentUser,
        location: userLocation,
        nearbyUsers: nearbyUsers,
        timestamp: new Date(),
        version: '1.0.0'
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `berrytrip-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showNotification('Backup creado correctamente', 'success');
}

// Función para restaurar datos desde backup
function restoreData(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.user) currentUser = data.user;
            if (data.location) userLocation = data.location;
            if (data.nearbyUsers) nearbyUsers = data.nearbyUsers;
            
            saveUserData();
            updateUI();
            
            showNotification('Datos restaurados correctamente', 'success');
        } catch (error) {
            console.error('Error restaurando datos:', error);
            showNotification('Error al restaurar datos', 'error');
        }
    };
    reader.readAsText(file);
}

// Función para mostrar estadísticas
function showStats() {
    const stats = {
        user: currentUser ? 'Logueada' : 'No logueada',
        location: userLocation ? 'Activa' : 'Inactiva',
        nearbyUsers: nearbyUsers.length,
        timestamp: new Date().toLocaleString('es-ES')
    };
    
    console.log('Estadísticas:', stats);
    showNotification(`Usuarios cercanos: ${stats.nearbyUsers}`, 'info');
}

// Función para debug
function debug() {
    console.log('=== DEBUG INFO ===');
    console.log('Usuario:', currentUser);
    console.log('Ubicación:', userLocation);
    console.log('Usuarios cercanos:', nearbyUsers);
    console.log('Modo admin:', isAdminMode);
    console.log('Modo login:', isLoginMode);
    console.log('Sistema:', getSystemInfo());
    console.log('==================');
}

// Hacer funciones disponibles globalmente para debugging
window.debug = debug;
window.exportData = exportData;
window.importData = importData;
window.clearData = clearData;
window.backupData = backupData;
window.restoreData = restoreData;
window.showStats = showStats;
window.getSystemInfo = getSystemInfo;

console.log('BerryTrip HTML version loaded successfully!');
console.log('Available debug functions: debug(), exportData(), importData(), clearData(), backupData(), restoreData(), showStats(), getSystemInfo()');
