document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.main-nav');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // --- Video Lightbox Functionality ---
    const videoLightbox = document.getElementById('video-lightbox');
    const closeBtn = document.querySelector('.close-btn');
    const videoPlayer = document.getElementById('video-player');
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');

    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const videoUrl = thumbnail.getAttribute('data-video-url');
            if (videoUrl) {
                videoPlayer.src = videoUrl + '?autoplay=1'; // Add autoplay parameter
                videoLightbox.style.display = 'flex';
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        videoLightbox.style.display = 'none';
        videoPlayer.src = ''; // Stop video playback
    });

    window.addEventListener('click', (event) => {
        if (event.target === videoLightbox) {
            videoLightbox.style.display = 'none';
            videoPlayer.src = '';
        }
    });

    // --- Portfolio Filtering ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const videoItems = document.querySelectorAll('.video-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' class to the clicked button
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            videoItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block'; // Show the item
                } else {
                    item.style.display = 'none'; // Hide the item
                }
            });
        });
    });
});