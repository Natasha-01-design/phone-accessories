import { useState, useEffect } from "react";
import {
  Search, ShoppingCart, Heart, Menu, X, Star, Shield, Truck,
  RefreshCw, User, MapPin, CreditCard, Check, ChevronDown,
  ChevronRight, Plus, Minus, Trash2, ArrowRight, Instagram,
  Twitter, Youtube, Mail, Lock, Tag, MessageCircle, HelpCircle,
  SlidersHorizontal, Award, CheckCircle, Package, Zap, Eye,
  Globe, Headphones,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// ── Types ──────────────────────────────────────────────────────────────────

type Page =
  | "home"
  | "shop"
  | "product"
  | "cart"
  | "checkout"
  | "confirmation"
  | "account"
  | "about"
  | "support";

interface Product {
  id: number;
  name: string;
  brand: string;
  category: "phones" | "laptops" | "cameras" | "accessories";
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  image: string;
  images: string[];
  colors: { name: string; hex: string }[];
  storageOptions?: string[];
  specs: Record<string, string>;
  description: string;
  inStock: boolean;
  stockCount: number;
  featured?: boolean;
}

interface CartItem {
  productId: number;
  qty: number;
  color: string;
  storage?: string;
}

// ── Data ───────────────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Apex Pro 15 Ultra",
    brand: "Apex",
    category: "phones",
    price: 1299,
    originalPrice: 1499,
    rating: 4.8,
    reviewCount: 312,
    badge: "New",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&h=800&fit=crop&auto=format",
    ],
    colors: [
      { name: "Midnight", hex: "#1a1a2e" },
      { name: "Titanium", hex: "#8e9eab" },
      { name: "Crimson", hex: "#c0392b" },
    ],
    storageOptions: ["128GB", "256GB", "512GB", "1TB"],
    specs: {
      Display: "6.7\" AMOLED 120Hz",
      Processor: "OctoCore 3.4GHz",
      RAM: "12GB LPDDR5",
      Storage: "256GB UFS 3.1",
      Camera: "200MP + 50MP + 12MP",
      Battery: "5200mAh",
      OS: "Android 14",
      "5G": "Sub-6 + mmWave",
    },
    description:
      "The Apex Pro 15 Ultra redefines flagship performance. With a cinema-grade 6.7\" AMOLED display at 120Hz, a quad-camera system anchored by a 200MP primary sensor, and all-day 5200mAh battery life, this is the phone for those who demand more.",
    inStock: true,
    stockCount: 24,
  },
  {
    id: 2,
    name: "Vega S23 Pro",
    brand: "Vega",
    category: "phones",
    price: 849,
    rating: 4.6,
    reviewCount: 189,
    badge: "Hot",
    image:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&h=800&fit=crop&auto=format",
    ],
    colors: [
      { name: "Phantom Black", hex: "#0a0a0a" },
      { name: "Lavender", hex: "#9b59b6" },
    ],
    storageOptions: ["128GB", "256GB"],
    specs: {
      Display: "6.4\" Dynamic AMOLED 120Hz",
      Processor: "Snapdragon 8 Gen 2",
      RAM: "8GB",
      Storage: "256GB",
      Camera: "108MP + 12MP + 10MP",
      Battery: "4500mAh",
      OS: "Android 14",
    },
    description:
      "Elegant design meets powerful performance. The Vega S23 Pro packs a punch with Snapdragon 8 Gen 2 and a versatile triple-camera setup that captures everything with stunning clarity.",
    inStock: true,
    stockCount: 48,
  },
  {
    id: 3,
    name: "NovaBook Pro 16",
    brand: "Nova",
    category: "laptops",
    price: 2199,
    originalPrice: 2499,
    rating: 4.9,
    reviewCount: 156,
    badge: "Sale",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop&auto=format",
    ],
    colors: [
      { name: "Space Gray", hex: "#4a4a4a" },
      { name: "Silver", hex: "#c0c0c0" },
    ],
    storageOptions: ["512GB", "1TB", "2TB"],
    specs: {
      Display: "16.2\" Liquid Retina XDR",
      Processor: "M3 Pro 12-core",
      RAM: "18GB Unified",
      Storage: "512GB SSD",
      GPU: "18-core GPU",
      Battery: "22hr life",
      Ports: "3× TB4, HDMI, SD",
      Weight: "2.14 kg",
    },
    description:
      "The NovaBook Pro 16 is the ultimate laptop for creative professionals. With the M3 Pro chip, a stunning Liquid Retina XDR display, and up to 22 hours of battery life, work without limits anywhere.",
    inStock: true,
    stockCount: 12,
  },
  {
    id: 4,
    name: "StrikeForce G17 Pro",
    brand: "StrikeForce",
    category: "laptops",
    price: 1799,
    rating: 4.7,
    reviewCount: 94,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=600&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=800&fit=crop&auto=format",
    ],
    colors: [{ name: "Eclipse Black", hex: "#0a0a0a" }],
    storageOptions: ["1TB", "2TB"],
    specs: {
      Display: "17.3\" QHD 240Hz",
      Processor: "Intel Core i9-13900HX",
      RAM: "32GB DDR5",
      Storage: "1TB NVMe",
      GPU: "RTX 4080 16GB",
      Battery: "90Wh",
      Cooling: "Dual Fan + Vapor Chamber",
      Weight: "3.1 kg",
    },
    description:
      "Engineered for victory. The StrikeForce G17 Pro brings desktop-class RTX 4080 performance to a portable chassis. With a 240Hz QHD display and Intel Core i9, nothing stands between you and the win.",
    inStock: true,
    stockCount: 7,
  },
  {
    id: 5,
    name: "LensMax R7 Mark II",
    brand: "LensMax",
    category: "cameras",
    price: 2899,
    originalPrice: 3199,
    rating: 4.9,
    reviewCount: 78,
    badge: "Sale",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=800&h=800&fit=crop&auto=format",
    ],
    colors: [{ name: "Black", hex: "#1a1a1a" }],
    specs: {
      Sensor: "45MP Full-Frame BSI CMOS",
      Autofocus: "693-point Phase Detection",
      Video: "8K RAW / 4K 120fps",
      ISO: "100–51200 ext.",
      Burst: "20fps RAW",
      Stabilization: "7-stop IBIS",
      Battery: "800 shots",
      Weight: "723g",
    },
    description:
      "A mirrorless masterpiece. The LensMax R7 Mark II combines a 45MP full-frame sensor with class-leading autofocus and 8K video recording — the definitive choice for professional image-makers.",
    inStock: true,
    stockCount: 5,
  },
  {
    id: 6,
    name: "SnapShot Z9 Compact",
    brand: "SnapShot",
    category: "cameras",
    price: 899,
    rating: 4.5,
    reviewCount: 143,
    image:
      "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=600&h=600&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=800&h=800&fit=crop&auto=format",
    ],
    colors: [
      { name: "Graphite", hex: "#4b4b4b" },
      { name: "Champagne", hex: "#c6a96b" },
    ],
    specs: {
      Sensor: "24MP APS-C X-Trans",
      Lens: "23mm f/2 equivalent",
      Video: "4K 30fps",
      ISO: "200–12800",
      Battery: "420 shots",
      Weight: "370g",
    },
    description:
      "Powerful photography in a jacket pocket. The SnapShot Z9 Compact packs a 24MP APS-C sensor and premium fixed lens into a remarkably small body — perfect for street photographers and travelers.",
    inStock: true,
    stockCount: 31,
  },
  {
    id: 7,
    name: "SoundVault WH-950XM",
    brand: "SoundVault",
    category: "accessories",
    price: 379,
    originalPrice: 449,
    rating: 4.8,
    reviewCount: 521,
    badge: "Sale",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop&auto=format",
    ],
    colors: [
      { name: "Midnight Black", hex: "#0a0a0a" },
      { name: "Platinum Silver", hex: "#b0b8c1" },
      { name: "Navy Blue", hex: "#1a3a5c" },
    ],
    specs: {
      Driver: "40mm Dynamic",
      ANC: "Industry-leading 40dB",
      Battery: "30hr (ANC on)",
      Charging: "USB-C, 3hr full",
      "Quick Charge": "10 min = 5hr",
      Bluetooth: "5.3 Multipoint",
      Codec: "LDAC, AAC, SBC",
      Weight: "254g",
    },
    description:
      "Silence the world, hear the music. The SoundVault WH-950XM delivers best-in-class noise cancellation with audiophile-grade sound quality and all-day comfort — you'll forget you're wearing them.",
    inStock: true,
    stockCount: 89,
  },
  {
    id: 8,
    name: "AirBuds Pro 3",
    brand: "SoundVault",
    category: "accessories",
    price: 249,
    rating: 4.7,
    reviewCount: 388,
    badge: "Hot",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=600&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=800&fit=crop&auto=format",
    ],
    colors: [
      { name: "White", hex: "#f5f5f5" },
      { name: "Black", hex: "#1a1a1a" },
      { name: "Sage", hex: "#87a878" },
    ],
    specs: {
      Driver: "6mm Dynamic",
      ANC: "Adaptive ANC + Transparency",
      Battery: "6hr + 24hr case",
      Charging: "USB-C + Wireless",
      "Water Resistance": "IPX4",
      Bluetooth: "5.3",
      Codec: "AAC, SBC",
      Weight: "4.9g per bud",
    },
    description:
      "True wireless freedom, redefined. AirBuds Pro 3 features adaptive ANC, transparency mode, and a wireless-charging case — the ultimate on-the-go audio experience.",
    inStock: true,
    stockCount: 156,
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Marcus Chen",
    product: "Apex Pro 15 Ultra",
    rating: 5,
    text: "Incredible phone. The camera quality blew me away — I've been getting professional-grade shots at every family event. Delivery was next day and the packaging was immaculate.",
    avatar: "MC",
    date: "Dec 12, 2024",
  },
  {
    id: 2,
    name: "Sarah Okonkwo",
    product: "NovaBook Pro 16",
    rating: 5,
    text: "The NovaBook handles 4K video editing effortlessly. TechHub's support team helped me pick the right storage config. Best tech purchase I've made this year.",
    avatar: "SO",
    date: "Dec 5, 2024",
  },
  {
    id: 3,
    name: "James Ritter",
    product: "SoundVault WH-950XM",
    rating: 5,
    text: "The ANC is genuinely life-changing for open-plan office work. 30-hour battery means I charge them on Sundays and forget about it all week.",
    avatar: "JR",
    date: "Nov 28, 2024",
  },
];

const FAQS = [
  {
    q: "What is your return policy?",
    a: "We offer a 30-day hassle-free return policy on all items. Products must be in original condition and packaging. For defective items, we cover return shipping at no cost to you.",
  },
  {
    q: "Do you offer a price match guarantee?",
    a: "Yes. Find the same product cheaper from an authorized retailer within 14 days of purchase and we'll refund the difference — no questions asked.",
  },
  {
    q: "How does the 2-year warranty work?",
    a: "All TechHub products include the manufacturer warranty plus our own extended coverage at no extra cost. We handle all warranty claims on your behalf so you never have to deal with manufacturers directly.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, Google Pay, and buy-now-pay-later via Klarna and Affirm.",
  },
  {
    q: "How long does shipping take?",
    a: "Standard shipping takes 2–5 business days. Express (next business day) is available for most items. Orders over $99 qualify for free standard shipping.",
  },
  {
    q: "Can I track my order?",
    a: "Yes. You'll receive a tracking link via email once your order ships. You can also track all orders in your TechHub account dashboard under Order History.",
  },
];

// ── Utils ──────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0 });

const getCartTotal = (cart: CartItem[]) =>
  cart.reduce((sum, item) => {
    const p = PRODUCTS.find((p) => p.id === item.productId);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);

const getCartCount = (cart: CartItem[]) =>
  cart.reduce((s, i) => s + i.qty, 0);

// ── StarRating ─────────────────────────────────────────────────────────────

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={
            i <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-transparent text-slate-700"
          }
        />
      ))}
    </div>
  );
}

// ── Badge ──────────────────────────────────────────────────────────────────

const BADGE_MAP: Record<string, string> = {
  New: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  Sale: "bg-rose-500/20 text-rose-400 border border-rose-500/30",
  Hot: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
  Limited: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
};

function Pill({ label }: { label: string }) {
  return (
    <span
      className={`text-[10px] font-mono font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full ${BADGE_MAP[label] ?? "bg-slate-700 text-slate-300"}`}
    >
      {label}
    </span>
  );
}

// ── ProductCard ────────────────────────────────────────────────────────────

function ProductCard({
  product,
  onNavigate,
  onAddToCart,
  wishlist,
  toggleWishlist,
  compareList,
  toggleCompare,
}: {
  product: Product;
  onNavigate: (page: Page, id?: number) => void;
  onAddToCart: (item: CartItem) => void;
  wishlist: Set<number>;
  toggleWishlist: (id: number) => void;
  compareList: number[];
  toggleCompare: (id: number) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <motion.div
      className="group relative bg-[#0d0d1c] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_35px_rgba(59,130,246,0.09)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Action buttons */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all ${wishlist.has(product.id) ? "bg-rose-500/20 text-rose-400" : "bg-black/50 text-slate-400 hover:text-rose-400"}`}
        >
          <Heart
            size={13}
            fill={wishlist.has(product.id) ? "currentColor" : "none"}
          />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleCompare(product.id);
          }}
          className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all ${compareList.includes(product.id) ? "bg-cyan-500/20 text-cyan-400" : "bg-black/50 text-slate-400 hover:text-cyan-400"}`}
          title="Add to compare"
        >
          <SlidersHorizontal size={12} />
        </button>
      </div>

      {product.badge && (
        <div className="absolute top-3 left-3 z-10">
          <Pill label={product.badge} />
        </div>
      )}

      {/* Image */}
      <div
        className="relative h-52 bg-[#07070f] flex items-center justify-center overflow-hidden cursor-pointer"
        onClick={() => onNavigate("product", product.id)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate("product", product.id);
                }}
                className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white text-xs px-4 py-2 rounded-full hover:bg-white/20 transition-all border border-white/20"
              >
                <Eye size={12} />
                Quick View
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div
        className="p-4 cursor-pointer"
        onClick={() => onNavigate("product", product.id)}
      >
        <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mb-1">
          {product.brand}
        </p>
        <h3 className="text-sm font-semibold text-slate-100 leading-snug mb-2 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-1.5 mb-3">
          <StarRating rating={product.rating} size={11} />
          <span className="text-[10px] text-slate-500">({product.reviewCount})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-white font-['JetBrains_Mono',monospace]">
            {fmt(product.price)}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-xs text-slate-600 line-through font-['JetBrains_Mono',monospace]">
                {fmt(product.originalPrice)}
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold">
                -{discount}%
              </span>
            </>
          )}
        </div>
      </div>

      <div className="px-4 pb-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart({
              productId: product.id,
              qty: 1,
              color: product.colors[0].name,
              storage: product.storageOptions?.[0],
            });
          }}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold py-2.5 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.45)] active:scale-[0.98]"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}

// ── SearchOverlay ──────────────────────────────────────────────────────────

function SearchOverlay({
  onClose,
  onNavigate,
}: {
  onClose: () => void;
  onNavigate: (page: Page, id?: number) => void;
}) {
  const [query, setQuery] = useState("");
  const results =
    query.length >= 2
      ? PRODUCTS.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.brand.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 6)
      : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center pt-20 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mb-3">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search phones, laptops, cameras, accessories..."
            className="w-full bg-[#0d0d1c] border border-white/10 text-white placeholder-slate-500 pl-12 pr-12 py-4 rounded-xl text-base focus:outline-none focus:border-blue-500/50"
          />
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {results.length > 0 && (
          <div className="bg-[#0d0d1c] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            {results.map((p, i) => (
              <button
                key={p.id}
                onClick={() => {
                  onNavigate("product", p.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-4 p-4 hover:bg-white/4 transition-colors text-left ${i > 0 ? "border-t border-white/5" : ""}`}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-12 h-12 rounded-lg object-cover bg-[#07070f] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{p.name}</p>
                  <p className="text-xs text-slate-500">
                    {p.brand} · {p.category}
                  </p>
                </div>
                <span className="text-sm font-mono font-bold text-blue-400 shrink-0">
                  {fmt(p.price)}
                </span>
              </button>
            ))}
          </div>
        )}

        {query.length >= 2 && results.length === 0 && (
          <div className="text-center py-10 text-slate-500 text-sm">
            No results for &ldquo;{query}&rdquo;
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ── Nav ────────────────────────────────────────────────────────────────────

function Nav({
  currentPage,
  onNavigate,
  cartCount,
}: {
  currentPage: Page;
  onNavigate: (page: Page, id?: number) => void;
  cartCount: number;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links: { label: string; page: Page }[] = [
    { label: "Home", page: "home" },
    { label: "Shop", page: "shop" },
    { label: "About", page: "about" },
    { label: "Support", page: "support" },
  ];

  return (
    <>
      <AnimatePresence>
        {searchOpen && (
          <SearchOverlay
            onClose={() => setSearchOpen(false)}
            onNavigate={(p, id) => {
              onNavigate(p, id);
              setSearchOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-[#07070f]/95 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.5)]" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 group shrink-0"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:shadow-[0_0_16px_rgba(59,130,246,0.7)] transition-all">
              <Zap size={16} className="text-white fill-white" />
            </div>
            <span className="font-['Outfit',sans-serif] text-xl font-black text-white tracking-tight">
              Tech<span className="text-blue-400">Hub</span>
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <button
                key={l.page}
                onClick={() => onNavigate(l.page)}
                className={`text-sm font-medium transition-colors ${currentPage === l.page ? "text-blue-400" : "text-slate-400 hover:text-white"}`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              <Search size={18} />
            </button>
            <button
              onClick={() => onNavigate("account")}
              className="hidden sm:flex w-9 h-9 items-center justify-center text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              <User size={18} />
            </button>
            <button
              onClick={() => onNavigate("cart")}
              className="relative w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blue-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-[#0d0d1c] border-t border-white/5 overflow-hidden"
            >
              <div className="px-4 py-3 flex flex-col gap-1">
                {links.map((l) => (
                  <button
                    key={l.page}
                    onClick={() => {
                      onNavigate(l.page);
                      setMenuOpen(false);
                    }}
                    className={`text-sm font-medium px-3 py-2.5 rounded-xl text-left transition-colors ${currentPage === l.page ? "bg-blue-500/10 text-blue-400" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
                  >
                    {l.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    onNavigate("account");
                    setMenuOpen(false);
                  }}
                  className="text-sm font-medium px-3 py-2.5 rounded-xl text-left text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
                >
                  Account
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

// ── TrustBadges ────────────────────────────────────────────────────────────

function TrustBadges() {
  const items = [
    { icon: <Truck size={18} />, label: "Free Shipping", sub: "On orders over $99" },
    { icon: <Shield size={18} />, label: "2-Year Warranty", sub: "On all products" },
    { icon: <RefreshCw size={18} />, label: "30-Day Returns", sub: "Hassle-free policy" },
    { icon: <Lock size={18} />, label: "Secure Checkout", sub: "256-bit SSL encryption" },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((b) => (
        <div
          key={b.label}
          className="flex items-center gap-3 bg-[#0d0d1c] border border-white/5 rounded-xl p-4"
        >
          <div className="text-cyan-400 shrink-0">{b.icon}</div>
          <div>
            <p className="text-xs font-semibold text-white">{b.label}</p>
            <p className="text-[10px] text-slate-500">{b.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── HomePage ───────────────────────────────────────────────────────────────

function HomePage({
  onNavigate,
  onAddToCart,
  wishlist,
  toggleWishlist,
  compareList,
  toggleCompare,
}: {
  onNavigate: (page: Page, id?: number) => void;
  onAddToCart: (item: CartItem) => void;
  wishlist: Set<number>;
  toggleWishlist: (id: number) => void;
  compareList: number[];
  toggleCompare: (id: number) => void;
}) {
  const featured = PRODUCTS.find((p) => p.featured && p.category === "phones")!;
  const bestsellers = PRODUCTS.slice(0, 6);

  const categories = [
    {
      name: "Phones",
      img: "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=600&h=400&fit=crop&auto=format",
      count: "12 products",
    },
    {
      name: "Laptops",
      img: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=600&h=400&fit=crop&auto=format",
      count: "8 products",
    },
    {
      name: "Cameras",
      img: "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?w=600&h=400&fit=crop&auto=format",
      count: "6 products",
    },
    {
      name: "Accessories",
      img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop&auto=format",
      count: "24 products",
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#07070f]">
        <div
          className="absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute top-1/2 right-[20%] -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-[15%] w-[300px] h-[300px] bg-cyan-600/6 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2.5 mb-6">
              <span className="h-px w-10 bg-blue-500" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-blue-400">
                Just Launched
              </span>
            </div>
            <h1 className="font-['Outfit',sans-serif] text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.04] mb-6">
              The Future,
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">
                Unboxed.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-8 max-w-md">
              Flagship phones, pro-grade laptops, cinema cameras. TechHub
              delivers tomorrow&apos;s technology with 2-year warranty and
              next-day shipping.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <button
                onClick={() => onNavigate("shop")}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3.5 rounded-xl transition-all hover:shadow-[0_0_32px_rgba(59,130,246,0.55)] active:scale-[0.98]"
              >
                Shop Now <ArrowRight size={16} />
              </button>
              <button
                onClick={() => onNavigate("shop")}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/10 hover:border-white/20 transition-all active:scale-[0.98]"
              >
                View All Deals
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {["200MP Camera", "120Hz Display", "5G Ready", "2yr Warranty"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-blue-500/5 rounded-3xl blur-2xl" />
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-b from-blue-500/12 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <img
                src={featured.image}
                alt={featured.name}
                className="relative w-full max-w-sm mx-auto object-contain drop-shadow-2xl transition-transform duration-700 group-hover:-translate-y-3"
              />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-6 left-0 bg-[#0d0d1c]/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl"
            >
              <p className="text-[10px] text-slate-500 font-mono mb-0.5">
                Featured Drop
              </p>
              <p className="text-sm font-bold text-white mb-1 max-w-[150px] truncate">
                {featured.name}
              </p>
              <p className="text-base font-['JetBrains_Mono',monospace] font-black text-blue-400">
                {fmt(featured.price)}
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-30">
          <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-slate-500">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-px h-7 bg-gradient-to-b from-slate-500 to-transparent"
          />
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-[#0a0a18] border-y border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <TrustBadges />
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-[#07070f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-9">
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-blue-400 mb-2">
              Browse by Category
            </p>
            <h2 className="font-['Outfit',sans-serif] text-3xl font-bold text-white">
              Shop by Type
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <motion.button
                key={cat.name}
                onClick={() => onNavigate("shop")}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group relative overflow-hidden rounded-2xl bg-[#0d0d1c] border border-white/5 hover:border-blue-500/30 transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-55 group-hover:opacity-75"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#07070f] via-[#07070f]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                  <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-white">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] text-slate-500">{cat.count}</p>
                </div>
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <ChevronRight size={12} className="text-white" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-16 bg-[#0a0a18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-9">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-cyan-400 mb-2">
                Top Picks
              </p>
              <h2 className="font-['Outfit',sans-serif] text-3xl font-bold text-white">
                Bestsellers
              </h2>
            </div>
            <button
              onClick={() => onNavigate("shop")}
              className="hidden sm:flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              View all <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {bestsellers.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onNavigate={onNavigate}
                onAddToCart={onAddToCart}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                compareList={compareList}
                toggleCompare={toggleCompare}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-[#07070f] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "50K+", label: "Happy Customers" },
              { num: "2,000+", label: "Products in Stock" },
              { num: "4.9★", label: "Average Rating" },
              { num: "24/7", label: "Customer Support" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-['Outfit',sans-serif] text-3xl sm:text-4xl font-black text-white mb-1">
                  {s.num}
                </p>
                <p className="text-sm text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison teaser */}
      <section className="py-16 bg-[#0a0a18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-[#0d0d1c] to-[#0a0a18] border border-white/5 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-cyan-400 mb-3">
                Side-by-side
              </p>
              <h2 className="font-['Outfit',sans-serif] text-3xl font-bold text-white mb-3">
                Compare any two products before you buy.
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                Confused between two models? Use the compare tool — add up to
                three products and view specs head-to-head. Hit the
                &ldquo;compare&rdquo; icon on any product card to get started.
              </p>
            </div>
            <button
              onClick={() => onNavigate("shop")}
              className="shrink-0 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-[0_0_25px_rgba(59,130,246,0.45)] flex items-center gap-2"
            >
              <SlidersHorizontal size={16} /> Compare Products
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-[#07070f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-blue-400 mb-2">
              Real People, Real Results
            </p>
            <h2 className="font-['Outfit',sans-serif] text-3xl font-bold text-white">
              Customer Reviews
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-[#0d0d1c] border border-white/5 rounded-2xl p-6"
              >
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-400">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">{t.name}</p>
                    <p className="text-[10px] text-slate-500">
                      {t.product} · {t.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-[#0a0a18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/5 border border-blue-500/15 rounded-3xl p-10 sm:p-16 text-center">
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-cyan-400 mb-3">
              Stay Ahead
            </p>
            <h2 className="font-['Outfit',sans-serif] text-3xl sm:text-4xl font-bold text-white mb-3">
              Exclusive deals &amp;
              <br />
              early product launches
            </h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto text-sm">
              Join 50,000+ tech enthusiasts. No spam — just the best deals and
              product news, weekly.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thanks for subscribing!");
              }}
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="flex-1 bg-white/5 border border-white/10 text-white placeholder-slate-500 px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 text-sm"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.45)] whitespace-nowrap text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── ShopPage ───────────────────────────────────────────────────────────────

function ShopPage({
  onNavigate,
  onAddToCart,
  wishlist,
  toggleWishlist,
  compareList,
  toggleCompare,
}: {
  onNavigate: (page: Page, id?: number) => void;
  onAddToCart: (item: CartItem) => void;
  wishlist: Set<number>;
  toggleWishlist: (id: number) => void;
  compareList: number[];
  toggleCompare: (id: number) => void;
}) {
  const [category, setCategory] = useState("all");
  const [brand, setBrand] = useState("all");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const brands = Array.from(new Set(PRODUCTS.map((p) => p.brand)));

  const filtered = PRODUCTS.filter(
    (p) => category === "all" || p.category === category
  )
    .filter((p) => brand === "all" || p.brand === brand)
    .filter((p) => p.price <= maxPrice)
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

  const catTabs = [
    { key: "all", label: "All" },
    { key: "phones", label: "Phones" },
    { key: "laptops", label: "Laptops" },
    { key: "cameras", label: "Cameras" },
    { key: "accessories", label: "Accessories" },
  ];

  return (
    <div className="pt-16 min-h-screen bg-[#07070f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-blue-400 mb-1">
            Explore
          </p>
          <h1 className="font-['Outfit',sans-serif] text-4xl font-bold text-white">
            Shop
          </h1>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          {catTabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setCategory(t.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${category === t.key ? "bg-blue-600 text-white shadow-[0_0_16px_rgba(59,130,246,0.4)]" : "bg-[#0d0d1c] border border-white/5 text-slate-400 hover:text-white hover:border-white/10"}`}
            >
              {t.label}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-2">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-[#0d0d1c] border border-white/10 text-slate-300 text-sm px-3 py-2 rounded-xl focus:outline-none focus:border-blue-500/50"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`flex items-center gap-1.5 text-sm px-3 py-2 rounded-xl border transition-all ${filtersOpen ? "border-blue-500/40 bg-blue-500/10 text-blue-400" : "border-white/10 text-slate-400 hover:text-white bg-[#0d0d1c]"}`}
            >
              <SlidersHorizontal size={14} /> Filters
            </button>
          </div>
        </div>

        {/* Filter panel */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-[#0d0d1c] border border-white/5 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-3">
                    Brand
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["all", ...brands].map((b) => (
                      <button
                        key={b}
                        onClick={() => setBrand(b)}
                        className={`text-xs px-3 py-1.5 rounded-full transition-all ${brand === b ? "bg-blue-600 text-white" : "bg-white/5 text-slate-400 hover:text-white"}`}
                      >
                        {b === "all" ? "All Brands" : b}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-3">
                    Max Price
                  </p>
                  <input
                    type="range"
                    min={200}
                    max={5000}
                    step={100}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-blue-500 mb-1"
                  />
                  <p className="text-xs text-slate-400 font-mono">
                    Up to {fmt(maxPrice)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-3">
                    Actions
                  </p>
                  <button
                    onClick={() => {
                      setCategory("all");
                      setBrand("all");
                      setMaxPrice(5000);
                      setSort("featured");
                    }}
                    className="text-xs text-rose-400 hover:text-rose-300 transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-xs text-slate-500 font-mono mb-6">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onNavigate={onNavigate}
                onAddToCart={onAddToCart}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                compareList={compareList}
                toggleCompare={toggleCompare}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-500 mb-4">
              No products match your current filters.
            </p>
            <button
              onClick={() => {
                setCategory("all");
                setBrand("all");
                setMaxPrice(5000);
              }}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── ProductDetailPage ──────────────────────────────────────────────────────

function ProductDetailPage({
  productId,
  onNavigate,
  onAddToCart,
  wishlist,
  toggleWishlist,
}: {
  productId: number;
  onNavigate: (page: Page, id?: number) => void;
  onAddToCart: (item: CartItem) => void;
  wishlist: Set<number>;
  toggleWishlist: (id: number) => void;
}) {
  const product = PRODUCTS.find((p) => p.id === productId);
  const related = PRODUCTS.filter(
    (p) => p.id !== productId && p.category === product?.category
  ).slice(0, 3);

  const [imgIdx, setImgIdx] = useState(0);
  const [colorIdx, setColorIdx] = useState(0);
  const [storageIdx, setStorageIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"description" | "specs" | "reviews">("description");
  const [added, setAdded] = useState(false);

  if (!product)
    return (
      <div className="pt-24 text-center text-slate-500">Product not found.</div>
    );

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const handleAdd = () => {
    onAddToCart({
      productId: product.id,
      qty,
      color: product.colors[colorIdx].name,
      storage: product.storageOptions?.[storageIdx],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="pt-16 min-h-screen bg-[#07070f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-8 font-mono">
          <button
            onClick={() => onNavigate("home")}
            className="hover:text-slate-300 transition-colors"
          >
            Home
          </button>
          <ChevronRight size={10} />
          <button
            onClick={() => onNavigate("shop")}
            className="hover:text-slate-300 transition-colors"
          >
            Shop
          </button>
          <ChevronRight size={10} />
          <span className="text-slate-300 truncate max-w-[200px]">
            {product.name}
          </span>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div>
            <div className="aspect-square bg-[#0d0d1c] rounded-2xl overflow-hidden mb-4 border border-white/5 relative group">
              <img
                src={product.images[imgIdx]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <Pill label={product.badge} />
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${imgIdx === i ? "border-blue-500" : "border-white/5 hover:border-white/20"}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                {product.brand}
              </span>
              {product.badge && <Pill label={product.badge} />}
            </div>

            <h1 className="font-['Outfit',sans-serif] text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-5">
              <StarRating rating={product.rating} size={15} />
              <span className="text-sm text-slate-400">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-['Outfit',sans-serif] text-3xl font-black text-white font-['JetBrains_Mono',monospace]">
                {fmt(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-slate-500 line-through">
                    {fmt(product.originalPrice)}
                  </span>
                  <span className="bg-emerald-500/15 text-emerald-400 text-xs font-semibold px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            {/* Color selector */}
            <div className="mb-5">
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-3">
                Color:{" "}
                <span className="text-white normal-case font-normal tracking-normal">
                  {product.colors[colorIdx].name}
                </span>
              </p>
              <div className="flex gap-2.5">
                {product.colors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setColorIdx(i)}
                    title={c.name}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${colorIdx === i ? "border-blue-400 scale-110 shadow-[0_0_10px_rgba(59,130,246,0.4)]" : "border-transparent hover:border-slate-500"}`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Storage selector */}
            {product.storageOptions && (
              <div className="mb-6">
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-3">
                  Storage
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.storageOptions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setStorageIdx(i)}
                      className={`px-4 py-2 rounded-xl text-sm font-mono font-medium transition-all ${storageIdx === i ? "bg-blue-600 text-white shadow-[0_0_14px_rgba(59,130,246,0.4)]" : "bg-[#0d0d1c] border border-white/10 text-slate-300 hover:border-white/20"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6">
              {product.inStock ? (
                <>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
                  <span className="text-sm text-emerald-400 font-medium">
                    In Stock
                  </span>
                  <span className="text-xs text-slate-500">
                    ({product.stockCount} remaining)
                  </span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 rounded-full bg-rose-400" />
                  <span className="text-sm text-rose-400">Out of Stock</span>
                </>
              )}
            </div>

            {/* Qty + Add */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center bg-[#0d0d1c] border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-11 h-11 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  <Minus size={13} />
                </button>
                <span className="w-10 text-center text-sm font-mono text-white">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(Math.min(product.stockCount, qty + 1))}
                  className="w-11 h-11 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  <Plus size={13} />
                </button>
              </div>

              <button
                onClick={handleAdd}
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center gap-2 font-semibold py-3 rounded-xl transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed ${added ? "bg-emerald-600 text-white" : "bg-blue-600 hover:bg-blue-500 text-white hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]"}`}
              >
                {added ? (
                  <>
                    <Check size={15} /> Added!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={15} /> Add to Cart
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-12 h-12 flex items-center justify-center rounded-xl border transition-all ${wishlist.has(product.id) ? "border-rose-500/50 bg-rose-500/10 text-rose-400" : "border-white/10 text-slate-400 hover:text-white hover:border-white/20"}`}
              >
                <Heart
                  size={17}
                  fill={wishlist.has(product.id) ? "currentColor" : "none"}
                />
              </button>
            </div>

            <button
              onClick={() => {
                onAddToCart({
                  productId: product.id,
                  qty,
                  color: product.colors[colorIdx].name,
                  storage: product.storageOptions?.[storageIdx],
                });
                onNavigate("checkout");
              }}
              className="w-full border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 font-semibold py-3 rounded-xl transition-all mb-5 text-sm"
            >
              Buy Now
            </button>

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: <Truck size={13} />, text: "Free shipping over $99" },
                { icon: <Shield size={13} />, text: "2-year warranty" },
                { icon: <RefreshCw size={13} />, text: "30-day returns" },
              ].map((t) => (
                <div
                  key={t.text}
                  className="flex flex-col items-center gap-1.5 text-center bg-[#0d0d1c] border border-white/5 rounded-xl p-3"
                >
                  <div className="text-cyan-400">{t.icon}</div>
                  <p className="text-[10px] text-slate-500 leading-tight">{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-12">
          <div className="flex gap-1 border-b border-white/5 mb-7">
            {(["description", "specs", "reviews"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-3 text-sm font-medium capitalize transition-all border-b-2 -mb-px ${tab === t ? "border-blue-500 text-blue-400" : "border-transparent text-slate-500 hover:text-slate-300"}`}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === "description" && (
            <p className="text-slate-300 leading-relaxed max-w-2xl text-sm">
              {product.description}
            </p>
          )}

          {tab === "specs" && (
            <div className="max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden">
              {Object.entries(product.specs).map(([k, v]) => (
                <div
                  key={k}
                  className="bg-[#0d0d1c] px-5 py-3.5 flex items-center justify-between gap-4"
                >
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider shrink-0">
                    {k}
                  </span>
                  <span className="text-sm text-white text-right">{v}</span>
                </div>
              ))}
            </div>
          )}

          {tab === "reviews" && (
            <div className="max-w-2xl space-y-4">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.id}
                  className="bg-[#0d0d1c] border border-white/5 rounded-xl p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-500/20 border border-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">
                        {t.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{t.name}</p>
                        <p className="text-[10px] text-slate-500">{t.date}</p>
                      </div>
                    </div>
                    <StarRating rating={t.rating} size={12} />
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{t.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="font-['Outfit',sans-serif] text-2xl font-bold text-white mb-6">
              Customers Also Bought
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onNavigate={onNavigate}
                  onAddToCart={onAddToCart}
                  wishlist={wishlist}
                  toggleWishlist={toggleWishlist}
                  compareList={[]}
                  toggleCompare={() => {}}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── CartPage ───────────────────────────────────────────────────────────────

function CartPage({
  cart,
  onUpdateQty,
  onRemove,
  onNavigate,
}: {
  cart: CartItem[];
  onUpdateQty: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
  onNavigate: (page: Page) => void;
}) {
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = getCartTotal(cart);
  const shipping = subtotal > 99 ? 0 : 9.99;
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shipping - discount;

  return (
    <div className="pt-16 min-h-screen bg-[#07070f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="font-['Outfit',sans-serif] text-4xl font-bold text-white mb-8">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-24">
            <ShoppingCart size={48} className="text-slate-700 mx-auto mb-4" />
            <p className="text-slate-400 text-lg mb-6">Your cart is empty.</p>
            <button
              onClick={() => onNavigate("shop")}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-all"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => {
                const p = PRODUCTS.find((pr) => pr.id === item.productId);
                if (!p) return null;
                return (
                  <div
                    key={`${item.productId}-${item.color}-${item.storage}`}
                    className="bg-[#0d0d1c] border border-white/5 rounded-2xl p-5 flex gap-5"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-20 h-20 rounded-xl object-cover bg-[#07070f] shrink-0 cursor-pointer"
                      onClick={() => onNavigate("product")}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-white leading-snug">
                          {p.name}
                        </h3>
                        <button
                          onClick={() => onRemove(item.productId)}
                          className="text-slate-600 hover:text-rose-400 transition-colors shrink-0"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-500 font-mono mb-3">
                        {item.color}
                        {item.storage ? ` · ${item.storage}` : ""}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center bg-[#141426] border border-white/8 rounded-xl overflow-hidden">
                          <button
                            onClick={() =>
                              item.qty > 1
                                ? onUpdateQty(item.productId, item.qty - 1)
                                : onRemove(item.productId)
                            }
                            className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="w-8 text-center text-xs font-mono text-white">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => onUpdateQty(item.productId, item.qty + 1)}
                            className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-white font-mono">
                          {fmt(p.price * item.qty)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div>
              <div className="bg-[#0d0d1c] border border-white/5 rounded-2xl p-6 sticky top-24">
                <h2 className="font-['Outfit',sans-serif] text-lg font-bold text-white mb-5">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-5 text-sm">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal ({getCartCount(cart)} items)</span>
                    <span className="font-mono">{fmt(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Shipping</span>
                    <span className="font-mono">
                      {shipping === 0 ? "Free" : fmt(shipping)}
                    </span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Promo (TECH10)</span>
                      <span className="font-mono">-{fmt(discount)}</span>
                    </div>
                  )}
                  <div className="border-t border-white/5 pt-3 flex justify-between font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-white font-mono text-lg">
                      {fmt(total)}
                    </span>
                  </div>
                </div>

                {/* Promo */}
                <div className="mb-5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code"
                      value={promo}
                      onChange={(e) => setPromo(e.target.value.toUpperCase())}
                      className="flex-1 bg-[#141426] border border-white/10 text-white placeholder-slate-600 px-3 py-2 rounded-xl text-sm focus:outline-none focus:border-blue-500/50 font-mono"
                    />
                    <button
                      onClick={() => {
                        if (promo === "TECH10") {
                          setPromoApplied(true);
                        } else {
                          alert('Invalid code. Try "TECH10"!');
                        }
                      }}
                      className="bg-[#141426] border border-white/10 hover:border-white/20 text-slate-300 hover:text-white px-3 py-2 rounded-xl text-sm transition-all"
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-600 mt-1.5 font-mono">
                    Try: TECH10
                  </p>
                </div>

                <button
                  onClick={() => onNavigate("checkout")}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.45)] flex items-center justify-center gap-2"
                >
                  Checkout <ArrowRight size={15} />
                </button>
                <button
                  onClick={() => onNavigate("shop")}
                  className="w-full mt-3 text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── CheckoutPage ───────────────────────────────────────────────────────────

function CheckoutPage({
  cart,
  onNavigate,
}: {
  cart: CartItem[];
  onNavigate: (page: Page) => void;
}) {
  const [step, setStep] = useState(1);
  const [ship, setShip] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [payMethod, setPayMethod] = useState("card");
  const [card, setCard] = useState({ num: "", exp: "", cvv: "", name: "" });

  const subtotal = getCartTotal(cart);
  const total = subtotal > 99 ? subtotal : subtotal + 9.99;
  const steps = ["Shipping", "Payment", "Review"];

  return (
    <div className="pt-16 min-h-screen bg-[#07070f]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="font-['Outfit',sans-serif] text-4xl font-bold text-white mb-8">
          Checkout
        </h1>

        {/* Steps */}
        <div className="flex items-center mb-10 gap-0">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all shrink-0 ${step > i + 1 ? "bg-blue-600 border-blue-600 text-white" : step === i + 1 ? "border-blue-500 text-blue-400 bg-blue-500/10" : "border-white/10 text-slate-600"}`}
              >
                {step > i + 1 ? <Check size={13} /> : i + 1}
              </div>
              <span
                className={`ml-2 text-sm font-medium ${step === i + 1 ? "text-white" : step > i + 1 ? "text-blue-400" : "text-slate-600"}`}
              >
                {s}
              </span>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-px mx-4 ${step > i + 1 ? "bg-blue-600" : "bg-white/5"}`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Step 1 */}
            {step === 1 && (
              <div className="bg-[#0d0d1c] border border-white/5 rounded-2xl p-6">
                <h2 className="font-['Outfit',sans-serif] text-xl font-bold text-white mb-5">
                  Shipping Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { key: "firstName", label: "First Name", span: 1 },
                    { key: "lastName", label: "Last Name", span: 1 },
                    { key: "email", label: "Email Address", span: 2 },
                    { key: "phone", label: "Phone Number", span: 2 },
                    { key: "address", label: "Street Address", span: 2 },
                    { key: "city", label: "City", span: 1 },
                    { key: "state", label: "State", span: 1 },
                    { key: "zip", label: "ZIP Code", span: 1 },
                  ].map((f) => (
                    <div
                      key={f.key}
                      className={f.span === 2 ? "col-span-2" : ""}
                    >
                      <label className="text-xs text-slate-500 mb-1.5 block">
                        {f.label}
                      </label>
                      <input
                        value={ship[f.key as keyof typeof ship]}
                        onChange={(e) =>
                          setShip((prev) => ({
                            ...prev,
                            [f.key]: e.target.value,
                          }))
                        }
                        className="w-full bg-[#141426] border border-white/10 text-white px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500/50"
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.45)] flex items-center justify-center gap-2"
                >
                  Continue to Payment <ArrowRight size={15} />
                </button>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="bg-[#0d0d1c] border border-white/5 rounded-2xl p-6">
                <h2 className="font-['Outfit',sans-serif] text-xl font-bold text-white mb-5">
                  Payment Method
                </h2>
                <div className="flex gap-2 mb-6">
                  {[
                    { key: "card", label: "Credit Card" },
                    { key: "paypal", label: "PayPal" },
                    { key: "applepay", label: "Apple Pay" },
                  ].map((m) => (
                    <button
                      key={m.key}
                      onClick={() => setPayMethod(m.key)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all ${payMethod === m.key ? "border-blue-500 bg-blue-500/10 text-blue-400" : "border-white/10 text-slate-400 hover:text-white hover:border-white/20"}`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                {payMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-slate-500 mb-1.5 block">
                        Card Number
                      </label>
                      <input
                        placeholder="4242 4242 4242 4242"
                        value={card.num}
                        onChange={(e) =>
                          setCard((p) => ({ ...p, num: e.target.value }))
                        }
                        className="w-full bg-[#141426] border border-white/10 text-white px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500/50 font-mono placeholder-slate-600"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-500 mb-1.5 block">
                          Expiry
                        </label>
                        <input
                          placeholder="MM / YY"
                          value={card.exp}
                          onChange={(e) =>
                            setCard((p) => ({ ...p, exp: e.target.value }))
                          }
                          className="w-full bg-[#141426] border border-white/10 text-white px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500/50 font-mono placeholder-slate-600"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 mb-1.5 block">
                          CVV
                        </label>
                        <input
                          placeholder="•••"
                          value={card.cvv}
                          onChange={(e) =>
                            setCard((p) => ({ ...p, cvv: e.target.value }))
                          }
                          className="w-full bg-[#141426] border border-white/10 text-white px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500/50 font-mono placeholder-slate-600"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 mb-1.5 block">
                        Name on Card
                      </label>
                      <input
                        value={card.name}
                        onChange={(e) =>
                          setCard((p) => ({ ...p, name: e.target.value }))
                        }
                        className="w-full bg-[#141426] border border-white/10 text-white px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500/50"
                      />
                    </div>
                  </div>
                )}

                {payMethod !== "card" && (
                  <div className="text-center py-10 text-slate-500 text-sm bg-[#141426] rounded-xl">
                    You&apos;ll be redirected to{" "}
                    {payMethod === "paypal" ? "PayPal" : "Apple Pay"} to
                    complete your payment securely.
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border border-white/10 text-slate-300 hover:text-white py-3.5 rounded-xl transition-all text-sm font-medium"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-[2] bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.45)] flex items-center justify-center gap-2"
                  >
                    Review Order <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="bg-[#0d0d1c] border border-white/5 rounded-2xl p-6">
                <h2 className="font-['Outfit',sans-serif] text-xl font-bold text-white mb-5">
                  Review Your Order
                </h2>
                <div className="space-y-3 mb-6">
                  {cart.map((item) => {
                    const p = PRODUCTS.find((pr) => pr.id === item.productId);
                    if (!p) return null;
                    return (
                      <div
                        key={item.productId}
                        className="flex items-center gap-4 bg-[#141426] rounded-xl p-3"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-14 h-14 rounded-xl object-cover bg-[#07070f] shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">
                            {p.name}
                          </p>
                          <p className="text-[10px] text-slate-500 font-mono">
                            {item.color}
                            {item.storage ? ` · ${item.storage}` : ""} ·
                            Qty: {item.qty}
                          </p>
                        </div>
                        <span className="font-mono text-sm font-bold text-white shrink-0">
                          {fmt(p.price * item.qty)}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 border border-white/10 text-slate-300 hover:text-white py-3.5 rounded-xl transition-all text-sm font-medium"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => onNavigate("confirmation")}
                    className="flex-[2] bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.45)] flex items-center justify-center gap-2"
                  >
                    <Lock size={13} /> Place Order · {fmt(total)}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mini summary */}
          <div>
            <div className="bg-[#0d0d1c] border border-white/5 rounded-2xl p-5 sticky top-24">
              <h3 className="text-sm font-semibold text-white mb-4">
                Order ({getCartCount(cart)} items)
              </h3>
              <div className="space-y-2 mb-4">
                {cart.map((item) => {
                  const p = PRODUCTS.find((pr) => pr.id === item.productId);
                  if (!p) return null;
                  return (
                    <div
                      key={item.productId}
                      className="flex justify-between text-xs text-slate-400"
                    >
                      <span className="truncate mr-2">
                        {p.name} ×{item.qty}
                      </span>
                      <span className="font-mono shrink-0">
                        {fmt(p.price * item.qty)}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-white/5 pt-3 flex justify-between font-bold text-sm">
                <span className="text-white">Total</span>
                <span className="text-white font-mono">{fmt(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ConfirmationPage ───────────────────────────────────────────────────────

function ConfirmationPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [orderNum] = useState(
    () => `TH-${Math.floor(100000 + Math.random() * 900000)}`
  );

  return (
    <div className="pt-16 min-h-screen bg-[#07070f] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md w-full"
      >
        <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={38} className="text-emerald-400" />
        </div>
        <h1 className="font-['Outfit',sans-serif] text-4xl font-bold text-white mb-3">
          Order Confirmed!
        </h1>
        <p className="text-slate-400 mb-3 text-sm">
          Thank you for your purchase. Your order is being processed.
        </p>
        <p className="font-mono text-sm text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-2.5 inline-block mb-7">
          {orderNum}
        </p>
        <div className="bg-[#0d0d1c] border border-white/5 rounded-2xl p-5 mb-7 text-left space-y-3">
          <div className="flex items-center gap-3 text-sm text-slate-300">
            <Truck size={15} className="text-cyan-400 shrink-0" />
            <span>
              Estimated delivery:{" "}
              <strong className="text-white">2–4 business days</strong>
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-300">
            <Mail size={15} className="text-cyan-400 shrink-0" />
            <span>Tracking info sent to your email within 24 hours.</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onNavigate("account")}
            className="flex-1 border border-white/10 text-slate-300 hover:text-white py-3 rounded-xl transition-all text-sm"
          >
            Track Order
          </button>
          <button
            onClick={() => onNavigate("shop")}
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-all"
          >
            Shop More
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ── AccountPage ────────────────────────────────────────────────────────────

function AccountPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [loggedIn, setLoggedIn] = useState(false);

  if (loggedIn) {
    return (
      <div className="pt-16 min-h-screen bg-[#07070f]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-xl font-bold text-blue-400">
              JD
            </div>
            <div>
              <h1 className="font-['Outfit',sans-serif] text-2xl font-bold text-white">
                Welcome back, James!
              </h1>
              <p className="text-sm text-slate-500">james.doe@example.com</p>
            </div>
            <button
              onClick={() => setLoggedIn(false)}
              className="ml-auto text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              Sign Out
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {[
              { title: "Orders", icon: <Package size={20} />, sub: "3 orders placed" },
              {
                title: "Wishlist",
                icon: <Heart size={20} />,
                sub: "5 saved items",
              },
              {
                title: "Addresses",
                icon: <MapPin size={20} />,
                sub: "2 saved",
              },
              {
                title: "Payment Methods",
                icon: <CreditCard size={20} />,
                sub: "1 card saved",
              },
              {
                title: "Warranty",
                icon: <Shield size={20} />,
                sub: "Register a product",
              },
              {
                title: "Support",
                icon: <MessageCircle size={20} />,
                sub: "Get help",
                action: () => onNavigate("support"),
              },
            ].map((card) => (
              <button
                key={card.title}
                onClick={"action" in card ? card.action : undefined}
                className="bg-[#0d0d1c] border border-white/5 rounded-2xl p-5 text-left hover:border-blue-500/25 transition-all group"
              >
                <div className="text-blue-400 mb-3 transition-transform group-hover:scale-110 inline-block">
                  {card.icon}
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-500">{card.sub}</p>
              </button>
            ))}
          </div>

          <h2 className="font-['Outfit',sans-serif] text-xl font-bold text-white mb-5">
            Recent Orders
          </h2>
          <div className="space-y-3">
            {[
              {
                num: "TH-482910",
                date: "Dec 12, 2024",
                item: "Apex Pro 15 Ultra",
                total: 1299,
                status: "Delivered",
              },
              {
                num: "TH-391827",
                date: "Nov 28, 2024",
                item: "SoundVault WH-950XM",
                total: 379,
                status: "Delivered",
              },
              {
                num: "TH-284713",
                date: "Nov 15, 2024",
                item: "AirBuds Pro 3",
                total: 249,
                status: "Delivered",
              },
            ].map((o) => (
              <div
                key={o.num}
                className="bg-[#0d0d1c] border border-white/5 rounded-xl px-5 py-4 flex items-center justify-between flex-wrap gap-3"
              >
                <div>
                  <p className="text-sm font-mono text-blue-400">{o.num}</p>
                  <p className="text-xs text-slate-500">
                    {o.date} · {o.item}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm font-bold text-white">
                    {fmt(o.total)}
                  </span>
                  <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                    {o.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-[#07070f] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-[#0d0d1c] border border-white/5 rounded-2xl p-8">
          <div className="text-center mb-7">
            <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User size={20} className="text-blue-400" />
            </div>
            <h1 className="font-['Outfit',sans-serif] text-2xl font-bold text-white">
              {tab === "login" ? "Welcome Back" : "Create Account"}
            </h1>
          </div>

          <div className="flex gap-1 bg-[#141426] rounded-xl p-1 mb-6">
            {(["login", "register"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all ${tab === t ? "bg-[#0d0d1c] text-white" : "text-slate-500 hover:text-slate-300"}`}
              >
                {t === "login" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLoggedIn(true);
            }}
            className="space-y-4"
          >
            {tab === "register" && (
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">
                  Full Name
                </label>
                <input
                  placeholder="James Doe"
                  className="w-full bg-[#141426] border border-white/10 text-white px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500/50 placeholder-slate-600"
                />
              </div>
            )}
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-[#141426] border border-white/10 text-white px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500/50 placeholder-slate-600"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-[#141426] border border-white/10 text-white px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500/50 placeholder-slate-600"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.45)]"
            >
              {tab === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          {tab === "login" && (
            <p className="text-center text-xs text-slate-600 mt-4">
              <button className="text-blue-400 hover:text-blue-300 transition-colors">
                Forgot password?
              </button>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ── AboutPage ──────────────────────────────────────────────────────────────

function AboutPage() {
  return (
    <div className="pt-16 min-h-screen bg-[#07070f]">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-blue-400 mb-4">
            Our Story
          </p>
          <h1 className="font-['Outfit',sans-serif] text-5xl sm:text-6xl font-black text-white mb-6 leading-[1.04]">
            Everyone deserves{" "}
            <span className="text-blue-400">world-class</span> technology.
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Founded in 2019, TechHub started with a simple mission: make premium
            technology accessible, supported, and genuinely worth buying. Today
            we serve 50,000+ customers across North America.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[#0a0a18]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Award size={22} />,
                title: "Curated Selection",
                text: "Every product earns its place through rigorous testing. We only sell what we'd buy ourselves.",
              },
              {
                icon: <HelpCircle size={22} />,
                title: "Genuine Expertise",
                text: "Our specialists are available 24/7 — not scripts, not bots. Real people who love the technology they sell.",
              },
              {
                icon: <Shield size={22} />,
                title: "Long-term Partnership",
                text: "From warranty claims to upgrade advice, we're your tech partner for life, not just the sale.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="bg-[#0d0d1c] border border-white/5 rounded-2xl p-6"
              >
                <div className="text-cyan-400 mb-4">{v.icon}</div>
                <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-white mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-[#07070f]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { n: "2019", l: "Founded" },
            { n: "50K+", l: "Customers" },
            { n: "2,000+", l: "Products" },
            { n: "4.9★", l: "Avg Rating" },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-['Outfit',sans-serif] text-4xl font-black text-blue-400 mb-1">
                {s.n}
              </p>
              <p className="text-sm text-slate-500">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Photo */}
      <section className="py-16 bg-[#0a0a18]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl overflow-hidden h-72 sm:h-96 relative bg-[#0d0d1c]">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&h=600&fit=crop&auto=format"
              alt="TechHub team office"
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a18] via-[#0a0a18]/30 to-transparent" />
            <div className="absolute inset-0 flex items-center px-10 sm:px-16">
              <div>
                <p className="font-['Outfit',sans-serif] text-3xl sm:text-5xl font-black text-white mb-3 leading-tight">
                  Built by tech people,
                  <br />
                  for tech people.
                </p>
                <p className="text-slate-400 text-sm sm:text-base max-w-sm">
                  Our 80+ specialists are passionate about every product we carry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── SupportPage ────────────────────────────────────────────────────────────

function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <div className="pt-16 min-h-screen bg-[#07070f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-blue-400 mb-3">
            We&apos;re here for you
          </p>
          <h1 className="font-['Outfit',sans-serif] text-5xl font-black text-white mb-4">
            Support Center
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            Find answers, get help with orders, warranty claims, and more. Our
            team is here 24/7.
          </p>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {[
            { icon: <Package size={20} />, title: "Track Order", sub: "Real-time updates" },
            {
              icon: <RefreshCw size={20} />,
              title: "Returns",
              sub: "30-day policy",
            },
            {
              icon: <Shield size={20} />,
              title: "Warranty",
              sub: "Register & claim",
            },
            {
              icon: <MessageCircle size={20} />,
              title: "Live Chat",
              sub: "Avg 2min response",
            },
          ].map((item) => (
            <button
              key={item.title}
              className="bg-[#0d0d1c] border border-white/5 rounded-2xl p-5 text-center hover:border-blue-500/25 transition-all group"
            >
              <div className="text-cyan-400 mb-3 mx-auto w-fit group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <p className="text-sm font-semibold text-white mb-1">{item.title}</p>
              <p className="text-[10px] text-slate-500">{item.sub}</p>
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* FAQs */}
          <div>
            <h2 className="font-['Outfit',sans-serif] text-2xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-2">
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  className="bg-[#0d0d1c] border border-white/5 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/3 transition-colors"
                  >
                    <span className="text-sm font-medium text-white pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={15}
                      className={`text-slate-500 shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-4 text-sm text-slate-400 leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="font-['Outfit',sans-serif] text-2xl font-bold text-white mb-6">
              Send a Message
            </h2>
            {submitted ? (
              <div className="bg-[#0d0d1c] border border-emerald-500/20 rounded-2xl p-10 text-center">
                <CheckCircle
                  size={32}
                  className="text-emerald-400 mx-auto mb-3"
                />
                <p className="font-semibold text-white mb-2">Message sent!</p>
                <p className="text-sm text-slate-400">
                  We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="bg-[#0d0d1c] border border-white/5 rounded-2xl p-6 space-y-4"
              >
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block">
                    Your Name
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    className="w-full bg-[#141426] border border-white/10 text-white px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500/50"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    className="w-full bg-[#141426] border border-white/10 text-white px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500/50"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    className="w-full bg-[#141426] border border-white/10 text-white px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500/50 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.45)]"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CompareBar ─────────────────────────────────────────────────────────────

function CompareBar({
  compareList,
  onClear,
}: {
  compareList: number[];
  onClear: () => void;
}) {
  const products = compareList
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#0d0d1c] border-t border-white/10 shadow-[0_-8px_32px_rgba(0,0,0,0.5)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4 flex-wrap">
        <span className="text-xs font-mono text-slate-400 shrink-0">
          Comparing:
        </span>
        <div className="flex gap-3 flex-1 min-w-0">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-1.5 shrink-0"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-6 h-6 rounded object-cover"
              />
              <span className="text-xs text-white truncate max-w-[120px]">
                {p.name}
              </span>
            </div>
          ))}
        </div>
        <div className="flex gap-2 shrink-0 items-center">
          <div className="text-xs text-slate-500">
            {products.length}/3 selected
          </div>
          <button
            onClick={onClear}
            className="text-slate-500 hover:text-slate-300 transition-colors ml-2"
          >
            <X size={15} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────

function Footer({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <footer className="bg-[#0a0a18] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2">
            <button
              onClick={() => onNavigate("home")}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap size={15} className="text-white fill-white" />
              </div>
              <span className="font-['Outfit',sans-serif] text-xl font-black text-white">
                Tech<span className="text-blue-400">Hub</span>
              </span>
            </button>
            <p className="text-sm text-slate-500 leading-relaxed mb-5 max-w-xs">
              Premium technology for everyone. 50,000+ customers trust TechHub
              for phones, laptops, cameras, and accessories.
            </p>
            <div className="flex gap-2">
              {[
                { icon: <Instagram size={15} />, label: "Instagram" },
                { icon: <Twitter size={15} />, label: "Twitter" },
                { icon: <Youtube size={15} />, label: "YouTube" },
              ].map((s) => (
                <button
                  key={s.label}
                  title={s.label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {[
            {
              title: "Shop",
              links: [
                { label: "Phones", page: "shop" as Page },
                { label: "Laptops", page: "shop" as Page },
                { label: "Cameras", page: "shop" as Page },
                { label: "Accessories", page: "shop" as Page },
              ],
            },
            {
              title: "Company",
              links: [
                { label: "About Us", page: "about" as Page },
                { label: "Support", page: "support" as Page },
                { label: "My Account", page: "account" as Page },
              ],
            },
            {
              title: "Help",
              links: [
                { label: "Track Order", page: "support" as Page },
                { label: "Returns", page: "support" as Page },
                { label: "Warranty", page: "support" as Page },
                { label: "FAQs", page: "support" as Page },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-[10px] font-semibold text-white uppercase tracking-widest mb-4">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <button
                      onClick={() => onNavigate(l.page)}
                      className="text-sm text-slate-500 hover:text-white transition-colors"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="border-t border-white/5 pt-8 mb-8">
          <TrustBadges />
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © 2025 TechHub. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l) => (
              <button
                key={l}
                className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
              >
                {l}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Lock size={10} />
            <span>SSL Secured</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── App ────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [productId, setProductId] = useState<number | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [compareList, setCompareList] = useState<number[]>([]);

  const navigate = (p: Page, id?: number) => {
    setPage(p);
    if (id !== undefined) setProductId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) =>
          i.productId === item.productId &&
          i.color === item.color &&
          i.storage === item.storage
      );
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId &&
          i.color === item.color &&
          i.storage === item.storage
            ? { ...i, qty: i.qty + item.qty }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const updateQty = (productId: number, qty: number) => {
    setCart((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, qty } : i))
    );
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  };

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleCompare = (id: number) => {
    setCompareList((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : prev.length < 3
          ? [...prev, id]
          : prev
    );
  };

  const cardProps = {
    onNavigate: navigate,
    onAddToCart: addToCart,
    wishlist,
    toggleWishlist,
    compareList,
    toggleCompare,
  };

  const renderPage = () => {
    switch (page) {
      case "home":
        return <HomePage {...cardProps} />;
      case "shop":
        return <ShopPage {...cardProps} />;
      case "product":
        return productId ? (
          <ProductDetailPage
            productId={productId}
            onNavigate={navigate}
            onAddToCart={addToCart}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
          />
        ) : (
          <ShopPage {...cardProps} />
        );
      case "cart":
        return (
          <CartPage
            cart={cart}
            onUpdateQty={updateQty}
            onRemove={removeFromCart}
            onNavigate={navigate}
          />
        );
      case "checkout":
        return <CheckoutPage cart={cart} onNavigate={navigate} />;
      case "confirmation":
        return <ConfirmationPage onNavigate={navigate} />;
      case "account":
        return <AccountPage onNavigate={navigate} />;
      case "about":
        return <AboutPage />;
      case "support":
        return <SupportPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#07070f] text-[#e8eaf2]">
      <Nav
        currentPage={page}
        onNavigate={navigate}
        cartCount={getCartCount(cart)}
      />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      {page !== "confirmation" && <Footer onNavigate={navigate} />}
      <AnimatePresence>
        {compareList.length >= 2 && (
          <CompareBar
            compareList={compareList}
            onClear={() => setCompareList([])}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
