import { Router, Response, Request } from 'express';
import { auth, isAdmin } from '../middlewares/auth';

const CategoryController = require('../controllers/categoryController');

const categoryRouter = Router();

categoryRouter.post("/", async (req: Request, res: Response) => {
    try{
      const category = await CategoryController.createCategory(req.body);
      return res.status(201).send(category);
    } catch (err: any) {
      return res.status(400).send({message: err.message});
    }
});

categoryRouter.get("/", async (req: Request, res: Response) => {
  try {
    const categories = await CategoryController.getCategories();
    return res.status(200).send({categories});
  } catch (err:any) {
    return res.status(400).send({error: err.message});
  }
});

categoryRouter.delete("/", auth, isAdmin, async (req: Request, res: Response) => {
  try {
    const message = await CategoryController.removeCategories();
    return res.status(200).send({ message });
  } catch (err:any) {
    return res.status(400).send({error: err.message});
  }
});

module.exports = categoryRouter;
