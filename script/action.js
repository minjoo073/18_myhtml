document.addEventListener('DOMContentLoaded', function () {
    const historyItems = Array.from(document.querySelectorAll('.history_item'));
    const historyTrack = document.querySelector('.history_track');
    const selectedYearTitle = document.querySelector('#festivalSelectedYear');
    const prevButton = document.querySelector('.history_prev');
    const nextButton = document.querySelector('.history_next');

    if (!historyItems.length) return;

    let activeIndex = historyItems.findIndex(function (item) {
        return item.classList.contains('now');
    });

    if (activeIndex < 0) activeIndex = 0;

    function updateHistory(index) {
        activeIndex = (index + historyItems.length) % historyItems.length;

        historyItems.forEach(function (item, itemIndex) {
            item.classList.toggle('now', itemIndex === activeIndex);
        });

        const activeItem = historyItems[activeIndex];
        const year = activeItem.dataset.year;
        const edition = activeItem.dataset.edition.replace('제', '').replace('회', '');

        if (selectedYearTitle) {
            selectedYearTitle.textContent = edition + '회 영화제 (' + year + ')';
        }

        if (historyTrack) {
            historyTrack.scrollLeft = activeItem.offsetLeft - (historyTrack.clientWidth / 2) + (activeItem.offsetWidth / 2);
        }
    }

    historyItems.forEach(function (item, index) {
        item.addEventListener('click', function () {
            updateHistory(index);
        });
    });

    if (prevButton) {
        prevButton.addEventListener('click', function () {
            updateHistory(activeIndex - 1);
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', function () {
            updateHistory(activeIndex + 1);
        });
    }

    updateHistory(activeIndex);
    window.addEventListener('load', function () {
        updateHistory(activeIndex);
        setTimeout(function () {
            updateHistory(activeIndex);
        }, 100);
    });
});
