<template>
    <div v-if="home" class="parallax-container relative">

        <div class="parallax-background absolute" :style="parallaxBackgroundStyle"></div>
        <!-- Content -->
        <div class="content-container absolute w-full z-[9]">
            <div class="w-full flex justify-center absolute  z-[-1]">
                <div class="flex justify-center flex-col items-center text-center w-full max-w-[75%] z-[-1] relative">
                    <h1 v-html="home.paragraph_section_1?.heading"
                        class="text-2xl md:text-4xl text-black font-bold mb-4 lg:mb-6"></h1>
                    <p class="text-black text-center max-w-[800px] m-0" v-html="home.paragraph_section_1?.body"></p>
                    <router-link :to="home.paragraph_section_1.link_url" v-if="home.paragraph_section_1.link_url"
                                 class=" mt-4 lg:mt-6 hover:no-underline">
                        <button class=" lg:block text-center cursor-pointer border-2 w-[160px] py-2 rounded-full
          bg-[#3eb488] border-[#3eb488] text-[#fff] font-bold transition-colors duration-300
          hover:bg-white hover:text-[#3eb488] hover:border-[#3eb488] hover:no-underline">
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
    name: "BgParagraph",
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
