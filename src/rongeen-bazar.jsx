import { useState, useEffect, useContext, createContext, useRef } from "react";

// ── FONTS ─────────────────────────────────────────────────────────────────────
const Fonts = () => <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Noto+Sans+Bengali:wght@400;600;700;900&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />;

// ── CONTEXT ───────────────────────────────────────────────────────────────────
const AppCtx = createContext();

// ── DATA ──────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  { id:1, category:"saree", brand:"Aarong", nameEn:"Silk Banarasi Saree", nameBn:"সিল্ক বেনারসি শাড়ি", price:3500, oldPrice:4200, image:"https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80", images:["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80","https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80"], rating:4.5, reviews:128, stock:15, colors:["#c0392b","#2980b9","#27ae60"], sizes:["S","M","L","XL"], descEn:"Premium silk Banarasi saree with intricate zari work. Perfect for weddings and festivals.", descBn:"সূক্ষ্ম জরির কাজ সহ প্রিমিয়াম সিল্ক বেনারসি শাড়ি। বিবাহ ও উৎসবের জন্য আদর্শ।", featured:true, new:true },
  { id:2, category:"kurti", brand:"Yellow", nameEn:"Embroidered Cotton Kurti", nameBn:"এমব্রয়ডারি কটন কুর্তি", price:1200, oldPrice:1600, image:"https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80", images:["https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80"], rating:4.2, reviews:85, stock:30, colors:["#e74c3c","#f39c12","#8e44ad"], sizes:["XS","S","M","L","XL","XXL"], descEn:"Beautifully embroidered cotton kurti, comfortable for daily wear.", descBn:"সুন্দর এমব্রয়ডারি কটন কুর্তি, প্রতিদিনের পরার জন্য আরামদায়ক।", featured:true, new:false },
  { id:3, category:"panjabi", brand:"Richman", nameEn:"Premium Panjabi", nameBn:"প্রিমিয়াম পাঞ্জাবি", price:2200, oldPrice:2800, image:"https://images.unsplash.com/photo-1594938298603-c8148c4b4061?w=600&q=80", images:["https://images.unsplash.com/photo-1594938298603-c8148c4b4061?w=600&q=80"], rating:4.7, reviews:203, stock:20, colors:["#ffffff","#2c3e50","#e8d5b7"], sizes:["S","M","L","XL","XXL"], descEn:"Premium quality panjabi with fine embroidery on collar and cuffs.", descBn:"কলার ও কাফে সূক্ষ্ম এমব্রয়ডারি সহ প্রিমিয়াম মানের পাঞ্জাবি।", featured:true, new:false },
  { id:4, category:"saree", brand:"Tangail", nameEn:"Tangail Tant Saree", nameBn:"তাঁতের টাঙ্গাইল শাড়ি", price:950, oldPrice:1200, image:"https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=600&q=80", images:["https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=600&q=80"], rating:4.3, reviews:67, stock:50, colors:["#e91e63","#9c27b0","#ff9800"], sizes:["Free Size"], descEn:"Traditional Tangail tant saree with beautiful border design.", descBn:"সুন্দর বর্ডার ডিজাইন সহ ঐতিহ্যবাহী টাঙ্গাইল তাঁতের শাড়ি।", featured:false, new:true },
  { id:5, category:"kids", brand:"Mango", nameEn:"Kids Frock Set", nameBn:"বাচ্চাদের ফ্রক সেট", price:680, oldPrice:850, image:"https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&q=80", images:["https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&q=80"], rating:4.6, reviews:44, stock:25, colors:["#ff69b4","#87ceeb","#98fb98"], sizes:["2Y","4Y","6Y","8Y","10Y"], descEn:"Adorable frock set for little girls, soft cotton fabric.", descBn:"ছোট মেয়েদের জন্য আদুরে ফ্রক সেট, নরম সুতির কাপড়।", featured:false, new:false },
  { id:6, category:"kurti", brand:"Cats Eye", nameEn:"Printed Georgette Kurti", nameBn:"প্রিন্টেড জর্জেট কুর্তি", price:1450, oldPrice:1800, image:"https://images.unsplash.com/photo-1614093302611-8efc3a394a23?w=600&q=80", images:["https://images.unsplash.com/photo-1614093302611-8efc3a394a23?w=600&q=80"], rating:4.1, reviews:92, stock:18, colors:["#3498db","#e74c3c","#2ecc71"], sizes:["S","M","L","XL"], descEn:"Elegant printed georgette kurti perfect for office and casual outings.", descBn:"অফিস ও ক্যাজুয়াল আড্ডার জন্য উপযুক্ত এলিগ্যান্ট প্রিন্টেড জর্জেট কুর্তি।", featured:false, new:true },
  { id:7, category:"panjabi", brand:"Aarong", nameEn:"Eid Special Panjabi", nameBn:"ঈদ স্পেশাল পাঞ্জাবি", price:3200, oldPrice:3800, image:"https://images.unsplash.com/photo-1614093302611-8efc3a394a23?w=600&q=80", images:["https://images.unsplash.com/photo-1614093302611-8efc3a394a23?w=600&q=80"], rating:4.8, reviews:156, stock:10, colors:["#fff","#c0392b","#2c3e50"], sizes:["S","M","L","XL","XXL"], descEn:"Exclusive Eid collection panjabi with handcrafted embroidery.", descBn:"হাতে তৈরি এমব্রয়ডারি সহ এক্সক্লুসিভ ঈদ কালেকশন পাঞ্জাবি।", featured:true, new:false },
  { id:8, category:"saree", brand:"Jamdani", nameEn:"Muslin Jamdani Saree", nameBn:"মসলিন জামদানি শাড়ি", price:8500, oldPrice:10000, image:"https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80", images:["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80"], rating:4.9, reviews:312, stock:5, colors:["#f5f5f5","#c0392b","#27ae60"], sizes:["Free Size"], descEn:"Heritage muslin jamdani saree, GI tagged product of Bangladesh.", descBn:"ঐতিহ্যবাহী মসলিন জামদানি শাড়ি, বাংলাদেশের জিআই ট্যাগড পণ্য।", featured:true, new:false },
];

const CATEGORIES = [
  { id:"all", bn:"সব পণ্য", en:"All Products", icon:"🛍️" },
  { id:"saree", bn:"শাড়ি", en:"Saree", icon:"👘" },
  { id:"kurti", bn:"কুর্তি", en:"Kurti", icon:"👗" },
  { id:"panjabi", bn:"পাঞ্জাবি", en:"Panjabi", icon:"👕" },
  { id:"kids", bn:"বাচ্চাদের পোশাক", en:"Kids Wear", icon:"🧒" },
];

// ── HELPERS ───────────────────────────────────────────────────────────────────
const t = (obj, lang) => lang === "bn" ? obj.bn : obj.en;
const fmt = (n, lang) => lang === "bn" ? `৳${n.toLocaleString("bn-BD")}` : `৳${n.toLocaleString()}`;
const stars = (r) => "★".repeat(Math.floor(r)) + (r % 1 >= 0.5 ? "½" : "") + "☆".repeat(5 - Math.ceil(r));

// ── THEME ─────────────────────────────────────────────────────────────────────
const LIGHT = { bg:"#faf9f7", card:"#ffffff", border:"#e8e4dc", text:"#1a1a1a", muted:"#6b6b6b", accent:"#c0392b", accentLight:"#fdf2f2", nav:"#ffffff", input:"#f5f3ef" };
const DARK  = { bg:"#0f0f0f", card:"#1a1a1a", border:"#2a2a2a", text:"#f0ede8", muted:"#888", accent:"#e74c3c", accentLight:"#1f0e0e", nav:"#111111", input:"#222" };

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState("bn");
  const [page, setPage] = useState("home"); // home | product | cart | checkout | orders | auth
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState(null);
  const [orders, setOrders] = useState([]);

  const th = dark ? DARK : LIGHT;

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const addToCart = (product, qty = 1, size = null, color = null) => {
    setCart(c => {
      const key = `${product.id}-${size}-${color}`;
      const existing = c.find(i => i.key === key);
      if (existing) return c.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i);
      return [...c, { ...product, qty, size, color, key }];
    });
    showToast(lang === "bn" ? "কার্টে যোগ হয়েছে! 🛒" : "Added to cart! 🛒");
  };

  const removeFromCart = (key) => setCart(c => c.filter(i => i.key !== key));
  const updateQty = (key, qty) => {
    if (qty < 1) return removeFromCart(key);
    setCart(c => c.map(i => i.key === key ? { ...i, qty } : i));
  };

  const toggleWishlist = (id) => {
    setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
    showToast(wishlist.includes(id) ? (lang === "bn" ? "উইশলিস্ট থেকে সরানো হয়েছে" : "Removed from wishlist") : (lang === "bn" ? "উইশলিস্টে যোগ হয়েছে ❤️" : "Added to wishlist ❤️"));
  };

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const ctx = { dark, setDark, lang, setLang, th, page, setPage, user, setUser, cart, addToCart, removeFromCart, updateQty, cartTotal, cartCount, wishlist, toggleWishlist, showToast, selectedProduct, setSelectedProduct, orders, setOrders };

  return (
    <AppCtx.Provider value={ctx}>
      <Fonts />
      <div style={{ background: th.bg, color: th.text, minHeight: "100vh", fontFamily: lang === "bn" ? "'Hind Siliguri', sans-serif" : "'DM Sans', sans-serif", transition: "background 0.3s, color 0.3s" }}>
        <Navbar />
        <div style={{ paddingTop: 64 }}>
          {page === "home" && <HomePage />}
          {page === "product" && selectedProduct && <ProductPage />}
          {page === "cart" && <CartPage />}
          {page === "checkout" && <CheckoutPage />}
          {page === "orders" && <OrdersPage />}
          {page === "auth" && <AuthPage />}
          {page === "wishlist" && <WishlistPage />}
        </div>
        <Footer />
        {toast && <Toast msg={toast.msg} type={toast.type} />}
      </div>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:6px;height:6px}
        ::-webkit-scrollbar-thumb{background:#c0392b;border-radius:3px}
        @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
        .product-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,0.12)}
        .btn-primary:hover{opacity:0.88;transform:translateY(-1px)}
        .nav-link:hover{color:#c0392b!important}
      `}</style>
    </AppCtx.Provider>
  );
}

// ── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar() {
  const { th, dark, setDark, lang, setLang, page, setPage, user, cartCount, wishlist } = useContext(AppCtx);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, background:th.nav, borderBottom:`1px solid ${th.border}`, boxShadow:"0 2px 16px rgba(0,0,0,0.06)", height:64 }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 20px", height:"100%", display:"flex", alignItems:"center", gap:16 }}>
        {/* Logo */}
        <div onClick={() => setPage("home")} style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
          <span style={{ fontSize:26 }}>👗</span>
          <div>
            <div style={{ fontFamily:"'Noto Sans Bengali', serif", fontWeight:900, fontSize:18, color:th.accent, lineHeight:1 }}>{lang==="bn"?"রঙিন বাজার":"Rongeen Bazar"}</div>
            <div style={{ fontSize:9, color:th.muted, letterSpacing:"1.5px", textTransform:"uppercase" }}>{lang==="bn"?"ফ্যাশন স্টোর":"Fashion Store"}</div>
          </div>
        </div>
        {/* Desktop nav links */}
        <div style={{ display:"flex", gap:4, flex:1, justifyContent:"center" }} className="desktop-only">
          {[["home","🏠",{bn:"হোম",en:"Home"}],["wishlist","❤️",{bn:"পছন্দের",en:"Wishlist"}],["orders","📦",{bn:"অর্ডার",en:"Orders"}]].map(([p,ic,label]) => (
            <button key={p} onClick={()=>setPage(p)} className="nav-link" style={{ background:"none", border:"none", cursor:"pointer", color:page===p?th.accent:th.muted, fontWeight:page===p?700:500, fontSize:14, padding:"6px 14px", borderRadius:20, fontFamily:"inherit", display:"flex", alignItems:"center", gap:6, transition:"color 0.2s" }}>
              {ic} {t(label,lang)}
            </button>
          ))}
        </div>
        {/* Right actions */}
        <div style={{ display:"flex", alignItems:"center", gap:8, marginLeft:"auto" }}>
          {/* Search */}
          {searchOpen
            ? <SearchBar onClose={()=>setSearchOpen(false)} />
            : <IconBtn icon="🔍" onClick={()=>setSearchOpen(true)} />
          }
          {/* Lang toggle */}
          <button onClick={()=>setLang(l=>l==="bn"?"en":"bn")} style={{ background:th.input, border:`1px solid ${th.border}`, borderRadius:20, padding:"4px 12px", cursor:"pointer", color:th.text, fontSize:12, fontFamily:"inherit", fontWeight:600 }}>
            {lang==="bn"?"EN":"বাং"}
          </button>
          {/* Dark mode */}
          <IconBtn icon={dark?"☀️":"🌙"} onClick={()=>setDark(d=>!d)} />
          {/* Cart */}
          <button onClick={()=>setPage("cart")} style={{ position:"relative", background:th.accent, border:"none", borderRadius:20, padding:"6px 14px", cursor:"pointer", color:"#fff", fontSize:13, fontWeight:700, fontFamily:"inherit", display:"flex", alignItems:"center", gap:6 }}>
            🛒 {lang==="bn"?"কার্ট":"Cart"}
            {cartCount>0 && <span style={{ position:"absolute", top:-6, right:-6, background:"#f39c12", color:"#fff", borderRadius:"50%", width:20, height:20, fontSize:11, fontWeight:900, display:"flex", alignItems:"center", justifyContent:"center" }}>{cartCount}</span>}
          </button>
          {/* User */}
          {user
            ? <div onClick={()=>setPage("orders")} style={{ cursor:"pointer", width:36, height:36, borderRadius:"50%", background:th.accent, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:14 }}>{user.name[0].toUpperCase()}</div>
            : <button onClick={()=>setPage("auth")} style={{ background:"none", border:`1.5px solid ${th.accent}`, borderRadius:20, padding:"5px 14px", cursor:"pointer", color:th.accent, fontSize:13, fontWeight:700, fontFamily:"inherit" }}>{lang==="bn"?"লগইন":"Login"}</button>
          }
        </div>
      </div>
    </nav>
  );
}

function IconBtn({ icon, onClick, badge }) {
  const { th } = useContext(AppCtx);
  return (
    <button onClick={onClick} style={{ background:th.input, border:`1px solid ${th.border}`, borderRadius:"50%", width:36, height:36, cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
      {icon}
      {badge && <span style={{ position:"absolute", top:-4, right:-4, background:"#c0392b", color:"#fff", borderRadius:"50%", width:16, height:16, fontSize:10, fontWeight:900, display:"flex", alignItems:"center", justifyContent:"center" }}>{badge}</span>}
    </button>
  );
}

function SearchBar({ onClose }) {
  const { th, lang, setPage, setSelectedProduct } = useContext(AppCtx);
  const [q, setQ] = useState("");
  const results = q.length > 1 ? PRODUCTS.filter(p => (lang==="bn"?p.nameBn:p.nameEn).toLowerCase().includes(q.toLowerCase())) : [];
  return (
    <div style={{ display:"flex", alignItems:"center", background:th.input, border:`1px solid ${th.border}`, borderRadius:24, padding:"4px 14px", gap:8, minWidth:280, position:"relative" }}>
      <span>🔍</span>
      <input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder={lang==="bn"?"পণ্য খুঁজুন...":"Search products..."} style={{ border:"none", background:"none", outline:"none", color:th.text, fontSize:14, fontFamily:"inherit", width:"100%" }} />
      <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:th.muted, fontSize:18 }}>×</button>
      {results.length>0 && (
        <div style={{ position:"absolute", top:"110%", left:0, right:0, background:th.card, border:`1px solid ${th.border}`, borderRadius:12, boxShadow:"0 8px 24px rgba(0,0,0,0.12)", zIndex:300, overflow:"hidden" }}>
          {results.slice(0,5).map(p => (
            <div key={p.id} onClick={()=>{setSelectedProduct(p);setPage("product");onClose();}} style={{ display:"flex", gap:10, padding:"10px 14px", cursor:"pointer", borderBottom:`1px solid ${th.border}` }}
              onMouseEnter={e=>e.currentTarget.style.background=th.input}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <img src={p.image} style={{ width:36, height:36, objectFit:"cover", borderRadius:6 }} />
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:th.text }}>{lang==="bn"?p.nameBn:p.nameEn}</div>
                <div style={{ fontSize:12, color:th.accent, fontWeight:700 }}>৳{p.price}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── HOME PAGE ─────────────────────────────────────────────────────────────────
function HomePage() {
  const { th, lang, setPage, setSelectedProduct } = useContext(AppCtx);
  const [activeCat, setActiveCat] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(0);

  let filtered = PRODUCTS.filter(p => {
    if (activeCat !== "all" && p.category !== activeCat) return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    if (p.rating < ratingFilter) return false;
    return true;
  });

  if (sortBy === "price_asc") filtered = [...filtered].sort((a,b) => a.price - b.price);
  else if (sortBy === "price_desc") filtered = [...filtered].sort((a,b) => b.price - a.price);
  else if (sortBy === "rating") filtered = [...filtered].sort((a,b) => b.rating - a.rating);
  else if (sortBy === "new") filtered = [...filtered].filter(p => p.new);

  const featured = PRODUCTS.filter(p => p.featured).slice(0,3);

  return (
    <div style={{ animation:"fadeIn 0.4s ease" }}>
      {/* Hero Banner */}
      <div style={{ background:`linear-gradient(135deg, #c0392b 0%, #922b21 50%, #1a1a1a 100%)`, padding:"60px 20px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-60, right:-60, width:300, height:300, borderRadius:"50%", background:"rgba(255,255,255,0.05)" }} />
        <div style={{ position:"absolute", bottom:-40, left:-40, width:200, height:200, borderRadius:"50%", background:"rgba(255,255,255,0.04)" }} />
        <div style={{ position:"relative", maxWidth:700, margin:"0 auto" }}>
          <div style={{ background:"rgba(255,255,255,0.15)", display:"inline-block", borderRadius:20, padding:"4px 16px", fontSize:12, color:"#fff", marginBottom:16, letterSpacing:"2px" }}>
            {lang==="bn"?"🎉 নতুন কালেকশন এসেছে":"🎉 NEW COLLECTION ARRIVED"}
          </div>
          <h1 style={{ fontFamily:lang==="bn"?"'Noto Sans Bengali'":"'Playfair Display'", fontSize:"clamp(28px,6vw,52px)", fontWeight:900, color:"#fff", lineHeight:1.2, marginBottom:16 }}>
            {lang==="bn"?"রঙিন পোশাকে\nসাজিয়ে নিন নিজেকে":"Dress Yourself\nin Vibrant Fashion"}
          </h1>
          <p style={{ color:"rgba(255,255,255,0.8)", fontSize:16, marginBottom:28, lineHeight:1.6 }}>
            {lang==="bn"?"সেরা মানের দেশীয় পোশাক, সাশ্রয়ী মূল্যে আপনার দোরগোড়ায়":"Best quality local fashion, delivered to your doorstep"}
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={()=>document.getElementById("products-section").scrollIntoView({behavior:"smooth"})} className="btn-primary" style={{ background:"#fff", color:"#c0392b", border:"none", borderRadius:28, padding:"12px 28px", cursor:"pointer", fontWeight:700, fontSize:15, fontFamily:"inherit", transition:"all 0.2s" }}>
              {lang==="bn"?"🛍️ এখনই কিনুন":"🛍️ Shop Now"}
            </button>
            <button style={{ background:"transparent", color:"#fff", border:"2px solid rgba(255,255,255,0.6)", borderRadius:28, padding:"12px 28px", cursor:"pointer", fontWeight:600, fontSize:15, fontFamily:"inherit" }}>
              {lang==="bn"?"📦 ট্র্যাক অর্ডার":"📦 Track Order"}
            </button>
          </div>
        </div>
      </div>

      {/* Features strip */}
      <div style={{ background:th.card, borderBottom:`1px solid ${th.border}` }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"14px 20px", display:"flex", justifyContent:"center", gap:"clamp(16px,4vw,60px)", flexWrap:"wrap" }}>
          {[["🚚",{bn:"ফ্রি ডেলিভারি",en:"Free Delivery"},{bn:"৫০০+ টাকার অর্ডারে",en:"On orders ৳500+"}],["↩️",{bn:"সহজ রিটার্ন",en:"Easy Returns"},{bn:"৭ দিনের মধ্যে",en:"Within 7 days"}],["🔒",{bn:"নিরাপদ পেমেন্ট",en:"Secure Payment"},{bn:"বিকাশ, নগদ",en:"bKash, Nagad"}],["⭐",{bn:"সেরা মান",en:"Best Quality"},{bn:"১০০% খাঁটি পণ্য",en:"100% Authentic"}]].map(([icon,title,sub],i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ fontSize:22 }}>{icon}</span>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:th.text }}>{t(title,lang)}</div>
                <div style={{ fontSize:11, color:th.muted }}>{t(sub,lang)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:1280, margin:"0 auto", padding:"32px 20px" }}>
        {/* Featured */}
        <Section title={{bn:"ফিচার্ড পণ্য",en:"Featured Products"}} sub={{bn:"আমাদের সেরা বাছাই",en:"Our Best Picks"}}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
            {featured.map(p => <ProductCard key={p.id} product={p} big />)}
          </div>
        </Section>

        {/* Categories */}
        <Section title={{bn:"বিভাগ",en:"Categories"}} sub={{bn:"পছন্দের বিভাগ থেকে কিনুন",en:"Shop by Category"}}>
          <div style={{ display:"flex", gap:12, overflowX:"auto", paddingBottom:8 }}>
            {CATEGORIES.map(c => (
              <button key={c.id} onClick={()=>{setActiveCat(c.id);document.getElementById("products-section").scrollIntoView({behavior:"smooth"});}}
                style={{ flexShrink:0, background:activeCat===c.id?th.accent:th.card, color:activeCat===c.id?"#fff":th.text, border:`1.5px solid ${activeCat===c.id?th.accent:th.border}`, borderRadius:16, padding:"10px 20px", cursor:"pointer", fontSize:14, fontWeight:600, fontFamily:"inherit", display:"flex", alignItems:"center", gap:8, transition:"all 0.2s" }}>
                {c.icon} {t({bn:c.bn,en:c.en},lang)}
              </button>
            ))}
          </div>
        </Section>

        {/* Products */}
        <div id="products-section">
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:12 }}>
            <div>
              <h2 style={{ fontSize:22, fontWeight:800, color:th.text }}>{lang==="bn"?"সব পণ্য":"All Products"}</h2>
              <p style={{ fontSize:13, color:th.muted }}>{filtered.length} {lang==="bn"?"টি পণ্য":"products found"}</p>
            </div>
            <div style={{ display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
              <button onClick={()=>setShowFilters(v=>!v)} style={{ background:showFilters?th.accent:th.input, color:showFilters?"#fff":th.text, border:`1px solid ${th.border}`, borderRadius:20, padding:"7px 16px", cursor:"pointer", fontSize:13, fontFamily:"inherit", fontWeight:600 }}>
                🔧 {lang==="bn"?"ফিল্টার":"Filter"}
              </button>
              <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{ background:th.input, border:`1px solid ${th.border}`, borderRadius:20, padding:"7px 14px", color:th.text, fontSize:13, fontFamily:"inherit", outline:"none", cursor:"pointer" }}>
                <option value="default">{lang==="bn"?"ডিফল্ট":"Default"}</option>
                <option value="price_asc">{lang==="bn"?"দাম: কম থেকে বেশি":"Price: Low to High"}</option>
                <option value="price_desc">{lang==="bn"?"দাম: বেশি থেকে কম":"Price: High to Low"}</option>
                <option value="rating">{lang==="bn"?"সর্বোচ্চ রেটিং":"Top Rated"}</option>
                <option value="new">{lang==="bn"?"নতুন পণ্য":"New Arrivals"}</option>
              </select>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div style={{ background:th.card, border:`1px solid ${th.border}`, borderRadius:16, padding:20, marginBottom:24, display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:20, animation:"fadeIn 0.3s ease" }}>
              <div>
                <div style={{ fontSize:13, fontWeight:700, marginBottom:10, color:th.text }}>{lang==="bn"?"বিভাগ":"Category"}</div>
                {CATEGORIES.map(c => (
                  <label key={c.id} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8, cursor:"pointer", fontSize:13, color:th.text }}>
                    <input type="radio" name="cat" checked={activeCat===c.id} onChange={()=>setActiveCat(c.id)} style={{ accentColor:th.accent }} />
                    {c.icon} {t({bn:c.bn,en:c.en},lang)}
                  </label>
                ))}
              </div>
              <div>
                <div style={{ fontSize:13, fontWeight:700, marginBottom:10, color:th.text }}>{lang==="bn"?"দামের সীমা":"Price Range"}</div>
                <div style={{ fontSize:13, color:th.muted, marginBottom:8 }}>{fmt(priceRange[0],lang)} — {fmt(priceRange[1],lang)}</div>
                <input type="range" min={0} max={10000} step={100} value={priceRange[1]} onChange={e=>setPriceRange([0,+e.target.value])} style={{ width:"100%", accentColor:th.accent }} />
              </div>
              <div>
                <div style={{ fontSize:13, fontWeight:700, marginBottom:10, color:th.text }}>{lang==="bn"?"সর্বনিম্ন রেটিং":"Min Rating"}</div>
                {[0,3,3.5,4,4.5].map(r => (
                  <label key={r} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8, cursor:"pointer", fontSize:13, color:th.text }}>
                    <input type="radio" name="rating" checked={ratingFilter===r} onChange={()=>setRatingFilter(r)} style={{ accentColor:th.accent }} />
                    {r===0?(lang==="bn"?"সব":"All"):<span style={{ color:"#f39c12" }}>{stars(r)}</span>}
                  </label>
                ))}
              </div>
            </div>
          )}

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:20 }}>
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          {filtered.length===0 && <div style={{ textAlign:"center", padding:60, color:th.muted, fontSize:16 }}>😔 {lang==="bn"?"কোনো পণ্য পাওয়া যায়নি":"No products found"}</div>}
        </div>
      </div>
    </div>
  );
}

// ── PRODUCT CARD ──────────────────────────────────────────────────────────────
function ProductCard({ product: p, big }) {
  const { th, lang, setPage, setSelectedProduct, addToCart, wishlist, toggleWishlist } = useContext(AppCtx);
  const discount = Math.round((1 - p.price / p.oldPrice) * 100);
  const inWish = wishlist.includes(p.id);
  return (
    <div className="product-card" style={{ background:th.card, border:`1px solid ${th.border}`, borderRadius:16, overflow:"hidden", cursor:"pointer", transition:"all 0.25s", position:"relative" }}>
      <div style={{ position:"relative", overflow:"hidden" }} onClick={()=>{setSelectedProduct(p);setPage("product");}}>
        <img src={p.image} alt="" style={{ width:"100%", height:big?260:200, objectFit:"cover", display:"block", transition:"transform 0.3s" }}
          onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"}
          onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"} />
        <div style={{ position:"absolute", top:10, left:10, display:"flex", flexDirection:"column", gap:6 }}>
          {discount>0 && <span style={{ background:"#c0392b", color:"#fff", fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:10 }}>-{discount}%</span>}
          {p.new && <span style={{ background:"#27ae60", color:"#fff", fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:10 }}>{lang==="bn"?"নতুন":"NEW"}</span>}
          {p.stock<=5 && <span style={{ background:"#f39c12", color:"#fff", fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:10 }}>{lang==="bn"?"শেষ হচ্ছে":"Low Stock"}</span>}
        </div>
        <button onClick={e=>{e.stopPropagation();toggleWishlist(p.id);}} style={{ position:"absolute", top:10, right:10, background:"rgba(255,255,255,0.9)", border:"none", borderRadius:"50%", width:32, height:32, cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>
          {inWish?"❤️":"🤍"}
        </button>
      </div>
      <div style={{ padding:"14px 16px" }}>
        <div style={{ fontSize:11, color:th.muted, marginBottom:4, fontWeight:500 }}>{p.brand}</div>
        <div onClick={()=>{setSelectedProduct(p);setPage("product");}} style={{ fontSize:14, fontWeight:700, color:th.text, marginBottom:6, lineHeight:1.4 }}>
          {lang==="bn"?p.nameBn:p.nameEn}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
          <span style={{ color:"#f39c12", fontSize:12 }}>{stars(p.rating)}</span>
          <span style={{ fontSize:11, color:th.muted }}>({p.reviews})</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <span style={{ fontSize:17, fontWeight:800, color:th.accent }}>{fmt(p.price,lang)}</span>
            {p.oldPrice && <span style={{ fontSize:12, color:th.muted, textDecoration:"line-through", marginLeft:6 }}>{fmt(p.oldPrice,lang)}</span>}
          </div>
          <button onClick={()=>addToCart(p,1,p.sizes[0],p.colors[0])} className="btn-primary" style={{ background:th.accent, color:"#fff", border:"none", borderRadius:20, padding:"7px 14px", cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"inherit", transition:"all 0.2s" }}>
            +{lang==="bn"?" কার্ট":" Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── PRODUCT PAGE ──────────────────────────────────────────────────────────────
function ProductPage() {
  const { th, lang, selectedProduct: p, addToCart, setPage, wishlist, toggleWishlist, setSelectedProduct } = useContext(AppCtx);
  const [qty, setQty] = useState(1);
  const [selSize, setSelSize] = useState(p.sizes[0]);
  const [selColor, setSelColor] = useState(p.colors[0]);
  const [activeImg, setActiveImg] = useState(0);
  const [tab, setTab] = useState("desc");
  const related = PRODUCTS.filter(x => x.category===p.category && x.id!==p.id).slice(0,4);
  const discount = Math.round((1-p.price/p.oldPrice)*100);
  const inWish = wishlist.includes(p.id);

  return (
    <div style={{ maxWidth:1280, margin:"0 auto", padding:"28px 20px", animation:"fadeIn 0.4s ease" }}>
      <button onClick={()=>setPage("home")} style={{ background:"none", border:"none", cursor:"pointer", color:th.accent, fontSize:14, fontWeight:600, fontFamily:"inherit", marginBottom:20 }}>← {lang==="bn"?"ফিরে যান":"Back"}</button>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40 }}>
        {/* Images */}
        <div>
          <img src={p.images[activeImg]} style={{ width:"100%", height:460, objectFit:"cover", borderRadius:16, marginBottom:12 }} />
          <div style={{ display:"flex", gap:10 }}>
            {p.images.map((img,i) => (
              <img key={i} src={img} onClick={()=>setActiveImg(i)} style={{ width:72, height:72, objectFit:"cover", borderRadius:8, cursor:"pointer", border:`2.5px solid ${activeImg===i?th.accent:th.border}` }} />
            ))}
          </div>
        </div>
        {/* Info */}
        <div>
          <div style={{ fontSize:12, color:th.muted, marginBottom:6 }}>{p.brand} • {CATEGORIES.find(c=>c.id===p.category)?.[lang==="bn"?"bn":"en"]??p.category}</div>
          <h1 style={{ fontSize:"clamp(20px,3vw,28px)", fontWeight:900, color:th.text, marginBottom:10, lineHeight:1.3 }}>{lang==="bn"?p.nameBn:p.nameEn}</h1>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
            <span style={{ color:"#f39c12", fontSize:16 }}>{stars(p.rating)}</span>
            <span style={{ color:th.muted, fontSize:13 }}>({p.reviews} {lang==="bn"?"রিভিউ":"reviews"})</span>
            <span style={{ color:p.stock>5?"#27ae60":"#e74c3c", fontSize:12, fontWeight:600 }}>• {p.stock>5?(lang==="bn"?"স্টকে আছে":"In Stock"):(lang==="bn"?`মাত্র ${p.stock}টি বাকি`:`Only ${p.stock} left`)}</span>
          </div>
          <div style={{ display:"flex", alignItems:"baseline", gap:12, marginBottom:20 }}>
            <span style={{ fontSize:32, fontWeight:900, color:th.accent }}>{fmt(p.price,lang)}</span>
            {p.oldPrice && <span style={{ fontSize:18, color:th.muted, textDecoration:"line-through" }}>{fmt(p.oldPrice,lang)}</span>}
            {discount>0 && <span style={{ background:"#c0392b", color:"#fff", fontSize:12, fontWeight:700, padding:"2px 8px", borderRadius:10 }}>{discount}% {lang==="bn"?"ছাড়":"OFF"}</span>}
          </div>

          {/* Size */}
          <div style={{ marginBottom:18 }}>
            <div style={{ fontSize:13, fontWeight:700, marginBottom:8, color:th.text }}>{lang==="bn"?"সাইজ বেছে নিন":"Select Size"}</div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {p.sizes.map(s => (
                <button key={s} onClick={()=>setSelSize(s)} style={{ background:selSize===s?th.accent:th.input, color:selSize===s?"#fff":th.text, border:`1.5px solid ${selSize===s?th.accent:th.border}`, borderRadius:8, padding:"6px 16px", cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"inherit" }}>{s}</button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div style={{ marginBottom:18 }}>
            <div style={{ fontSize:13, fontWeight:700, marginBottom:8, color:th.text }}>{lang==="bn"?"রং বেছে নিন":"Select Color"}</div>
            <div style={{ display:"flex", gap:10 }}>
              {p.colors.map(c => (
                <button key={c} onClick={()=>setSelColor(c)} style={{ width:28, height:28, borderRadius:"50%", background:c, border:`3px solid ${selColor===c?th.accent:"transparent"}`, cursor:"pointer", outline:`2px solid ${selColor===c?th.accent:"transparent"}`, outlineOffset:2 }} />
              ))}
            </div>
          </div>

          {/* Qty */}
          <div style={{ marginBottom:24 }}>
            <div style={{ fontSize:13, fontWeight:700, marginBottom:8, color:th.text }}>{lang==="bn"?"পরিমাণ":"Quantity"}</div>
            <div style={{ display:"flex", alignItems:"center", gap:0, background:th.input, border:`1px solid ${th.border}`, borderRadius:10, overflow:"hidden", width:"fit-content" }}>
              <button onClick={()=>setQty(q=>Math.max(1,q-1))} style={{ background:"none", border:"none", width:40, height:40, cursor:"pointer", fontSize:18, color:th.text, fontWeight:700 }}>−</button>
              <span style={{ width:48, textAlign:"center", fontSize:16, fontWeight:700, color:th.text }}>{qty}</span>
              <button onClick={()=>setQty(q=>Math.min(p.stock,q+1))} style={{ background:"none", border:"none", width:40, height:40, cursor:"pointer", fontSize:18, color:th.text, fontWeight:700 }}>+</button>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:24 }}>
            <button onClick={()=>addToCart(p,qty,selSize,selColor)} className="btn-primary" style={{ flex:1, background:th.accent, color:"#fff", border:"none", borderRadius:28, padding:"14px 24px", cursor:"pointer", fontSize:16, fontWeight:700, fontFamily:"inherit", transition:"all 0.2s" }}>
              🛒 {lang==="bn"?"কার্টে যোগ করুন":"Add to Cart"}
            </button>
            <button onClick={()=>{addToCart(p,qty,selSize,selColor);setPage("checkout");}} style={{ flex:1, background:"#27ae60", color:"#fff", border:"none", borderRadius:28, padding:"14px 24px", cursor:"pointer", fontSize:16, fontWeight:700, fontFamily:"inherit" }}>
              ⚡ {lang==="bn"?"এখনই কিনুন":"Buy Now"}
            </button>
            <button onClick={()=>toggleWishlist(p.id)} style={{ width:52, background:inWish?th.accentLight:th.input, border:`1.5px solid ${inWish?th.accent:th.border}`, borderRadius:28, cursor:"pointer", fontSize:22 }}>{inWish?"❤️":"🤍"}</button>
          </div>

          {/* Tabs */}
          <div style={{ borderBottom:`1px solid ${th.border}`, display:"flex", gap:0, marginBottom:16 }}>
            {[["desc",{bn:"বিবরণ",en:"Description"}],["ship",{bn:"ডেলিভারি",en:"Delivery"}],["ret",{bn:"রিটার্ন",en:"Returns"}]].map(([key,label]) => (
              <button key={key} onClick={()=>setTab(key)} style={{ background:"none", border:"none", borderBottom:`2.5px solid ${tab===key?th.accent:"transparent"}`, padding:"10px 18px", cursor:"pointer", fontSize:13, fontWeight:700, color:tab===key?th.accent:th.muted, fontFamily:"inherit" }}>
                {t(label,lang)}
              </button>
            ))}
          </div>
          <div style={{ fontSize:14, color:th.muted, lineHeight:1.8 }}>
            {tab==="desc" && (lang==="bn"?p.descBn:p.descEn)}
            {tab==="ship" && (lang==="bn"?"ঢাকার মধ্যে ২-৩ দিন, ঢাকার বাইরে ৪-৬ কার্যদিবসে ডেলিভারি। ৫০০ টাকার উপরে অর্ডারে ফ্রি শিপিং।":"Delivery within Dhaka 2-3 days, outside Dhaka 4-6 working days. Free shipping on orders above ৳500.")}
            {tab==="ret" && (lang==="bn"?"পণ্য পাওয়ার ৭ দিনের মধ্যে রিটার্ন করা যাবে। পণ্য অব্যবহৃত ও ট্যাগ সহ থাকতে হবে।":"Returns accepted within 7 days of delivery. Product must be unused with tags attached.")}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length>0 && (
        <div style={{ marginTop:48 }}>
          <h2 style={{ fontSize:20, fontWeight:800, marginBottom:20, color:th.text }}>{lang==="bn"?"সম্পর্কিত পণ্য":"Related Products"}</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:16 }}>
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
      <style>{`@media(max-width:768px){.grid-2{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}

// ── CART PAGE ─────────────────────────────────────────────────────────────────
function CartPage() {
  const { th, lang, cart, removeFromCart, updateQty, cartTotal, setPage } = useContext(AppCtx);
  const shipping = cartTotal >= 500 ? 0 : 80;
  const total = cartTotal + shipping;

  if (cart.length === 0) return (
    <div style={{ textAlign:"center", padding:"80px 20px", animation:"fadeIn 0.4s ease" }}>
      <div style={{ fontSize:80, marginBottom:16 }}>🛒</div>
      <h2 style={{ fontSize:24, fontWeight:800, color:th.text, marginBottom:8 }}>{lang==="bn"?"কার্ট খালি!":"Cart is Empty!"}</h2>
      <p style={{ color:th.muted, marginBottom:24 }}>{lang==="bn"?"কিছু পণ্য যোগ করুন":"Add some products"}</p>
      <button onClick={()=>setPage("home")} style={{ background:th.accent, color:"#fff", border:"none", borderRadius:28, padding:"12px 28px", cursor:"pointer", fontSize:15, fontWeight:700, fontFamily:"inherit" }}>
        {lang==="bn"?"কেনাকাটা করুন":"Start Shopping"}
      </button>
    </div>
  );

  return (
    <div style={{ maxWidth:1100, margin:"0 auto", padding:"28px 20px", animation:"fadeIn 0.4s ease" }}>
      <h1 style={{ fontSize:26, fontWeight:900, color:th.text, marginBottom:24 }}>🛒 {lang==="bn"?"আপনার কার্ট":"Your Cart"} ({cart.length})</h1>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:24 }}>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {cart.map(item => (
            <div key={item.key} style={{ background:th.card, border:`1px solid ${th.border}`, borderRadius:16, padding:16, display:"flex", gap:16, alignItems:"center" }}>
              <img src={item.image} style={{ width:80, height:80, objectFit:"cover", borderRadius:10, flexShrink:0 }} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:15, fontWeight:700, color:th.text, marginBottom:4 }}>{lang==="bn"?item.nameBn:item.nameEn}</div>
                <div style={{ fontSize:12, color:th.muted, marginBottom:8 }}>{lang==="bn"?"সাইজ":"Size"}: {item.size} • {lang==="bn"?"রং":"Color"}: <span style={{ display:"inline-block", width:14, height:14, borderRadius:"50%", background:item.color, verticalAlign:"middle" }} /></div>
                <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                  <div style={{ display:"flex", alignItems:"center", background:th.input, borderRadius:8, overflow:"hidden" }}>
                    <button onClick={()=>updateQty(item.key,item.qty-1)} style={{ background:"none", border:"none", width:32, height:32, cursor:"pointer", fontSize:16, color:th.text, fontWeight:700 }}>−</button>
                    <span style={{ width:32, textAlign:"center", fontSize:14, fontWeight:700, color:th.text }}>{item.qty}</span>
                    <button onClick={()=>updateQty(item.key,item.qty+1)} style={{ background:"none", border:"none", width:32, height:32, cursor:"pointer", fontSize:16, color:th.text, fontWeight:700 }}>+</button>
                  </div>
                  <span style={{ fontSize:16, fontWeight:800, color:th.accent }}>{fmt(item.price*item.qty,lang)}</span>
                </div>
              </div>
              <button onClick={()=>removeFromCart(item.key)} style={{ background:"none", border:"none", cursor:"pointer", color:"#e74c3c", fontSize:20, padding:8 }}>🗑️</button>
            </div>
          ))}
        </div>
        {/* Summary */}
        <div style={{ background:th.card, border:`1px solid ${th.border}`, borderRadius:16, padding:24, height:"fit-content", position:"sticky", top:80 }}>
          <h3 style={{ fontSize:18, fontWeight:800, color:th.text, marginBottom:20 }}>{lang==="bn"?"অর্ডার সারসংক্ষেপ":"Order Summary"}</h3>
          {[
            [{bn:"উপমোট",en:"Subtotal"}, fmt(cartTotal,lang)],
            [{bn:"ডেলিভারি চার্জ",en:"Shipping"}, shipping===0?(lang==="bn"?"বিনামূল্যে":"Free"):`৳${shipping}`],
          ].map(([label,val],i) => (
            <div key={i} style={{ display:"flex", justifyContent:"space-between", marginBottom:10, fontSize:14, color:th.muted }}>
              <span>{t(label,lang)}</span><span style={{ color:th.text, fontWeight:600 }}>{val}</span>
            </div>
          ))}
          <div style={{ borderTop:`1px solid ${th.border}`, paddingTop:14, marginTop:4, display:"flex", justifyContent:"space-between", fontSize:18, fontWeight:900, color:th.text, marginBottom:20 }}>
            <span>{lang==="bn"?"মোট":"Total"}</span>
            <span style={{ color:th.accent }}>{fmt(total,lang)}</span>
          </div>
          {shipping>0 && <div style={{ background:th.accentLight, border:`1px solid ${th.border}`, borderRadius:10, padding:"8px 12px", fontSize:12, color:th.accent, marginBottom:16, textAlign:"center" }}>
            🚚 {fmt(500-cartTotal,lang)} {lang==="bn"?"আরো কিনলে ফ্রি ডেলিভারি":"more for free shipping"}
          </div>}
          <button onClick={()=>setPage("checkout")} className="btn-primary" style={{ width:"100%", background:th.accent, color:"#fff", border:"none", borderRadius:28, padding:"14px 0", cursor:"pointer", fontSize:16, fontWeight:800, fontFamily:"inherit", transition:"all 0.2s" }}>
            {lang==="bn"?"চেকআউট করুন ➜":"Proceed to Checkout ➜"}
          </button>
          <button onClick={()=>setPage("home")} style={{ width:"100%", background:"none", border:`1.5px solid ${th.border}`, borderRadius:28, padding:"12px 0", cursor:"pointer", fontSize:14, fontWeight:600, fontFamily:"inherit", color:th.muted, marginTop:10 }}>
            {lang==="bn"?"কেনাকাটা চালিয়ে যান":"Continue Shopping"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── CHECKOUT PAGE ─────────────────────────────────────────────────────────────
function CheckoutPage() {
  const { th, lang, cart, cartTotal, setPage, user, setOrders, showToast } = useContext(AppCtx);
  const [step, setStep] = useState(1); // 1=shipping, 2=payment, 3=confirm
  const [payMethod, setPayMethod] = useState("bkash");
  const [mobileNum, setMobileNum] = useState("");
  const [txnId, setTxnId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [form, setForm] = useState({ name: user?.name||"", phone: user?.phone||"", address:"", area:"", city:"ঢাকা/Dhaka", zip:"" });
  const shipping = cartTotal >= 500 ? 0 : 80;
  const total = cartTotal + shipping;
  const F = v => setForm(f=>({...f,...v}));

  const handleOrder = () => {
    if (!txnId && payMethod !== "cod") { showToast(lang==="bn"?"ট্রানজেকশন আইডি দিন":"Enter Transaction ID","error"); return; }
    setProcessing(true);
    setTimeout(() => {
      const orderId = "RB" + Date.now().toString().slice(-6);
      setOrders(o => [{id:orderId, items:[...cart], total, date:new Date().toLocaleDateString(), status:"confirmed", payment:payMethod, address:form}, ...o]);
      setProcessing(false);
      setStep(3);
    }, 2000);
  };

  if (step === 3) return (
    <div style={{ textAlign:"center", padding:"80px 20px", animation:"fadeIn 0.5s ease" }}>
      <div style={{ fontSize:80, marginBottom:16, animation:"pulse 1s ease" }}>🎉</div>
      <h2 style={{ fontSize:28, fontWeight:900, color:th.text, marginBottom:8 }}>{lang==="bn"?"অর্ডার সফল হয়েছে!":"Order Placed Successfully!"}</h2>
      <p style={{ color:th.muted, marginBottom:24, fontSize:16 }}>{lang==="bn"?"আপনার অর্ডার প্রক্রিয়া শুরু হয়েছে":"Your order is being processed"}</p>
      <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
        <button onClick={()=>setPage("orders")} style={{ background:th.accent, color:"#fff", border:"none", borderRadius:28, padding:"12px 28px", cursor:"pointer", fontSize:15, fontWeight:700, fontFamily:"inherit" }}>📦 {lang==="bn"?"অর্ডার দেখুন":"View Orders"}</button>
        <button onClick={()=>setPage("home")} style={{ background:th.input, color:th.text, border:`1px solid ${th.border}`, borderRadius:28, padding:"12px 28px", cursor:"pointer", fontSize:15, fontWeight:600, fontFamily:"inherit" }}>🏠 {lang==="bn"?"হোমে যান":"Go Home"}</button>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth:900, margin:"0 auto", padding:"28px 20px", animation:"fadeIn 0.4s ease" }}>
      <h1 style={{ fontSize:24, fontWeight:900, color:th.text, marginBottom:24 }}>🧾 {lang==="bn"?"চেকআউট":"Checkout"}</h1>
      {/* Steps */}
      <div style={{ display:"flex", gap:0, marginBottom:32, background:th.card, border:`1px solid ${th.border}`, borderRadius:12, overflow:"hidden" }}>
        {[[1,{bn:"শিপিং",en:"Shipping"}],[2,{bn:"পেমেন্ট",en:"Payment"}]].map(([s,label]) => (
          <div key={s} style={{ flex:1, padding:"14px 20px", textAlign:"center", background:step>=s?th.accent:"transparent", color:step>=s?"#fff":th.muted, fontWeight:700, fontSize:14 }}>
            {s}. {t(label,lang)}
          </div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 300px", gap:24 }}>
        <div>
          {step===1 && (
            <div style={{ background:th.card, border:`1px solid ${th.border}`, borderRadius:16, padding:24 }}>
              <h3 style={{ fontSize:17, fontWeight:800, color:th.text, marginBottom:18 }}>📍 {lang==="bn"?"শিপিং তথ্য":"Shipping Info"}</h3>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                {[["name",{bn:"পূর্ণ নাম",en:"Full Name"}],["phone",{bn:"ফোন নম্বর",en:"Phone Number"}]].map(([key,label]) => (
                  <div key={key}>
                    <label style={{ fontSize:12, color:th.muted, fontWeight:600, display:"block", marginBottom:6 }}>{t(label,lang)} *</label>
                    <input value={form[key]} onChange={e=>F({[key]:e.target.value})} style={{ width:"100%", background:th.input, border:`1px solid ${th.border}`, borderRadius:8, padding:"10px 12px", color:th.text, fontFamily:"inherit", fontSize:13, outline:"none" }} />
                  </div>
                ))}
              </div>
              <div style={{ marginTop:14 }}>
                <label style={{ fontSize:12, color:th.muted, fontWeight:600, display:"block", marginBottom:6 }}>{lang==="bn"?"পূর্ণ ঠিকানা":"Full Address"} *</label>
                <textarea value={form.address} onChange={e=>F({address:e.target.value})} rows={2} style={{ width:"100%", background:th.input, border:`1px solid ${th.border}`, borderRadius:8, padding:"10px 12px", color:th.text, fontFamily:"inherit", fontSize:13, outline:"none", resize:"none" }} />
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginTop:14 }}>
                {[["area",{bn:"এলাকা",en:"Area"}],["city",{bn:"শহর",en:"City"}]].map(([key,label]) => (
                  <div key={key}>
                    <label style={{ fontSize:12, color:th.muted, fontWeight:600, display:"block", marginBottom:6 }}>{t(label,lang)}</label>
                    <input value={form[key]} onChange={e=>F({[key]:e.target.value})} style={{ width:"100%", background:th.input, border:`1px solid ${th.border}`, borderRadius:8, padding:"10px 12px", color:th.text, fontFamily:"inherit", fontSize:13, outline:"none" }} />
                  </div>
                ))}
              </div>
              <button onClick={()=>setStep(2)} disabled={!form.name||!form.phone||!form.address} style={{ marginTop:20, width:"100%", background:form.name&&form.phone&&form.address?th.accent:"#ccc", color:"#fff", border:"none", borderRadius:28, padding:"13px 0", cursor:"pointer", fontSize:15, fontWeight:700, fontFamily:"inherit" }}>
                {lang==="bn"?"পেমেন্টে যান ➜":"Go to Payment ➜"}
              </button>
            </div>
          )}

          {step===2 && (
            <div style={{ background:th.card, border:`1px solid ${th.border}`, borderRadius:16, padding:24 }}>
              <h3 style={{ fontSize:17, fontWeight:800, color:th.text, marginBottom:18 }}>💳 {lang==="bn"?"পেমেন্ট পদ্ধতি":"Payment Method"}</h3>
              <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:20 }}>
                {[["bkash","💗","bKash",{bn:"বিকাশ পেমেন্ট",en:"Pay with bKash"}],["nagad","🟠","Nagad",{bn:"নগদ পেমেন্ট",en:"Pay with Nagad"}],["cod","💵","Cash",{bn:"ক্যাশ অন ডেলিভারি",en:"Cash on Delivery"}]].map(([id,icon,brand,label]) => (
                  <div key={id} onClick={()=>setPayMethod(id)} style={{ border:`2px solid ${payMethod===id?th.accent:th.border}`, borderRadius:12, padding:"14px 18px", cursor:"pointer", background:payMethod===id?th.accentLight:"transparent", transition:"all 0.2s" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <span style={{ fontSize:24 }}>{icon}</span>
                      <div>
                        <div style={{ fontWeight:700, fontSize:15, color:th.text }}>{brand}</div>
                        <div style={{ fontSize:12, color:th.muted }}>{t(label,lang)}</div>
                      </div>
                      <div style={{ marginLeft:"auto", width:20, height:20, borderRadius:"50%", border:`2px solid ${payMethod===id?th.accent:th.border}`, background:payMethod===id?th.accent:"transparent", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        {payMethod===id && <div style={{ width:8, height:8, borderRadius:"50%", background:"#fff" }} />}
                      </div>
                    </div>
                    {payMethod===id && id!=="cod" && (
                      <div style={{ marginTop:14, paddingTop:14, borderTop:`1px solid ${th.border}` }}>
                        <div style={{ background:th.input, borderRadius:10, padding:"12px 14px", marginBottom:12, fontSize:13, color:th.muted, lineHeight:1.7 }}>
                          📱 {id==="bkash"?"bKash":"Nagad"} {lang==="bn"?"নম্বরে পাঠান":"Number"}: <strong style={{ color:th.text }}>01700-000000</strong><br/>
                          💬 {lang==="bn"?"রেফারেন্স:":"Reference:"} <strong style={{ color:th.text }}>RB-ORDER</strong>
                        </div>
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                          <div>
                            <label style={{ fontSize:12, color:th.muted, display:"block", marginBottom:6 }}>{lang==="bn"?"আপনার নম্বর":"Your Number"}</label>
                            <input value={mobileNum} onChange={e=>setMobileNum(e.target.value)} placeholder="01XXXXXXXXX" style={{ width:"100%", background:th.card, border:`1px solid ${th.border}`, borderRadius:8, padding:"9px 12px", color:th.text, fontFamily:"inherit", fontSize:13, outline:"none" }} />
                          </div>
                          <div>
                            <label style={{ fontSize:12, color:th.muted, display:"block", marginBottom:6 }}>{lang==="bn"?"ট্রানজেকশন আইডি":"Transaction ID"} *</label>
                            <input value={txnId} onChange={e=>setTxnId(e.target.value)} placeholder="8NK..." style={{ width:"100%", background:th.card, border:`1px solid ${th.border}`, borderRadius:8, padding:"9px 12px", color:th.text, fontFamily:"inherit", fontSize:13, outline:"none" }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div style={{ display:"flex", gap:12 }}>
                <button onClick={()=>setStep(1)} style={{ flex:1, background:th.input, color:th.text, border:`1px solid ${th.border}`, borderRadius:28, padding:"12px 0", cursor:"pointer", fontSize:14, fontWeight:600, fontFamily:"inherit" }}>← {lang==="bn"?"পেছনে":"Back"}</button>
                <button onClick={handleOrder} disabled={processing} className="btn-primary" style={{ flex:2, background:processing?"#999":th.accent, color:"#fff", border:"none", borderRadius:28, padding:"13px 0", cursor:"pointer", fontSize:15, fontWeight:700, fontFamily:"inherit", transition:"all 0.2s" }}>
                  {processing ? (lang==="bn"?"প্রক্রিয়াজাত হচ্ছে...":"Processing...") : `✅ ${lang==="bn"?"অর্ডার নিশ্চিত করুন":"Confirm Order"} — ${fmt(total,lang)}`}
                </button>
              </div>
            </div>
          )}
        </div>
        {/* Order mini summary */}
        <div style={{ background:th.card, border:`1px solid ${th.border}`, borderRadius:16, padding:20, height:"fit-content" }}>
          <h4 style={{ fontSize:14, fontWeight:700, color:th.text, marginBottom:14 }}>{lang==="bn"?"অর্ডার সারসংক্ষেপ":"Order Summary"}</h4>
          {cart.map(item => (
            <div key={item.key} style={{ display:"flex", gap:10, marginBottom:10, alignItems:"center" }}>
              <img src={item.image} style={{ width:44, height:44, objectFit:"cover", borderRadius:6, flexShrink:0 }} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:12, fontWeight:600, color:th.text, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{lang==="bn"?item.nameBn:item.nameEn}</div>
                <div style={{ fontSize:11, color:th.muted }}>×{item.qty}</div>
              </div>
              <div style={{ fontSize:13, fontWeight:700, color:th.accent }}>{fmt(item.price*item.qty,lang)}</div>
            </div>
          ))}
          <div style={{ borderTop:`1px solid ${th.border}`, paddingTop:12, marginTop:4 }}>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:16, fontWeight:900, color:th.text }}>
              <span>{lang==="bn"?"মোট":"Total"}</span>
              <span style={{ color:th.accent }}>{fmt(total,lang)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ORDERS PAGE ───────────────────────────────────────────────────────────────
function OrdersPage() {
  const { th, lang, orders, setPage, user } = useContext(AppCtx);
  const statusColor = { confirmed:"#27ae60", shipped:"#2980b9", delivered:"#8e44ad", cancelled:"#e74c3c" };
  const statusBn = { confirmed:"নিশ্চিত", shipped:"শিপড", delivered:"ডেলিভারড", cancelled:"বাতিল" };
  if (!user) return (
    <div style={{ textAlign:"center", padding:"80px 20px" }}>
      <div style={{ fontSize:70, marginBottom:16 }}>🔐</div>
      <h2 style={{ color:th.text, marginBottom:12 }}>{lang==="bn"?"লগইন করুন":"Please Login"}</h2>
      <button onClick={()=>setPage("auth")} style={{ background:th.accent, color:"#fff", border:"none", borderRadius:28, padding:"12px 28px", cursor:"pointer", fontSize:15, fontWeight:700, fontFamily:"inherit" }}>{lang==="bn"?"লগইন":"Login"}</button>
    </div>
  );
  return (
    <div style={{ maxWidth:900, margin:"0 auto", padding:"28px 20px", animation:"fadeIn 0.4s ease" }}>
      <h1 style={{ fontSize:24, fontWeight:900, color:th.text, marginBottom:24 }}>📦 {lang==="bn"?"আমার অর্ডার":"My Orders"}</h1>
      {orders.length===0 ? (
        <div style={{ textAlign:"center", padding:"60px 20px", color:th.muted }}>
          <div style={{ fontSize:70, marginBottom:16 }}>📭</div>
          <p style={{ fontSize:16 }}>{lang==="bn"?"কোনো অর্ডার নেই":"No orders yet"}</p>
          <button onClick={()=>setPage("home")} style={{ marginTop:16, background:th.accent, color:"#fff", border:"none", borderRadius:28, padding:"12px 24px", cursor:"pointer", fontSize:14, fontWeight:700, fontFamily:"inherit" }}>{lang==="bn"?"কেনাকাটা করুন":"Shop Now"}</button>
        </div>
      ) : orders.map(order => (
        <div key={order.id} style={{ background:th.card, border:`1px solid ${th.border}`, borderRadius:16, padding:20, marginBottom:16 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14, flexWrap:"wrap", gap:8 }}>
            <div>
              <span style={{ fontSize:14, fontWeight:700, color:th.text }}>#{order.id}</span>
              <span style={{ fontSize:12, color:th.muted, marginLeft:10 }}>📅 {order.date}</span>
            </div>
            <div style={{ display:"flex", gap:10, alignItems:"center" }}>
              <span style={{ background:statusColor[order.status]||"#888", color:"#fff", fontSize:12, fontWeight:700, padding:"3px 12px", borderRadius:20 }}>
                {lang==="bn"?statusBn[order.status]:order.status}
              </span>
              <span style={{ fontSize:16, fontWeight:900, color:th.accent }}>{fmt(order.total,lang)}</span>
            </div>
          </div>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            {order.items.map((item,i) => (
              <div key={i} style={{ display:"flex", gap:8, alignItems:"center", background:th.input, borderRadius:10, padding:"8px 12px" }}>
                <img src={item.image} style={{ width:36, height:36, objectFit:"cover", borderRadius:6 }} />
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color:th.text }}>{lang==="bn"?item.nameBn:item.nameEn}</div>
                  <div style={{ fontSize:11, color:th.muted }}>×{item.qty} • {fmt(item.price,lang)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── AUTH PAGE ─────────────────────────────────────────────────────────────────
function AuthPage() {
  const { th, lang, setUser, setPage, showToast } = useContext(AppCtx);
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name:"", email:"", phone:"", password:"", confirm:"" });
  const [err, setErr] = useState("");
  const F = v => setForm(f=>({...f,...v}));

  const handle = () => {
    setErr("");
    if (!form.email || !form.password) { setErr(lang==="bn"?"সব ঘর পূরণ করুন":"Fill all fields"); return; }
    if (mode==="signup" && form.password!==form.confirm) { setErr(lang==="bn"?"পাসওয়ার্ড মিলছে না":"Passwords don't match"); return; }
    if (mode==="signup" && !form.name) { setErr(lang==="bn"?"নাম দিন":"Enter your name"); return; }
    setUser({ name:form.name||form.email.split("@")[0], email:form.email, phone:form.phone });
    showToast(mode==="login"?(lang==="bn"?"স্বাগতম! 👋":"Welcome back! 👋"):(lang==="bn"?"সফলভাবে নিবন্ধিত! 🎉":"Registered successfully! 🎉"));
    setPage("home");
  };

  return (
    <div style={{ minHeight:"80vh", display:"flex", alignItems:"center", justifyContent:"center", padding:20, animation:"fadeIn 0.4s ease" }}>
      <div style={{ background:th.card, border:`1px solid ${th.border}`, borderRadius:24, padding:40, width:"100%", maxWidth:420, boxShadow:"0 20px 60px rgba(0,0,0,0.1)" }}>
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ fontSize:44, marginBottom:8 }}>👗</div>
          <h1 style={{ fontFamily:"'Noto Sans Bengali'", fontSize:22, fontWeight:900, color:th.accent, marginBottom:4 }}>{lang==="bn"?"রঙিন বাজার":"Rongeen Bazar"}</h1>
          <p style={{ fontSize:14, color:th.muted }}>{mode==="login"?(lang==="bn"?"আপনার অ্যাকাউন্টে প্রবেশ করুন":"Sign in to your account"):(lang==="bn"?"নতুন অ্যাকাউন্ট তৈরি করুন":"Create a new account")}</p>
        </div>
        <div style={{ display:"flex", background:th.input, borderRadius:12, padding:4, marginBottom:24 }}>
          {[["login",{bn:"লগইন",en:"Login"}],["signup",{bn:"নিবন্ধন",en:"Sign Up"}]].map(([m,label]) => (
            <button key={m} onClick={()=>setMode(m)} style={{ flex:1, background:mode===m?th.card:"transparent", border:"none", borderRadius:9, padding:"9px 0", cursor:"pointer", fontSize:14, fontWeight:700, color:mode===m?th.text:th.muted, fontFamily:"inherit", transition:"all 0.2s", boxShadow:mode===m?"0 2px 8px rgba(0,0,0,0.08)":"none" }}>
              {t(label,lang)}
            </button>
          ))}
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {mode==="signup" && (
            <div>
              <label style={{ fontSize:12, color:th.muted, fontWeight:600, display:"block", marginBottom:6 }}>{lang==="bn"?"পূর্ণ নাম":"Full Name"}</label>
              <input value={form.name} onChange={e=>F({name:e.target.value})} placeholder={lang==="bn"?"আপনার নাম":"Your name"} style={{ width:"100%", background:th.input, border:`1px solid ${th.border}`, borderRadius:10, padding:"11px 14px", color:th.text, fontFamily:"inherit", fontSize:14, outline:"none" }} />
            </div>
          )}
          {[["email","📧",{bn:"ইমেইল",en:"Email"},"email"],["password","🔒",{bn:"পাসওয়ার্ড",en:"Password"},"password"]].map(([key,icon,label,type]) => (
            <div key={key}>
              <label style={{ fontSize:12, color:th.muted, fontWeight:600, display:"block", marginBottom:6 }}>{t(label,lang)}</label>
              <div style={{ position:"relative" }}>
                <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:16 }}>{icon}</span>
                <input type={type} value={form[key]} onChange={e=>F({[key]:e.target.value})} style={{ width:"100%", background:th.input, border:`1px solid ${th.border}`, borderRadius:10, padding:"11px 14px 11px 38px", color:th.text, fontFamily:"inherit", fontSize:14, outline:"none" }} />
              </div>
            </div>
          ))}
          {mode==="signup" && (
            <div>
              <label style={{ fontSize:12, color:th.muted, fontWeight:600, display:"block", marginBottom:6 }}>{lang==="bn"?"পাসওয়ার্ড নিশ্চিত করুন":"Confirm Password"}</label>
              <input type="password" value={form.confirm} onChange={e=>F({confirm:e.target.value})} style={{ width:"100%", background:th.input, border:`1px solid ${th.border}`, borderRadius:10, padding:"11px 14px", color:th.text, fontFamily:"inherit", fontSize:14, outline:"none" }} />
            </div>
          )}
        </div>
        {err && <div style={{ background:"#fdf2f2", border:"1px solid #e74c3c", borderRadius:8, padding:"8px 14px", fontSize:13, color:"#e74c3c", marginTop:14 }}>⚠️ {err}</div>}
        <button onClick={handle} className="btn-primary" style={{ width:"100%", background:th.accent, color:"#fff", border:"none", borderRadius:28, padding:"14px 0", cursor:"pointer", fontSize:16, fontWeight:800, fontFamily:"inherit", marginTop:20, transition:"all 0.2s" }}>
          {mode==="login"?(lang==="bn"?"লগইন করুন":"Login"):(lang==="bn"?"নিবন্ধন করুন":"Sign Up")}
        </button>
        <div style={{ textAlign:"center", marginTop:16, fontSize:13, color:th.muted }}>
          {mode==="login"?(lang==="bn"?"অ্যাকাউন্ট নেই?":"Don't have account?"):(lang==="bn"?"ইতিমধ্যে আছে?":"Already have account?")}
          <button onClick={()=>setMode(mode==="login"?"signup":"login")} style={{ background:"none", border:"none", cursor:"pointer", color:th.accent, fontWeight:700, fontFamily:"inherit", marginLeft:4, fontSize:13 }}>
            {mode==="login"?(lang==="bn"?"নিবন্ধন করুন":"Sign Up"):(lang==="bn"?"লগইন করুন":"Login")}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── WISHLIST PAGE ─────────────────────────────────────────────────────────────
function WishlistPage() {
  const { th, lang, wishlist, setPage } = useContext(AppCtx);
  const items = PRODUCTS.filter(p => wishlist.includes(p.id));
  return (
    <div style={{ maxWidth:1100, margin:"0 auto", padding:"28px 20px" }}>
      <h1 style={{ fontSize:24, fontWeight:900, color:th.text, marginBottom:24 }}>❤️ {lang==="bn"?"পছন্দের পণ্য":"Wishlist"} ({items.length})</h1>
      {items.length===0 ? (
        <div style={{ textAlign:"center", padding:60, color:th.muted }}>
          <div style={{ fontSize:60, marginBottom:12 }}>🤍</div>
          <p>{lang==="bn"?"উইশলিস্ট খালি":"Wishlist is empty"}</p>
          <button onClick={()=>setPage("home")} style={{ marginTop:16, background:th.accent, color:"#fff", border:"none", borderRadius:28, padding:"11px 24px", cursor:"pointer", fontFamily:"inherit", fontWeight:700, fontSize:14 }}>{lang==="bn"?"পণ্য দেখুন":"Browse Products"}</button>
        </div>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:20 }}>
          {items.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}

// ── SECTION WRAPPER ───────────────────────────────────────────────────────────
function Section({ title, sub, children }) {
  const { th, lang } = useContext(AppCtx);
  return (
    <div style={{ marginBottom:40 }}>
      <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <h2 style={{ fontSize:22, fontWeight:900, color:th.text, marginBottom:4 }}>{t(title,lang)}</h2>
          <p style={{ fontSize:13, color:th.muted }}>{t(sub,lang)}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  const { th, lang } = useContext(AppCtx);
  return (
    <footer style={{ background:th.card, borderTop:`1px solid ${th.border}`, marginTop:48, padding:"32px 20px 20px" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:28, marginBottom:24 }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
            <span style={{ fontSize:24 }}>👗</span>
            <span style={{ fontFamily:"'Noto Sans Bengali'", fontWeight:900, fontSize:18, color:th.accent }}>{lang==="bn"?"রঙিন বাজার":"Rongeen Bazar"}</span>
          </div>
          <p style={{ fontSize:13, color:th.muted, lineHeight:1.7 }}>{lang==="bn"?"সেরা মানের দেশীয় পোশাক, সাশ্রয়ী মূল্যে।":"Best quality local fashion at affordable prices."}</p>
        </div>
        {[[{bn:"দ্রুত লিংক",en:"Quick Links"},[{bn:"হোম",en:"Home"},{bn:"পণ্য",en:"Products"},{bn:"অর্ডার",en:"Orders"}]],[{bn:"সাহায্য",en:"Help"},[{bn:"ডেলিভারি তথ্য",en:"Delivery Info"},{bn:"রিটার্ন পলিসি",en:"Return Policy"},{bn:"যোগাযোগ",en:"Contact"}]]].map(([title,links],i) => (
          <div key={i}>
            <div style={{ fontSize:14, fontWeight:700, color:th.text, marginBottom:12 }}>{t(title,lang)}</div>
            {links.map((l,j) => <div key={j} style={{ fontSize:13, color:th.muted, marginBottom:8, cursor:"pointer" }}>▸ {t(l,lang)}</div>)}
          </div>
        ))}
        <div>
          <div style={{ fontSize:14, fontWeight:700, color:th.text, marginBottom:12 }}>{lang==="bn"?"পেমেন্ট পদ্ধতি":"Payment"}</div>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            {["💗 bKash","🟠 Nagad","💵 COD"].map(m => <span key={m} style={{ background:th.input, border:`1px solid ${th.border}`, borderRadius:8, padding:"4px 10px", fontSize:12, color:th.text }}>{m}</span>)}
          </div>
        </div>
      </div>
      <div style={{ borderTop:`1px solid ${th.border}`, paddingTop:16, textAlign:"center", fontSize:12, color:th.muted }}>
        © 2025 {lang==="bn"?"রঙিন বাজার। সর্বস্বত্ব সংরক্ষিত।":"Rongeen Bazar. All rights reserved."}
      </div>
    </footer>
  );
}

// ── TOAST ─────────────────────────────────────────────────────────────────────
function Toast({ msg, type }) {
  return (
    <div style={{ position:"fixed", bottom:24, right:24, zIndex:999, background:type==="error"?"#e74c3c":"#27ae60", color:"#fff", borderRadius:12, padding:"12px 20px", fontSize:14, fontWeight:600, boxShadow:"0 8px 24px rgba(0,0,0,0.2)", animation:"slideIn 0.3s ease", maxWidth:300 }}>
      {msg}
    </div>
  );
}
