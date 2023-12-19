import fs from 'fs';
import ISearch from '../models/search.interface';
import Search from '../schemas/search.schema';



export const createSearchService = async (search: ISearch) => {
    try {
        const newSearch = new Search(search);

        await newSearch.save();
        return newSearch;

    }
    catch (error) {
        console.log(error);
    }
}

export const getSearchsService = async (query: any) => {
    let filter = {};
    const { username, results, searchTerm, timestamp } = query;
    if (username) filter['username'] = username;
    if (results) filter['results'] = results;
    if (searchTerm) filter['searchTerm'] = searchTerm;
    if (timestamp) filter['timestamp'] = timestamp;


    const searchs: ISearch[] = await Search.find(filter);
    return searchs;
}

export const getSearchService = async (id: string) => {
    const search: ISearch = await Search.findById(id);
    return search;
}

export const updateSearchService = async (id: string, search: ISearch) => {

    const updateSearch: ISearch = await Search.findByIdAndUpdate(id, search, { new: true });
    return updateSearch;
}

export const deleteSearchService = async (id: string) => {
    const deleteSearch: ISearch = await Search.findByIdAndDelete(id);
    return deleteSearch;
}

// quedaria fuera de uso
// definimos la ruta del archivo
const searchesPath = './data/searches.json';
// Definimos los métodos
// se encarga de leer el archivo y retornar la biblioteca al controlador
export const readFile = () => {
    // leemos el archivo
    const searchs: string = fs.readFileSync(searchesPath, 'utf-8');
    // parseamos el archivo a JSON
    const searches: ISearch[] = JSON.parse(searchs);
    return searches;
}

export const writeFile = (data: ISearch[]) => {
    // guardamos el archivo
    fs.writeFileSync(searchesPath, JSON.stringify(data));
}

