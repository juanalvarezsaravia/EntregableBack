import { Router } from "express";
// Importamos los métodos del controlador
import {
  getSearchs,
  getSearch,
  createSearch,
  updateSearch,
  deleteSearch,
} from "../../controllers/searches.controller";
import { verifyTokenMiddleware } from "../../middlewares/auth.middleware";
const middlewares = [verifyTokenMiddleware]
// creamos una instancia de Router
const router = Router();
// definimos las rutas usando los metodos del controlador
router.get("/search", middlewares, getSearchs);
router.get("/search/:id", middlewares, getSearch);
router.post("/search", middlewares, createSearch);
router.put("/search/:id", middlewares, updateSearch);
router.delete("/search/:id", middlewares, deleteSearch);

// exportamos el router
export default router;
