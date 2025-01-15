// Move the function outside DOMContentLoaded
function openAirbnb() {
    window.open('https://www.airbnb.co.in/rooms/984593235506575106?source_impression_id=p3_1736754185_P3kT1z_QC9TVtE9W#availability-calendar', '_blank');
}

document.addEventListener('DOMContentLoaded', function() {
    // Mobile view notice
    if (window.innerWidth > 480) {
        const notice = document.createElement('div');
        notice.className = 'mobile-view-notice';
        notice.innerHTML = '<i class="fas fa-mobile-alt"></i> This is a mobile view. For best experience, use your mobile device.';
        document.body.appendChild(notice);

        setTimeout(() => {
            notice.remove();
        }, 6000);
    }

    // Modal functions
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.classList.add('modal-open');
            
            // Initialize collapsible menus when rules or amenities modal opens
            if (modalId === 'rules-modal' || modalId === 'amenities-modal') {
                initializeCollapsible(modal);
            }
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    }

    // Button click handlers
    const buttonMappings = {
        'reviews-btn': 'reviews-modal',
        'book-now-btn': 'book-now-modal',
        'nearby-btn': 'nearby-modal',
        'emergency-btn': 'emergency-modal',
        'rules-btn': 'rules-modal',
        'specials-btn': 'specials-modal',
        'amenities-card': 'amenities-modal',
        'gallery-card': 'gallery-modal',
        'food-card': 'food-modal'
    };

    // Add click handlers for all buttons
    Object.entries(buttonMappings).forEach(([btnId, modalId]) => {
        const button = document.getElementById(btnId);
        if (button) {
            button.addEventListener('click', () => openModal(modalId));
        }
    });

    // Add this specific handler for the book now button
    const bookNowBtn = document.getElementById('book-now-btn');
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const modal = document.getElementById('book-now-modal');
            if (modal) {
                modal.style.display = 'block';
                document.body.classList.add('modal-open');
            }
        });
    }

    // Add handler for footer book now button
    const bookNowFooterBtn = document.getElementById('book-now-footer-btn');
    if (bookNowFooterBtn) {
        bookNowFooterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const modal = document.getElementById('book-now-modal');
            if (modal) {
                modal.style.display = 'block';
                document.body.classList.add('modal-open');
            }
        });
    }

    // Close button handlers
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target.id);
        }
    });

    // Share button functionality
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: "Mrudhgandh PoolVilla - Digital Guidebook",
                        text: 'Check out this amazing property!',
                        url: window.location.href
                    });
                } catch (err) {
                    console.log('Error sharing:', err);
                    alert('Unable to share at this time');
                }
            } else {
                alert('Share via: [Copy URL functionality to be implemented]');
            }
        });
    }

    // Collapsible menu functionality
    function initializeCollapsible(modalElement) {
        const headers = modalElement.querySelectorAll('.category-header');
        
        headers.forEach(header => {
            // Remove existing event listeners
            header.replaceWith(header.cloneNode(true));
            const newHeader = modalElement.querySelector(`[data-category="${header.dataset.category}"]`);
            
            newHeader.addEventListener('click', function() {
                const category = this.parentElement;
                const content = category.querySelector('.category-content');
                const icon = this.querySelector('i');
                
                // Close other categories
                const otherCategories = modalElement.querySelectorAll('.rule-category.active, .amenity-category.active');
                otherCategories.forEach(otherCategory => {
                    if (otherCategory !== category) {
                        otherCategory.classList.remove('active');
                        otherCategory.querySelector('.category-content').style.display = 'none';
                        otherCategory.querySelector('i').style.transform = 'rotate(0deg)';
                    }
                });
                
                // Toggle current category
                category.classList.toggle('active');
                if (category.classList.contains('active')) {
                    content.style.display = 'block';
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    content.style.display = 'none';
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        });
    }

    // Gallery functionality
    function initializeGallery() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                
                const lightboxImg = document.createElement('img');
                lightboxImg.src = img.src;
                
                const closeBtn = document.createElement('span');
                closeBtn.className = 'lightbox-close';
                closeBtn.innerHTML = '&times;';
                
                lightbox.appendChild(lightboxImg);
                lightbox.appendChild(closeBtn);
                document.body.appendChild(lightbox);
                
                setTimeout(() => lightbox.classList.add('active'), 10);
                
                const closeLightbox = () => {
                    lightbox.classList.remove('active');
                    setTimeout(() => lightbox.remove(), 300);
                };
                
                closeBtn.addEventListener('click', closeLightbox);
                lightbox.addEventListener('click', (e) => {
                    if (e.target === lightbox) closeLightbox();
                });
            });
        });
    }

    // Initialize gallery when gallery card is clicked
    const galleryCard = document.getElementById('gallery-card');
    if (galleryCard) {
        galleryCard.addEventListener('click', () => {
            setTimeout(() => {
                initializeGallery();
                initializeGalleryFilters();
            }, 100);
        });
    }

    // Add this inside your DOMContentLoaded event listener
    function initializeGalleryFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                // Filter items
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }

    // Link nearby experiences to specials modal
    document.getElementById('nearby-experiences').addEventListener('click', function() {
        openModal('specials-modal');
    });

    // Make sure this is updated in your window click handler
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target.id);
        }
    }

    // Add this to your existing DOMContentLoaded event listener
    function initializeMenuFilters() {
        const filterButtons = document.querySelectorAll('.menu-filter-btn');
        const menuSections = document.querySelectorAll('.menu-section');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const menuType = button.getAttribute('data-menu');

                // Hide all menu sections
                menuSections.forEach(section => {
                    section.classList.remove('active');
                });

                // Show selected menu section
                document.querySelector(`.menu-section[data-menu="${menuType}"]`).classList.add('active');
            });
        });
    }

    // Add this to your gallery card click handler or wherever you initialize the food modal
    document.getElementById('food-card').addEventListener('click', function() {
        const foodModal = document.getElementById('food-modal');
        if (foodModal) {
            foodModal.style.display = 'block';
            document.body.classList.add('modal-open');
        }
    });
}); 