<template>
    <div class="w-full flex flex-1 justify-center p-4 rounded-md shadow-lg bg-[#25375E] h-full">
        <div class="flex-1 max-w-lg">
            <form @submit.prevent="handleSubmit" class="bg-[#25375E] p-6 ">
                <div v-if="!submissionSuccess">
                    <div class="mb-4 w-full">
                        <label class="block mb-1 text-sm font-semibold text-white" for="first_name">First Name</label>
                        <input v-model="formData.first_name" id="first_name" required
                               @input="logFormData"
                               class="w-full border px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none"
                               type="text"/>
                        <span v-if="validationErrors.first_name" class="text-red-500 text-sm">{{ validationErrors.first_name }}</span>
                    </div>

                    <div class="mb-4 w-full">
                        <label class="block mb-1 text-sm font-semibold text-white" for="last_name">Last Name</label>
                        <input v-model="formData.last_name" id="last_name" required
                               @input="logFormData"
                               class="w-full border px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none"
                               type="text"/>
                        <span v-if="validationErrors.last_name" class="text-red-500 text-sm">{{ validationErrors.last_name }}</span>
                    </div>

                    <div class="mb-4 w-full">
                        <label class="block mb-1 text-sm font-semibold text-white" for="email">Email</label>
                        <input v-model="formData.email" id="email" required
                               @input="logFormData"
                               class="w-full border px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none"
                               type="email"/>
                        <span v-if="validationErrors.email" class="text-red-500 text-sm">{{ validationErrors.email }}</span>
                    </div>

                    <div class="mb-4 w-full">
                        <label class="block mb-1 text-sm font-semibold text-white" for="comments">Comments</label>
                        <textarea v-model="formData.comments" id="comments" required
                                  @input="logFormData"
                                  class="w-full border px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none"></textarea>
                        <span v-if="validationErrors.comments" class="text-red-500 text-sm">{{ validationErrors.comments }}</span>
                    </div>

                    <button type="submit"
                            class="w-full text-white text-sm md:text-lg px-4 py-2 rounded-full bg-[#3eb488] hover:bg-[#34a06f] transition duration-300">
                        Submit
                    </button>
                </div>

                <!-- Success message -->
                <div v-else class="mt-4 text-white text-center">
                    Your message has been sent successfully!
                </div>
            </form>
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
                first_name: '',
                last_name: '',
                email: '',
                comments: ''
            },
            validationErrors: {},
            submissionSuccess: false,
        };
    },
    methods: {
        logFormData() {
            console.log('Current formData:', this.formData);
        },
        handleSubmit() {
            this.validationErrors = {}; // Clear previous validation errors

            // Basic validation
            if (!this.formData.first_name) {
                this.validationErrors.first_name = 'First name is required.';
            }
            if (!this.formData.last_name) {
                this.validationErrors.last_name = 'Last name is required.';
            }
            if (!this.formData.email) {
                this.validationErrors.email = 'Email is required.';
            } else if (!this.validateEmail(this.formData.email)) {
                this.validationErrors.email = 'Please enter a valid email address.';
            }
            if (!this.formData.comments) {
                this.validationErrors.comments = 'Comments are required.';
            }

            if (Object.keys(this.validationErrors).length === 0) {
                console.log('Submitting form with data:', this.formData);
                // Send form data to server
                axios.post('/!/forms/contact_form', this.formData)
                    .then(response => {
                        console.log('Form submitted successfully', response.data);
                        this.submissionSuccess = true; // Set success state
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
        }
    }
};
</script>
