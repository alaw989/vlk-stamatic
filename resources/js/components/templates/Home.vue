<template>
    <div>
        <div class="relative h-dvh">
            <Header/>
            <Hero/>
        </div>
        <div class="relative my-[6rem]">
            <FiftyFifty/>
        </div>
        <div class="relative my-[6rem]">
            <BgParagraph/>
        </div>
        <div class="relative my-[6rem]">
            <InfoSquares home=""/>
        </div>
        <div class="relative mt-[6rem] ">
            <Footer pages=""/>
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

export default {
    name: "Home",
    components: {
        Header,
        Hero,
        FiftyFifty,
        BgParagraph,
        InfoSquares,
        Footer
    }
}
</script>

<style scoped>
</style>
