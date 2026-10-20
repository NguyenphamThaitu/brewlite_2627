import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  if ((await prisma.product.count()) === 0) {
    await prisma.product.createMany({
      data: [
        {
          name: 'Cà phê sữa',
          price: 35000,
          imageUrl: 'https://picsum.photos/seed/caphesua/400/300',
        },
        {
          name: 'Americano',
          price: 40000,
          imageUrl: 'https://picsum.photos/seed/americano/400/300',
        },
        {
          name: 'Cappuccino',
          price: 45000,
          imageUrl: 'https://picsum.photos/seed/cappuccino/400/300',
        },
        {
          name: 'Trà đào',
          price: 39000,
          imageUrl: 'https://picsum.photos/seed/tradao/400/300',
        },
      ],
    });
  }
  await prisma.promotion.upsert({
    where: { code: 'BREW10' },
    update: {},
    create: { code: 'BREW10', percent: 10 },
  });
}

main().finally(() => prisma.$disconnect());
