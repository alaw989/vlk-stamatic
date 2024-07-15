<template>
    <div v-if="home" class="w-full flex justify-center">
        <div class="w-full max-w-[75%]">
            <div class="flex justify-center flex-col items-center relative">
                <h1 class="text-4xl text-black font-bold text-center mb-4 lg:mb-6 text-white">What We Do</h1>
                <div class="w-full">
                    <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-0">
                        <li v-for="(service, index) in services" :key="service.id" class="flex flex-col justify-between items-center mb-4">
                            <a :href="service?.services_link" class="no-underline flex flex-col items-center">
                                <img :src="service?.services_icon[0].url" :alt="service.title" class="w-20 h-20 mb-2 transform transition-transform duration-300 hover:scale-110">
                                <span class="text-xl font-semibold text-center text-white">{{ service.title }}</span>
                                <p class="text-white text-center" v-html="truncateDescription(service.service_description, 75, service?.services_link)"></p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

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
            selectedHomeIndex: 0,
            services: []
        }
    },
    mounted() {
        axios.get('/api/collections/services/entries')
            .then(response => {
                this.services = response.data.data;
            })
            .catch(error => {
                console.error('Error fetching services', error);
            });
    },
    methods: {
        truncateDescription(description, length, link) {
            if (!description) return 'No description available';
            if (description.length > length) {
                return `${description.substring(0, length)} <a href="${link}" class="text-white"><br>Read More...</a>`;
            }
            return description;
        }
    }
}
</script>

<style lang="scss" scoped>
a {
    text-decoration: none;
}
</style>
