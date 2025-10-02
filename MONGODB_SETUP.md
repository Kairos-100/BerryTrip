# 🗄️ Configuración de MongoDB Atlas para BerryTrip

## 🚀 Configuración de MongoDB Atlas (Gratuito)

### Paso 1: Crear Cuenta en MongoDB Atlas

1. **Ve a [MongoDB Atlas](https://www.mongodb.com/atlas)**
2. **Crea una cuenta gratuita** (si no tienes una)
3. **Verifica tu email**

### Paso 2: Crear un Cluster

1. **Clic en "Build a Database"**
2. **Selecciona "FREE" (M0 Sandbox)**
3. **Selecciona tu región** (recomendado: más cercana a tus usuarios)
4. **Nombre del cluster**: `berrytrip-cluster` (o el que prefieras)
5. **Clic en "Create"**

### Paso 3: Configurar Acceso a la Base de Datos

1. **Crear usuario de base de datos**:
   - Username: `berrytrip-user` (o el que prefieras)
   - Password: Genera una contraseña segura (guárdala)
   - Clic en "Create User"

2. **Configurar acceso de red**:
   - Clic en "Network Access"
   - Clic en "Add IP Address"
   - Selecciona "Allow access from anywhere" (0.0.0.0/0)
   - Clic en "Confirm"

### Paso 4: Obtener String de Conexión

1. **Clic en "Connect" en tu cluster**
2. **Selecciona "Connect your application"**
3. **Driver**: Node.js
4. **Version**: 4.1 or later
5. **Copia el connection string** que se ve así:
   ```
   mongodb+srv://berrytrip-user:<password>@berrytrip-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Paso 5: Configurar Variables de Entorno

Crea un archivo `.env.local` en tu proyecto:

```env
# MongoDB Atlas
MONGODB_URI=mongodb+srv://berrytrip-user:TU_PASSWORD@berrytrip-cluster.xxxxx.mongodb.net/berrytrip?retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=berrytrip-super-secret-jwt-key-2024

# Email (Gmail)
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-contraseña-de-aplicacion-gmail

# URL de tu aplicación
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**⚠️ Importante**: Reemplaza `<password>` con la contraseña real del usuario de la base de datos.

## 🔧 Configuración para Vercel

### Variables de Entorno en Vercel

1. **Ve a tu proyecto en Vercel**
2. **Settings → Environment Variables**
3. **Agrega estas variables**:

```env
MONGODB_URI=mongodb+srv://berrytrip-user:TU_PASSWORD@berrytrip-cluster.xxxxx.mongodb.net/berrytrip?retryWrites=true&w=majority
JWT_SECRET=berrytrip-super-secret-jwt-key-2024
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-contraseña-de-aplicacion-gmail
NEXT_PUBLIC_BASE_URL=https://tu-dominio.vercel.app
```

## 🧪 Probar la Conexión

### Localmente

1. **Ejecuta el proyecto**:
   ```bash
   npm run dev
   ```

2. **Ve a la consola** y deberías ver:
   ```
   🗄️  Using MongoDB database
   ```

3. **Prueba el registro**:
   - Ve a `/signup`
   - Crea una cuenta
   - Verifica que se guarde en MongoDB Atlas

### En MongoDB Atlas

1. **Ve a tu cluster en MongoDB Atlas**
2. **Clic en "Browse Collections"**
3. **Deberías ver**:
   - `users` collection con tus usuarios registrados
   - `passwordresettokens` collection (cuando uses recuperación de contraseña)
   - `messages` collection (mensajes del chat)

## 📊 Estructura de la Base de Datos

### Collection: `users`
```json
{
  "_id": "ObjectId",
  "firstName": "María",
  "lastName": "García",
  "email": "maria@example.com",
  "password": "$2a$12$...", // Hashed
  "location": "Madrid, España",
  "interests": ["solo-travel", "safety"],
  "verified": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Collection: `passwordresettokens`
```json
{
  "_id": "ObjectId",
  "email": "maria@example.com",
  "token": "abc123...",
  "expiresAt": "2024-01-01T01:00:00.000Z",
  "used": false,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### Collection: `messages`
```json
{
  "_id": "ObjectId",
  "message": "Hola, ¿alguien más viajando a París?",
  "username": "María",
  "room": "global",
  "device": {
    "isMobile": true,
    "userAgent": "Mozilla/5.0..."
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## 🛡️ Seguridad

### Configuración de Seguridad Recomendada

1. **Contraseñas fuertes** para usuarios de base de datos
2. **IP Whitelist** específica (no 0.0.0.0/0 en producción)
3. **Rotación regular** de contraseñas
4. **Monitoreo** de acceso a la base de datos

### Backup Automático

MongoDB Atlas incluye:
- **Backups automáticos** cada 6 horas
- **Retención de 2 días** en el plan gratuito
- **Point-in-time recovery** disponible

## 🚨 Solución de Problemas

### Error de Conexión

```bash
MongoNetworkError: failed to connect to server
```

**Solución**:
1. Verifica que la IP esté en la whitelist
2. Verifica el string de conexión
3. Verifica que el usuario tenga permisos

### Error de Autenticación

```bash
MongoServerError: Authentication failed
```

**Solución**:
1. Verifica username y password
2. Verifica que el usuario tenga permisos de lectura/escritura

### Error de Timeout

```bash
MongoTimeoutError: Server selection timed out
```

**Solución**:
1. Verifica la conectividad de red
2. Verifica que el cluster esté activo
3. Verifica la región del cluster

## 📈 Escalabilidad

### Plan Gratuito (M0)
- **512 MB** de almacenamiento
- **Conectividad compartida**
- **Hasta 100 conexiones**

### Planes de Pago
- **Más almacenamiento**
- **Conectividad dedicada**
- **Más conexiones**
- **Backups más largos**

## 🎯 Próximos Pasos

1. **Configurar MongoDB Atlas** siguiendo esta guía
2. **Probar localmente** con `.env.local`
3. **Configurar variables en Vercel**
4. **Desplegar y probar** en producción
5. **Monitorear** el uso de la base de datos

¡Tu aplicación ahora tendrá una base de datos persistente y escalable! 🎉
