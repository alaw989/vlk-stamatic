<template>
    <div>
        <RouterView></RouterView>
    </div>
</template>

<script>

import axios from "axios";

export default {
    components: {},
    data() {
        return {
            home: '',
            pages: '',
        }
    },
    mounted() {
        axios.get('/api/navs/header/tree')
            .then(response => {
                this.pages = response.data.data

                // Find the page with slug '/'
                const homepage = this.pages.find(page => page.page.uri === '/')

                // this.pages.find(page => console.log(page.page.uri))

                if (homepage) {
                    this.home = homepage
                }

            })
            .catch(error => {
                console.error('Error ', error);
            });
    },
    methods: {

    }
}
</script>

<style scoped>
/* Add any additional styling you need */
</style>
