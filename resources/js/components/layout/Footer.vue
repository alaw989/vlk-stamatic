<template>
    <div class="bg-[#25375E] w-full flex flex-col items-center py-8 footer">
        <div class="w-full max-w-[85%] lg:max-w-[75%]">
            <div class="flex flex-col md:flex-row justify-between items-center pb-4">
                <div class="text-white w-full text-center md:text-right mb-2 md:mb-0 mr-2   md:border-r-[1px] pr-2">
                    Questions? Contact Us
                </div>
                <form @submit.prevent="handleSubmit" class="flex items-center w-full md:w-[unset]">
                    <input v-model="formData.email_address" placeholder="Email Address"
                           class="rounded-sm pl-4 text-md w-full md:w-[300px] pr-4 py-2" type="email"
                           required>
                    <button type="submit"
                            class="ml-2 text-center cursor-pointer border-2 w-[160px] py-2 rounded-full
                                bg-[#3eb488] border-[#3eb488] text-white font-bold transition-colors duration-300
                                hover:bg-white hover:text-[#3eb488]">
                        {{ buttonText }}
                    </button>
                </form>
            </div>
            <hr class="mb-4 border-gray-600">
            <div class="w-full flex justify-between">
                <ul class="text-white flex flex-col   justify-center md:justify-start">
                    <li v-for="(menu, menuIndex) in footerNav1" :key="menuIndex" class="mb-2 md:mr-4 no-underline flex items-center">
                        <a :href="menu.page.uri" class="hover:text-[#3eb488] no-underline text-white transition-colors">
                            {{ menu.page.title }}
                        </a>
                    </li>
                </ul>
                <ul class="flex justify-center md:justify-end">
                    <li v-for="(icon, index) in socialMediaIcons" :key="index" class="mr-2 w-[40px]">
                        <a :href="icon.link" v-html="icon.code.value" target="_blank" class="text-white hover:text-[#3eb488] transition-colors"></a>
                    </li>
                </ul>
            </div>
            <div class="flex flex-col lg:flex-row justify-center items-center mt-4 text-xs text-gray-400">
                <div class="text-center lg:text-left lg:mr-4">{{ disclaimer }}</div>
                <div class="text-center lg:text-right">{{ copyright }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Footer",
    data() {
        return {
            imageUrl: '',
            footerNav1: [],

            copyright: "",
            disclaimer: "",
            socialMediaIcons: [],
            formData: {
                email_address: ''
            },
            validationErrors: {},
            submissionSuccess: false,
            buttonText: 'Submit',
        };
    },
    mounted() {
        const footerNavRequests = [
            axios.get('/api/navs/footer/tree'),
            axios.get('/api/globals')
        ];

        Promise.all(footerNavRequests)
            .then(responses => {
                this.footerNav1 = responses[0].data.data;
                const globalsData = responses[1].data.data.find(item => item.handle === 'company');

                if (globalsData) {
                    if (globalsData.social_media_icons) {
                        this.socialMediaIcons = globalsData.social_media_icons;
                    }

                    if (globalsData.logo) {
                        this.imageUrl = globalsData.logo.url;
                    }

                    if (globalsData.copyright) {
                        this.copyright = globalsData.copyright
                    }

                    if (globalsData.disclaimer) {
                        this.disclaimer = globalsData.disclaimer
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
    },
    methods: {
        handleSubmit() {
            if (Object.keys(this.validationErrors).length === 0) {
                this.buttonText = 'Thanks!';
                axios.post('/!/forms/footer_contact_form', this.formData)
                    .then(response => {
                        console.log('Form submitted successfully', response.data);
                        this.submissionSuccess = true;
                        this.resetForm();
                    })
                    .catch(error => {
                        console.error('Error submitting form', error);
                        this.submissionSuccess = false;
                    });

                setTimeout(() => {
                    this.buttonText = 'Submit';
                }, 2000);
            } else {
                console.log('Form has validation errors', this.validationErrors);
            }
        },
        resetForm() {
            this.formData.email_address = '';
            this.validationErrors = {};
        }
    }
};
</script>


<style>
.footer {
    background-image: linear-gradient(180deg, rgba(37, 55, 94, .65), rgba(37, 55, 94, .65)), url(/images/pattern-dark.svg);
    background-position: 0 0, 50% 100%;
    background-size: auto, 400px;
    background-color: #25375E;
}

</style>

