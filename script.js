// script.js - client-side logic for Venue Nusantara (static demo)
const sampleVenues = [
  {id:1, name:'Aula Merdeka', city:'Balikpapan', desc:'Aula serbaguna cocok untuk seminar & pernikahan kecil.', area:250, price:500000, image:'assets/balikpapan1.svg'},
  {id:2, name:'Gedung Asri Ballroom', city:'Balikpapan', desc:'Ballroom modern, kapasitas besar.', area:800, price:2000000, image:'assets/balikpapan2.svg'},
  {id:3, name:'Kafe Pelangi', city:'Balikpapan', desc:'Kafe cozy untuk workshop & gathering kecil.', area:80, price:150000, image:'assets/balikpapan3.svg'}
];

function $(sel){ return document.querySelector(sel); }
function $all(sel){ return Array.from(document.querySelectorAll(sel)); }

function renderVenueList(list){
  const container = document.getElementById('venueList');
  container.innerHTML = '';
  list.forEach(v=>{
    const el = document.createElement('div');
    el.className = 'bg-white p-4 rounded-lg shadow';
    el.innerHTML = `
      <img src="${v.image}" class="rounded mb-3 h-36 w-full object-cover" alt="">
      <h4 class="font-bold text-lg">${v.name}</h4>
      <div class="text-sm text-gray-600">${v.city} • Luas ${v.area} m²</div>
      <p class="mt-2 text-sm text-gray-700">${v.desc}</p>
      <div class="mt-3 flex justify-between items-center">
        <div class="font-semibold">Rp ${v.price.toLocaleString('id-ID')}</div>
        <div>
          <button class="btn-secondary" onclick="viewVenue(${v.id})">Lihat</button>
          <button class="btn-primary" onclick="selectVenue(${v.id})">Pilih</button>
        </div>
      </div>
    `;
    container.appendChild(el);
  });
}

document.getElementById('btnSearch').addEventListener('click', ()=>{
  const q = document.getElementById('searchBox').value.toLowerCase();
  const city = document.getElementById('citySelect').value;
  const results = sampleVenues.filter(v => (v.name.toLowerCase().includes(q) || v.desc.toLowerCase().includes(q) || q=='') && (city==''||v.city==city));
  renderVenueList(results);
});

// initial render
renderVenueList(sampleVenues);

// simple view/select handlers
function viewVenue(id){
  const v = sampleVenues.find(x=>x.id===id);
  alert('Lihat: ' + v.name + '\nDeskripsi: ' + v.desc);
}
function selectVenue(id){
  const v = sampleVenues.find(x=>x.id===id);
  // save selection to localStorage
  localStorage.setItem('vn_selected', JSON.stringify(v));
  alert('Venue dipilih: ' + v.name + '\nLanjutkan ke pemilihan tanggal di halaman Browse.');
}

// contact form handler (fake)
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  alert('Terima kasih! Pesan Anda terkirim (demo).');
  this.reset();
});
