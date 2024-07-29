<template>
    <div v-if="clients" class="parallax-container relative py-[6rem]"
         :class="route.path !== '/' ? 'bg-[#3EB488]' : 'bg-[#fff]'">
        <div class="w-full">
            <div class="w-full flex justify-center">
                <div class="flex justify-center flex-col items-center text-center w-full  md:max-w-[75%]">
                    <h1 class="mb-4 lg:mb-[2rem] text-2xl md:text-4xl font-bold text-black m-0"
                        :class="route.path !== '/' ? 'text-white' : 'text-black'">Our Partners</h1>
                    <carousel :breakpoints="breakpoints" :wrap-around="true"  :autoplay="3000" :items-to-show="2">
                        <slide v-for="item in clients" :key="item.id">
                            <a target="_blank" :href="item.partner_link">
                                <div class="mx-4">
                                    <img :src="item.partner_image[0].url"
                                         :alt="item.partner_image[0].url || 'Client Image'"
                                         class="rounded-md object-contain"/>
                                </div>
                            </a>
                        </slide>
                    </carousel>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import {Carousel, Slide, Pagination, Navigation} from 'vue3-carousel'
import axios from "axios";
import {useRoute} from 'vue-router'

export default {
    name: "Clients",
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
    },
    data() {
        return {
            clients: [],
            clientsHeading: '',
            learnMoreLink: '',
            background: "",
            route: "",
            breakpoints: {
                700: {
                    itemsToShow: 3,
                    snapAlign: 'center',
                },
                1024: {
                    itemsToShow: 5,
                    snapAlign: 'start',
                },
            },
            shouldRenderComponent: false,
        };
    },
    mounted() {
        this.route = useRoute();

        axios.get('/api/collections/partners/entries')
            .then(response => {
                this.clients = response.data.data;
            })
            .catch(error => {
                console.error('Error fetching clients', error);
            });

    }
}
</script>

<style scoped>
.parallax-container {
    position: relative;
}
</style>
