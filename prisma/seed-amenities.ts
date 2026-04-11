import { PrismaClient } from '../app/generated/prisma/client/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config(); // Fallback

const connectionString = `${process.env.POSTGRES_PRISMA_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool as never);
const prisma = new PrismaClient({ adapter });

async function main() {
  const amenities = [
    { name: 'WiFi' },
    { name: 'TV' },
    { name: 'Air Conditioning (AC)' },
    { name: 'Mini Bar' },
    { name: 'Swimming Pool' },
    { name: 'Gym / Fitness Center' },
    { name: 'Spa & Massage' },
    { name: 'Free Breakfast' },
    { name: 'Free Parking' },
    { name: '24/7 Room Service' },
  ];

  console.log('Seeding 10 amenities...');

  for (const amenity of amenities) {
    await prisma.amenities.create({
      data: amenity,
    });
  }

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
