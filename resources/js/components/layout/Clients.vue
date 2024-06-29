<template>
    <div class="parallax-container relative py-[6rem]" v-if="home">
        <div class="w-full">
            <div class="w-full flex justify-center">
                <div class="flex justify-center flex-col items-center text-center w-full max-w-[90%] md:max-w-[75%]">
                    <h1 class="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-black"
                        v-html="home?.clients?.heading"></h1>

                    <carousel :breakpoints="breakpoints" :wrap-around="true" :autoplay="3000" :items-to-show="2"
                              class="">
                        <slide v-for="item in home?.clients?.replicator_field" :key="item.id">
                            <router-link target="_blank" :to="home?.clients?.learn_more_link">
                                <div class="mx-4">
                                    <img :src="item.assets_field.url" :alt="item.assets_field.alt || 'Client Image'"
                                         class="rounded-md w-[150px] h-[150px] md:w-[250px] md:h-[250px] object-contain"/>
                                </div>
                            </router-link>
                        </slide>
                    </carousel>

                    <router-link :to="home?.clients?.learn_more_link" class="mt-4 md:mt-6">
                        <button class="text-white text-sm md:text-lg px-4 py-2 rounded-full bg-[#3eb488]">
                            Learn More
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import {Carousel, Slide, Pagination, Navigation} from 'vue3-carousel'

export default {
    name: "Clients",
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
    },
    props: {
        home: {
            type: Object,
            required: true
        }
    },
    data: () => ({

        settings: {
            itemsToShow: 1,
            snapAlign: 'center',
        },

        breakpoints: {
            // 700px and up
            700: {
                itemsToShow: 3,
                snapAlign: 'center',
            },
            // 1024 and up
            1024: {
                itemsToShow: 5,
                snapAlign: 'start',
            },
        },
    }),
    mounted() {
        console.log('home', this.home);
    }
}
</script>

<style scoped>
.parallax-container {
    position: relative;
    background-color: #f2f2f5;
}
</style>
