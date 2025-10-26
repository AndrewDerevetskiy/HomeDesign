
import axios from 'axios';
const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const api = axios.create({ baseURL: BASE });
export function getProducts(){ return api.get('/api/products').then(r=>r.data); }
export function addProduct(data){ return api.post('/api/products', data).then(r=>r.data); }
export function saveDesign(data){ return api.post('/api/designs', data).then(r=>r.data); }
