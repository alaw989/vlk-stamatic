import {createApp} from 'vue'

import App from './components/App.vue'
import router from "./routes.js";

createApp(App).use(router).mount("#app")

document.addEventListener('DOMContentLoaded', function () {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            // Toggle the active class on the header
            this.classList.toggle('active');

            // Toggle the content visibility
            const content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });
});

