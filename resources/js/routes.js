import { createWebHistory, createRouter } from 'vue-router';
import Internal from './components/templates/Internal.vue';
import Home from './components/templates/Home.vue';
import Contact from './components/templates/Contact.vue';
import Services from './components/templates/Services.vue';

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/contact', name: 'contact', component: Contact },
    { path: '/services', name: 'services', component: Services },
    { path: '/:uri', name: 'page', component: Internal },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
