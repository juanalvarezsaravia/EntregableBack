// Objetivo: Controlador de la biblioteca
import { Request, Response } from "express";
// Importamos el modelo
import ISearch from "../models/search.interface";
import {
  createSearchService,
  getSearchsService,
  getSearchService,
  updateSearchService,
  deleteSearchService,
} from "../services/searches.service";

// Definimos los métodos
export const getSearchs = async (req: Request, res: Response) => {
  const query = req.query;
  const searches: ISearch[] = await getSearchsService(query);
  if (searches.length === 0) {
    return res.status(404).json({ message: "No encontrados" });
  }
  return res.status(200).json(searches);
};

export const getSearch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const search = await getSearchService(id);

  if (!search) {
    return res.status(404).json({ message: "No encontrado" });
  }
  return res.status(200).json(search);
};

export const createSearch = async (req: Request, res: Response) => {
  const body = req.body;
  const search = await createSearchService(body);

  return res.status(201).json({
    message: `Search almacenado correctamente: ${search.username} de ${search.results}`,
  });
};

export const updateSearch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;

  const search = await updateSearchService(id, body);

  if (!search) {
    return res.status(404).json({ message: "Search no encontrado" });
  }

  return res.status(202).json({ message: "Search actualizado correctamente" });
};

export const deleteSearch = async (req: Request, res: Response) => {
  const { id } = req.params;

  const search = await deleteSearchService(id);

  if (!search) {
    return res.status(404).json({ message: "Search no encontrado" });
  }

  return res
    .status(200)
    .json({ message: `Search ${search.results} fue eliminado correctamente` });
};
