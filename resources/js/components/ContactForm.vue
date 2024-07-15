<template>
    <div v-if="formData" class="w-full flex flex-1 justify-center">
            <div class="flex-1">
                <h1 class="text-3xl lg:text-[38px]  mb-6">Contact Us</h1>
                <form @submit.prevent="handleSubmit">
                    <div v-for="(field, index) in formData.fields" :key="index" class="mb-4  w-full">
                        <label class="block mb-1 text-sm required" :for="field.handle">{{ field.display }}</label>

                        <input v-if="field.type === 'text' && field.input_type !== 'email'"
                               v-model="formData[field.handle]"
                               :id="field.handle"
                               required
                               class="w-full border px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none"
                               type="text"/>

                        <input v-if="field.input_type === 'email'"
                               v-model="formData[field.handle]"
                               :id="field.handle"
                               required
                               @input="validateEmail(field.handle)"
                               class="w-full border px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none"
                               type="email"/>

                        <textarea v-if="field.type === 'textarea'"
                                  v-model="formData[field.handle]"
                                  :id="field.handle"
                                  class="w-full border px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none"></textarea>

                        <span v-if="validationErrors[field.handle]" class="text-red-500 text-sm">{{ validationErrors[field.handle] }}</span>
                    </div>
                    <button type="submit"
                            class="text-white text-sm md:text-lg px-4 py-2 rounded-full bg-[#3eb488]" :class="submissionSuccess ? 'hidden' : ''">
                        Submit
                    </button>
                </form>

                <!-- Success message -->
                <div v-if="submissionSuccess" class="mt-4 text-green-600">
                    Your form has been submitted successfully!
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
            currentPage: {},
            validationErrors: {},
            submissionSuccess: false,
        };
    },
    mounted() {
        axios.get('/api/forms/contact_form')
            .then(response => {
                if (response.data.data) {
                    this.formData = response.data.data;
                }
            })
            .catch(error => {
                console.error('Error fetching form', error);
            });

        axios.get('/api/collections/pages/entries/')
            .then(response => {
                this.pages = response.data.data;
                this.currentPage = this.pages.find(page => page.uri === this.$route.path) || null;
            })
            .catch(error => {
                console.error('Error fetching pages', error);
            });
    },
    methods: {
        validateEmail(fieldHandle) {
            const email = this.formData[fieldHandle];
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
            this.validationErrors = {}

            if (!regex.test(email)) {
                this.validationErrors[fieldHandle] = 'Please enter a valid email address.';
            }
        },
        handleSubmit() {
            if (Object.keys(this.validationErrors).length === 0) {
                this.buttonText = 'Thanks!'; // Change button text to Thanks!
                axios.post('/!/forms/contact_form', this.formData)
                    .then(response => {
                        console.log('Form submitted successfully', response.data);
                        this.submissionSuccess = true; // Set success state
                        this.resetForm(); // Optionally reset the form
                    })
                    .catch(error => {
                        console.error('Error submitting form', error);
                        this.submissionSuccess = false; // Reset success state on error
                    });

                // Change button text back after 2 seconds
                setTimeout(() => {
                    this.buttonText = 'Submit'; // Reset button text
                }, 2000);
            } else {
                console.log('Form has validation errors', this.validationErrors);
            }
        },
        resetForm() {
            // Reset form fields and validation errors
            this.formData = {};
            this.validationErrors = {};
        }
    }
};
</script>

<style scoped>
/* Your custom styles here */
</style>
