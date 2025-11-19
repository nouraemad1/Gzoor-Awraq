const products = [
  {id:1,name:'فيكس الاستوائي',category:'indoor',price:150, img:'https://www.picturethisai.com/image-handle/website_cmsname/image/1080/349647158659973121.jpeg?x-oss-process=image/format,webp/resize,s_300&v=1.0',desc:'نبتة أوراقها كبيرة وتحب الظل الجزئي',care:['ماء مرة كل 7-10 أيام','ضوء غير مباشر','تسميد خفيف كل شهر']},
  {id:2,name:'صبار السعادة',category:'succulent',price:45,img:'https://plantshome.sa/wp-content/uploads/2024/09/%D8%B5%D8%A8%D8%A7%D8%B1-%D8%A8%D9%88%D8%B1%D9%88%D8%AF-%D8%AD%D9%85%D8%B1%D8%A7%D8%A1-2.jpg',desc:'صبار صغير سهل العناية مناسب للمكاتب',care:['ماء خفيف كل 2-3 أسابيع','ضوء كامل']},
  {id:3,name:'أوركيد وردي',category:'indoor',price:220,img:'https://cdn.salla.sa/EZYlr/0T5VfKZe2Dwls0smKAu7bfcbNsOj3eYr8nuPDsX6.jpg',desc:'أوركيد أنيق يحتاج عناية خاصة',care:['ماء مرة أسبوعيا','ضوء ساطع لكن غير مباشر','تسميد خاص بالأوركيد']},
  {id:4,name:'نعناع حديقة',category:'outdoor',price:35,img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Mint-leaves-2007.jpg/1200px-Mint-leaves-2007.jpg',desc:'نبتة عطرية سهلة النمو في الحديقة',care:['ماء منتظم','شمس جزئية إلى كاملة']},
  {id:5,name:'بوتس متسلّق',category:'indoor',price:90,img:'https://media.zid.store/6a48cfed-fe16-4e60-b980-a71ec81484c3/38756929-6f63-4447-9106-3d12e638d66f.jpg',desc:'نبات متسلق يتحمل الإضاءة الخفيفة',care:['سقيا معتدلة','يُقطّف الأوراق الذابلة']},
  {id:6,name:'لافندر عطري',category:'outdoor',price:120,img:'https://cdn.altibbi.com/cdn/cache/1000x500/image/2020/05/12/8477ae2873ac7c67e2521e37d9f10907.png.webp',desc:'نبات عطري مزهر للحديقة',care:['شمس كاملة','تربة جيدة التصريف']}
];

const grid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortBy = document.getElementById('sortBy');
const resetBtn = document.getElementById('resetBtn');

function renderProducts(list){
  grid.innerHTML='';
  if(list.length===0){grid.innerHTML='<div style="padding:20px;background:#fff;border-radius:12px">لا توجد منتجات مطابقة</div>';return}
  list.forEach(p=>{
    const card = document.createElement('div');card.className='card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <div style="color:var(--muted);font-size:14px">${p.category}</div>
      <div class="meta">
        <div class="price">EGP ${p.price}</div>
        <div style="display:flex;gap:8px">
          <button onclick="openModal(${p.id})">عرض</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  })
}

renderProducts(products);

function applyFilters(){
  const q = searchInput.value.trim().toLowerCase();
  const cat = categoryFilter.value;
  let res = products.filter(p=>{
    const matchesQ = p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
    const matchesCat = (cat==='all')?true:p.category===cat;
    return matchesQ && matchesCat;
  });
  const s = sortBy.value;
  if(s==='price-asc') res.sort((a,b)=>a.price-b.price);
  if(s==='price-desc') res.sort((a,b)=>b.price-a.price);
  renderProducts(res);
}
searchInput.addEventListener('input',applyFilters);
categoryFilter.addEventListener('change',applyFilters);
sortBy.addEventListener('change',applyFilters);
resetBtn.addEventListener('click',()=>{searchInput.value='';categoryFilter.value='all';sortBy.value='default';applyFilters()});

const modalBackdrop = document.getElementById('modalBackdrop');
const modalTitle = document.getElementById('modalTitle');
const modalImg = document.getElementById('modalImg');
const modalDesc = document.getElementById('modalDesc');
const modalTags = document.getElementById('modalTags');
const modalPrice = document.getElementById('modalPrice');
const closeBtn = document.getElementById('modalClose');
const careList = document.getElementById('careList');
const orderFromModal = document.getElementById('orderFromModal');

let currentProduct = null;
function openModal(id){
  const p = products.find(x=>x.id===id);
  if(!p) return;
  currentProduct = p;
  modalTitle.textContent = p.name;
  modalImg.src = p.img;
  modalDesc.textContent = p.desc;
  modalPrice.textContent = 'EGP '+p.price;
  modalTags.innerHTML = `<div class="tag">${p.category}</div>`;
  careList.innerHTML = p.care.map(c => `<li>${c}</li>`).join('');
  modalBackdrop.style.display='flex';
}

closeBtn.addEventListener('click',()=>{modalBackdrop.style.display='none'});
modalBackdrop.addEventListener('click',(e)=>{if(e.target===modalBackdrop) modalBackdrop.style.display='none'});

const orderForm = document.getElementById('orderForm');
const plantNameInput = document.getElementById('plantName');
const orderMsg = document.getElementById('orderMsg');

orderFromModal.addEventListener('click',()=>{
  if(currentProduct) {
    document.getElementById('plantName').value = currentProduct.name;
    modalBackdrop.style.display='none';
    document.getElementById('order').scrollIntoView({behavior:'smooth'});
  }
});

orderForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const data = {
    name: document.getElementById('name').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    city: document.getElementById('city').value.trim(),
    address: document.getElementById('address').value.trim(),
    plant: document.getElementById('plantName').value.trim(),
    notes: document.getElementById('notes').value.trim(),
    date: new Date().toISOString()
  };
  const orders = JSON.parse(localStorage.getItem('nursery_orders')||'[]');
  orders.push(data);localStorage.setItem('nursery_orders', JSON.stringify(orders));
  orderMsg.style.display='block';orderMsg.textContent = 'تم استلام طلبك! هنتواصل معاك قريباً.';
  orderForm.reset();
  setTimeout(()=>orderMsg.style.display='none',5000);
  console.log('Order received',data);
});

document.getElementById('shareBtn').addEventListener('click',()=>{
  if(!currentProduct) return;
  const text = `شوفي النبات: ${currentProduct.name} - السعر: EGP ${currentProduct.price} - ${location.href}`;
  if(navigator.share){navigator.share({title:currentProduct.name,text, url:location.href}).catch(()=>alert('مشاركة فشلت'))}else{prompt('انسخي الرابط والشاركيه',text)}
});

document.addEventListener('keydown',e=>{if(e.key==='Escape') modalBackdrop.style.display='none'});

