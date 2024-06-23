<template>
    <div>
        <div class="relative h-dvh">
            <Header :globals="globals"/>
            <Hero :home="page"/>
        </div>
        <div class="relative my-[6rem]">
            <FiftyFifty :home="page"/>
        </div>
        <div class="relative my-[6rem]">
            <BgParagraph :home="page"/>
        </div>
        <div class="relative my-[6rem]">
            <InfoSquares :home="page"/>
        </div>
        <div class="relative my-[6rem]">
            <BgParagraph2 :home="page"/>
        </div>
        <div class="relative mt-[6rem] ">
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

export default {
    name: "Home",
    components: {
        Header,
        Hero,
        FiftyFifty,
        BgParagraph,
        BgParagraph2,
        InfoSquares,
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
