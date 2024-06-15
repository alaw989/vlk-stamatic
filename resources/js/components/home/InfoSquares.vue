<template>
    <div v-if="home" class="w-full flex justify-center">
        <!-- Render the content using the home prop -->
        <div class="w-full max-w-[75%]">
            <div class="flex justify-center flex-col items-center relative">
                <div class="flex flex-col lg:flex-row">
                    <ul class="text-center flex-wrap lg:flex-nowrap lg:text-left flex flex-row lg:flex-col justify-around lg:justify-center lg:w-[25%]">
                        <!-- Render navigation items based on content_replicator -->
                        <li class="cursor-pointer mb-6 uppercase text-[#3eb488] font-bold tracking-wide"
                            v-for="(content, index) in home.content_replicator" :key="index"
                            @click="selectedHomeIndex = index"
                            :class="{ 'font-bold': selectedHomeIndex === index }"
                        >
                            {{ content.text }}
                        </li>
                    </ul>
                    <!-- Render main content based on selectedHomeIndex -->
                    <div class="flex lg:pr-[150px] w-full lg:w-[95%] lg:max-w-[900px] lg:max-h-[550px]">
                        <img :src="selectedHomeImage" alt="" class="w-full h-full object-cover">
                    </div>
                </div>

                <!-- Render detailed content based on selectedHomeIndex -->
                <div class="flex justify-center mt-[-25px] lg:absolute lg:bottom-[30px] lg:top-[150px] lg:right-[200px]">
                    <div v-for="(content, index) in home.content_replicator" :key="index"
                         v-show="selectedHomeIndex === index"
                         class="box lg:w-[500px] bg-white lg:absolute w-[95%] lg:w-[200px] shadow-md p-10 flex flex-col justify-center"
                    >
                        <div class="text-2xl font-bold pb-4">
                            {{ content.text }}
                        </div>
                        <div class="text-md lg:text-lg">
                            {{ content.textarea }}
                        </div>
                        <div>
                            <!-- Use <router-link> for internal routing or <a> tag for external links -->
                            <router-link :to="content.link" v-if="isInternalLink(content.link)">
                                <button class="text-white text-md lg:text-lg px-4 py-2 mt-6 rounded-full bg-[#3eb488]">
                                    Learn More
                                </button>
                            </router-link>
                            <a :href="content.link" target="_blank" v-else>
                                <button class="text-white text-md lg:text-lg px-4 py-2 mt-6 rounded-full bg-[#3eb488]">
                                    Learn More
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "InfoSquares",
    props: {
        home: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            selectedHomeIndex: 0 // Default to the first item
        }
    },
    computed: {
        selectedHomeImage() {
            // Return the image URL of the currently selected item
            return this.home.content_replicator[this.selectedHomeIndex].image.url;
        }
    },
    methods: {
        isInternalLink(link) {
            // Check if the link is internal or external
            return link.startsWith('/') || link.startsWith('#');
        }
    }
}
</script>

<style scoped>
/* Add your scoped styles here */
</style>
