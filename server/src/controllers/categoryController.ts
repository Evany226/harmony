import prisma from "../lib/prisma";
import { Request, Response } from "express"; // Add this import statement

const getCategories = async (req: Request, res: Response) => {
  const guildId = req.params.guildId;

  try {
    const categories = await prisma.category.findMany({
      where: {
        guildId: guildId,
      },
      include: {
        channels: true,
      },
    });

    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

const createCategory = async (req: Request, res: Response) => {
  const { guildId, name } = req.body as { guildId: string; name: string };

  try {
    const newCategory = await prisma.category.create({
      data: {
        name: name,
        guildId: guildId,
      },
      include: {
        channels: true,
      },
    });

    res.json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Failed to create category" });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const { name } = req.body as { name: string };

  try {
    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: { name },
    });

    res.json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Failed to update category" });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;

  try {
    await prisma.category.update({
      where: { id: categoryId },
      data: {
        channels: {
          deleteMany: {},
        },
      },
    });

    const deletedCategory = await prisma.category.delete({
      where: { id: categoryId },
      include: {
        channels: true,
      },
    });

    res.json(deletedCategory);
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Failed to delete category" });
  }
};

export { createCategory, getCategories, updateCategory, deleteCategory };
