document.addEventListener('DOMContentLoaded', function () {
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
