<template>
    <div class="bg-[#25375E] w-full  justify-center flex justify-center pb-[4rem] pt-[6rem]">
        <div class="w-full max-w-[85%] lg:max-w-[75%]">
            <div class="flex flex-col md:flex-row justify-between items-end md:items-center pb-4">
                <div class="text-[#fff] w-full text-right md:text-right mb-2 md:mb-0">
                    Questions? Contact Us
                </div>
                <div class="flex justify-between xl:justify-end">
                    <input placeholder="Email Address" class="md:ml-4 rounded-sm pl-4 text-md  w-full pr-12 md:pr-0 md:w-[300px]" type="text">
                    <button
                        class="ml-2 min-w-[100px] w-full ml-6 max-w-[200px] border-white border-2 text-white text-md lg:text-lg px-4 py-2 rounded-full bg-[#3eb488] hover:bg-white hover:text-[#3eb488]">
                        Submit
                    </button>
                </div>
            </div>
            <hr class="mb-4">
            <div class="w-full">
                <ul class="flex flex-wrap justify-start sm:justify-between">
                    <li class="mr-6">
                        <ul class="text-[#fff] flex flex-col">
                            <li class="mb-6 font-bold">VibeLinkRaft</li>
                            <li class="text-white cursor-pointer mb-6" v-for="(menu, menuIndex) in footerNav1"
                                :key="menuIndex">
                                <RouterLink :to="menu.page.uri" :class="{ 'text-black': hover && $route.path === '/' }"
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
                                <RouterLink :to="menu.page.uri" :class="{ 'text-black': hover && $route.path === '/' }"
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
                                <RouterLink :to="menu.page.uri" :class="{ 'text-black': hover && $route.path === '/' }"
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
                                <RouterLink to="cp/" class="white">Sign In</RouterLink>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="flex flex-col md:flex-row justify-between items-center mt-6 xl:items-end">
                <div class="max-w-[250px] mb-4 md:mb-0">
                    <a href="/">
                        <img class="xl:block cursor-pointer" :src="imageUrl" alt="Example Image">
                    </a>
                </div>
                <ul class="text-[#fff] flex justify-center flex-col flex-wrap text-sm m-0 items-center md:items-end">
                    <li class="ml-6 mb-2  text-[12px]"><a href="" class="text-white cursor-pointer hover:underline">VLK Post - an Alford Media Company, is a proud subsidiary of VibeLinKraft.</a></li>
                    <li class="ml-6 mb-2 text-[12px]"><a href="" class="text-white cursor-pointer hover:underline">© 2024 VibeLinkRaft. All
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
            socialMediaIcons: []
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
    }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
