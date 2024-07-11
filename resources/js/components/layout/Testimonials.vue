<template>
    <div v-if="home" class="parallax-container relative">
        <!-- Dark overlay -->
        <div class="dark-overlay absolute inset-0"></div>
        <!-- Background image -->
        <div class="parallax-background absolute" :style="parallaxBackgroundStyle"></div>
        <!-- Content -->
        <div class="content-container absolute w-full">
            <div class="w-full flex justify-center absolute">
                <div class="flex justify-center flex-col items-center text-center w-full max-w-[75%]">
                    <h1 v-html="home.paragraph_section_1?.heading" class="text-4xl text-white font-bold mb-4"></h1>
                    <p class="text-white text-center max-w-[800px]" v-html="home.paragraph_section_1?.body"></p>
                    <router-link :to="home.paragraph_section_1.link_url" v-if="home.paragraph_section_1.link_url">
                        <button class="text-white text-md lg:text-lg px-4 py-2 mt-6 rounded-full bg-[#3eb488]">
                            Learn More
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Testimonials",
    props: {
        home: {
            type: Object,
            required: true
        }
    },
    computed: {
        parallaxBackgroundStyle() {
            return {
                backgroundImage: `url(${this.home.paragraph_section_1?.background_image?.url})`
            };
        }
    },
    mounted() {
        console.log('home', this.home);
    }
}
</script>

<style scoped>
.parallax-container {
    height: 500px; /* Adjust height as needed */
    position: relative;
    overflow: hidden;
}

.dark-overlay {
    background-color: rgba(0, 0, 0, 0.5); /* Adjust alpha value for darkness */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
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
</style>
