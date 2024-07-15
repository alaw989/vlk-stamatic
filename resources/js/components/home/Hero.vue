<template>
    <div v-if="home" class="w-full flex justify-center hero items-center relative z-0 top-0">
        <!-- Parallax background container -->
        <div class="parallax-container">
            <!-- Render video or image based on the type of asset -->
            <template v-if="isVideo">
                <video class="parallax w-full h-full object-cover" autoplay muted loop>
                    <source :src="home.assets_field[0].url" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </template>
            <template v-else>
                <img :src="home.assets_field[0].url" alt="Banner Image" class="parallax w-full h-full object-cover">
            </template>
        </div>
        <div class="absolute inset-0 bg-black opacity-50"></div>
        <div class="flex flex-col absolute z-10 items-start justify-start w-[75%]">
            <h1 class="text-[48px] max-w-[700px] text-white text-left mb-8  mt-[205px]">{{ home.heading }}</h1>
            <p class="mb-[50px] w-full max-w-[600px] text-left text-white hidden lg:block" v-html="home.subheading"></p>
            <div class="flex justify-center">
                <ul class="flex flex-col justify-between items-center w-full lg:flex-row">
                    <li v-for="(square, index) in home.hero_squares" :key="index"
                        class="mb-6 py-6 xl:py-8 px-6 text-white bg-[#3eb488] text-center rounded-md w-[95%] max-w-[550px] xl:w-[400px] mx-2">
                        <h3 class="font-bold">{{ square.title }}</h3>
                        <p class="mt-4 mb-6">{{ square.body }}</p>
                        <router-link :to="square.link"
                                     class="border-2 px-4 py-2 mt-6 rounded-full text-white bg-transparent hover:bg-white hover:text-[#3eb488] transition duration-300">
                            {{ square.button_text }}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Hero",
    props: {
        home: {
            type: Object,
            required: true
        }
    },
    computed: {
        isVideo() {
            const asset = this.home.assets_field[0];
            return asset && asset.url && asset.url.endsWith('.mp4');
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            const parallax = document.querySelector('.parallax');
            const scrolled = window.scrollY;
            const rate = 0.5; // Adjust this value to change the speed of the parallax effect

            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * rate}px) scale(1.2)`;
            }

        }
    }
}
</script>

<style lang="scss"scoped>

.hero {
    height: calc(100vh -   78.9844px);

   @media (min-width: 1025px) {
       height: calc(100vh -   78.9844px);
   }
}

.parallax-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1;
    transform: translateZ(0);
    will-change: transform;
}

.parallax {
    transform: translateY(-100px) scale(1.2); /* Adjust the translateY value and scale as needed */
}
</style>
