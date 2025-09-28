# 🚀 BerryTrip en Vercel - Guía de Despliegue

## ✅ **¿Por qué Vercel?**
- **100% GRATIS** para proyectos personales
- **Súper fácil** de usar (5 minutos)
- **Perfecto** para Next.js
- **HTTPS** incluido automáticamente
- **CDN global** (rápido en todo el mundo)
- **Deploy automático** desde GitHub

## 📋 **Pasos para Desplegar en Vercel**

### **Paso 1: Preparar el Proyecto**
```bash
# 1. Instalar dependencias
npm install

# 2. Probar localmente
npm run dev
```

### **Paso 2: Subir a GitHub**
1. **Crear repositorio** en GitHub:
   - Ve a [github.com](https://github.com)
   - Clic en "New repository"
   - Nombre: `berrytrip`
   - Marcar "Public"
   - Clic "Create repository"

2. **Subir código**:
```bash
# Inicializar git (si no está inicializado)
git init

# Agregar archivos
git add .

# Commit inicial
git commit -m "Initial commit - BerryTrip"

# Conectar con GitHub
git remote add origin https://github.com/TU_USUARIO/berrytrip.git

# Subir código
git push -u origin main
```

### **Paso 3: Desplegar en Vercel**
1. **Ir a Vercel**:
   - Ve a [vercel.com](https://vercel.com)
   - Clic "Sign up" (gratis)
   - Conecta con tu cuenta de GitHub

2. **Importar proyecto**:
   - Clic "New Project"
   - Selecciona tu repositorio `berrytrip`
   - Clic "Import"

3. **Configurar proyecto**:
   - **Framework Preset**: Next.js (se detecta automáticamente)
   - **Root Directory**: `./` (raíz del proyecto)
   - **Build Command**: `npm run build` (automático)
   - **Output Directory**: `.next` (automático)

4. **Desplegar**:
   - Clic "Deploy"
   - ¡Espera 2-3 minutos!
   - ¡Tu web estará lista! 🎉

## 🌐 **URL de tu Web**
Después del deploy, tendrás una URL como:
- `https://berrytrip-abc123.vercel.app`
- O puedes configurar un dominio personalizado

## 🔧 **Configuración Adicional**

### **Variables de Entorno (si necesitas)**
En Vercel Dashboard → Settings → Environment Variables:
- `NODE_ENV=production`

### **Dominio Personalizado (opcional)**
1. En Vercel Dashboard → Settings → Domains
2. Agregar tu dominio
3. Configurar DNS en tu proveedor de dominio

## 🚀 **Deploy Automático**
Cada vez que hagas `git push` a GitHub:
- Vercel detectará los cambios automáticamente
- Hará un nuevo deploy automáticamente
- Tu web se actualizará sin hacer nada más

## 📱 **Características Incluidas**
- ✅ **Chat en tiempo real** con Socket.IO
- ✅ **Mapa interactivo** con ubicaciones
- ✅ **Sistema de autenticación**
- ✅ **Botón de emergencia** con números por país
- ✅ **Alojamientos verificados** en Seoul
- ✅ **Responsive design** (móvil y desktop)
- ✅ **HTTPS** automático
- ✅ **CDN global** (rápido en todo el mundo)

## 🆘 **Solución de Problemas**

### **Error de Build**
```bash
# Limpiar cache
rm -rf .next
npm run build
```

### **Error de Socket.IO**
- Verificar que `vercel.json` esté en la raíz
- Verificar que `pages/api/socket.js` existe

### **Error de Dependencias**
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

## 🎯 **¡Listo!**
Tu BerryTrip estará funcionando en Vercel con:
- **URL pública** accesible desde cualquier lugar
- **HTTPS** automático
- **Deploy automático** desde GitHub
- **CDN global** para máxima velocidad

**¡Disfruta tu plataforma de viajes seguros para mujeres! 🌸✈️**
