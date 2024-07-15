<template>
    <div class="accordion">
        <div class="cursor-pointer border-b z-1" v-for="(item, index) in services" :key="item.id">
            <button class="accordion cursor-pointer flex justify-between " @click="toggleAccordion(index)">
                <span class="text-xl">{{ item.title }}</span>
                <span class="text-xl">{{ activeIndex === index ? '−' : '+' }}</span>
            </button>
            <div
                class="panel"
                :class="{ 'active': activeIndex === index }"
                ref="panels"
                :style="{ maxHeight: activeIndex === index ? panelHeight : '0px' }"
                @transitionend="handleTransitionEnd(index)"
            >
                <p class="text-md">{{ item?.service_description || 'No description available' }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Accordion",
    data() {
        return {
            activeIndex: null,
            services: [],
            panelHeight: '0px'
        };
    },
    mounted() {
        axios.get('/api/collections/services/entries')
            .then(response => {
                this.services = response.data.data; // Ensure the correct path to the data
            })
            .catch(error => {
                console.error('Error fetching services', error);
            });
    },
    methods: {
        toggleAccordion(index) {
            this.activeIndex = this.activeIndex === index ? null : index;
            this.setPanelHeight(index);
        },
        setPanelHeight(index) {
            const panel = this.$refs.panels[index];
            if (panel) {
                this.panelHeight = this.activeIndex === index ? `${panel.scrollHeight}px` : '0px';
            }
        },
        handleTransitionEnd(index) {
            // Additional logic can go here if needed
        }
    }
};
</script>

<style scoped>
.accordion {
    color: #444;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 15px;
}

.panel {
    padding: 0 18px;
    overflow: hidden;
    transition: max-height 0.5s ease, opacity 0.5s ease;
    opacity: 0;
}

.panel.active {
    opacity: 1;
}
</style>