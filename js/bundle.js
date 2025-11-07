document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item-has-children');
    let isMobile = window.innerWidth <= 1024;
    let activeMenuItem = null;

    function handleMenuItemClick(e) {
        if (!isMobile) return;

        const menuItem = this.closest('.menu-item-has-children');
        if (!menuItem) return;

        const isActive = menuItem.classList.contains('active');
        const submenu = menuItem.querySelector('ul');

        if (isActive && this.getAttribute('href') !== '#' && this.getAttribute('href') !== '') {
            return;
        }

        if (activeMenuItem && activeMenuItem !== menuItem) {
            const prevSubmenu = activeMenuItem.querySelector('ul');
            prevSubmenu.style.maxHeight = '0px';
            activeMenuItem.classList.remove('active');
        }

        if (!isActive) {
            submenu.style.maxHeight = submenu.scrollHeight + 'px';
            menuItem.classList.add('active');
            activeMenuItem = menuItem;
        } else {
            submenu.style.maxHeight = '0px';
            menuItem.classList.remove('active');
            activeMenuItem = null;
        }

        e.preventDefault();
    }

    function initMobileMenu() {
        menuItems.forEach(item => {
            const submenu = item.querySelector('ul');
            const link = item.querySelector('a');

            if (submenu && link) {
                if (isMobile) {
                    submenu.style.maxHeight = '0px';
                    submenu.style.transition = 'max-height 0.3s ease-out';
                    submenu.style.overflow = 'hidden';
                    link.addEventListener('click', handleMenuItemClick);
                } else {
                    submenu.style.maxHeight = '';
                    submenu.style.transition = '';
                    submenu.style.overflow = '';
                    link.removeEventListener('click', handleMenuItemClick);
                }
            }
        });
    }

    initMobileMenu();

    window.addEventListener('resize', function() {
        isMobile = window.innerWidth <= 1024;

        menuItems.forEach(item => {
            item.classList.remove('active');
            const submenu = item.querySelector('ul');
            if (submenu) {
                submenu.style.maxHeight = '';
                submenu.style.transition = '';
                submenu.style.overflow = '';
            }
        });
        activeMenuItem = null;

        initMobileMenu();
    });
});

function openMenu() {
    document.querySelector('.header-nav').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    document.querySelector('.header-nav').classList.remove('show');
    document.body.style.overflow = '';
}

document.querySelector('.mobile-menu-button').addEventListener('click', openMenu);
document.querySelector('.close-menu-button').addEventListener('click', closeMenu);

document.querySelectorAll('.header-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (!this.closest('.menu-item-has-children') || window.innerWidth > 1200) {
            closeMenu();
        }
    });
});

document.addEventListener('click', function(event) {
    const headerNav = document.querySelector('.header-nav');
    const mobileMenuButton = document.querySelector('.mobile-menu-button');

    if (!headerNav.contains(event.target) && !mobileMenuButton.contains(event.target) && headerNav.classList.contains('show')) {
        closeMenu();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && document.querySelector('.header-nav').classList.contains('show')) {
        closeMenu();
    }
});
