<template>
    <div v-if="home" class="parallax-container relative">
        <!-- Dark overlay -->

        <!-- Background image -->
        <div class="parallax-background absolute" :style="parallaxBackgroundStyle"></div>
        <!-- Content -->
        <div class="content-container absolute w-full">
            <div class="w-full flex justify-center absolute">
                <div class="flex justify-center flex-col items-center text-center w-full max-w-[75%]">
                    <div class="carousel-container">
                        <Carousel :breakpoints="breakpoints" :wrap-around="true" :autoplay="4000">
                            <Slide v-for="(testimonial, index) in testimonials" :key="index">
                                <div class="testimonial-slide max-w-[75%]">
                                    <h2 class="text-lg md:text-xl lg:text-2xl font-normal">{{ testimonial.testimonial }}</h2>
                                    <p class="text-sm md:text-base m-0">— {{ testimonial.author }}</p>
                                </div>
                            </Slide>
                            <Pagination/>
                            <Navigation/>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default {
    name: "Testimonials",
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
    data() {
        return {
            testimonials: [],
            breakpoints: {
                700: {
                    itemsToShow: 1,
                    snapAlign: 'center',
                },
                1024: {
                    itemsToShow: 1,
                    snapAlign: 'center',
                },
            },
        };
    },
    computed: {
        parallaxBackgroundStyle() {
            return {
                backgroundImage: `url(${this.home.paragraph_section_1?.background_image?.url})`
            };
        }
    },
    mounted() {
        axios.get('/api/collections/testimonials/entries')
            .then(response => {
                this.testimonials = response.data.data.map(entry => entry.testimonials).flat();
            })
            .catch(error => {
                console.error('Error fetching testimonials', error);
            });
    }
}
</script>

<style scoped>
.parallax-container {
    height: 500px; /* Adjust height as needed */
    position: relative;
    overflow: hidden;
}

.parallax-background {
    min-height: 500px;
    width: 100%;
    /* Create the parallax scrolling effect */
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 8;
}

.content-container {
    position: relative;
    z-index: 9;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%; /* Ensure content container covers the entire parallax container */
}

.testimonial-slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}
</style>
