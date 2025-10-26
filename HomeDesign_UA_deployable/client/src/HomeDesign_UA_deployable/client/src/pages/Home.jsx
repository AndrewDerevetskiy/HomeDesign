
import React from 'react'
export default function Home(){
  return (<section className="hero">
    <div className="left">
      <h1>Меблі, які дизайнери люблять</h1>
      <p>Обирай меблі, плитку та шпалери. Створи 3D проект своєї кімнати.</p>
      <button className="cta" onClick={()=>window.location.hash='catalog'}>Перейти в каталог</button>
    </div>
    <div className="image" style={{width:420}}><img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80" style={{width:'100%',borderRadius:12}} alt="sofa"/></div>
  </section>)
}
