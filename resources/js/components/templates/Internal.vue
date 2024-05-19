<template>
    <div>
        <Header/>
        <InternalHero v-if="$route.path !== '/contact'"/>
        <Contact v-if="$route.path === '/contact'"></Contact>
        <div class="mt-[6rem]"></div>
        <Footer pages=""/>
    </div>
</template>

<script>
import Header from "../layout/Header.vue";
import Footer from "../layout/Footer.vue";
import Contact from "./Contact.vue";
import InternalHero from "../layout/InternalHero.vue";

export default {
    components: {
        Header,
        Footer,
        Contact,
        InternalHero
    },
    name: "Internal",
    mounted() {
        console.log(this.$routes)
    }
}
</script>

<style scoped>

</style>
