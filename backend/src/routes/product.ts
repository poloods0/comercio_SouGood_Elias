import { Router, Response, Request } from 'express';
import { auth, isAdmin} from '../middlewares/auth';
import { AuthRequest } from '../types/auth';
const ProductController = require('../controllers/productController');

const productRouter = Router();

productRouter.post("/", auth, isAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const product = await ProductController.createProduct(req.body);
    return res.status(200).json({message: "success", product});
  } catch (error: any) {
    return res.status(400).json({error: error.message});
  }
});

productRouter.get("/", async (req: AuthRequest, res: Response) => {
  try {
    const products = await ProductController.getProducts();
    return res.status(200).json({message: "success", products});
  } catch (error: any) {
    return res.status(400).json({error: error.message});
  }
});

productRouter.get("/:id", auth, isAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const product = await ProductController.getProduct(id);
    return res.status(200).json({message: "success", product});
  } catch (error: any) {
    return res.status(400).json({error: error.message});
  }
});

productRouter.delete("/:id", auth, isAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await ProductController.deleteProduct(id);
    return res.status(200).json({message: "success"});
  } catch (error: any) {
    return res.status(400).json({error: error.message});
  }
});

module.exports = productRouter;
