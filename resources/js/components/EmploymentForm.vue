<template>
    <div v-if="formData" class="w-full flex flex-1 justify-center p-4 bg-[#25375E] rounded-md shadow-lg">
        <div class="flex-1 max-w-lg">
            <form @submit.prevent="handleSubmit" enctype="multipart/form-data" class="bg-[#25375E] p-6 ">
                <div v-for="(field, index) in formData.fields" :key="index" class="mb-4 w-full">
                    <label class="block mb-1 text-sm font-semibold text-white" :for="field.handle">{{ field.display }}</label>

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

                <!-- File upload field -->
                <div v-if="!submissionSuccess" class="mb-4 mt-[-20px] w-full">
                    <input type="file" @change="handleFileUpload" name="resume_upload" accept=".pdf, .doc, .docx"
                           class="w-full  text-white  py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none" />
                    <span v-if="validationErrors.resume_upload" class="text-red-500 text-sm">{{ validationErrors.resume_upload }}</span>
                </div>

                <button type="submit"
                        class="w-full text-white text-sm md:text-lg px-4 py-2 rounded-full bg-[#3eb488] hover:bg-[#34a06f] transition duration-300"
                        :class="submissionSuccess ? 'hidden' : ''">
                    Submit
                </button>
            </form>

            <!-- Success message -->
            <div v-if="submissionSuccess" class="mt-4 text-white text-center">
                Your form has been submitted successfully!
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "FormComponent",
    data() {
        return {
            formData: {},
            currentPage: {},
            validationErrors: {},
            submissionSuccess: false,
            pdfFile: null, // New data property to store the file
        };
    },
    mounted() {
        axios.get('/api/forms/employment_form')
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
            this.validationErrors = {};

            if (!regex.test(email)) {
                this.validationErrors[fieldHandle] = 'Please enter a valid email address.';
            }
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (file && allowedTypes.includes(file.type)) {
                this.pdfFile = file;
                this.validationErrors.resume_upload = ''; // Clear any previous validation errors
            } else {
                this.pdfFile = null;
                this.validationErrors.resume_upload = 'Please upload a valid PDF or Word document.';
            }
        },
        handleSubmit() {
            this.validationErrors = {}; // Clear previous validation errors
            if (!this.pdfFile) {
                this.validationErrors.resume_upload = 'Please upload a resume.';
            }

            if (Object.keys(this.validationErrors).length === 0) {
                const formData = new FormData();
                for (const key in this.formData) {
                    if (Object.hasOwnProperty.call(this.formData, key)) {
                        formData.append(key, this.formData[key]);
                    }
                }
                formData.append('resume_upload', this.pdfFile);

                axios.post('/!/forms/employment_form', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        console.log('Form submitted successfully', response.data);
                        this.submissionSuccess = true; // Set success state
                        this.resetForm(); // Optionally reset the form
                    })
                    .catch(error => {
                        console.error('Error submitting form', error);
                        this.submissionSuccess = false; // Reset success state on error
                    });
            } else {
                console.log('Form has validation errors', this.validationErrors);
            }
        },
        resetForm() {
            // Reset form fields and validation errors
            this.formData = {};
            this.validationErrors = {};
            this.pdfFile = null;
        }
    }
};
</script>

<style scoped>
/* Use this section if you have additional custom styles */
/* No additional styles are defined here since we are using inline Tailwind CSS classes */
</style>
