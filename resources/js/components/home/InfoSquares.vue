<template>
    <div v-if="home" class="w-full flex justify-center info-squares py-[6rem]">
        <div class="w-full max-w-[75%]">
            <div class="flex justify-center flex-col items-center relative">
                <h1 class="text-2xl md:text-4xl text-black font-bold text-center mb-4 lg:mb-[2rem] text-white">What We Do</h1>
                <div class="w-full">
                    <ul class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-20 mb-0">
                        <li v-for="(service, index) in services" :key="service.id"
                            class="flex flex-col justify-between items-center mb-4">
                            <a :href="service?.services_link" class="no-underline flex flex-col items-center" @click="handleClick(service, index)">
                                <img v-if="service?.services_icon?.length > 0"
                                     :src="service.services_icon[0].url"
                                     :alt="service.title"
                                     class="w-20 h-20 mb-2 transform transition-transform duration-300 hover:scale-110">
                                <span class="text-xl text-center text-white">{{ service.title }}</span>
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
        handleClick(service, index) {
            // Save the index or name to local storage or a shared state
            localStorage.setItem('selectedService', JSON.stringify({ service, index }));

            // Optionally, navigate to the route
            // this.$router.push(service?.services_link);
        }
    }
}
</script>

<style lang="scss" scoped>
a {
    text-decoration: none;
}

.info-squares {
    background-image: linear-gradient(180deg, rgba(37, 55, 94, .65), rgba(37, 55, 94, .65)), url(/images/pattern-dark.svg);
    background-position: 0 0, 50% 100%;
    background-size: auto, 400px;
    background-color: #25375E;
}
</style>
