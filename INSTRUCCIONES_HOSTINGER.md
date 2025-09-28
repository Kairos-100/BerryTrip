# 🚀 Instrucciones para Desplegar BerryTrip en Hostinger

## 📁 Archivos Necesarios

Para desplegar BerryTrip en Hostinger, necesitas subir los siguientes archivos a tu cuenta de hosting:

### Archivos Principales
- `index.html` - Página principal
- `styles.css` - Estilos personalizados
- `js/` - Carpeta con todos los archivos JavaScript

### Estructura de Archivos
```
tu-dominio.com/
├── index.html
├── styles.css
├── js/
│   ├── app.js
│   ├── map.js
│   ├── booking.js
│   ├── chat.js
│   └── emergency.js
└── README.md (opcional)
```

## 🔧 Pasos para el Despliegue

### 1. Acceder al Panel de Hostinger
1. Inicia sesión en tu cuenta de Hostinger
2. Ve a "Hosting" y selecciona tu dominio
3. Accede al "File Manager" o "Administrador de Archivos"

### 2. Subir Archivos
1. Navega a la carpeta `public_html` (o la carpeta raíz de tu sitio web)
2. Sube el archivo `index.html` directamente a `public_html`
3. Sube el archivo `styles.css` directamente a `public_html`
4. Crea una carpeta llamada `js` en `public_html`
5. Sube todos los archivos de la carpeta `js/` a la carpeta `js/` en tu servidor

### 3. Verificar Permisos
- Asegúrate de que todos los archivos tengan permisos de lectura (644)
- Las carpetas deben tener permisos de ejecución (755)

### 4. Probar el Sitio
1. Visita tu dominio en el navegador
2. Verifica que todos los estilos se carguen correctamente
3. Prueba las funcionalidades principales:
   - Registro/Inicio de sesión
   - Mapa de seguridad
   - Sistema de reservas
   - Chat comunitario
   - Botón de emergencia

## 🌐 Configuración Adicional

### Dominio Personalizado
Si quieres usar un dominio personalizado:
1. Ve a "Dominios" en tu panel de Hostinger
2. Agrega tu dominio personalizado
3. Apunta el DNS a tu hosting
4. Sube los archivos al directorio del nuevo dominio

### SSL/HTTPS
Hostinger incluye certificados SSL gratuitos:
1. Ve a "SSL" en tu panel
2. Activa "Let's Encrypt" para tu dominio
3. El sitio estará disponible en `https://tu-dominio.com`

### Optimización
Para mejorar el rendimiento:
1. Activa la compresión GZIP en el panel de Hostinger
2. Configura caché del navegador
3. Optimiza las imágenes si es necesario

## 🔍 Solución de Problemas

### Si el sitio no carga:
- Verifica que `index.html` esté en la carpeta correcta
- Comprueba los permisos de archivos
- Revisa los logs de error en el panel de Hostinger

### Si los estilos no se cargan:
- Verifica que `styles.css` esté en la misma carpeta que `index.html`
- Comprueba la ruta en el archivo HTML

### Si JavaScript no funciona:
- Verifica que la carpeta `js/` contenga todos los archivos
- Comprueba la consola del navegador para errores
- Asegúrate de que los archivos tengan permisos de lectura

### Si el mapa no se muestra:
- Verifica la conexión a internet
- Comprueba que Leaflet se esté cargando correctamente
- Revisa la consola del navegador para errores de JavaScript

## 📱 Características del Sitio

### ✅ Funcionalidades Implementadas
- **Responsive Design**: Se adapta a móviles, tablets y desktop
- **Sistema de Autenticación**: Registro e inicio de sesión
- **Mapa Interactivo**: Con Leaflet y marcadores personalizados
- **Sistema de Reservas**: Alojamientos verificados con filtros
- **Chat Comunitario**: Por país y ciudad
- **Botón de Emergencia**: Números de emergencia por país
- **Notificaciones**: Sistema de alertas integrado

### 🎨 Diseño
- Paleta de colores Berry/Safety
- Gradientes modernos
- Iconos SVG integrados
- Animaciones suaves
- Tipografía Inter

### 🔒 Seguridad
- Validación de formularios
- Protección de datos
- Encriptación de información sensible
- Verificación de ubicación opcional

## 📞 Soporte

Si tienes problemas con el despliegue:
1. Revisa los logs de error en Hostinger
2. Verifica la consola del navegador
3. Comprueba que todos los archivos estén subidos correctamente
4. Contacta al soporte de Hostinger si es necesario

## 🎉 ¡Listo!

Una vez completados estos pasos, tu sitio BerryTrip estará disponible en tu dominio y funcionando correctamente. 

**¡Disfruta de tu nueva plataforma de viajes seguros para mujeres!** 🌸✈️
