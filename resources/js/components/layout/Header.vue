<template>
    <header class="flex justify-center py-4 z-1 z-10 relative"
            :style="{ backgroundColor: '#fff'  }"
            @mouseover="hover = true" @mouseleave="hover = false">
        <div class="w-full  max-w-[75%]">
            <div class="flex items-center justify-between h-full ">
                <div class="w-1/4">
                    <!-- Use router-link instead of anchor tag -->
                    <router-link :to="{ name: 'home' }">
                        <img class=" max-w-[150px] lg:max-w-[200px] xl:max-w-[250px] cursor-pointer" :src="imageUrl" alt="Logo">
                    </router-link>
                </div>
                <ul class="w-3/4 justify-end list-none m-0 hidden lg:flex">
                    <li class="text-white cursor-pointer" v-for="(page, pageIndex) in pages" :key="pageIndex">
                        <!-- Use router-link instead of anchor tag -->
                        <RouterLink :to="page.page.uri"
                                    :class="{ 'text-black': hover && $route.path === '/' }"
                                    class="flex mx-2 2xl:mx-4 text-black">
                            {{ page.page.title }}
                        </RouterLink>
                    </li>
                </ul>
                <Slide right class="relative bm-vlk lg:hidden">
                    <a id="home" href="#">
                        <span>Home</span>
                    </a>
                </Slide>
            </div>
        </div>
    </header>
</template>

<script>
import axios from "axios";
import { Slide } from 'vue3-burger-menu';

export default {
    name: "Header",
    data() {
        return {
            pages: [],
            hover: false,
            imageUrl: '',
            whiteImageUrl: '',
        };
    },
    components: {
        Slide // Register your component
    },
    computed: {
        imageUrl() {
            return this.$route.path === '/' ? this.imageUrl : this.imageUrl;
        },
        headerColor() {
            return this.$route.path === '/' ? 'transparent' : '#25375E';
        },
    },
    mounted() {
        axios.get('/api/navs/header/tree')
            .then(response => {
                this.pages = response.data.data;
            })
            .catch(error => {
                console.error('Error fetching header navigation:', error);
            });

        axios.get('/api/globals')
            .then(response => {
                const companyData = response.data.data.find(item => item.handle === 'company');

                if (companyData && companyData.logo) {
                    this.imageUrl = companyData.logo.url;
                }
            })
            .catch(error => {
                console.error('Error fetching globals', error);
            });
    },
};
</script>

<style>
.bm-vlk .bm-burger-button {
    position: relative;
    top: 0;
    left: 0;
}
</style>
