<template>
    <div class="w-full flex flex-1 justify-center p-4 rounded-md shadow-lg bg-[#25375E] h-full">
        <div class="flex-1 max-w-lg">
            <form @submit.prevent="handleSubmit" class="bg-[#25375E] p-6 ">
                <div class="mb-4 w-full">
                    <label class="block mb-1 text-sm font-semibold text-white" for="name">Name</label>
                    <input v-model="formData.name" id="name" required
                           class="w-full border px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none"
                           type="text"/>
                    <span v-if="validationErrors.name" class="text-red-500 text-sm">{{ validationErrors.name }}</span>
                </div>

                <div class="mb-4 w-full">
                    <label class="block mb-1 text-sm font-semibold text-white" for="email">Email</label>
                    <input v-model="formData.email" id="email" required
                           class="w-full border px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none"
                           type="email"/>
                    <span v-if="validationErrors.email" class="text-red-500 text-sm">{{ validationErrors.email }}</span>
                </div>

                <div class="mb-4 w-full">
                    <label class="block mb-1 text-sm font-semibold text-white" for="message">Message</label>
                    <textarea v-model="formData.message" id="message" required
                              class="w-full border px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none"></textarea>
                    <span v-if="validationErrors.message" class="text-red-500 text-sm">{{ validationErrors.message }}</span>
                </div>

                <button type="submit"
                        class="w-full text-white text-sm md:text-lg px-4 py-2 rounded-full bg-[#3eb488] hover:bg-[#34a06f] transition duration-300"
                        :class="submissionSuccess ? 'hidden' : ''">
                    Submit
                </button>
            </form>

            <!-- Success message -->
            <div v-if="submissionSuccess" class="mt-4 text-green-600 text-center">
                Your message has been sent successfully!
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "ContactForm",
    data() {
        return {
            formData: {
                name: '',
                email: '',
                message: ''
            },
            validationErrors: {},
            submissionSuccess: false,
        };
    },
    methods: {
        handleSubmit() {
            this.validationErrors = {}; // Clear previous validation errors

            // Basic validation
            if (!this.formData.name) {
                this.validationErrors.name = 'Name is required.';
            }
            if (!this.formData.email) {
                this.validationErrors.email = 'Email is required.';
            } else if (!this.validateEmail(this.formData.email)) {
                this.validationErrors.email = 'Please enter a valid email address.';
            }
            if (!this.formData.message) {
                this.validationErrors.message = 'Message is required.';
            }

            if (Object.keys(this.validationErrors).length === 0) {
                // Send form data to server
                axios.post('/contact/submit', this.formData)
                    .then(response => {
                        console.log('Form submitted successfully', response.data);
                        this.submissionSuccess = true; // Set success state
                        this.resetForm(); // Optionally reset the form
                    })
                    .catch(error => {
                        console.error('Error submitting form', error);
                    });
            } else {
                console.log('Form has validation errors', this.validationErrors);
            }
        },
        validateEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        },
        resetForm() {
            // Reset form fields and validation errors
            this.formData = {
                name: '',
                email: '',
                message: ''
            };
            this.validationErrors = {};
        }
    }
};
</script>

<style scoped>
/* Use this section if you have additional custom styles */
/* No additional styles are defined here since we are using inline Tailwind CSS classes */
</style>

