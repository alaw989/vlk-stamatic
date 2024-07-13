<template>
    <div>
        <div class="relative">
            <Header :globals="globals"/>
            <Hero :home="page"/>
        </div>
        <div class="relative ">
            <BgParagraph :home="page"/>
        </div>
        <div class="relative bg-[#3eb488] py-[6rem]">
            <InfoSquares :home="page"/>
        </div>
        <div class="relative">
            <Clients :home="page" />
        </div>
        <div class="relative">
            <BgParagraph2 :home="page"/>
        </div>
        <div class="relative ">
            <Testimonials :home="page" />
        </div>
        <div class="relative">
            <Footer :pages="page" :globals="globals"/>
        </div>
    </div>
</template>

<script>
import Header from "../layout/Header.vue";
import Hero from "../home/Hero.vue";
import FiftyFifty from "../home/FiftyFifty.vue";
import BgParagraph from "../home/BgParagraph.vue";
import BgParagraph2 from "../home/BgParagraph2.vue";
import InfoSquares from "../home/InfoSquares.vue";
import Footer from "../layout/Footer.vue";
import axios from "axios";
import Clients from "../layout/Clients.vue";
import Testimonials from "../layout/Testimonials.vue";

export default {
    name: "Home",
    components: {
        Clients,
        Header,
        Hero,
        FiftyFifty,
        BgParagraph,
        BgParagraph2,
        InfoSquares,
        Testimonials,
        Footer
    },
    data() {
        return {
            page: null, // Initialize currentPage to null
            globals: null
        };
    },
    mounted() {
        axios.get('/api/collections/pages/entries/home')
            .then(response => {
                this.page = response.data.data;
            })
            .catch(error => {
                console.error('Error fetching page', error);
            });

        axios.get('/api/globals')
            .then(response => {
                this.globals = response.data.data
            })
            .catch(error => {
                console.error('Error fetching globals', error);
            })
    }
}
</script>

<style scoped>
</style>
