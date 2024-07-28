import { createWebHistory, createRouter } from 'vue-router';
import Internal from './components/templates/Internal.vue';
import Home from './components/templates/Home.vue';
import Contact from './components/templates/Contact.vue';
import Services from './components/templates/Services.vue';
import WorkWithUs from "./components/templates/WorkWithUs.vue";

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/contact', name: 'contact', component: Contact },
    { path: '/services', name: 'services', component: Services },
    { path: '/:uri', name: 'page', component: Internal },
    { path: '/work-with-us', name: 'work with us', component: WorkWithUs },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
