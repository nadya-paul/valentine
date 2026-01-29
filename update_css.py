with open('style.css', 'a', encoding='utf-8') as f:
    f.write("""
/* Mobile Optimization Override */
@media (max-width: 600px) {
    .envelope-grid {
        gap: 10px;
        width: 100vw;
        max-width: 100vw;
        padding: 0 15px;
        box-sizing: border-box;
        margin-top: 10px;
        justify-content: space-between;
    }
    .env-wrapper {
        width: 44vw !important;
        margin: 0 !important;
        padding: 0 !important;
    }
    .env-main {
        height: 36vw !important;
        min-height: 100px !important;
        width: 100% !important;
    }
    .hello-kitty-wave-bg, .hello-kitty-bg {
        pointer-events: none !important;
        z-index: -1;
        opacity: 0.5;
        width: 80px !important; /* Smaller kitty on mobile */
        height: 80px !important;
    }
    .glow-btn, .music-btn {
        width: 85% !important;
        min-width: 200px;
        padding: 15px 0 !important;
        font-size: 1.2rem;
        margin: 10px auto;
    }
    .step {
        padding-bottom: 150px; /* Generous padding for scrolling and keypads */
        overflow-x: hidden;
        min-height: 100vh;
        height: auto;
    }
    h1.pixel-text {
        font-size: 1.5rem !important;
        margin: 5px 0;
    }
    p {
        font-size: 0.95rem !important;
        padding: 0 20px;
        line-height: 1.4;
    }
    
    /* Ensure photos fit and don't crop */
    .env-photo img {
        object-fit: contain !important;
        width: 100% !important;
        height: 100% !important;
    }
}
""")
print("CSS updated successfully.")
