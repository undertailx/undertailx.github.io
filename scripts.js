document.addEventListener("DOMContentLoaded", function() {
    const media = [
        { type: 'video', src: 'img-random/1.mp4' },
        { type: 'video', src: 'img-random/2.mp4' },
        { type: 'video', src: 'img-random/3.mp4' },
        { type: 'video', src: 'img-random/4.mp4' },
        { type: 'video', src: 'img-random/5.mp4' },
        { type: 'video', src: 'img-random/6.mp4' },
        { type: 'video', src: 'img-random/7.mp4' },
        { type: 'video', src: 'img-random/8.mp4' },
        { type: 'video', src: 'img-random/9.mp4' },
        { type: 'video', src: 'img-random/10.mp4' },
        { type: 'video', src: 'img-random/11.mp4' },
        { type: 'video', src: 'img-random/12.mp4' }
        // { type: 'video', src: 'img-random/13.mp4' },
        // { type: 'video', src: 'img-random/14.mp4' },
        // { type: 'video', src: 'img-random/15.mp4' },
        // { type: 'video', src: 'img-random/16.mp4' },
        // { type: 'video', src: 'img-random/17.mp4' },
        // { type: 'video', src: 'img-random/18.mp4' },
        // { type: 'video', src: 'img-random/19.mp4' },
        // { type: 'video', src: 'img-random/20.mp4' },
        // { type: 'video', src: 'img-random/21.mp4' },
        // { type: 'video', src: 'img-random/22.mp4' },
        // { type: 'video', src: 'img-random/23.mp4' },
        // { type: 'video', src: 'img-random/24.mp4' },
        // { type: 'video', src: 'img-random/25.mp4' },
        // { type: 'video', src: 'img-random/26.mp4' },
        // { type: 'video', src: 'img-random/27.mp4' }
    ];

    const randomMemeButton = document.querySelector(".random-meme");
    const popup = document.getElementById("popup");
    const popupContent = document.querySelector(".popup-content");
    const closeButton = document.querySelector(".close");
    const downloadButton = document.getElementById("download-btn");
    const volumeSlider = document.getElementById("volume"); // สไลเดอร์ปรับเสียง
    
    let lastIndex = -1;
    let mediaElement; // สร้างตัวแปรสำหรับเก็บวิดีโอ

    randomMemeButton.addEventListener("click", function() {
        let randomIndex;

        do {
            randomIndex = Math.floor(Math.random() * media.length);
        } while (randomIndex === lastIndex);

        lastIndex = randomIndex;
        const selectedMedia = media[randomIndex];

        const existingMedia = popupContent.querySelector("video");
        if (existingMedia) {
            popupContent.removeChild(existingMedia);
        }

        mediaElement = document.createElement("video");
        mediaElement.src = selectedMedia.src;
        mediaElement.controls = true;
        mediaElement.autoplay = true;

        downloadButton.style.display = "block";
        downloadButton.onclick = function() {
            const link = document.createElement('a');
            link.href = selectedMedia.src;
            link.download = selectedMedia.src.split('/').pop();
            link.click();
        };

        popupContent.insertBefore(mediaElement, closeButton);
        popup.style.display = "flex";

        // ตั้งค่าระดับเสียงจากสไลเดอร์
        mediaElement.volume = volumeSlider.value;

        // ฟังก์ชันฟังการเปลี่ยนแปลงของสไลเดอร์เสียง
        volumeSlider.addEventListener('input', function() {
            mediaElement.volume = volumeSlider.value;
        });

        mediaElement.addEventListener('ended', function() {
            popup.style.display = "none";
        });
    });

    closeButton.addEventListener("click", function() {
        if (mediaElement) {
            mediaElement.pause();
            mediaElement.currentTime = 0;
        }
        popup.style.display = "none";
        downloadButton.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target === popup) {
            if (mediaElement) {
                mediaElement.pause();
                mediaElement.currentTime = 0;
            }
            popup.style.display = "none";
            downloadButton.style.display = "none";
        }
    });
});
