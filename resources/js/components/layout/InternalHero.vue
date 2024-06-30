<template>
    <div v-if="currentPage && currentPage.assets_field && currentPage.assets_field.length > 0"
         class="h-[50vh] justify-center relative flex w-full">
        <div class="w-full flex h-full relative z-10">
            <!-- Use currentPage.image as the background image URL -->
            <div class="image absolute h-full w-full bg-cover justify-center bg-center right-0 flex"
                 :style="{ backgroundImage: 'url(' + currentPage.assets_field[0].url + ')' }">
                <h1 class="text-white w-full max-w-[75%] flex justify-start items-center">
                    {{ currentPage.heading }}
                </h1>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "InternalHero",
    data() {
        return {
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
