<template>
    <div class="h-[40vh] justify-center relative flex w-full">

        <div class="w-full max-w-[100%] flex items-center h-full relative z-10">
            <!-- Use currentPage.image as the background image URL -->
            <div class="w-1/2">
                <h1 class="text-4xl text-center" v-if="currentPage">{{ currentPage.title }}</h1>
            </div>

            <div class="image absolute h-full w-1/2 bg-cover bg-center right-0"
                 v-if="currentPage"
                 :style="{
                     backgroundImage: 'url(' +
                         (currentPage.assets_field && currentPage.assets_field.length > 0
                             ? currentPage.assets_field[0].url
                             : images[selectedHomeIndex]) +
                         ')'
                 }"></div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "InternalHero",
    data() {
        return {
            images: [
                '/images/office-1.jpg',
            ],
            selectedHomeIndex: 0,
            currentPage: null // Initialize currentPage as null
        }
    },
    mounted() {
        this.fetchPage(); // Fetch the page data when the component mounts
    },
    watch: {
        '$route.path': 'fetchPage' // Watch for route changes and call fetchPage method
    },
    methods: {
        fetchPage() {
            axios.get('/api/collections/pages/entries/')
                .then(response => {
                    const pages = response.data.data;
                    this.currentPage = pages.find(page => page.uri === this.$route.path) || null;
                    console.log('current page', this.currentPage);
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
