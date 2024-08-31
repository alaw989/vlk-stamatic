<template>
    <div v-if="clients.length > 0" class="parallax-container relative py-[6rem]"
         :class="computedBackgroundClass">
        <div class="w-full">
            <div class="w-full flex justify-center">
                <div class="flex justify-center flex-col items-center text-center w-full md:max-w-[75%]">
                    <h1 class="mb-4 lg:mb-[2rem] text-2xl md:text-4xl font-bold"
                        :class="route.path !== '/' ? 'text-black' : 'text-black'">
                        {{ headingText }}
                    </h1>
                    <carousel :breakpoints="breakpoints" :wrap-around="true" :autoplay="3000" :items-to-show="2">
                        <slide v-for="item in clients" :key="item.id">
                            <!-- Render image with link if partner_link is available -->
                            <a v-if="item.partner_link && item.partner_image && item.partner_image.length > 0"
                               :href="item.partner_link"
                               target="_blank">
                                <div class="mx-4">
                                    <img :src="item.partner_image[0].url"
                                         :alt="item.partner_image[0].url || 'Client Image'"
                                         class="rounded-md object-contain"/>
                                </div>
                            </a>
                            <!-- Render only the image if partner_link is not available -->
                            <div v-else-if="item.partner_image && item.partner_image.length > 0" class="mx-4">
                                <img :src="item.partner_image[0].url"
                                     :alt="item.partner_image[0].url || 'Client Image'"
                                     class="rounded-md object-contain"/>
                            </div>
                            <!-- Fallback content if neither link nor image is available -->
                            <div v-else class="mx-4">
                                <p>No image available</p>
                            </div>
                        </slide>
                    </carousel>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <p>No clients available at the moment.</p>
    </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import axios from "axios";
import { useRoute } from 'vue-router';

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
            clients: [], // Initialize clients as an empty array
            route: useRoute(),
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
        };
    },
    computed: {
        computedBackgroundClass() {
            // Determine background color based on the route path or other conditions
            if (this.route.path !== '/') {
                return this.clients.length > 5 ? 'bg-[#f0f0f0]' : 'bg-[#e0e0e0]';
            } else {
                return 'bg-[#fff]';
            }
        },
        headingText() {
            // Dynamic heading text based on conditions
            return this.clients.length > 0 ? 'Our Partners' : 'No Partners Available';
        }
    },
    mounted() {
        axios.get('/api/collections/partners/entries')
            .then(response => {
                this.clients = response.data.data || []; // Ensure clients is an array
            })
            .catch(error => {
                console.error('Error fetching clients', error);
                this.clients = []; // Fallback to an empty array on error
            });
    }
}
</script>


<style scoped>
.parallax-container {
    position: relative;
}
</style>
