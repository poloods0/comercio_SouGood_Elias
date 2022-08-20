import { Router, Response, Request } from 'express';
import { auth, isAdmin } from '../middlewares/auth';

const SubcategoryController = require('../controllers/subcategoryController');

const subcategoryRouter = Router();

subcategoryRouter.post("/", async (req: Request, res: Response) => {
    try{
      const subcategory = await SubcategoryController.createSubcategory(req.body);
      return res.status(201).send(subcategory);
    } catch (err: any) {
      return res.status(400).send({message: err.message});
    }
  });

subcategoryRouter.get("/", async (req: Request, res: Response) => {
  try {
    const subcategories = await SubcategoryController.getSubcategories();
    return res.status(200).send({subcategories});
  } catch (err:any) {
    return res.status(400).send({error: err.message});
  }
});

subcategoryRouter.get("/:categoryName", async (req: Request, res: Response) => {
  try {
    const subcategories = await SubcategoryController.getSubcategoriesFromCategory(req.params.categoryName);
    return res.status(200).send({subcategories});
  } catch (err:any) {
    return res.status(400).send({error: err.message});
  }
});

subcategoryRouter.delete("/", auth, isAdmin, async (req: Request, res: Response) => {
  try {
    const message = await SubcategoryController.removeSubcategories();
    return res.status(200).send({ message });
  } catch (err:any) {
    return res.status(400).send({error: err.message});
  }
});

module.exports = subcategoryRouter;
