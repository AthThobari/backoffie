import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const PORT = 5000;
const prisma = new PrismaClient();

app.use(express.json());

// Create
app.post("/users", async (req, res, next) => {
  const { name, email, address } = req.body;

  const result = await prisma.users.create({
    data: {
      name: name,
      email: email,
      address: address,
    },
  });
  res.json({
    data: result,
    message: "user created",
  });
});

// Read
app.get("/users", async (req, res) => {
  const result = await prisma.users.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
    },
  });
  res.json({
    data: result,
    message: "user list",
  });
});

// Update
app.patch("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, address } = req.body;

  const result = await prisma.users.update({
    data: {
      name: name,
      email: email,
      address: address,
    },
    where: {
      id: Number(id),
    },
  });
  res.json({
    data: result,
    message: `user ${id} updated`,
  });
});

// Delete
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  const result = await prisma.users.delete({
    where: {
      id: Number(id),
    },
  });
  res.json({ message: `user ${id} deleted` });
});

app.listen(PORT, () => {
  console.log(`Server running in PORT: ${PORT}`);
});
