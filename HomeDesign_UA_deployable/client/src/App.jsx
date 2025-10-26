
import React, { useState } from 'react'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Designer from './pages/Designer'

export default function App(){
  const [route,setRoute] = useState('home');
  const nav = (r)=> setRoute(r);
  return (<div>
    <header className="header">
      <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{display:'flex',alignItems:'center',gap:20}}><div className="logo">FURNITURE</div>
          <nav><button onClick={()=>nav('home')}>Головна</button> <button onClick={()=>nav('catalog')}>Каталог</button></nav>
        </div>
        <div><button className="cta" onClick={()=>nav('designer')}>3D Дизайнер</button></div>
      </div>
    </header>
    <main>
      {route==='home' && <Home/>}
      {route==='catalog' && <Catalog/>}
      {route==='designer' && <Designer/>}
    </main>
    <footer className="footer">© HomeDesign — демо</footer>
  </div>)
}
