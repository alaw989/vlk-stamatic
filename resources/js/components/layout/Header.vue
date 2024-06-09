<template>
    <header class="flex justify-center py-4 z-1 z-10 relative"
            :style="{ backgroundColor: hover && $route.path === '/' ? '#fff' : headerColor }"
            @mouseover="hover = true" @mouseleave="hover = false">
        <div class="w-full max-w-[75%]">
            <div class="flex items-center justify-between h-full px-5 sm:px-10 max-w-">
                <div class="w-1/4">
                    <!-- Use router-link instead of anchor tag -->
                    <router-link :to="{ name: 'home' }">
                        <img class="hidden xl:block max-w-[250px] cursor-pointer" :src="imageUrl" alt="Logo">
                    </router-link>
                </div>
                <ul class="w-3/4 flex justify-end list-none">
                    <li class="text-white cursor-pointer" v-for="(page, pageIndex) in pages" :key="pageIndex">
                        <!-- Use router-link instead of anchor tag -->
                        <RouterLink :to="page.page.uri"
                                    :class="{ 'text-black': hover && $route.path === '/' }"
                                    class="hidden xl:flex mx-2 2xl:mx-4">
                            {{ page.page.title }}
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script>
import axios from "axios";

export default {
    name: "Header",
    data() {
        return {
            pages: [],
            hover: false,
        };
    },
    computed: {
        imageUrl() {
            return this.$route.path === '/' ? '/images/vibelinkraft.png' : '/images/logo-white.png';
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
    },
};
</script>

<style scoped>
/* Add any additional styling you need */
</style>
