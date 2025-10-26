
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import axios from 'axios';
export default function Designer(){
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const [products,setProducts]=useState([]);
  const objectsRef = useRef([]);

  useEffect(()=>{
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f8f8);
    const camera = new THREE.PerspectiveCamera(45, (mountRef.current?.clientWidth || 800)/480, 0.1, 1000);
    camera.position.set(0,5,8);
    const renderer = new THREE.WebGLRenderer({ antialias:true });
    renderer.setSize(mountRef.current.clientWidth,480);
    mountRef.current.appendChild(renderer.domElement);
    const hemi = new THREE.HemisphereLight(0xffffff,0x444444,1.0); hemi.position.set(0,20,0); scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffffff,0.8); dir.position.set(5,10,7); scene.add(dir);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(20,20), new THREE.MeshStandardMaterial({color:0xffffff})); floor.rotation.x = -Math.PI/2; scene.add(floor);
    const grid = new THREE.GridHelper(20,20,0xcccccc,0xeeeeee); scene.add(grid);
    const wallMat = new THREE.MeshStandardMaterial({color:0xffffff});
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(10,3,0.2), wallMat); backWall.position.set(0,1.5,-5); scene.add(backWall);
    sceneRef.current = { scene, camera, renderer };
    let raf;
    const animate = ()=>{ raf=requestAnimationFrame(animate); renderer.render(scene,camera); };
    animate();
    const onResize = ()=>{ const width=mountRef.current.clientWidth; renderer.setSize(width,480); camera.aspect = width/480; camera.updateProjectionMatrix(); };
    window.addEventListener('resize', onResize);
    return ()=>{ window.removeEventListener('resize', onResize); cancelAnimationFrame(raf); mountRef.current.removeChild(renderer.domElement); renderer.dispose(); };
  },[]);

  useEffect(()=>{ axios.get((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/products').then(r=>setProducts(r.data)).catch(()=>setProducts([])); },[]);

  const placeProduct = (p)=>{
    if(!sceneRef.current) return;
    const { scene } = sceneRef.current;
    const size = Math.max(0.5, Math.min(3, p.price/10000));
    const mat = new THREE.MeshStandardMaterial({ color:0xffffff });
    new THREE.TextureLoader().load(p.image, (tx)=>{ mat.map = tx; mat.needsUpdate = true; const geo = new THREE.BoxGeometry(size,size*0.6,size); const mesh = new THREE.Mesh(geo,mat); mesh.position.set((Math.random()-0.5)*4, size*0.3, (Math.random()-0.5)*2); scene.add(mesh); objectsRef.current.push({ productId:p._id, mesh }); }, undefined, ()=>{ const geo = new THREE.BoxGeometry(size,size*0.6,size); const mesh=new THREE.Mesh(geo,mat); mesh.position.set((Math.random()-0.5)*4,size*0.3,(Math.random()-0.5)*2); scene.add(mesh); objectsRef.current.push({ productId:p._id, mesh }); });
  };

  const nudgeLast = (dx,dz)=>{ const last=objectsRef.current[objectsRef.current.length-1]; if(!last) return; last.mesh.position.x+=dx; last.mesh.position.z+=dz; };
  const clearScene = ()=>{ if(!sceneRef.current) return; const { scene } = sceneRef.current; objectsRef.current.forEach(it=>{ scene.remove(it.mesh); if(it.mesh.geometry) it.mesh.geometry.dispose(); if(it.mesh.material){ if(Array.isArray(it.mesh.material)) it.mesh.material.forEach(m=>m.dispose()); else it.mesh.material.dispose(); } }); objectsRef.current=[]; };
  const saveDesign = async ()=>{
    if(!sceneRef.current) return alert('Немає нічого для збереження');
    const { renderer } = sceneRef.current;
    const dataURL = renderer.domElement.toDataURL('image/jpeg',0.8);
    try{
      const up = await axios.post((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/upload/snapshot', { imageBase64: dataURL });
      const snapshotUrl = up.data.url;
      const body = { title: 'Дизайн ' + new Date().toISOString(), user: 'Demo', products: objectsRef.current.map(it=>({ productId: it.productId, position: it.mesh.position, rotation: it.mesh.rotation, scale: it.mesh.scale })), snapshotUrl };
      await axios.post((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/designs', body);
      alert('Дизайн збережено');
    }catch(e){ console.error(e); alert('Помилка збереження'); }
  };
  return (<div className="container" style={{paddingTop:20}}><h2 className="section-title">3D-конструктор</h2><div style={{display:'flex',gap:16}}><div style={{width:320}}><h3>Товари</h3><div style={{maxHeight:420,overflow:'auto',border:'1px solid #eee',padding:8}}>{products.map(p=>(<div key={p._id} style={{display:'flex',gap:8,alignItems:'center',marginBottom:8}}><img src={p.image} style={{width:64,height:48,objectFit:'cover'}} alt=''/><div style={{flex:1}}><div style={{fontWeight:600}}>{p.name}</div><div style={{color:'#666'}}>{p.price} ₴</div></div><button className='cta' onClick={()=>placeProduct(p)}>Додати</button></div>))}</div><div style={{marginTop:12}}><button className='cta' onClick={()=>nudgeLast(-0.2,0)}>←</button><button className='cta' onClick={()=>nudgeLast(0.2,0)}>→</button><button className='cta' onClick={()=>nudgeLast(0,-0.2)}>↑</button><button className='cta' onClick={()=>nudgeLast(0,0.2)}>↓</button><button className='cta' style={{marginLeft:8}} onClick={clearScene}>Очистити</button></div><div style={{marginTop:12}}><button className='cta' onClick={saveDesign}>Зберегти дизайн</button></div></div><div style={{flex:1}}><div ref={mountRef} style={{width:'100%',height:480,border:'1px solid #ddd',borderRadius:6}}/><p className='muted small'>Демо-версія конструктора — бокси позначають товари.</p></div></div></div>);
}
