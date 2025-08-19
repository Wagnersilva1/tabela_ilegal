// app.js (module) — Visualização 3D real com Three.js
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// ===== Dados =====
const categories = ['Todas', 'Armas e Lavagem', 'Munição e Desmanche'];

// Coloque 'model' (URL .glb/.gltf) para um 3D real da arma.
// Se não houver 'model', usamos um modelo 3D “blocado” + decal com a imagem (opcional).
// --- SUBSTITUA SOMENTE O ARRAY `items` NO app.js ---
// Obs.: coloque os arquivos .glb dentro de uma pasta "models/" na mesma raiz do index.html.
// (ex.: models/assault_rifle_g36.glb, models/smg_mpx.glb, etc.)

const items = [
  // ========== ARMAS E LAVAGEM ==========
  { name: 'Lavagem', category: 'Armas e Lavagem', with: 20000, without: 30000, icon: 'wash',
    model: 'models/bitcoin-_lowpoly.glb' },

  { name: 'G36', category: 'Armas e Lavagem',  with: 600000, without: 720000, icon: 'rifle',
    img: 'https://i.ibb.co/bB3jzBy/image-removebg-preview-8.png',
    model: 'models/hs_produkt_vhs-2_rifle.glb' },
    
  { name: 'RAM 7', category: 'Armas e Lavagem', with: 400000, without: 480000, icon: 'rifle',
    model: 'models/low-poly_tavor_tar-21.glb' },

{ name: 'MPX', category: 'Armas e Lavagem',with: 250000, without: 300000, icon: 'smg',
  model: 'models/sig_sauer_mpx (1).glb',
  scale: 0.09,     // tente 0.02 (ou 0.01 ~ 0.05 até ficar perfeito)
  rotY: Math.PI/2, // (opcional) gira 90° se precisar
  y: -0.5          // (opcional) ajusta altura
},


  { name: 'SCARH', category: 'Armas e Lavagem', with: 200000, without: 240000, icon: 'rifle',
    model: 'models/scarh.glb' },

  { name: 'MTAR-21', category: 'Armas e Lavagem', with: 175000, without: 210000, icon: 'smg',
    model: 'models/tar-21_assault_rifle.glb' },

  { name: 'MP9', category: 'Armas e Lavagem', with: 150000, without: 180000, icon: 'smg',
    model: 'models/tpm_smg.glb' },

  { name: 'TEC-9', category: 'Armas e Lavagem', with: 125000, without: 150000, icon: 'smg',
    model: 'models/tec-9.glb' },

  { name: 'GLOCK', category: 'Armas e Lavagem', with: 100000, without: 120000, icon: 'pistol',
    model: 'models/glock_17_gen_5.glb' },

  { name: 'FIVE', category: 'Armas e Lavagem', with: 75000, without: 90000, icon: 'pistol',
    model: 'models/five_seven.glb' },

  { name: 'COLETE', category: 'Armas e Lavagem', with: 62000, without: 74400, icon: 'vest',
    model: 'models/colete_aprova_de_balas.glb' },

  { name: 'CAPUZ', category: 'Armas e Lavagem', with: 50000, without: 60000, icon: 'mask',
    model: 'models/trash_bag.glb' },

  { name: 'C4', category: 'Armas e Lavagem', with: 50000, without: 60000, icon: 'c4',
    model: 'models/simple_c4-_bomb.glb' },

  { name: 'KNUCKLE', category: 'Armas e Lavagem', with: 125000, without: 150000, icon: 'melee',
    model: 'models/brass_and_steel_knuckles.glb' },

  { name: 'ALGEMAS', category: 'Armas e Lavagem', with: 50000, without: 60000, icon: 'cuff',
    model: 'models/algemas.glb' },

  { name: 'BLACK LIST', category: 'Armas e Lavagem', with: 600000, without: 720000, icon: 'star',
    model: 'models/blacklist_doc.glb' },

  { name: 'COLETE PREMIUM', category: 'Armas e Lavagem', with: 100000, without: 120000, icon: 'vest',
    model: 'models/colete_2.glb' },

  { name: 'NIGHTSTICK', category: 'Armas e Lavagem', with: 125000, without: 150000, icon: 'baton',
    model: 'models/nightstick.glb' },

  { name: 'MOCHILA', category: 'Armas e Lavagem', with: 50000, without: 60000, icon: 'bag',
    model: 'models/metaretail_mochila_mu_nich_amarilla_2.glb' },

  { name: 'MOCHILA X', category: 'Armas e Lavagem', with: 100000, without: 120000, icon: 'bag',

      model: 'models/mochila_militar.glb' },

  { name: 'KIT SEQUESTRO', category: 'Armas e Lavagem', with: 100000, without: 120000, icon: 'kit',
    model: 'models/caixa_cartoon.glb' },

  { name: 'BOOTLE', category: 'Armas e Lavagem', with: 125000, without: 150000, icon: 'bottle',
    model: 'models/bottle.glb' },

  // ========== MUNIÇÃO E DESMANCHE ==========
  { name: 'Munição de G36', category: 'Munição e Desmanche',with: 2500, without: 3000, icon: 'ammo',
    model: 'models/a_bunch_of_ammo_magazines.glb' },

  { name: 'Munição RAM7', category: 'Munição e Desmanche',with: 2000, without: 2400, icon: 'ammo',
    model: 'models/ammo_762.glba_bunch_of_ammo_magazines.glb' },

  { name: 'Munição de MPX', category: 'Munição e Desmanche', with: 1250, without: 1500, icon: 'ammo',
    model: 'models/a_bunch_of_ammo_magazines.glb' },

  { name: 'Munição de SCARH', category: 'Munição e Desmanche', with: 1000, without: 1200, icon: 'ammo',
    model: 'models/a_bunch_of_ammo_magazines.glb' },

  { name: 'Munição de MTAR-21', category: 'Munição e Desmanche', with: 875, without: 1050, icon: 'ammo',
    model: 'models/a_bunch_of_ammo_magazines.glb' },

  { name: 'Munição de MP9', category: 'Munição e Desmanche', with: 750, without: 900, icon: 'ammo',
    model: 'models/a_bunch_of_ammo_magazines.glb' },

  { name: 'Munição de TEC-9', category: 'Munição e Desmanche', with: 625, without: 750, icon: 'ammo',
    model: 'models/a_bunch_of_ammo_magazines.glb' },

  { name: 'Munição de GLOCK', category: 'Munição e Desmanche', with: 500, without: 600, icon: 'ammo',
    model: 'models/a_bunch_of_ammo_magazines.glb' },

  { name: 'Munição de FIVE', category: 'Munição e Desmanche', with: 375, without: 450, icon: 'ammo',
    model: 'models/a_bunch_of_ammo_magazines.glb' },

  { name: 'LOCKPICK', category: 'Munição e Desmanche', with: 50000, without: 60000, icon: 'lockpick',
    model: 'models/lockpick.glb' },

  { name: 'ERVA', category: 'Munição e Desmanche', with: 5000, without: 6000, icon: 'leaf',
    model: 'models/i_kea_clusia_planta.glb' },

  { name: 'KNIFE', category: 'Munição e Desmanche', with: 125000, without: 150000, icon: 'knife',
    model: 'models/faca.glb' },

  { name: 'FARINHA', category: 'Munição e Desmanche', with: 5000, without: 6000, icon: 'powder',
    model: 'models/pote_remedios.glb' },

  { name: 'BAT', category: 'Munição e Desmanche', with: 125000, without: 150000, icon: 'bat',
    model: 'models/baseball_bat.glb' },

  { name: 'CRISTAL', category: 'Munição e Desmanche', with: 5000, without: 6000, icon: 'crystal',
    model: 'models/cristal.glb' },

  { name: 'HATCHET', category: 'Munição e Desmanche', with: 125000, without: 150000, icon: 'axe',
    model: 'models/hatchet.glb' },

  { name: 'BAÚ-500', category: 'Munição e Desmanche', with: 8000000, without: 9600000, icon: 'box',
    model: 'models/caminhao_volvo_fh12.glb' },

  { name: 'BAÚ-1000', category: 'Munição e Desmanche', with: 8000000, without: 9600000, icon: 'box',
    model: 'models/caminhao_generico_kenworth.glb' },

  { name: 'BAÚ-1500', category: 'Munição e Desmanche', with: 8000000, without: 9600000, icon: 'box',
    model: 'models/caminhao_generico_peterbild_com_tanque.glb' },
  { name: 'DESMANCHE', category: 'Munição e Desmanche', with: "30%", without: "40%", icon: 'box',
    model: 'models/destroyed_car_07_raw_scan.glb' },
];


// ===== Estado/UI helpers =====
let currentCategory = 'Todas';
let selectedIndex = -1;
const player = { level: 0, levelMax: 8, exp: 0, expPerLevel: 700 };
const inventory = { Ferro: 1, Mola: 1 };

const $ = (sel) => document.querySelector(sel);
const brl = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// (Só para miniaturas caso não tenha imagem)
function iconSVG(kind) {
  const color = '#a7e3ff';
  switch(kind) {
    case 'rifle': return `<svg viewBox="0 0 64 32" xmlns="http://www.w3.org/2000/svg"><g fill="${color}" opacity=".9"><rect x="3" y="12" width="40" height="6" rx="2"/><rect x="42" y="13" width="19" height="5" rx="2"/><rect x="23" y="18" width="8" height="10" rx="2"/></g></svg>`;
    case 'smg': return `<svg viewBox="0 0 64 32" xmlns="http://www.w3.org/2000/svg"><g fill="${color}" opacity=".9"><rect x="6" y="12" width="30" height="6" rx="2"/><rect x="36" y="13" width="16" height="5" rx="2"/><rect x="24" y="18" width="6" height="10" rx="2"/></g></svg>`;
    case 'pistol': return `<svg viewBox="0 0 64 32" xmlns="http://www.w3.org/2000/svg"><g fill="${color}" opacity=".9"><rect x="8" y="12" width="24" height="6" rx="2"/><rect x="32" y="13" width="12" height="5" rx="2"/><rect x="24" y="18" width="6" height="10" rx="2"/></g></svg>`;
    default: return `<svg viewBox="0 0 64 32" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="16" r="10" fill="${color}"/></svg>`;
  }
}
function thumbHTML(itm) { return itm.img ? `<img class="thumb-img" src="${itm.img}" alt="${itm.name}">` : iconSVG(itm.icon); }

// ===== UI render =====
function renderCategories() {
  const bar = $('#categoryBar');
  bar.innerHTML = '';

  categories.forEach(c => {
    const el = document.createElement('div');
    el.className = 'chip' + (c === currentCategory ? ' active' : '');
    el.textContent = c;
    el.onclick = () => {
      currentCategory = c;
      selectedIndex = -1;
      renderCategories();   // <— Re-renderiza os chips para aplicar/remover .active
      renderList();
      renderDetails();
    };
    bar.appendChild(el);
  });
}

function renderList() {
  const list = $('#itemList'); list.innerHTML = '';
  const filtered = items.filter(i => currentCategory === 'Todas' || i.category === currentCategory);
  filtered.forEach((itm) => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
      <div class="thumb">${thumbHTML(itm)}</div>
      <div class="meta">
        <h4>${itm.name}</h4>
        <div class="badges">
          <span class="badge">Com: ${brl(itm.with)}</span>
          <span class="badge">Sem: ${brl(itm.without)}</span>
        </div>
      </div>`;
    card.onclick = () => { selectedIndex = items.indexOf(itm); renderDetails(); highlightSelected(list, itm); };
    list.appendChild(card);
  });
}
function highlightSelected(list, itm) {
  [...list.children].forEach(el => el.classList.remove('active'));
  const nodes = [...list.querySelectorAll('h4')];
  const match = nodes.find(n => n.textContent === itm.name);
  if (match) match.closest('.item-card').classList.add('active');
}
function reqIcon(name) {
  if (name === 'Ferro') return `<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path fill='%23a7e3ff' d='M3 16l6-10h6l6 10z'/></svg>`;
  if (name === 'Mola')  return `<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path fill='none' stroke='%23a7e3ff' stroke-width='2' d='M5 7c4-4 10 4 14 0M5 12c4-4 10 4 14 0M5 17c4-4 10 4 14 0'/></svg>`;
  return `<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><circle cx='12' cy='12' r='8' fill='%23a7e3ff'/></svg>`;
}

function renderDetails() {
  const title = $('#detailTitle');
  const preview = $('#preview');
  const productName = $('#productName');
  const priceWith = $('#priceWith');
  const priceWithout = $('#priceWithout');
  const reqGrid = $('#reqGrid');

  if (selectedIndex === -1) {
    title.textContent = 'Selecione um item';
    preview.innerHTML = `<div class="placeholder">Escolha um item na lista ao lado</div>`;
    productName.textContent = '—';
    priceWith.textContent = '—';
    priceWithout.textContent = '—';
    reqGrid.innerHTML = '';
    disposeViewer();
    return;
  }

  const itm = items[selectedIndex];
  title.textContent = itm.name;
  productName.textContent = itm.name;
  priceWith.textContent = brl(itm.with);
  priceWithout.textContent = brl(itm.without);

  preview.innerHTML = `<canvas id="glcanvas"></canvas>`;
  build3DViewer(document.getElementById('glcanvas'), itm);

  const reqs = { '': 0, '': 0 };
  reqGrid.innerHTML = '';
  Object.entries(reqs).forEach(([mat, qty]) => {
    const have = inventory[mat] || 0;
    const el = document.createElement('div'); el.className = 'req';
    el.innerHTML = `<div class="icon">${reqIcon(mat)}</div><div class="txt"><b>${mat}</b><small>${have}/${qty}</small></div>`;
    reqGrid.appendChild(el);
  });
}

// ===== Three.js Viewer =====
let viewer = null;

function disposeViewer() {
  if (!viewer) return;
  cancelAnimationFrame(viewer._raf);
  viewer.controls.dispose();
  viewer.renderer.dispose();
  viewer.scene.traverse(obj => {
    if (obj.isMesh) {
      obj.geometry?.dispose?.();
      if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose?.());
      else obj.material?.dispose?.();
    }
  });
  viewer.canvas.replaceWith(viewer.canvas.cloneNode()); // remove events
  viewer = null;
}

function build3DViewer(canvas, item) {
  disposeViewer();

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0.6, 5);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.minDistance = 1.5;
  controls.maxDistance = 10;
  controls.enablePan = false;

  const amb = new THREE.AmbientLight(0xffffff, 0.5); scene.add(amb);
  const dir1 = new THREE.DirectionalLight(0xffffff, 1.1); dir1.position.set(2, 3, 4); scene.add(dir1);
  const dir2 = new THREE.DirectionalLight(0xffffff, 0.6); dir2.position.set(-2, 2, -3); scene.add(dir2);

  const circle = new THREE.Mesh(new THREE.CircleGeometry(1.6, 64), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.25 }));
  circle.rotation.x = -Math.PI/2; circle.position.y = -0.6; scene.add(circle);

  const root = new THREE.Group(); scene.add(root);
  const loader = new GLTFLoader();

  function buildPrimitiveGun(kind) {
    const group = new THREE.Group();
    const metal = new THREE.MeshStandardMaterial({ color: 0x8aa0b2, metalness: 0.85, roughness: 0.35 });
    const gripMat = new THREE.MeshStandardMaterial({ color: 0x222831, metalness: 0.4, roughness: 0.8 });

    const body = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.35, 0.28), metal);
    body.position.set(0, 0, 0); group.add(body);

    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.2, 24), metal);
    barrel.rotation.z = Math.PI/2; barrel.position.set(1.4, 0.04, 0); group.add(barrel);

    const stock = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.28, 0.28), metal);
    stock.position.set(-1.3, 0, 0); group.add(stock);

    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.5, 0.22), gripMat);
    handle.position.set(-0.2, -0.25, 0); handle.rotation.z = -0.35; group.add(handle);

    const mag = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.6, 0.2), metal);
    mag.position.set(0.2, -0.35, 0.02); mag.rotation.z = 0.3; group.add(mag);

    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.05, 0.22), metal);
    rail.position.set(0.3, 0.23, 0); group.add(rail);

    if (kind === 'pistol') {
      barrel.scale.set(0.6, 0.6, 0.6); barrel.position.set(0.6, 0.02, 0);
      stock.visible = false; mag.scale.set(0.8, 0.7, 0.8); rail.visible = false;
      body.scale.set(1.0, 0.35, 0.26); body.position.set(0.2, 0, 0);
    }
    if (kind === 'smg') {
      stock.scale.set(0.6, 0.8, 1); barrel.scale.set(0.9, 0.9, 0.9);
      mag.scale.set(0.8, 1.1, 0.8); body.scale.set(1.2, 0.38, 0.28);
    }
    return group;
  }

  function addImageDecal(obj, url) {
    const tex = new THREE.TextureLoader().load(url);
    tex.colorSpace = THREE.SRGBColorSpace;
    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.9 });
    const w = 0.9, h = 0.28;
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    plane.position.set(0.15, 0.01, 0.15);
    plane.rotation.y = -Math.PI/2;
    obj.add(plane);
  }

  function fitCameraToObject(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    let dist = (maxDim/2) / Math.tan(fov/2);
    dist *= 1.4;
    camera.position.set(center.x + dist, center.y + dist*0.3, center.z + dist);
    camera.lookAt(center);
    controls.target.copy(center);
    controls.update();
  }

  function placeItem(item) {
    while (root.children.length) root.remove(root.children[0]);

    if (item.model) {
      loader.load(item.model, (gltf) => {
        const obj = gltf.scene;
        obj.traverse(n => {
          if (n.isMesh && n.material?.map) n.material.map.colorSpace = THREE.SRGBColorSpace;
        });
        root.add(obj);
        if (item.img) addImageDecal(obj, item.img);
        fitCameraToObject(root);
      }, undefined, (e)=>{
        console.warn('Falha GLB/GLTF, usando primitivo:', e);
        const primitive = buildPrimitiveGun(item.icon);
        root.add(primitive);
        if (item.img) addImageDecal(primitive, item.img);
        fitCameraToObject(root);
      });
    } else {
      const primitive = buildPrimitiveGun(item.icon);
      root.add(primitive);
      if (item.img) addImageDecal(primitive, item.img);
      fitCameraToObject(root);
    }
  }

  function resize() {
    const parent = renderer.domElement.parentElement;
    const w = parent.clientWidth;
    const h = Math.max(parent.clientHeight, 360);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);

  function animate() {
    viewer._raf = requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  viewer = { renderer, scene, camera, controls, canvas, _raf: 0 };
  resize();
  placeItem(item);
  animate();
}

// ===== Drawer =====
const drawer = $('#drawer');
document.getElementById('queueBtn').addEventListener('click', () => drawer.classList.toggle('open'));
document.addEventListener('keydown', (e)=>{ if (e.key==='Escape') drawer.classList.remove('open'); });

// ===== Init =====
function levelProgress() {
  const ring = document.getElementById('levelRing'), label = document.getElementById('levelLabel'), expToNext = document.getElementById('expToNext');
  const pct = Math.min(1, player.exp / player.expPerLevel);
  ring.style.setProperty('--p', pct*100);
  label.textContent = `${player.level}/${player.levelMax}`;
  expToNext.textContent = Math.max(0, Math.ceil(player.expPerLevel - player.exp));
}

renderCategories(); renderList(); renderDetails(); levelProgress();

