// prisma/seed.ts
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Start seeding...");

  // Hapus semua data lama (opsional)
  await prisma.todo.deleteMany();
  console.log("🗑️  Deleted existing todos");

  // Seed todos
  // const todos = await prisma.todo.createMany({
  //   data: [
  //     {
  //       title: "Belajar T3 Stack",
  //       completed: true,
  //     },
  //     {
  //       title: "Buat Todo App dengan tRPC",
  //       completed: true,
  //     },
  //     {
  //       title: "Setup Prisma dengan MySQL",
  //       completed: true,
  //     },
  //     {
  //       title: "Deploy ke Vercel",
  //       completed: false,
  //     },
  //     {
  //       title: "Belajar Next.js App Router",
  //       completed: false,
  //     },
  //     {
  //       title: "Implementasi Authentication dengan NextAuth",
  //       completed: false,
  //     },
  //     {
  //       title: "Buat API dengan tRPC",
  //       completed: true,
  //     },
  //     {
  //       title: "Styling dengan Tailwind CSS",
  //       completed: false,
  //     },
  //     {
  //       title: "Testing dengan Vitest",
  //       completed: false,
  //     },
  //     {
  //       title: "Setup CI/CD Pipeline",
  //       completed: false,
  //     },
  //   ],
  // });

  const products = await prisma.product.createMany({
    data: [
      {
        name: "Laptop Gaming ASUS ROG Strix G16",
        price: 15999000,
      },
      {
        name: "iPhone 15 Pro Max 256GB",
        price: 21999000,
      },
      {
        name: "Samsung Galaxy S24 Ultra",
        price: 18999000,
      },
      {
        name: "MacBook Pro M3 14 inch",
        price: 32999000,
      },
      {
        name: "Sony WH-1000XM5 Headphones",
        price: 5499000,
      },
      {
        name: "iPad Air M2 11 inch",
        price: 9999000,
      },
      {
        name: "Mechanical Keyboard Keychron K8 Pro",
        price: 1299000,
      },
      {
        name: "Logitech MX Master 3S Mouse",
        price: 1599000,
      },
      {
        name: "LG UltraWide Monitor 34 inch",
        price: 7999000,
      },
      {
        name: "Nintendo Switch OLED",
        price: 4999000,
      },
      {
        name: "PlayStation 5 Slim",
        price: 7999000,
      },
      {
        name: "Xbox Series X",
        price: 7499000,
      },
      {
        name: "AirPods Pro 2nd Gen",
        price: 3999000,
      },
      {
        name: "Apple Watch Series 9 GPS",
        price: 6999000,
      },
      {
        name: "GoPro Hero 12 Black",
        price: 6499000,
      },
      {
        name: "Samsung Galaxy Tab S9",
        price: 12999000,
      },
      {
        name: "Dell XPS 15 Laptop",
        price: 28999000,
      },
      {
        name: "Razer DeathAdder V3 Pro",
        price: 2299000,
      },
      {
        name: "SteelSeries Arctis Nova Pro",
        price: 4999000,
      },
      {
        name: "Canon EOS R6 Mark II",
        price: 42999000,
      },
    ],
  });


  console.log(`✅ Created ${products.count} products`);

  // Tampilkan semua products
  const allProducts = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  console.log("\n🛍️  All products:");
  allProducts.forEach((product: any, index: any) => {
    console.log(
      `${index + 1}. ${product.name} - Rp ${Number(product.price).toLocaleString("id-ID")}`
    );
  });

  // Tampilkan semua todos
  const allTodos = await prisma.todo.findMany();
  console.log("\n📋 All todos:");
  allTodos.forEach((todo: any, index: any) => {
    console.log(
      `${index + 1}. [${todo.completed ? "✓" : " "}] ${todo.title}`
    );
  });

  console.log("\n✨ Seeding finished!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });