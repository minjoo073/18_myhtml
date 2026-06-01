document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header.container');
    const menuButton = document.querySelector('.header-menu-toggle');
    const siteMenu = document.querySelector('#site-menu');

    if (header && menuButton && siteMenu) {
        function setMenuOpen(isOpen) {
            header.classList.toggle('menu-open', isOpen);
            menuButton.setAttribute('aria-expanded', String(isOpen));
            menuButton.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
        }

        menuButton.addEventListener('click', function () {
            setMenuOpen(!header.classList.contains('menu-open'));
        });

        siteMenu.addEventListener('click', function (event) {
            if (event.target.closest('a')) {
                setMenuOpen(false);
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                setMenuOpen(false);
            }
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 1024) {
                setMenuOpen(false);
            }
        });
    }

    const historyTrack = document.querySelector('.history_track');
    const prevButton = document.querySelector('.history_prev');
    const nextButton = document.querySelector('.history_next');

    if (!historyTrack || !prevButton || !nextButton) return;

    function centerCurrentYear() {
        const historyItems = Array.from(historyTrack.querySelectorAll('.history_item'));
        const currentYear = historyTrack.querySelector('.history_item.now');

        if (!currentYear) return;

        const currentIndex = historyItems.indexOf(currentYear);
        const itemGap = parseFloat(window.getComputedStyle(historyTrack).gap) || 0;
        const itemStep = currentYear.offsetWidth + itemGap;
        const visibleCount = Math.max(1, Math.floor((historyTrack.clientWidth + itemGap) / itemStep));
        const leadingIndex = Math.max(0, currentIndex - Math.floor(visibleCount / 2));

        historyTrack.scrollLeft = leadingIndex * itemStep;
    }

    function moveHistory(direction) {
        const firstItem = historyTrack.querySelector('.history_item');
        const itemWidth = firstItem ? firstItem.offsetWidth : 120;
        const itemGap = parseFloat(window.getComputedStyle(historyTrack).gap) || 0;
        historyTrack.scrollBy({ left: direction * (itemWidth + itemGap) * 2, behavior: 'smooth' });
    }

    prevButton.addEventListener('click', function () {
        moveHistory(-1);
    });

    nextButton.addEventListener('click', function () {
        moveHistory(1);
    });

    requestAnimationFrame(centerCurrentYear);
    window.addEventListener('load', centerCurrentYear);
    window.addEventListener('resize', centerCurrentYear);
});
