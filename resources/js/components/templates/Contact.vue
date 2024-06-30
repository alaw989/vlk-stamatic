<template>
    <div v-if="this.formData" class="w-full flex justify-center py-[6rem]">
        <div class="w-full max-w-[85%] lg:max-w-[75%] flex flex-col lg:flex-row">
            <div class="flex flex-col flex-1 lg:pr-[4em]" v-html="currentPage.content">
            </div>
            <div class="flex-1">
                <h1 class="text-3xl lg:text-[38px] font-bold mb-6">Contact Us</h1>
                <form @submit.prevent="handleSubmit">
                    <div v-for="(field, index) in formData.fields" :key="index" class="mb-4 px-2 w-full">
                        <label class="block mb-1 text-sm" :for="field.handle">{{ field.display }}</label>
                        <input v-if="field.type === 'text'"
                               v-model="formData[field.handle]"
                               :id="field.handle"
                               class="w-full border px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none"
                               type="text"/>
                        <textarea v-if="field.type === 'textarea'"
                                  v-model="formData[field.handle]"
                                  :id="field.handle"
                                  class="w-full border px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none"></textarea>
                    </div>
                    <button type="submit"
                            class="text-white text-sm md:text-lg px-4 py-2 rounded-full bg-[#3eb488]">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "SectionContact",
    data() {
        return {
            formData: {},
            currentPage: {}
        };
    },
    mounted() {
        axios.get('/api/forms/contact_form')
            .then(response => {
                if (response.data.data) {
                    this.formData = response.data.data
                }

            })
            .catch(error => {
                console.error('Error fetching form', error);
            });

        axios.get('/api/collections/pages/entries/')
            .then(response => {
                this.pages = response.data.data;
                this.currentPage = this.pages.find(page => page.uri === this.$route.path) || null; // Assign currentPage here
                console.log('page', this.currentPage)
            })
            .catch(error => {
                console.error('Error fetching pages', error);
            });
    },
    methods: {
        handleSubmit() {
            axios.post('/!/forms/contact_form', this.formData)
                .then(response => {
                    console.log('Form submitted successfully', response.data);
                })
                .catch(error => {
                    console.error('Error submitting form', error);
                });
        }
    }
};
</script>

<style scoped>
/* Your custom styles here */
</style>
