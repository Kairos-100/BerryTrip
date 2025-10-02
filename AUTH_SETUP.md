# Sistema de Autenticación - BerryTrip

## ✅ Funcionalidades Implementadas

### 🔐 Autenticación Completa
- **Registro de usuarios** con email y contraseña
- **Login** con validación de credenciales
- **Almacenamiento seguro** de contraseñas (hash con bcrypt)
- **Tokens JWT** para sesiones seguras
- **Recuperación de contraseña** por email

### 📧 Sistema de Email
- **Emails de bienvenida** automáticos al registrarse
- **Recuperación de contraseña** con enlaces seguros
- **Templates HTML** profesionales para emails

### 🗄️ Base de Datos
- **Almacenamiento en memoria** (para desarrollo)
- **Modelo de usuario** completo con intereses y ubicación
- **Tokens de recuperación** con expiración automática

## 🚀 Configuración

### 1. Variables de Entorno
Crea un archivo `.env.local` en la raíz del proyecto con:

```env
# JWT Secret (¡cambia esto en producción!)
JWT_SECRET=tu-clave-secreta-super-segura

# Configuración de email
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-contraseña-de-aplicacion

# URL base de tu aplicación
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 2. Configurar Gmail para Envío de Emails

1. **Habilita la verificación en 2 pasos** en tu cuenta de Google
2. **Genera una contraseña de aplicación**:
   - Ve a tu cuenta de Google → Seguridad
   - Busca "Contraseñas de aplicaciones"
   - Genera una nueva contraseña para "Mail"
   - Usa esa contraseña en `EMAIL_PASS`

### 3. Instalar Dependencias
```bash
npm install
```

## 📁 Archivos Creados/Modificados

### Nuevos Archivos
- `lib/database.ts` - Base de datos en memoria
- `lib/auth.ts` - Utilidades de autenticación
- `lib/email.ts` - Servicio de envío de emails
- `pages/api/auth/register.ts` - API de registro
- `pages/api/auth/login.ts` - API de login
- `pages/api/auth/forgot-password.ts` - API de recuperación
- `pages/api/auth/reset-password.ts` - API de reset de contraseña
- `pages/api/auth/verify-token.ts` - API de verificación de token
- `pages/forgot-password.tsx` - Página de recuperación
- `pages/reset-password.tsx` - Página de reset
- `hooks/useAuth.ts` - Hook de autenticación
- `env.example` - Ejemplo de variables de entorno

### Archivos Modificados
- `components/AuthModal.tsx` - Integrado con APIs reales
- `pages/signup.tsx` - Integrado con API de registro

## 🔄 Flujo de Autenticación

### Registro
1. Usuario completa formulario en `/signup`
2. Se valida la información
3. Se hashea la contraseña con bcrypt
4. Se crea el usuario en la base de datos
5. Se envía email de bienvenida
6. Se genera token JWT y se loguea automáticamente

### Login
1. Usuario ingresa credenciales en AuthModal
2. Se valida email y contraseña
3. Se genera token JWT
4. Se almacena en localStorage

### Recuperación de Contraseña
1. Usuario hace clic en "Forgot password?" en AuthModal
2. Se redirige a `/forgot-password`
3. Ingresa su email
4. Se genera token de recuperación (expira en 1 hora)
5. Se envía email con enlace de reset
6. Usuario hace clic en enlace → `/reset-password?token=...`
7. Ingresa nueva contraseña
8. Se actualiza la contraseña y se loguea automáticamente

## 🛡️ Seguridad

- **Contraseñas hasheadas** con bcrypt (12 rounds)
- **Tokens JWT** con expiración (7 días)
- **Tokens de recuperación** con expiración (1 hora)
- **Validación de email** con regex
- **CORS configurado** correctamente
- **Manejo de errores** sin exponer información sensible

## 🚀 Uso en Producción

### Para Producción Recomendado:
1. **Cambiar a base de datos real** (PostgreSQL, MongoDB, etc.)
2. **Usar variables de entorno seguras**
3. **Configurar HTTPS**
4. **Implementar rate limiting**
5. **Agregar logging y monitoreo**

### Migración a Base de Datos Real:
```typescript
// Ejemplo con PostgreSQL
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

// Reemplazar las funciones en lib/database.ts
export const db = {
  users: {
    create: async (userData) => {
      const result = await pool.query(
        'INSERT INTO users (first_name, last_name, email, password, location, interests, verified) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [userData.firstName, userData.lastName, userData.email, userData.password, userData.location, JSON.stringify(userData.interests), userData.verified]
      )
      return result.rows[0]
    },
    // ... resto de funciones
  }
}
```

## 🧪 Testing

Para probar el sistema:

1. **Registro**: Ve a `/signup` y crea una cuenta
2. **Login**: Usa el AuthModal para loguearte
3. **Recuperación**: Haz clic en "Forgot password?" y sigue el flujo
4. **Verificación**: Los datos se almacenan en memoria y persisten durante la sesión del servidor

## 📞 Soporte

Si tienes problemas:
1. Verifica que las variables de entorno estén configuradas
2. Revisa la consola del navegador para errores
3. Verifica que el servidor esté corriendo (`npm run dev`)
4. Comprueba que Gmail esté configurado correctamente

¡El sistema está listo para usar! 🎉
