// BerryTrip - Aplicación Principal
class BerryTripApp {
    constructor() {
        this.user = null;
        this.map = null;
        this.currentChat = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadMapSection();
        this.loadBookingSection();
        this.loadChatSection();
        this.checkAuthStatus();
    }

    setupEventListeners() {
        // Smooth scrolling para navegación
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // Sistema de autenticación
    openAuthModal() {
        const modal = document.getElementById('auth-modal');
        modal.innerHTML = this.getAuthModalHTML();
        modal.classList.remove('hidden');
        this.setupAuthModalEvents();
    }

    closeAuthModal() {
        document.getElementById('auth-modal').classList.add('hidden');
    }

    getAuthModalHTML() {
        return `
            <div class="p-6 border-b border-gray-200">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-10 h-10 berry-gradient rounded-full flex items-center justify-center mr-3">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                            </svg>
                        </div>
                        <div>
                            <h2 class="text-2xl font-bold text-gray-900" id="auth-title">Iniciar Sesión</h2>
                            <p class="text-sm text-gray-600" id="auth-subtitle">Bienvenida de vuelta</p>
                        </div>
                    </div>
                    <button onclick="app.closeAuthModal()" class="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <form id="auth-form" class="p-6 space-y-6">
                <div id="name-field" class="hidden">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
                    <div class="relative">
                        <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        <input type="text" id="name" class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berry-500 focus:border-transparent" placeholder="Tu nombre completo">
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Correo electrónico</label>
                    <div class="relative">
                        <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        <input type="email" id="email" class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berry-500 focus:border-transparent" placeholder="tu@email.com" required>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                    <div class="relative">
                        <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                        <input type="password" id="password" class="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berry-500 focus:border-transparent" placeholder="Tu contraseña" required>
                        <button type="button" onclick="app.togglePassword('password')" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div id="confirm-password-field" class="hidden">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Confirmar contraseña</label>
                    <div class="relative">
                        <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                        <input type="password" id="confirm-password" class="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berry-500 focus:border-transparent" placeholder="Confirma tu contraseña">
                        <button type="button" onclick="app.togglePassword('confirm-password')" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div id="terms-field" class="hidden flex items-start">
                    <input type="checkbox" id="accept-terms" class="mt-1 h-4 w-4 text-berry-600 focus:ring-berry-500 border-gray-300 rounded">
                    <label for="accept-terms" class="ml-3 text-sm text-gray-600">
                        Acepto los <a href="#" class="text-berry-600 hover:text-berry-500 font-medium">términos y condiciones</a> y la <a href="#" class="text-berry-600 hover:text-berry-500 font-medium">política de privacidad</a>
                    </label>
                </div>
                <button type="submit" class="w-full berry-gradient text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                    <span id="submit-text">Iniciar Sesión</span>
                </button>
                <div class="text-center">
                    <button type="button" onclick="app.toggleAuthMode()" class="text-berry-600 hover:text-berry-500 font-medium">
                        <span id="toggle-text">¿No tienes cuenta? Regístrate</span>
                    </button>
                </div>
            </form>
            <div class="px-6 py-4 bg-gray-50 rounded-b-2xl">
                <div class="flex items-center justify-center text-sm text-gray-600">
                    <svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    <span>Tu información está protegida y encriptada</span>
                </div>
            </div>
        `;
    }

    setupAuthModalEvents() {
        const form = document.getElementById('auth-form');
        form.addEventListener('submit', (e) => this.handleAuthSubmit(e));
    }

    toggleAuthMode() {
        const isLogin = document.getElementById('name-field').classList.contains('hidden');
        const nameField = document.getElementById('name-field');
        const confirmField = document.getElementById('confirm-password-field');
        const termsField = document.getElementById('terms-field');
        const title = document.getElementById('auth-title');
        const subtitle = document.getElementById('auth-subtitle');
        const submitText = document.getElementById('submit-text');
        const toggleText = document.getElementById('toggle-text');

        if (isLogin) {
            // Cambiar a registro
            nameField.classList.remove('hidden');
            confirmField.classList.remove('hidden');
            termsField.classList.remove('hidden');
            title.textContent = 'Crear Cuenta';
            subtitle.textContent = 'Únete a la comunidad';
            submitText.textContent = 'Crear Cuenta';
            toggleText.textContent = '¿Ya tienes cuenta? Inicia sesión';
        } else {
            // Cambiar a login
            nameField.classList.add('hidden');
            confirmField.classList.add('hidden');
            termsField.classList.add('hidden');
            title.textContent = 'Iniciar Sesión';
            subtitle.textContent = 'Bienvenida de vuelta';
            submitText.textContent = 'Iniciar Sesión';
            toggleText.textContent = '¿No tienes cuenta? Regístrate';
        }
    }

    togglePassword(fieldId) {
        const field = document.getElementById(fieldId);
        field.type = field.type === 'password' ? 'text' : 'password';
    }

    handleAuthSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const name = document.getElementById('name').value;
        
        // Simular autenticación
        this.user = {
            id: 1,
            name: name || 'Usuario',
            email: email,
            verified: true
        };
        
        this.updateUI();
        this.closeAuthModal();
        this.showNotification('¡Bienvenida a BerryTrip!', 'success');
    }

    logout() {
        this.user = null;
        this.updateUI();
        this.showNotification('Sesión cerrada correctamente', 'success');
    }

    updateUI() {
        const userInfo = document.getElementById('user-info');
        const loginBtn = document.getElementById('login-btn');
        const userName = document.getElementById('user-name');

        if (this.user) {
            userInfo.classList.remove('hidden');
            loginBtn.classList.add('hidden');
            userName.textContent = this.user.name;
        } else {
            userInfo.classList.add('hidden');
            loginBtn.classList.remove('hidden');
        }
    }

    checkAuthStatus() {
        // Verificar si hay usuario guardado en localStorage
        const savedUser = localStorage.getItem('berrytrip_user');
        if (savedUser) {
            this.user = JSON.parse(savedUser);
            this.updateUI();
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }
}

// Inicializar la aplicación
const app = new BerryTripApp();

// Funciones globales para los botones
function openAuthModal() {
    app.openAuthModal();
}

function logout() {
    app.logout();
}

function openEmergencyModal() {
    app.openEmergencyModal();
}
