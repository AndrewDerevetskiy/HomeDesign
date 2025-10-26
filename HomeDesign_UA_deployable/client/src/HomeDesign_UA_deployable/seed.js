
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
dotenv.config();
const MONGO = process.env.MONGO_URI;
if(!MONGO){ console.error('MONGO_URI not set'); process.exit(1); }
async function seed(){
  await mongoose.connect(MONGO);
  const count = await Product.countDocuments();
  if(count === 0){
    const items = [
      { name: 'Обідній стіл Oak', price: 12000, category:'Меблі', description: 'Стіл з масиву дуба 160x90 см', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80' },
      { name: 'Кутовий диван Cozy', price: 45000, category:'Меблі', description: 'Кутовий диван з м\'якою оббивкою', image: 'https://images.unsplash.com/photo-1582582494700-7f3c8e3a1fef?w=1200&q=80' },
      { name: 'Шафа Classic', price: 22000, category:'Меблі', description: 'Шафа з трьома дверима', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80' },
      { name: 'Керамічна плитка Nordic', price: 800, category:'Плитка', description: 'Плитка 60x60 см', image: 'https://images.unsplash.com/photo-1586201375761-83865001e0f2?w=1200&q=80' },
      { name: 'Шпалери Floral', price: 450, category:'Шпалери', description: 'Вінілові шпалери, квітковий орнамент', image: 'https://images.unsplash.com/photo-1505691723518-36a73a1f0b2f?w=1200&q=80' }
    ];
    await Product.insertMany(items);
    console.log('Seeded products');
  } else {
    console.log('Products exist, skipping');
  }
  process.exit(0);
}
seed().catch(e=>{ console.error(e); process.exit(1); });
