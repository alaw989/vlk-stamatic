import { createWebHistory, createRouter } from 'vue-router';

// Import your components
import Internal from "./components/templates/Internal.vue";
import Home from "./components/templates/Home.vue";

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/:uri', name: 'page', component: Internal },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
