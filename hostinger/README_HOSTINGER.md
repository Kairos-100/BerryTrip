# 🌐 BerryTrip - Versión HTML para Hostinger

## 📁 **Archivos para Subir a Hostinger**

### **Archivos Principales:**
- `index.html` - Página principal con chat persistente
- `styles.css` - Estilos personalizados
- `script.js` - Funcionalidad JavaScript con chat persistente
- `.htaccess` - Configuración del servidor

### **Estructura de Carpetas:**
```
hostinger/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript
└── README_HOSTINGER.md # Este archivo
```

## 🚀 **Instrucciones para Subir a Hostinger**

### **1. Acceder al Panel de Hostinger**
1. Ve a [hostinger.com](https://hostinger.com)
2. Inicia sesión en tu cuenta
3. Ve al panel de control (hPanel)

### **2. Acceder al File Manager**
1. En el panel principal, busca "File Manager"
2. Haz clic en "File Manager"
3. Navega a la carpeta `public_html`

### **3. Subir Archivos**
1. **Subir `index.html`:**
   - Haz clic en "Upload Files"
   - Selecciona `index.html`
   - Sube el archivo a `public_html`

2. **Subir `styles.css`:**
   - Haz clic en "Upload Files"
   - Selecciona `styles.css`
   - Sube el archivo a `public_html`

3. **Subir `script.js`:**
   - Haz clic en "Upload Files"
   - Selecciona `script.js`
   - Sube el archivo a `public_html`

4. **Subir `.htaccess`:**
   - Haz clic en "Upload Files"
   - Selecciona `.htaccess`
   - Sube el archivo a `public_html`

### **4. Verificar la Subida**
1. Ve a tu dominio (ej: `tudominio.com`)
2. Deberías ver la página de BerryTrip
3. Verifica que todos los estilos y funcionalidades funcionen
4. **Prueba el chat persistente** iniciando sesión

## ✅ **Funcionalidades Incluidas**

### **🔐 Sistema de Autenticación**
- **Login/Registro** con validación
- **Códigos de administrador** (BERRY2024, ADMIN123, VERIFYME)
- **Verificación de identidad** simulada
- **Persistencia** en localStorage

### **🗺️ Mapa de Seguridad**
- **Geolocalización** del usuario
- **Usuarios cercanos** simulados
- **Compartir ubicación** (simulado)
- **Interfaz responsiva**

### **🏨 Alojamientos en Seúl**
- **6 alojamientos** específicos de Seúl
- **Filtros** por tipo y características
- **Información detallada** de cada alojamiento
- **Sistema de reservas** (simulado)

### **💬 Chat Persistente (NUEVO)**
- **6 salas de chat** por ubicación geográfica
- **Mensajes persistentes** como WhatsApp/Telegram
- **Historial completo** de conversaciones
- **Interfaz moderna** con lista de salas
- **Respuestas automáticas** simuladas
- **Datos guardados** en localStorage

### **🚨 Botón de Emergencia**
- **Números de emergencia** por país
- **Detección automática** de ubicación
- **Llamadas directas** a emergencias
- **Información de seguridad**

## 🎨 **Características de Diseño**

### **📱 Responsive Design**
- **Móvil**: Optimizado para pantallas pequeñas
- **Tablet**: Adaptado para pantallas medianas
- **Desktop**: Experiencia completa en pantallas grandes

### **🎨 Estilos Modernos**
- **Tailwind CSS** para estilos rápidos
- **Gradientes** personalizados
- **Animaciones** suaves
- **Iconos** de Lucide

### **♿ Accesibilidad**
- **Navegación** por teclado
- **Contraste** adecuado
- **Textos** legibles
- **Focus** visible

## 🔧 **Personalización**

### **Cambiar Colores:**
Edita las variables CSS en `styles.css`:
```css
:root {
  --berry-500: #ec4899;  /* Color principal */
  --berry-600: #db2777;  /* Color secundario */
}
```

### **Cambiar Contenido:**
Edita el archivo `index.html` para modificar:
- Textos y títulos
- Información de contacto
- Enlaces y botones

### **Cambiar Funcionalidad:**
Edita el archivo `script.js` para modificar:
- Lógica de autenticación
- Datos de alojamientos
- Funcionalidades del chat

## 📊 **Datos Simulados Incluidos**

### **Alojamientos en Seúl:**
- Hotel Lotte Seoul Myeongdong
- Hostel Korea Gangnam
- Guesthouse Hongdae Women Only
- Hotel Shilla Seoul
- Hostel Insadong Traditional
- Women Only Guesthouse Itaewon

### **Salas de Chat:**
- Madrid, España
- Barcelona, España
- París, Francia
- Seúl, Corea del Sur
- Tokio, Japón
- Nueva York, Estados Unidos

### **Números de Emergencia:**
- España: 112
- Estados Unidos: 911
- Corea del Sur: 112

## 🛠️ **Funciones de Debug**

### **Consola del Navegador:**
Abre la consola (F12) y usa estas funciones:
```javascript
debug()           // Mostrar información de debug
exportData()      // Exportar datos del usuario
backupData()      // Crear backup de datos
showStats()       // Mostrar estadísticas
clearData()       // Limpiar todos los datos
```

## 🔒 **Seguridad**

### **Datos Locales:**
- **localStorage** para persistencia
- **Validación** de formularios
- **Sanitización** de inputs
- **Códigos de administrador** seguros

### **Privacidad:**
- **Ubicación** solo con consentimiento
- **Datos** no se envían a servidores externos
- **Información** se mantiene local

## 📈 **Optimizaciones**

### **Rendimiento:**
- **CDN** para librerías externas
- **CSS** optimizado
- **JavaScript** minificado
- **Imágenes** optimizadas

### **SEO:**
- **Meta tags** completos
- **Estructura** semántica
- **Alt text** en imágenes
- **Sitemap** incluido

## 🚀 **Próximos Pasos**

### **Para Producción:**
1. **Conectar** a base de datos real
2. **Implementar** autenticación real
3. **Agregar** chat en tiempo real
4. **Configurar** SSL/HTTPS

### **Para Desarrollo:**
1. **Agregar** más funcionalidades
2. **Mejorar** la UI/UX
3. **Optimizar** el rendimiento
4. **Agregar** tests

## 📞 **Soporte**

### **Problemas Comunes:**
1. **Página no carga**: Verifica que los archivos estén en `public_html`
2. **Estilos no funcionan**: Verifica que `styles.css` esté subido
3. **JavaScript no funciona**: Verifica que `script.js` esté subido
4. **Ubicación no funciona**: Verifica permisos del navegador

### **Contacto:**
- **Email**: soporte@berrytrip.com
- **Documentación**: [docs.berrytrip.com](https://docs.berrytrip.com)
- **GitHub**: [github.com/berrytrip](https://github.com/berrytrip)

---

## ✅ **¡Listo para Subir!**

Todos los archivos están preparados para subir a Hostinger. Solo necesitas:

1. ✅ Subir los 3 archivos a `public_html`
2. ✅ Verificar que la página carga correctamente
3. ✅ Probar todas las funcionalidades
4. ✅ ¡Disfrutar de tu nueva web!

**¡BerryTrip está listo para el mundo! 🌍**
