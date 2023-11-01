import { Schema, model } from "mongoose";



const searchSchema = new Schema({
    username: { type: String, required: true, index: true },
    results: { type: String, required: true, index: true },
    searchTerm: { type: String, index: true },
    timestamp: { type: String, index: true },

})

const Search = model('Search', searchSchema)

export default Search;

