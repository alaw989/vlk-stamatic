<template>
    <div class="bg-[#25375E] w-full flex justify-center pb-[4rem] pt-[6rem]">
        <div class="w-full max-w-[85%] lg:max-w-[75%]">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center pb-4">
                <div class="text-[#fff] mb-2 w-full">
                    Get tips on office design, productivity, and more when you sign up for our monthly newsletter.
                </div>
                <div class="flex justify-between xl:justify-end w-full">
                    <input placeholder="Company email*" class="md:mx-4 rounded-sm px-7 text-md" type="text">
                    <button
                        class="min-w-[100px] border-white border-2 text-white text-md lg:text-lg px-4 py-2 rounded-full bg-[#3eb488] hover:bg-white hover:text-[#3eb488]">
                        Sign Up
                    </button>
                </div>
            </div>
            <hr class="mb-4">
            <div class="w-full">
                <ul class="flex flex-wrap justify-between">
                    <li class="mr-6">
                        <ul class="text-[#fff] flex flex-col">
                            <li class="mb-6 font-bold">VibeLinkRaft</li>
                            <li class="text-white cursor-pointer mb-6" v-for="(menu, menuIndex) in menuItems"
                                :key="menuIndex">
                                <RouterLink :to="menu.page.uri" :class="{ 'text-black': hover && $route.path === '/' }"
                                            class="hidden xl:flex ">
                                    {{ menu.page.title }}
                                </RouterLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <ul class="text-[#fff] flex flex-col">
                            <li class="mb-6 font-bold">Solutions</li>
                            <li class="mb-6">
                                <a href="/about" class="cursor-pointer hover:underline">Sessions</a>
                            </li>
                            <li class="mb-6">
                                <a href="/about" class="cursor-pointer hover:underline">Classes</a>
                            </li>
                            <li class="mb-6">
                                <a href="/about" class="cursor-pointer hover:underline">Networking Opportunities</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <ul class="text-[#fff] flex flex-col">
                            <li class="mb-6 font-bold">Connect</li>
                            <li class="mb-6">
                                <a href="/contact" class="cursor-pointer hover:underline">Contact</a>
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
                            <li class="mb-6">
                                Sign In
                            </li>
                        </ul>
                    </li>
                    <li>
                        <ul class="text-[#fff] flex flex-col">
                            <li class="mb-6 font-bold">Language</li>
                            <li class="mb-6">
                                English
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="flex flex-col xl:flex-row justify-between items-center mt-6 xl:items-end">
                <div class="max-w-[250px]">
                    <a href="/">
                        <img class="xl:block cursor-pointer" :src="imageUrl" alt="Example Image">
                    </a>
                </div>
                <ul class="text-[#fff] flex justify-center flex-wrap text-sm">
                    <li class="ml-6 mb-2"><a href="" class="cursor-pointer hover:underline">Website & Portal Terms</a>
                    </li>
                    <li class="ml-6 mb-2"><a href="" class="cursor-pointer hover:underline">Online Privacy Policy</a>
                    </li>
                    <li class="ml-6 mb-2"><a href="" class="cursor-pointer hover:underline">© 2024 VibeLinkRaft. All
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
            menuItems: [],
            socialMediaIcons: []
        };
    },
    mounted() {
        axios.get('/api/navs/footer/tree')
            .then(response => {
                this.menuItems = response.data.data;
            })
            .catch(error => {
                console.error('Error fetching header navigation:', error);
            });

        axios.get('/api/globals')
            .then(response => {
                const companyData = response.data.data.find(item => item.handle === 'company');

                if (companyData && companyData.social_media_icons) {
                    this.socialMediaIcons = companyData.social_media_icons;
                }

                if (companyData && companyData.logo) {
                    this.imageUrl = companyData.logo.url
                }

            })
            .catch(error => {
                console.error('Error fetching globals', error);
            });
    }
};
</script>

