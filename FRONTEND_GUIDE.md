# ShopHub — Frontend Complete Guide

## Tech Stack

- React 19 + TypeScript
- Vite (build tool)
- React Router DOM v7 (routing)
- Axios (HTTP requests)
- Inter font (Google Fonts)

---

## Step 1 — Create Vite Project

```bash
# from Interview/ directory (same level as backend/)
npm create vite@latest frontend -- --template react-ts
cd frontend
```

---

## Step 2 — Install Dependencies

```bash
npm install
npm install react-router-dom axios
```

---

## Step 3 — Folder Structure

```
frontend/
├── index.html
├── package.json
├── vite.config.ts
└── src/
    ├── api/
    │   └── api.ts
    ├── components/
    │   ├── Navbar.tsx
    │   ├── Navbar.css
    │   └── ToastProvider.tsx
    ├── context/
    │   └── AuthContext.tsx
    ├── pages/
    │   ├── Login.tsx
    │   ├── Register.tsx
    │   ├── Auth.css
    │   ├── Products.tsx
    │   ├── Products.css
    │   ├── Cart.tsx
    │   ├── Cart.css
    │   ├── Checkout.tsx
    │   └── Checkout.css
    ├── App.tsx
    ├── main.tsx
    └── index.css
```

> Create these folders manually:
>
> ```bash
> mkdir -p src/api src/components src/context src/pages
> ```

---

## Step 4 — All Files

---

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="ShopHub – Mini E-Commerce App" />
    <title>ShopHub</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

### `src/index.css`

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Inter", sans-serif;
  background: #f5f6fa;
  color: #1a1a2e;
  font-size: 14px;
  line-height: 1.6;
}

a {
  text-decoration: none;
  color: #2563eb;
}
a:hover {
  text-decoration: underline;
}
button {
  cursor: pointer;
  font-family: inherit;
}
input,
select,
textarea {
  font-family: inherit;
}

/* Layout */
.page-wrapper {
  min-height: 100vh;
  padding-top: 60px;
}
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 16px;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  transition: background 0.15s;
}
.btn-primary {
  background: #2563eb;
  color: #fff;
}
.btn-primary:hover {
  background: #1d4ed8;
}
.btn-danger {
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fecaca;
}
.btn-danger:hover {
  background: #fecaca;
}
.btn-secondary {
  background: #fff;
  color: #374151;
  border: 1px solid #d1d5db;
}
.btn-secondary:hover {
  background: #f3f4f6;
}
.btn-sm {
  padding: 5px 12px;
  font-size: 13px;
}
.btn-full {
  width: 100%;
  justify-content: center;
}
.btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

/* Form */
.form-group {
  margin-bottom: 16px;
}
.form-label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
}
.form-input {
  width: 100%;
  padding: 9px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  color: #1a1a2e;
  background: #fff;
  outline: none;
  transition: border-color 0.15s;
}
.form-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
.form-input::placeholder {
  color: #9ca3af;
}
.form-select {
  width: 100%;
  padding: 9px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  color: #1a1a2e;
  background: #fff;
  outline: none;
  cursor: pointer;
}
.form-select:focus {
  border-color: #2563eb;
}

/* Card */
.card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

/* Grid */
.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

/* Empty / Loading */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
}
.empty-state p {
  font-size: 15px;
  margin-bottom: 16px;
}
.loading {
  text-align: center;
  padding: 40px;
  color: #6b7280;
}

/* Toast */
.toast-container {
  position: fixed;
  top: 72px;
  right: 16px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.toast {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  max-width: 320px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  animation:
    slideIn 0.25s ease,
    fadeOut 0.3s ease 2.7s forwards;
}
.toast.success {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}
.toast.error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fecaca;
}
.toast.info {
  background: #dbeafe;
  color: #1e40af;
  border: 1px solid #bfdbfe;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes fadeOut {
  to {
    opacity: 0;
    transform: translateX(60px);
  }
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
.modal {
  background: #fff;
  border-radius: 10px;
  padding: 24px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.modal-title {
  font-size: 17px;
  font-weight: 700;
  color: #111;
}
.modal-close {
  background: none;
  border: none;
  font-size: 18px;
  color: #6b7280;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
}
.modal-close:hover {
  background: #f3f4f6;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
}
```

---

### `src/main.tsx`

```tsx
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
);
```

---

### `src/App.tsx`

```tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { useAuth } from "./context/AuthContext";
import ToastProvider from "./components/ToastProvider";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

### `src/context/AuthContext.tsx`

```tsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (jwt: string) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
```

---

### `src/api/api.ts`

```ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3200/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```

---

### `src/components/ToastProvider.tsx`

```tsx
import { useEffect, useState } from "react";

type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

let toastId = 0;
let globalAddToast: ((msg: string, type: ToastType) => void) | null = null;

// eslint-disable-next-line react-refresh/only-export-components
export const showToast = (message: string, type: ToastType = "info") => {
  if (globalAddToast) globalAddToast(message, type);
};

export default function ToastProvider() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    globalAddToast = (message, type) => {
      const id = ++toastId;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    };
    return () => {
      globalAddToast = null;
    };
  }, []);

  const icons: Record<ToastType, string> = {
    success: "✅",
    error: "❌",
    info: "ℹ️",
  };

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          <span>{icons[t.type]}</span>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
```

---

### `src/components/Navbar.tsx`

```tsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { token, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!token) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          🛍️ ShopHub
        </Link>
        <div className="navbar-links">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Products
          </Link>
          <Link
            to="/cart"
            className={location.pathname === "/cart" ? "active" : ""}
          >
            🛒 Cart
          </Link>
        </div>
        <button className="navbar-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
```

### `src/components/Navbar.css`

```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  z-index: 100;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}
.navbar-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 16px;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 24px;
}
.navbar-brand {
  font-size: 17px;
  font-weight: 700;
  color: #1a1a2e;
  text-decoration: none;
  flex-shrink: 0;
}
.navbar-brand:hover {
  text-decoration: none;
}
.navbar-links {
  display: flex;
  gap: 4px;
  flex: 1;
}
.navbar-links a {
  padding: 6px 12px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  color: #4b5563;
  text-decoration: none;
  transition: background 0.15s;
}
.navbar-links a:hover {
  background: #f3f4f6;
  color: #111;
  text-decoration: none;
}
.navbar-links a.active {
  background: #eff6ff;
  color: #2563eb;
  font-weight: 600;
}
.navbar-logout {
  margin-left: auto;
  background: none;
  border: 1px solid #d1d5db;
  border-radius: 5px;
  padding: 5px 12px;
  font-size: 13px;
  color: #374151;
  cursor: pointer;
}
.navbar-logout:hover {
  background: #f3f4f6;
}
```

---

### `src/pages/Auth.css`

```css
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f6fa;
  padding: 24px;
}
.auth-box {
  width: 100%;
  max-width: 400px;
  padding: 32px;
}
.auth-title {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 4px;
}
.auth-sub {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 24px;
}
.auth-error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fecaca;
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 13px;
  margin-bottom: 16px;
}
.auth-footer-text {
  margin-top: 20px;
  text-align: center;
  font-size: 13px;
  color: #6b7280;
}
.auth-footer-text a {
  color: #2563eb;
  font-weight: 500;
}
```

---

### `src/pages/Login.tsx`

```tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { showToast } from "../components/ToastProvider";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token);
      showToast("Logged in successfully!", "success");
      navigate("/");
    } catch {
      setError("Invalid email or password.");
      showToast("Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box card">
        <h1 className="auth-title">Sign In</h1>
        <p className="auth-sub">Welcome back to ShopHub</p>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              id="login-email"
              className="form-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              id="login-password"
              className="form-input"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            id="login-submit"
            type="submit"
            className="btn btn-primary btn-full"
            style={{ marginTop: 4 }}
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
        <p className="auth-footer-text">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}
```

---

### `src/pages/Register.tsx`

```tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { showToast } from "../components/ToastProvider";
import "./Auth.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/register", { name, email, password });
      showToast("Account created! Please sign in.", "success");
      navigate("/login");
    } catch {
      setError("Registration failed. Email may already be in use.");
      showToast("Registration failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box card">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-sub">Join ShopHub today</p>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              id="register-name"
              className="form-input"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              id="register-email"
              className="form-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              id="register-password"
              className="form-input"
              type="password"
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            id="register-submit"
            type="submit"
            className="btn btn-primary btn-full"
            style={{ marginTop: 4 }}
            disabled={loading}
          >
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </form>
        <p className="auth-footer-text">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
```

---

### `src/pages/Products.css`

```css
.products-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.products-heading {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
}
.filters-row {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.search-input {
  flex: 1;
  min-width: 180px;
}
.category-select {
  width: 180px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}
.product-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: box-shadow 0.15s;
}
.product-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.product-img-wrap {
  aspect-ratio: 4/3;
  overflow: hidden;
  background: #f9fafb;
}
.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.product-body {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}
.product-category {
  font-size: 11px;
  font-weight: 600;
  color: #2563eb;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}
.product-name {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  line-height: 1.3;
}
.product-price {
  font-size: 17px;
  font-weight: 700;
  color: #111827;
}
.product-stock {
  font-size: 12px;
}
.in-stock {
  color: #059669;
}
.out-stock {
  color: #dc2626;
}

.product-actions {
  display: flex;
  gap: 6px;
  margin-top: 10px;
  align-items: center;
}

@media (max-width: 500px) {
  .products-grid {
    grid-template-columns: 1fr 1fr;
  }
}
```

### `src/pages/Products.tsx`

```tsx
import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import { showToast } from "../components/ToastProvider";
import "./Products.css";

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

const CATEGORIES = [
  "Electronics",
  "Fashion",
  "Furniture",
  "Books",
  "Sports",
  "Beauty",
];
const BLANK = {
  name: "",
  price: "",
  imageUrl: "",
  category: "Electronics",
  stock: "",
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<typeof BLANK>({ ...BLANK });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [addingId, setAddingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/products");
      const data = Array.isArray(res.data)
        ? res.data
        : (res.data.products ?? []);
      setProducts(data);
    } catch {
      setError("Failed to load products. Make sure the server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditId(null);
    setForm({ ...BLANK });
    setFormError("");
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setEditId(p._id);
    setForm({
      name: p.name,
      price: String(p.price),
      imageUrl: p.imageUrl,
      category: p.category,
      stock: String(p.stock),
    });
    setFormError("");
    setShowModal(true);
  };

  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.price ||
      !form.imageUrl ||
      !form.category ||
      !form.stock
    ) {
      setFormError("All fields are required.");
      return;
    }
    setSaving(true);
    setFormError("");
    const payload = {
      name: form.name.trim(),
      price: parseFloat(form.price),
      imageUrl: form.imageUrl.trim(),
      category: form.category,
      stock: parseInt(form.stock),
    };
    try {
      if (editId) {
        await api.put(`/products/${editId}`, payload);
        showToast("Product updated successfully", "success");
      } else {
        await api.post("/products", payload);
        showToast("Product added successfully", "success");
      }
      setShowModal(false);
      load();
    } catch {
      setFormError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/products/${deleteId}`);
      showToast("Product deleted", "success");
      setDeleteId(null);
      load();
    } catch {
      showToast("Failed to delete product", "error");
    }
  };

  const addToCart = async (id: string) => {
    setAddingId(id);
    try {
      await api.post("/cart/add", { productId: id, quantity: 1 });
      showToast("Added to cart!", "success");
    } catch {
      showToast("Failed to add to cart", "error");
    } finally {
      setAddingId(null);
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (category ? p.category === category : true),
  );

  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <div className="container">
          <div className="products-header">
            <h2 className="products-heading">Products</h2>
            <button
              id="add-product-btn"
              className="btn btn-primary btn-sm"
              onClick={openCreate}
            >
              + Add Product
            </button>
          </div>

          <div className="filters-row">
            <input
              id="product-search"
              className="form-input search-input"
              placeholder="Search by name…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              id="category-filter"
              className="form-select category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {loading && <p className="loading">Loading products…</p>}
          {error && (
            <div className="auth-error" style={{ maxWidth: 480 }}>
              {error}
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="empty-state">
              <p>No products found.</p>
              <button className="btn btn-primary btn-sm" onClick={openCreate}>
                Add your first product
              </button>
            </div>
          )}

          {!loading && !error && filtered.length > 0 && (
            <div className="products-grid">
              {filtered.map((p) => (
                <div className="product-card card" key={p._id}>
                  <div className="product-img-wrap">
                    <img
                      className="product-img"
                      src={p.imageUrl}
                      alt={p.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/300x200/e5e7eb/9ca3af?text=No+Image";
                      }}
                    />
                  </div>
                  <div className="product-body">
                    <div className="product-category">{p.category}</div>
                    <h3 className="product-name">{p.name}</h3>
                    <div className="product-price">${p.price.toFixed(2)}</div>
                    <div
                      className={`product-stock ${p.stock > 0 ? "in-stock" : "out-stock"}`}
                    >
                      {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
                    </div>
                    <div className="product-actions">
                      <button
                        id={`add-cart-${p._id}`}
                        className="btn btn-primary btn-sm"
                        style={{ flex: 1 }}
                        onClick={() => addToCart(p._id)}
                        disabled={addingId === p._id || p.stock === 0}
                      >
                        {addingId === p._id ? "Adding…" : "Add to Cart"}
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => openEdit(p)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => setDeleteId(p._id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div
          className="modal-overlay"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="modal">
            <div className="modal-header">
              <span className="modal-title">
                {editId ? "Edit Product" : "Add Product"}
              </span>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>
            {formError && <div className="auth-error">{formError}</div>}
            <form onSubmit={saveProduct}>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    className="form-input"
                    placeholder="Product name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Price ($)</label>
                  <input
                    className="form-input"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Image URL</label>
                <input
                  className="form-input"
                  placeholder="https://…"
                  value={form.imageUrl}
                  onChange={(e) =>
                    setForm({ ...form, imageUrl: e.target.value })
                  }
                />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Stock</label>
                  <input
                    className="form-input"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={form.stock}
                    onChange={(e) =>
                      setForm({ ...form, stock: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  disabled={saving}
                >
                  {saving ? "Saving…" : editId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <div
          className="modal-overlay"
          onClick={(e) => e.target === e.currentTarget && setDeleteId(null)}
        >
          <div className="modal" style={{ maxWidth: 360 }}>
            <div className="modal-header">
              <span className="modal-title">Delete Product?</span>
              <button className="modal-close" onClick={() => setDeleteId(null)}>
                ✕
              </button>
            </div>
            <p style={{ color: "#6b7280", marginBottom: 20, fontSize: 14 }}>
              This product will be permanently deleted.
            </p>
            <div
              className="modal-footer"
              style={{ paddingTop: 0, borderTop: "none" }}
            >
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
              <button className="btn btn-danger btn-sm" onClick={deleteProduct}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
```

---

### `src/pages/Cart.css`

```css
.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.cart-heading {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
}
.cart-layout {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 20px;
  align-items: start;
}
.cart-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.cart-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px;
}
.cart-item-img {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 6px;
  background: #f3f4f6;
  flex-shrink: 0;
}
.cart-item-info {
  flex: 1;
  min-width: 0;
}
.cart-item-name {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 2px;
}
.cart-item-cat {
  font-size: 12px;
  color: #9ca3af;
  margin-bottom: 4px;
}
.cart-item-price {
  font-size: 13px;
  color: #374151;
}
.cart-item-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  flex-shrink: 0;
}

.qty-row {
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 5px;
  overflow: hidden;
}
.qty-btn {
  background: #f9fafb;
  border: none;
  width: 28px;
  height: 28px;
  font-size: 16px;
  cursor: pointer;
  color: #374151;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.12s;
}
.qty-btn:hover:not(:disabled) {
  background: #e5e7eb;
}
.qty-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.qty-val {
  min-width: 32px;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: #111;
  border-left: 1px solid #d1d5db;
  border-right: 1px solid #d1d5db;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cart-line-total {
  font-size: 14px;
  font-weight: 700;
  color: #111827;
}

.cart-summary {
  padding: 20px;
  position: sticky;
  top: 72px;
}
.summary-title {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 16px;
}
.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #374151;
  margin-bottom: 10px;
}
.summary-hr {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 12px 0;
}
.summary-total-row {
  font-weight: 700;
  font-size: 15px;
  color: #111;
}

@media (max-width: 720px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }
  .cart-summary {
    position: static;
  }
}
```

### `src/pages/Cart.tsx`

```tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Navbar from "../components/Navbar";
import { showToast } from "../components/ToastProvider";
import "./Cart.css";

interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
  };
  quantity: number;
}

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    api
      .get("/cart")
      .then((res) => {
        if (active) {
          setItems(res.data.items ?? []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) {
          setError("Failed to load cart.");
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  const updateQty = async (id: string, qty: number) => {
    if (qty < 1) return;
    try {
      await api.put(`/cart/update/${id}`, { quantity: qty });
      setItems((prev) =>
        prev.map((i) => (i.product._id === id ? { ...i, quantity: qty } : i)),
      );
    } catch {
      showToast("Failed to update quantity", "error");
    }
  };

  const remove = async (id: string) => {
    try {
      await api.delete(`/cart/remove/${id}`);
      setItems((prev) => prev.filter((i) => i.product._id !== id));
      showToast("Item removed from cart", "info");
    } catch {
      showToast("Failed to remove item", "error");
    }
  };

  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <div className="container">
          <div className="cart-header">
            <h2 className="cart-heading">Shopping Cart</h2>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigate("/")}
            >
              ← Back to Products
            </button>
          </div>

          {loading && <p className="loading">Loading cart…</p>}
          {error && (
            <div className="auth-error" style={{ maxWidth: 480 }}>
              {error}
            </div>
          )}

          {!loading && !error && items.length === 0 && (
            <div className="empty-state">
              <p>Your cart is empty.</p>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => navigate("/")}
              >
                Browse Products
              </button>
            </div>
          )}

          {!loading && !error && items.length > 0 && (
            <div className="cart-layout">
              <div className="cart-items">
                {items.map((item) => (
                  <div className="cart-item card" key={item.product._id}>
                    <img
                      className="cart-item-img"
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/80x80/e5e7eb/9ca3af?text=?";
                      }}
                    />
                    <div className="cart-item-info">
                      <div className="cart-item-name">{item.product.name}</div>
                      <div className="cart-item-cat">
                        {item.product.category}
                      </div>
                      <div className="cart-item-price">
                        ${item.product.price.toFixed(2)}
                      </div>
                    </div>
                    <div className="cart-item-right">
                      <div className="qty-row">
                        <button
                          className="qty-btn"
                          onClick={() =>
                            updateQty(item.product._id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="qty-val">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() =>
                            updateQty(item.product._id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <div className="cart-line-total">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => remove(item.product._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary card">
                <h3 className="summary-title">Order Summary</h3>
                <div className="summary-row">
                  <span>Items ({itemCount})</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span style={{ color: "#059669" }}>Free</span>
                </div>
                <hr className="summary-hr" />
                <div className="summary-row summary-total-row">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <button
                  id="checkout-btn"
                  className="btn btn-primary btn-full"
                  style={{ marginTop: 16 }}
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
```

---

### `src/pages/Checkout.css`

```css
.checkout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.checkout-heading {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
}
.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 260px;
  gap: 20px;
  align-items: start;
}
.checkout-form-area {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.checkout-section {
  padding: 20px;
}
.section-label {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 16px;
}
.mock-note {
  font-size: 12px;
  color: #6b7280;
  margin-top: 6px;
}
.checkout-summary {
  padding: 20px;
  position: sticky;
  top: 72px;
}
.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #374151;
  margin-bottom: 10px;
}
.summary-hr {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 12px 0;
}
.success-box {
  max-width: 400px;
  margin: 60px auto;
  padding: 40px;
  text-align: center;
}
.success-icon {
  font-size: 48px;
  margin-bottom: 16px;
}
.success-title {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 10px;
}
.success-msg {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 24px;
  line-height: 1.6;
}
@media (max-width: 700px) {
  .checkout-layout {
    grid-template-columns: 1fr;
  }
  .checkout-summary {
    position: static;
  }
}
@media (max-width: 480px) {
  .grid-2 {
    grid-template-columns: 1fr;
  }
}
```

### `src/pages/Checkout.tsx`

```tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { showToast } from "../components/ToastProvider";
import "./Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    card: "",
  });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, address, city, zip, card } = form;
    if (!name || !email || !address || !city || !zip || !card) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setPlaced(true);
    showToast("Order placed successfully!", "success");
  };

  if (placed) {
    return (
      <>
        <Navbar />
        <div className="page-wrapper">
          <div className="container">
            <div className="success-box card">
              <div className="success-icon">✅</div>
              <h2 className="success-title">Order Placed!</h2>
              <p className="success-msg">
                Thank you for your order. A confirmation will be sent to your
                email.
              </p>
              <button className="btn btn-primary" onClick={() => navigate("/")}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <div className="container">
          <div className="checkout-header">
            <h2 className="checkout-heading">Checkout</h2>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigate("/cart")}
            >
              ← Back to Cart
            </button>
          </div>

          <form onSubmit={placeOrder} className="checkout-layout">
            <div className="checkout-form-area">
              <div className="card checkout-section">
                <h3 className="section-label">Shipping Information</h3>
                {error && <div className="auth-error">{error}</div>}
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      className="form-input"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={set("name")}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      className="form-input"
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={set("email")}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Address</label>
                  <input
                    className="form-input"
                    placeholder="123 Main St"
                    value={form.address}
                    onChange={set("address")}
                  />
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input
                      className="form-input"
                      placeholder="New York"
                      value={form.city}
                      onChange={set("city")}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">ZIP Code</label>
                    <input
                      className="form-input"
                      placeholder="10001"
                      value={form.zip}
                      onChange={set("zip")}
                    />
                  </div>
                </div>
              </div>

              <div className="card checkout-section">
                <h3 className="section-label">Payment (Mock)</h3>
                <div className="form-group">
                  <label className="form-label">Card Number</label>
                  <input
                    className="form-input"
                    placeholder="1234 5678 9012 3456"
                    value={form.card}
                    maxLength={19}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                      setForm((prev) => ({
                        ...prev,
                        card: v.match(/.{1,4}/g)?.join(" ") ?? v,
                      }));
                    }}
                  />
                </div>
                <p className="mock-note">
                  🔒 Demo only — no real payment is processed.
                </p>
              </div>
            </div>

            <div className="card checkout-summary">
              <h3 className="section-label">Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>—</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span style={{ color: "#059669" }}>Free</span>
              </div>
              <hr className="summary-hr" />
              <div
                className="summary-row"
                style={{ fontWeight: 700, color: "#111" }}
              >
                <span>Total</span>
                <span>—</span>
              </div>
              <button
                id="place-order-btn"
                type="submit"
                className="btn btn-primary btn-full"
                style={{ marginTop: 16 }}
                disabled={loading}
              >
                {loading ? "Placing order…" : "Place Order"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
```

---

## Start Frontend

```bash
npm run dev   # starts on http://localhost:5173
```

---

## Features Checklist

- [x] Login / Register pages with nav links between them
- [x] JWT stored in localStorage, managed via React Context
- [x] Product listing — grid view with image, name, price, category, stock
- [x] Search by name, filter by category
- [x] Product CRUD — create, edit, delete via modal dialogs
- [x] Cart — view items, update quantity (+/−), remove item
- [x] Total cart value displayed in Order Summary
- [x] Mock Checkout with form validation and success screen
- [x] Loading states on all data fetching operations
- [x] Error states displayed inline on all pages
- [x] Toast notifications for all user actions
- [x] Responsive layout — works on mobile and desktop
