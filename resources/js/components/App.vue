<template>
    <div>
        <RouterView></RouterView>
    </div>
</template>

<script>
import { RouterView } from 'vue-router';
import axios from 'axios';

export default {
    components: {
        RouterView
    },
    data() {
        return {
            home: '',
            pages: '',
        };
    },
    mounted() {
        axios.get('/api/navs/header/tree')
            .then(response => {
                this.pages = response.data.data;

                // Find the page with slug '/'
                const homepage = this.pages.find(page => page.page.uri === '/');

                if (homepage) {
                    this.home = homepage;
                }
            })
            .catch(error => {
                console.error('Error fetching navigation data', error);
            });
    }
};
</script>

<style scoped>
/* Add any additional styling you need */
</style>
