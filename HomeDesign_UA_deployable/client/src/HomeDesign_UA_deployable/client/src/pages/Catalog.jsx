
import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function Catalog(){
  const [products,setProducts]=useState([]);
  useEffect(()=>{ axios.get((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/products').then(r=>setProducts(r.data)).catch(()=>setProducts([])); },[]);
  return (<div className="container" style={{paddingTop:20}}>
    <h2 className="section-title">Каталог товарів</h2>
    <div className="grid">{products.map(p=>(<div key={p._id} className="card"><img src={p.image} alt=""/><h4 style={{marginTop:10}}>{p.name}</h4><div style={{color:'#666',marginTop:6}}>{p.description}</div><div style={{marginTop:10,display:'flex',justifyContent:'space-between',alignItems:'center'}}><strong>{p.price} ₴</strong><button className="cta">Купити</button></div></div>))}</div>
  </div>)
}
