// ===== Admin Panel JavaScript =====

// Demo data
const demoProducts = [
    { id: 1, name: 'طراحی لوگو', category: 'design', price: 2500000, status: 'active', desc: 'قیمت مناسب، تحویل سریع', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=100&h=100&fit=crop', sales: 45 },
    { id: 2, name: 'طراحی وب‌سایت', category: 'development', price: 12000000, status: 'active', desc: 'واکنش‌گرا، مدرن', image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=100&h=100&fit=crop', sales: 28 },
    { id: 3, name: 'طراحی گرافیکی', category: 'design', price: 3500000, status: 'active', desc: 'خلاقانه، منحصربه‌فرد', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&h=100&fit=crop', sales: 32 },
    { id: 4, name: 'هویت بصری برند', category: 'branding', price: 8000000, status: 'active', desc: 'کامل و حرفه‌ای', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=100&h=100&fit=crop', sales: 18 },
    { id: 5, name: 'دیجیتال مارکتینگ', category: 'marketing', price: 5000000, status: 'active', desc: 'استراتژی محتوا', image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=100&h=100&fit=crop', sales: 22 },
    { id: 6, name: 'اپلیکیشن موبایل', category: 'development', price: 15000000, status: 'active', desc: 'iOS و Android', image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=100&h=100&fit=crop', sales: 15 },
    { id: 7, name: 'موشن گرافیک', category: 'design', price: 4000000, status: 'active', desc: 'انیمیشن حرفه‌ای', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop', sales: 20 },
    { id: 8, name: 'بسته برندینگ کامل', category: 'branding', price: 20000000, status: 'active', desc: 'همه‌چیز در یک جا', image: 'https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=100&h=100&fit=crop', sales: 12 }
];

const demoOrders = [
    { id: 'ORD-001', customer: 'علی محمدی', amount: '۱۲٬۰۰۰٬۰۰۰', status: 'completed', date: '۱۴۰۳/۱۰/۱۵' },
    { id: 'ORD-002', customer: 'سارا کریمی', amount: '۲٬۵۰۰٬۰۰۰', status: 'completed', date: '۱۴۰۳/۱۰/۱۴' },
    { id: 'ORD-003', customer: 'رضا احمدی', amount: '۸٬۰۰۰٬۰۰۰', status: 'pending', date: '۱۴۰۳/۱۰/۱۳' },
    { id: 'ORD-004', customer: 'مریم رضایی', amount: '۱۵٬۰۰۰٬۰۰۰', status: 'completed', date: '۱۴۰۳/۱۰/۱۲' },
    { id: 'ORD-005', customer: 'حسن نوری', amount: '۵٬۰۰۰٬۰۰۰', status: 'pending', date: '۱۴۰۳/۱۰/۱۱' }
];

// Initialize localStorage
function initStorage() {
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(demoProducts));
    }
    if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify(demoOrders));
    }
    if (!localStorage.getItem('adminLoggedIn')) {
        localStorage.setItem('adminLoggedIn', 'false');
    }
}

initStorage();

// ===== Login Page =====
const loginPage = document.getElementById('loginPage');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const btnLogin = document.getElementById('btnLogin');
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

// Check if already logged in
if (localStorage.getItem('adminLoggedIn') === 'true') {
    showDashboard();
}

// Toggle password visibility
if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;

        const eyeIcon = document.getElementById('eyeIcon');
        if (type === 'text') {
            eyeIcon.innerHTML = `
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
            `;
        } else {
            eyeIcon.innerHTML = `
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
            `;
        }
    });
}

// Login form submission
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        btnLogin.disabled = true;
        btnLogin.innerHTML = `
            <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20"/>
            </svg>
            <span>در حال ورود...</span>
        `;

        // Simulate loading
        setTimeout(() => {
            if (username === 'admin' && password === 'mahdi8705980') {
                localStorage.setItem('adminLoggedIn', 'true');
                if (rememberMe) {
                    localStorage.setItem('adminRemember', 'true');
                }
                loginError.classList.remove('show');
                showDashboard();
                showToast('success', 'ورود موفق!', 'به پنل مدیریت خوش آمدید');
            } else {
                loginError.classList.add('show');
                btnLogin.disabled = false;
                btnLogin.innerHTML = `
                    <span>ورود به پنل</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"/>
                    </svg>
                `;

                // Shake animation
                loginForm.style.animation = 'shake 0.5s ease';
                setTimeout(() => {
                    loginForm.style.animation = '';
                }, 500);
            }
        }, 1000);
    });
}

function showDashboard() {
    if (loginPage) loginPage.style.display = 'none';
    if (dashboard) dashboard.classList.add('show');
    loadDashboardData();
    loadProducts();
}

// ===== Logout =====
const btnLogout = document.getElementById('btnLogout');
if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        localStorage.setItem('adminLoggedIn', 'false');
        localStorage.removeItem('adminRemember');
        location.reload();
    });
}

// ===== Sidebar Navigation =====
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const pageContents = document.querySelectorAll('.page-content');

sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.dataset.page;

        // Update active link
        sidebarLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Show page
        pageContents.forEach(p => p.classList.remove('active'));
        const targetPage = document.getElementById(`page-${page}`);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Update page title
        const pageTitles = {
            dashboard: 'داشبورد',
            products: 'محصولات',
            orders: 'سفارشات',
            users: 'کاربران',
            analytics: 'آمار',
            settings: 'تنظیمات'
        };
        document.title = `${pageTitles[page] || 'پنل مدیریت'} | فروشگاه خلاق`;
    });
});

// Sidebar toggle
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');

if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });
}

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('show');
    });
}

// ===== Dashboard Data =====
function loadDashboardData() {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');

    // Update stats
    document.getElementById('statProducts').textContent = products.length;
    document.getElementById('statOrders').textContent = orders.length;
    document.getElementById('productCount').textContent = products.length;
    document.getElementById('orderCount').textContent = orders.length;

    // Calculate revenue
    const revenue = products.reduce((sum, p) => sum + (p.price * (p.sales || 0)), 0);
    document.getElementById('statRevenue').textContent = formatPrice(revenue);

    // Recent orders
    const recentOrdersList = document.getElementById('recentOrders');
    if (recentOrdersList) {
        recentOrdersList.innerHTML = orders.slice(0, 5).map(order => `
            <div class="order-item">
                <span class="order-id">${order.id}</span>
                <span class="order-customer">${order.customer}</span>
                <span class="order-amount">${order.amount}</span>
                <span class="order-status ${order.status}">${order.status === 'completed' ? 'تکمیل شده' : 'در انتظار'}</span>
            </div>
        `).join('');
    }

    // Top products
    const topProductsList = document.getElementById('topProducts');
    if (topProductsList) {
        const sorted = [...products].sort((a, b) => (b.sales || 0) - (a.sales || 0)).slice(0, 5);
        topProductsList.innerHTML = sorted.map(product => `
            <div class="top-product-item">
                <img src="${product.image}" alt="${product.name}">
                <div class="top-product-info">
                    <h4>${product.name}</h4>
                    <span>${product.category}</span>
                </div>
                <span class="top-product-sales">${product.sales || 0} فروش</span>
            </div>
        `).join('');
    }
}

// ===== Products Management =====
let currentPage = 1;
const itemsPerPage = 5;
let editingProductId = null;
let deletingProductId = null;

function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const searchTerm = document.getElementById('productSearch')?.value?.toLowerCase() || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || 'all';
    const sortFilter = document.getElementById('sortFilter')?.value || 'newest';

    let filtered = products.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(searchTerm);
        const matchCategory = categoryFilter === 'all' || p.category === categoryFilter;
        return matchSearch && matchCategory;
    });

    // Sort
    switch (sortFilter) {
        case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filtered.sort((a, b) => a.name.localeCompare(b.name, 'fa'));
            break;
        default:
            filtered.sort((a, b) => b.id - a.id);
    }

    // Pagination
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const paginated = filtered.slice(start, start + itemsPerPage);

    // Render table
    const tbody = document.getElementById('productsTableBody');
    if (tbody) {
        tbody.innerHTML = paginated.map(product => `
            <tr>
                <td>
                    <div class="product-cell">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="product-cell-info">
                            <h4>${product.name}</h4>
                            <span>${product.desc || ''}</span>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="category-badge ${product.category}">${getCategoryName(product.category)}</span>
                </td>
                <td class="price-cell">${formatPrice(product.price)}</td>
                <td>
                    <span class="status-badge ${product.status}">${product.status === 'active' ? 'فعال' : 'غیرفعال'}</span>
                </td>
                <td>
                    <div class="actions-cell">
                        <button class="btn-action" onclick="editProduct(${product.id})" title="ویرایش">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                        </button>
                        <button class="btn-action delete" onclick="confirmDelete(${product.id})" title="حذف">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    // Render pagination
    const pagination = document.getElementById('pagination');
    if (pagination) {
        let html = '';

        html += `<button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 18l-6-6 6-6"/>
            </svg>
        </button>`;

        for (let i = 1; i <= totalPages; i++) {
            html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
        }

        html += `<button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
            </svg>
        </button>`;

        pagination.innerHTML = html;
    }
}

function changePage(page) {
    currentPage = page;
    loadProducts();
}

function getCategoryName(cat) {
    const names = {
        design: 'طراحی',
        development: 'توسعه',
        branding: 'برندینگ',
        marketing: 'مارکتینگ'
    };
    return names[cat] || cat;
}

function formatPrice(price) {
    return price.toLocaleString('fa-IR') + ' تومان';
}

// Search & filter listeners
const productSearch = document.getElementById('productSearch');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');

if (productSearch) {
    productSearch.addEventListener('input', () => {
        currentPage = 1;
        loadProducts();
    });
}

if (categoryFilter) {
    categoryFilter.addEventListener('change', () => {
        currentPage = 1;
        loadProducts();
    });
}

if (sortFilter) {
    sortFilter.addEventListener('change', () => {
        currentPage = 1;
        loadProducts();
    });
}

// ===== Add/Edit Product =====
const productModal = document.getElementById('productModal');
const btnAddProduct = document.getElementById('btnAddProduct');
const modalClose = document.getElementById('modalClose');
const btnCancel = document.getElementById('btnCancel');
const productForm = document.getElementById('productForm');
const modalTitle = document.getElementById('modalTitle');

if (btnAddProduct) {
    btnAddProduct.addEventListener('click', () => {
        editingProductId = null;
        modalTitle.textContent = 'افزودن محصول جدید';
        productForm.reset();
        productModal.classList.add('show');
    });
}

if (modalClose) {
    modalClose.addEventListener('click', () => {
        productModal.classList.remove('show');
    });
}

if (btnCancel) {
    btnCancel.addEventListener('click', () => {
        productModal.classList.remove('show');
    });
}

if (productModal) {
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.classList.remove('show');
        }
    });
}

function editProduct(id) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const product = products.find(p => p.id === id);

    if (product) {
        editingProductId = id;
        modalTitle.textContent = 'ویرایش محصول';

        document.getElementById('productName').value = product.name;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productStatus').value = product.status;
        document.getElementById('productDesc').value = product.desc || '';

        productModal.classList.add('show');
    }
}

if (productForm) {
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('productName').value;
        const category = document.getElementById('productCategory').value;
        const price = parseInt(document.getElementById('productPrice').value);
        const status = document.getElementById('productStatus').value;
        const desc = document.getElementById('productDesc').value;

        let products = JSON.parse(localStorage.getItem('products') || '[]');

        if (editingProductId) {
            // Edit existing
            const index = products.findIndex(p => p.id === editingProductId);
            if (index !== -1) {
                products[index] = {
                    ...products[index],
                    name, category, price, status, desc
                };
                showToast('success', 'محصول ویرایش شد', `${name} با موفقیت به‌روزرسانی شد`);
            }
        } else {
            // Add new
            const newId = Math.max(...products.map(p => p.id), 0) + 1;
            const newProduct = {
                id: newId,
                name, category, price, status, desc,
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=100&h=100&fit=crop',
                sales: 0
            };
            products.push(newProduct);
            showToast('success', 'محصول اضافه شد', `${name} با موفقیت افزوده شد`);
        }

        localStorage.setItem('products', JSON.stringify(products));
        productModal.classList.remove('show');
        loadProducts();
        loadDashboardData();
    });
}

// ===== Delete Product =====
const deleteModal = document.getElementById('deleteModal');
const deleteModalClose = document.getElementById('deleteModalClose');
const btnCancelDelete = document.getElementById('btnCancelDelete');
const btnConfirmDelete = document.getElementById('btnConfirmDelete');
const deleteProductName = document.getElementById('deleteProductName');

function confirmDelete(id) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const product = products.find(p => p.id === id);

    if (product) {
        deletingProductId = id;
        deleteProductName.textContent = product.name;
        deleteModal.classList.add('show');
    }
}

if (deleteModalClose) {
    deleteModalClose.addEventListener('click', () => {
        deleteModal.classList.remove('show');
    });
}

if (btnCancelDelete) {
    btnCancelDelete.addEventListener('click', () => {
        deleteModal.classList.remove('show');
    });
}

if (deleteModal) {
    deleteModal.addEventListener('click', (e) => {
        if (e.target === deleteModal) {
            deleteModal.classList.remove('show');
        }
    });
}

if (btnConfirmDelete) {
    btnConfirmDelete.addEventListener('click', () => {
        if (deletingProductId) {
            let products = JSON.parse(localStorage.getItem('products') || '[]');
            const product = products.find(p => p.id === deletingProductId);
            products = products.filter(p => p.id !== deletingProductId);
            localStorage.setItem('products', JSON.stringify(products));

            deleteModal.classList.remove('show');
            loadProducts();
            loadDashboardData();
            showToast('warning', 'محصول حذف شد', `${product?.name || 'محصول'} با موفقیت حذف شد`);
            deletingProductId = null;
        }
    });
}

// ===== Toast Notifications =====
function showToast(type, title, message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠'
    };

    toast.innerHTML = `
        <div class="toast-icon">${icons[type] || 'ℹ'}</div>
        <div class="toast-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3500);
}

// ===== Login Particles =====
function createLoginParticles() {
    const container = document.getElementById('loginParticles');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'login-particle';

        const size = Math.random() * 3 + 1;
        const left = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = Math.random() * 15 + 15;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            bottom: -10px;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
        `;

        container.appendChild(particle);
    }
}

createLoginParticles();

// ===== Global Search =====
const globalSearch = document.getElementById('globalSearch');
if (globalSearch) {
    globalSearch.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        if (term.length > 2) {
            // Simple search across all pages
            const products = JSON.parse(localStorage.getItem('products') || '[]');
            const matches = products.filter(p => p.name.toLowerCase().includes(term));

            if (matches.length > 0) {
                showToast('info', `${matches.length} نتیجه یافت شد`, `جستجو: "${term}"`);
            }
        }
    });
}

// ===== Keyboard Shortcuts =====
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('globalSearch') || document.getElementById('productSearch');
        if (searchInput) searchInput.focus();
    }

    // Escape to close modals
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('show'));
    }
});

console.log('🔐 پنل مدیریت | Admin Panel Loaded');
console.log('👤 Username: admin');
console.log('🔑 Password: admin123');
