<template>
    <div>
        <Header/>
        <!-- Use v-if to conditionally render InternalHero -->
        <InternalHero v-if="currentPage && $route.path !== '/contact'" :currentPage="currentPage"/>
        <Contact v-if="$route.path === '/contact'"></Contact>
        <div class="my-[6rem] justify-center relative flex w-full">
            <div class="w-full max-w-[75%] flex items-center h-full relative z-10 flex-col" v-if="currentPage"
                 v-html="currentPage.content">
            </div>
        </div>
        <Clients />
        <Footer :pages="pages"/>
    </div>
</template>

<script>
import Header from "../layout/Header.vue";
import Footer from "../layout/Footer.vue";
import Clients from "../layout/Clients.vue"
import Contact from "./Contact.vue";
import InternalHero from "../layout/InternalHero.vue";
import axios from "axios";

export default {
    components: {
        Clients,
        Header,
        Footer,
        Contact,
        InternalHero
    },
    name: "Internal",

    data() {
        return {
            pages: [],
            currentPage: null // Initialize currentPage to null
        };
    },

    mounted() {
        this.fetchPage(); // Fetch the initial page data when the component mounts
    },

    watch: {
        '$route.path': 'fetchPage' // Watch for route changes and call fetchPage method
    },

    methods: {
        fetchPage() {
            axios.get('/api/collections/pages/entries/')
                .then(response => {
                    this.pages = response.data.data;
                    this.currentPage = this.pages.find(page => page.uri === this.$route.path) || null; // Assign currentPage here
                })
                .catch(error => {
                    console.error('Error fetching pages', error);
                });
        }
    }
}
</script>


<style scoped>
</style>
