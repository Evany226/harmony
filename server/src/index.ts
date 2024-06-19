// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(cors);
// app.use(express.json());

// const PORT = process.env.PORT || 3001;

// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
      posts: {
        create: {
          title: "Hello World",
        },
      },
    },
  });
  console.log("Created new user: ", newUser);

  const allUsers = await prisma.user.findMany({
    include: { posts: true },
  });
  console.log("All users: ");
  console.dir(allUsers, { depth: null });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
