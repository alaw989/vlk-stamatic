<template>
    <div>
        <div class="relative h-dvh">
            <Header/>
            <Hero :home="page"/>
        </div>
        <div class="relative my-[6rem]">
            <FiftyFifty/>
        </div>
        <div class="relative my-[6rem]">
            <BgParagraph/>
        </div>
        <div class="relative my-[6rem]">
            <!-- Pass the page data as a prop to InfoSquares -->
            <InfoSquares :home="page"/>
        </div>
        <div class="relative mt-[6rem] ">
            <!-- Pass the pages data as a prop to Footer if needed -->
            <Footer :pages="page"/>
        </div>
    </div>
</template>

<script>
import Header from "../layout/Header.vue";
import Hero from "../home/Hero.vue";
import FiftyFifty from "../home/FiftyFifty.vue";
import BgParagraph from "../home/BgParagraph.vue";
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
        InfoSquares,
        Footer
    },
    data() {
        return {
            page: null // Initialize currentPage to null
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
    }
}
</script>

<style scoped>
</style>
