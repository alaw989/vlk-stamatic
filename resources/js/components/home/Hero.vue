<template>
    <div v-if="home" class="w-full flex justify-center h-dvh items-center absolute z-0 top-0">
        <!-- Render video or image based on the type of asset -->
        <template v-if="isVideo">
            <video class="w-full h-full object-cover" autoplay muted loop>
                <source :src="home.assets_field[0].url" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </template>
        <template v-else>
            <img :src="home.assets_field[0].url" alt="Banner Image" class="w-full h-full object-cover">
        </template>
        <div class="absolute inset-0 bg-black opacity-50"></div>
        <div class="flex flex-col absolute z-10 items-center">
            <h1 class="text-[48px] text-white mb-8 text-center font-bold mt-[205px]">{{ home.title }}</h1>
            <p class="mb-[50px] w-full max-w-[600px] text-center text-white hidden lg:block" v-html="home.content"></p>
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
    }
}
</script>

<style scoped>

</style>
