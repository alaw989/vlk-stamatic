<template>
    <div class="bg-[#25375E] w-full justify-center flex justify-center pb-[4rem] pt-[6rem]">
        <div class="w-full max-w-[85%] lg:max-w-[75%]">
            <div class="flex flex-col md:flex-row justify-between items-end md:items-center pb-4">
                <div class="text-[#fff] w-full text-right md:text-right mb-2 md:mb-0">
                    Questions? Contact Us
                </div>
                <form @submit.prevent="handleSubmit" class="flex justify-between xl:justify-end">
                    <input v-model="formData.email_address" placeholder="Email Address"
                           class="md:ml-4 rounded-sm pl-4 text-md w-full pr-12 md:pr-0 md:w-[300px]" type="email" required>
                    <button type="submit"
                            class=" ml-2  lg:block text-center cursor-pointer border-2 w-[160px] py-2 rounded-full
          bg-[#3eb488] border-[#3eb488] text-[#fff] font-bold transition-colors duration-300
          hover:bg-white hover:text-[#3eb488] hover:border-[#3eb488] hover:no-underline">
                        {{ buttonText }}
                    </button>
                </form>
            </div>
            <hr class="mb-4">
            <div class="w-full">
                <ul class="flex flex-wrap justify-start sm:justify-between">
                    <li class="mr-6">
                        <ul class="text-[#fff] flex flex-col">
                            <li class="mb-6 font-bold">VibeLinkRaft</li>
                            <li class="text-white cursor-pointer mb-6" v-for="(menu, menuIndex) in footerNav1"
                                :key="menuIndex">
                                <RouterLink :to="menu.page.uri"
                                            class="xl:flex text-white">
                                    {{ menu.page.title }}
                                </RouterLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <ul class="text-[#fff] flex flex-col">
                            <li class="mb-6 font-bold">Solutions</li>
                            <li class="text-white cursor-pointer mb-6" v-for="(menu, menuIndex) in footerNav2"
                                :key="menuIndex">
                                <RouterLink :to="menu.page.uri"
                                            class=" xl:flex text-white">
                                    {{ menu.page.title }}
                                </RouterLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <ul class="text-[#fff] flex flex-col">
                            <li class="mb-6 font-bold">Connect</li>
                            <li class="text-white cursor-pointer mb-6" v-for="(menu, menuIndex) in footerNav3"
                                :key="menuIndex">
                                <RouterLink :to="menu.page.uri"
                                            class=" xl:flex text-white">
                                    {{ menu.page.title }}
                                </RouterLink>
                            </li>
                            <li class="flex">
                                <ul class="flex">
                                    <li v-for="(icon, index) in socialMediaIcons" :key="index"
                                        class="max-w-[25px] mr-2">
                                        <a :href="icon.link" v-html="icon.code.value" target="_blank"></a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <ul class="text-[#fff] flex flex-col">
                            <li class="mb-6 font-bold">Members</li>
                            <li class="mb-6 text-white">
                                <a href="/cp" class="text-white">Sign In</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="flex flex-col lg:flex-row justify-center items-center mt-6 ">
                <ul class="text-[#fff] flex justify-center lg:justify-between w-full flex-wrap text-sm m-0 items-center">
                    <li class="mb-2  text-[12px]"><a href=""
                                                     class="w-full text-white text-center cursor-pointer hover:underline">VLK
                        Post - an Alford Media Company, is a proud subsidiary of VibeLinKraft.</a></li>
                    <li class="mb-2 text-[12px]"><a href="" class="text-white cursor-pointer hover:underline">© 2024
                        VibeLinkRaft. All
                        rights reserved.</a></li>
                </ul>
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
            footerNav2: [],
            footerNav3: [],
            footerNav4: [],
            socialMediaIcons: [],
            formData: {
                email_address: ''
            },
            validationErrors: {},
            submissionSuccess: false,
            buttonText: 'Submit', // New state for button text
        };
    },
    mounted() {
        const footerNavRequests = [
            axios.get('/api/navs/footer/tree'),
            axios.get('/api/navs/footer_nav_2/tree'),
            axios.get('/api/navs/footer_nav_3/tree'),
            axios.get('/api/navs/footer_nav_4/tree'),
            axios.get('/api/globals')
        ];

        Promise.all(footerNavRequests)
            .then(responses => {
                this.footerNav1 = responses[0].data.data;
                this.footerNav2 = responses[1].data.data;
                this.footerNav3 = responses[2].data.data;
                this.footerNav4 = responses[3].data.data;

                const globalsData = responses[4].data.data.find(item => item.handle === 'company');

                if (globalsData && globalsData.social_media_icons) {
                    this.socialMediaIcons = globalsData.social_media_icons;
                }

                if (globalsData && globalsData.logo) {
                    this.imageUrl = globalsData.logo.url;
                }
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
    },
    methods: {
        handleSubmit() {
            if (Object.keys(this.validationErrors).length === 0) {
                this.buttonText = 'Thanks!'; // Change button text to Thanks!
                axios.post('/!/forms/footer_contact_form', this.formData)
                    .then(response => {
                        console.log('Form submitted successfully', response.data);
                        this.submissionSuccess = true;
                        this.resetForm(); // Call reset after successful submission
                    })
                    .catch(error => {
                        console.error('Error submitting form', error);
                        this.submissionSuccess = false;
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
            this.formData.email_address = ''; // Reset only the email field
            this.validationErrors = {};
        }
    }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
