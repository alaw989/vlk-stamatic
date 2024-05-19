<template>
    <div class="h-[40vh] justify-center relative flex w-full">
        <div class="bg-white w-[50%] absolute h-full flex left-0 z-0 pl-[4rem]">
            <!-- Your content inside this div if needed -->
        </div>
        <div class="w-full max-w-[75%] flex items-center h-full relative z-10">
            <h1 class="text-4xl">Flexible Workspace Solutions</h1>
        </div>
        <div class="image absolute h-full w-1/2 bg-cover bg-center right-0"
             :style="{ backgroundImage: 'url(' + images[selectedHomeIndex] + ')' }"></div>
    </div>
</template>

<script>
export default {
    name: "Internal",
    data() {
        return {
            images: [
                '/images/office-1.jpg',
            ],
            selectedHomeIndex: 0 // To keep track of the selected index
        }
    },
    mounted() {
        console.log(this.$route);
    }
}
</script>

<style scoped>
</style>
