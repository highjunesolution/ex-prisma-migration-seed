const prisma = require("./prisma");

const data = [
  {
    id: 1,
    fname: "Jirayu",
    lname: "Suriwan",
    email: "236002-adsmt@ap01.aisingroup.com",
  },
  {
    id: 2,
    fname: "Steven",
    lname: "Gerrard",
    email: "steven@liver.com",
  },
];

console.log("Seeding...");
(async () => {
  try {
    await Promise.all(
      data.map((item) =>
        prisma.user.upsert({
          where: { email: item.email },
          update: {},
          create: {
            fname: item.fname,
            lname: item.lname,
            email: item.email
          }
        }),
      ),
    );

    console.log("Seed completed")
  } catch (error) {
    console.log(error.message)
    console.log("Seed Error")
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
