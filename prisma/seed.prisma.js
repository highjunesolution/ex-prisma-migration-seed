const prisma = require("./prisma");

const users = [
  {
    fname: "Jirayu",
    lname: "Suriwan",
    email: "demo@example.com",
  },
  {
    fname: "Steven",
    lname: "Gerrard",
    email: "steven@liver.com",
  },
];

async function main() {
  console.log("Seeding...");

  await Promise.all(
    users.map((user) =>
      prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: user,
      }),
    ),
  );

  console.log("Seed completed");
}

main()
  .catch((error) => {
    console.error(error.message);
    console.error("Seed Error");
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
