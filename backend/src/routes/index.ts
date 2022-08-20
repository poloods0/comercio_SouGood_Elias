import Router from 'express';

const routes = Router();

const userRoutes = require("./user");
const loginRoutes = require("./login");
const categoryRoutes = require("./category");
const subcategoryRoutes = require("./subcategory");
const productRoutes = require("./product");

routes.use("/user", userRoutes);
routes.use("/login", loginRoutes);
routes.use("/category", categoryRoutes);
routes.use("/subcategory", subcategoryRoutes);
routes.use("/product", productRoutes);

export default routes;

