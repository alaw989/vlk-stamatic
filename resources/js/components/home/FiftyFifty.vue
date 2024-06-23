<template>
    <ul v-if="home">
        <li v-for="(content, index) in home.fifty_fifty_repeater" :key="index"
            class="w-full flex justify-center mb-[6rem]">
            <ul :class="[index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse']"
                class="flex flex-col justify-center w-full max-w-[75%]">
                <li class="w-full lg:w-[1/2]">
                    <div :style="{ backgroundImage: `url(${content.image.url})` }"
                         class="bg-cover bg-center rounded-md h-96 lg:w-[600px] max-h-[400px]">
                    </div>
                </li>
                <li class="w-[20px]"></li>
                <li class="w-full lg:w-[1/2] flex flex-col p-0" :class="[index % 2 === 0 ? 'lg:pl-20' : '']">
                    <div class="flex flex-col h-full justify-center" :class="[index % 2 === 0 ? 'lg:px-5' : '']">
                        <h1 class="text-2xl font-bold mb-4 mt-6 lg:mt-0" v-html="content.text"></h1>
                        <p class="text-lg" v-html="content.textarea"></p>
                        <a :href="content.link"
                           class="text-center cursor-pointer border-2 px-4 py-2 mt-6 rounded-full border-[#3eb488] text-[#3eb488] font-bold"
                           v-html="content.link_text"></a>
                    </div>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
export default {
    name: "FiftyFifty",
    props: {
        home: {
            type: Object,
            required: true
        }
    },
    mounted() {
        console.log('home', this.home);
    }
}
</script>

<style scoped>
.bg-cover {
    background-size: cover;
}

.bg-center {
    background-position: center;
}

li a {
    width: fit-content;
}
</style>
