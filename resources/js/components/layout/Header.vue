<template>
    <header :class="{'slide-up': scrollingDown, 'slide-down': scrollingUp}" class="fixed flex justify-center py-4 z-10 w-full shadow-lg"
            :style="{ backgroundColor: '#fff' }"
            @mouseover="hover = true" @mouseleave="hover = false">
        <div class="w-full max-w-[90%] md:max-w-[75%]">
            <div class="flex items-center justify-between h-full">
                <div class="mr-6">
                    <!-- Use router-link instead of anchor tag -->
                    <router-link :to="{ name: 'home' }">
                        <img class="max-w-[150px] lg:max-w-[200px] cursor-pointer" :src="imageUrl"
                             alt="Logo">
                    </router-link>
                </div>
                <ul class="w-3/4 justify-start list-none m-0 hidden lg:flex">
                    <li class="text-white cursor-pointer flex items-center mb-0" v-for="(page, pageIndex) in pages"
                        :key="pageIndex">
                        <!-- Use router-link instead of anchor tag -->
                        <RouterLink :to="page.page.uri"
                                    :class="{ 'text-black': hover && $route.path === '/' }"
                                    class="flex mx-2 text-black text-sm">
                            {{ page.page.title }}
                        </RouterLink>
                    </li>
                </ul>
                <div class="flex items-center">
                    <ul class="flex m-0">
                        <li v-for="(icon, index) in socialMediaIcons" :key="index"
                            class="social w-[20px] lg:w-[30px] mr-2 mb-0">
                            <a :href="icon.link" v-html="icon.code.value" target="_blank"></a>
                        </li>
                    </ul>
                    <a href="/contact"
                       class="hidden lg:block text-center cursor-pointer border-2 w-[160px] py-2 rounded-full
          bg-[#3eb488] border-[#3eb488] text-[#fff] font-bold transition-colors duration-300
          hover:bg-white hover:text-[#3eb488] hover:border-[#3eb488] hover:no-underline"
                    >
                        Get In Touch
                    </a>
                    <Slide right class="relative bm-vlk lg:hidden">
                        <template #default>
                            <ul>
                                <li v-for="(page, pageIndex) in pages" :key="pageIndex">
                                    <RouterLink :to="page.page.uri">
                                        {{ page.page.title }}
                                    </RouterLink>
                                </li>
                            </ul>
                        </template>
                    </Slide>
                </div>
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
            socialMediaIcons: '',
            lastScrollTop: 0,
            scrollingDown: false,
            scrollingUp: false
        };
    },
    components: {
        Slide // Register your component
    },
    computed: {
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
                this.socialMediaIcons = response.data.data[0].social_media_icons

                if (companyData && companyData.logo) {
                    this.imageUrl = companyData.logo.url;
                }
            })
            .catch(error => {
                console.error('Error fetching globals', error);
            });

        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (currentScrollTop > this.lastScrollTop) {
                // Scrolling down
                this.scrollingDown = true;
                this.scrollingUp = false;
            } else {
                // Scrolling up
                this.scrollingDown = false;
                this.scrollingUp = true;
            }
            this.lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
        }
    }
};
</script>

<style lang="scss">
.bm-vlk {
    .bm-burger-button {
        position: relative;
        top: 0;
        left: 0;
    }

    .bm-item-list ul {
        display: flex;
        flex-direction: column;
    }

    .bm-menu {
        background-color: #3eb488;

        nav {
            ul {
                li {
                    a {
                        color: #fff;
                    }
                }
            }
        }
    }
}

header {
    background-color: white;
    transition: transform 0.3s ease-in-out;

    &.slide-up {
        transform: translateY(-100%);
    }

    &.slide-down {
        transform: translateY(0);
    }

    &:hover {
        background-color: #f0f0f0;
    }
}

@media (min-width: 1024px) {
    .bm-vlk {
        display: none;
    }
}

.social {
    svg {
        fill: #25375E;
    }
}
</style>

