<template>
    <div>
        <Header/>
        <!-- Use v-if to conditionally render InternalHero -->
        <InternalHero v-if="currentPage && $route.path !== '/contact'" :currentPage="currentPage"/>

        <div class="my-[6rem] justify-center relative flex w-full relative">
            <div class="max-w-[75%] flex flex-col-reverse lg:flex-row">
                <Accordion  />
                <div class="flex items-start lg:h-full w-full relative" v-if="currentPage"
                     v-html="currentPage.content">
                </div>

            </div>
        </div>

        <Clients/>
        <div class="relative">
            <Testimonials :home="page"/>
        </div>
        <Footer :pages="pages"/>
    </div>
</template>

<script>
import Header from "../layout/Header.vue";
import Footer from "../layout/Footer.vue";
import Clients from "../layout/Clients.vue";
import Contact from "../ContactForm.vue";
import InternalHero from "../layout/InternalHero.vue";
import axios from "axios";
import Testimonials from "../layout/Testimonials.vue";
import Accordion from "../layout/Accordion.vue";

export default {
    components: {
        Clients,
        Header,
        Footer,
        Contact,
        InternalHero,
        Testimonials,
        Accordion // Register the Accordion component
    },
    name: "Internal",

    data() {
        return {
            pages: [],
            currentPage: null,
            page: null, // Initialize currentPage to null
        };
    },

    mounted() {
        this.fetchPage();

        axios.get('/api/collections/pages/entries/home')
            .then(response => {
                this.page = response.data.data;
            })
            .catch(error => {
                console.error('Error fetching page', error);
            });
    },

    watch: {
        '$route.path': 'fetchPage'
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
