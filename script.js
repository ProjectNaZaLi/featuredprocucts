// SAKHA Collection - Interactive Features
document.addEventListener('DOMContentLoaded', function () {

    // Scroll to Top functionality
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Product card hover effects
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Detail button functionality
    const detailButtons = document.querySelectorAll('.btnDetail');

    detailButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            // Get product information
            const card = this.closest('.product-card');
            const productTitle = card.querySelector('.product-title').textContent;
            const productPrice = card.querySelector('.product-price').textContent;

            // Create modal or show product details
            showProductDetails(productTitle, productPrice);
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Only handle internal links
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add loading animation for images
    const images = document.querySelectorAll('.product-image');

    images.forEach(img => {
        img.addEventListener('load', function () {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });

        img.addEventListener('error', function () {
            this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23f8f9fa"/><text x="150" y="100" text-anchor="middle" fill="%236c757d" font-family="Arial" font-size="16">Image not available</text></svg>';
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe product cards for animation
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add parallax effect to banner
    const banner = document.querySelector('.banner-section');

    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        if (banner) {
            banner.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add search functionality (placeholder)
    function addSearchFunctionality() {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search products...';
        searchInput.className = 'form-control mb-3';
        searchInput.style.maxWidth = '300px';
        searchInput.style.margin = '0 auto';
        searchInput.style.display = 'block';

        const catalogueSection = document.querySelector('.catalogue-section');
        const title = catalogueSection.querySelector('.catalogue-title');

        title.parentNode.insertBefore(searchInput, title.nextSibling);

        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();
            const products = document.querySelectorAll('.product-card');

            products.forEach(product => {
                const title = product.querySelector('.product-title').textContent.toLowerCase();
                if (title.includes(searchTerm)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    }

    // Initialize search functionality
    addSearchFunctionality();

    // Add to cart functionality (placeholder)
    function addToCartFunctionality() {
        const addToCartButtons = document.createElement('button');
        addToCartButtons.className = 'btn btn-success btn-sm ms-2';
        addToCartButtons.innerHTML = '<i class="fas fa-shopping-cart me-1"></i>Add to Cart';

        const productFooters = document.querySelectorAll('.product-footer');

        productFooters.forEach(footer => {
            const clone = addToCartButtons.cloneNode(true);
            clone.addEventListener('click', function () {
                const card = this.closest('.product-card');
                const productTitle = card.querySelector('.product-title').textContent;

                // Show notification
                showNotification(`${productTitle} added to cart!`, 'success');
            });
            footer.appendChild(clone);
        });
    }

    // Initialize add to cart functionality
    addToCartFunctionality();

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;

        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }

    // Product details modal function
    function showProductDetails(title, price) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'productModal';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <img src="images/produk lain 2.jpg" class="img-fluid rounded" alt="${title}">
                            </div>
                            <div class="col-md-6">
                                <h4>${title}</h4>
                                <p class="text-danger fw-bold fs-4">${price}</p>
                                <p>Produk berkualitas tinggi dengan desain eksklusif. Tersedia dalam berbagai ukuran dan warna.</p>
                                <ul class="list-unstyled">
                                    <li><i class="fas fa-check text-success me-2"></i>Kualitas Premium</li>
                                    <li><i class="fas fa-check text-success me-2"></i>Desain Eksklusif</li>
                                    <li><i class="fas fa-check text-success me-2"></i>Bahan Nyaman</li>
                                    <li><i class="fas fa-check text-success me-2"></i>Pengiriman Cepat</li>
                                </ul>
                                <button class="btn btn-primary btn-lg w-100">
                                    <i class="fas fa-whatsapp me-2"></i>Order via WhatsApp
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();

        modal.addEventListener('hidden.bs.modal', function () {
            modal.remove();
        });
    }

    // Add keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                const modalInstance = bootstrap.Modal.getInstance(modal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            });
        }
    });

    // Performance optimization: Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add loading state
    window.addEventListener('load', function () {
        document.body.classList.add('loaded');

        // Show welcome message
        setTimeout(() => {
            showNotification('Welcome to SAKHA Collection! 🎉', 'success');
        }, 1000);
    });

    // Add theme toggle (optional)
    function addThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'btn btn-outline-light position-fixed';
        themeToggle.style.cssText = `
            top: 20px;
            left: 20px;
            z-index: 1000;
            border-radius: 50%;
            width: 50px;
            height: 50px;
        `;
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';

        themeToggle.addEventListener('click', function () {
            document.body.classList.toggle('dark-theme');
            const icon = this.querySelector('i');
            if (document.body.classList.contains('dark-theme')) {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        });

        document.body.appendChild(themeToggle);
    }

    // Initialize theme toggle
    addThemeToggle();

    console.log('SAKHA Collection website loaded successfully! 🚀');
});
