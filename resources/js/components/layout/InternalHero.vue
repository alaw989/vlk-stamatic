<template>
    <div v-if="currentPage && currentPage.assets_field && currentPage.assets_field.length > 0"
         class="internal-hero justify-center relative flex w-full z-[1]">
        <div class="w-full flex h-full relative z-10">
            <!-- Use currentPage.image as the background image URL -->
            <div class="image absolute h-full w-full bg-cover justify-center bg-center right-0 flex"
                 :style="{ backgroundImage: 'url(' + currentPage.assets_field[0].url + ')' }">
                <div class="absolute inset-0 bg-black opacity-50 z-[1]"></div>
                <div class="text-container w-full max-w-[75%] flex flex-col justify-center items-start h-full z-[2]">
                    <h1 class="text-white">
                        {{ currentPage.heading }}
                    </h1>
                    <p class="text-white">
                        {{ currentPage.subheading }}
                    </p>
                </div>
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
.internal-hero {
    height: calc(50vh);
    padding-top: 78.9844px;
}
.text-container {
    padding-left: 1rem; /* Adjust as needed */
}
</style>
