const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('Inicializando base de datos...')

  // Crear salas de chat por defecto
  const defaultChatRooms = [
    { name: 'Madrid, España', country: 'España', city: 'Madrid' },
    { name: 'Barcelona, España', country: 'España', city: 'Barcelona' },
    { name: 'Valencia, España', country: 'España', city: 'Valencia' },
    { name: 'Sevilla, España', country: 'España', city: 'Sevilla' },
    { name: 'París, Francia', country: 'Francia', city: 'París' },
    { name: 'Lyon, Francia', country: 'Francia', city: 'Lyon' },
    { name: 'Roma, Italia', country: 'Italia', city: 'Roma' },
    { name: 'Milán, Italia', country: 'Italia', city: 'Milán' },
    { name: 'Berlín, Alemania', country: 'Alemania', city: 'Berlín' },
    { name: 'Múnich, Alemania', country: 'Alemania', city: 'Múnich' },
    { name: 'Seúl, Corea del Sur', country: 'Corea del Sur', city: 'Seúl' },
    { name: 'Busan, Corea del Sur', country: 'Corea del Sur', city: 'Busan' },
    { name: 'Tokio, Japón', country: 'Japón', city: 'Tokio' },
    { name: 'Osaka, Japón', country: 'Japón', city: 'Osaka' },
    { name: 'Nueva York, Estados Unidos', country: 'Estados Unidos', city: 'Nueva York' },
    { name: 'Los Ángeles, Estados Unidos', country: 'Estados Unidos', city: 'Los Ángeles' },
    { name: 'Ciudad de México, México', country: 'México', city: 'Ciudad de México' },
    { name: 'Guadalajara, México', country: 'México', city: 'Guadalajara' },
    { name: 'Buenos Aires, Argentina', country: 'Argentina', city: 'Buenos Aires' },
    { name: 'São Paulo, Brasil', country: 'Brasil', city: 'São Paulo' }
  ]

  for (const room of defaultChatRooms) {
    try {
      await prisma.chatRoom.upsert({
        where: {
          name: room.name
        },
        update: {},
        create: {
          name: room.name,
          country: room.country,
          city: room.city,
          description: `Sala de chat para mujeres en ${room.name}`
        }
      })
      console.log(`✓ Sala creada: ${room.name}`)
    } catch (error) {
      console.log(`⚠ Sala ya existe: ${room.name}`)
    }
  }

  // Crear usuario administrador por defecto
  try {
    await prisma.user.upsert({
      where: {
        email: 'admin@berrytrip.com'
      },
      update: {},
      create: {
        email: 'admin@berrytrip.com',
        name: 'Administrador BerryTrip',
        password: 'admin123', // En producción, hashear la contraseña
        isAdmin: true,
        isVerified: true,
        documentType: 'admin',
        documentNumber: 'ADMIN001',
        country: 'ES'
      }
    })
    console.log('✓ Usuario administrador creado')
  } catch (error) {
    console.log('⚠ Usuario administrador ya existe')
  }

  console.log('✅ Base de datos inicializada correctamente')
}

main()
  .catch((e) => {
    console.error('❌ Error inicializando base de datos:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

