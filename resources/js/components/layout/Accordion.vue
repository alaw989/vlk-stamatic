<template>
    <div class="accordion">
        <div class="cursor-pointer border-b z-1" v-for="(item, index) in services" :key="item.id">
            <button class="accordion cursor-pointer flex justify-between" @click="toggleAccordion(index)">
                <span class="text-xl">{{ item.title }}</span>
                <span class="text-xl">{{ activeIndex === index ? '−' : '+' }}</span>
            </button>
            <div
                class="panel"
                :class="{ 'active': activeIndex === index }"
                ref="panels"
                :style="{ maxHeight: activeIndex === index ? panelHeights[index] : '0px' }"
                @transitionend="handleTransitionEnd(index)"
            >
                <p class="text-md">{{ item?.service_description || 'No description available' }}</p>
                <img class="rounded-md" :src="item.service_image[0]?.url" alt="" @load="imageLoaded(index)">
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
            panelHeights: [], // Store heights for each panel
            selectedService: null
        };
    },
    mounted() {
        axios.get('/api/collections/services/entries')
            .then(response => {
                this.services = response.data.data;

                // Initialize panel heights array with zero height
                this.panelHeights = this.services.map(() => '0px');

                // Check for selected service in local storage and set active index
                const selectedServiceData = JSON.parse(localStorage.getItem('selectedService'));

                if (selectedServiceData && selectedServiceData.index !== undefined) {
                    this.activeIndex = selectedServiceData.index;
                    this.$nextTick(() => {
                        this.setPanelHeight(this.activeIndex);
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching services', error);
            });
    },
    methods: {
        toggleAccordion(index) {
            this.activeIndex = this.activeIndex === index ? null : index;
            this.setPanelHeight(index);

            // Store the selected index in local storage
            localStorage.setItem('selectedService', JSON.stringify({ index: this.activeIndex }));
        },
        setPanelHeight(index) {
            this.$nextTick(() => {
                const panel = this.$refs.panels[index];
                if (panel) {
                    this.panelHeights.splice(index, 1, this.activeIndex === index ? `${panel.scrollHeight}px` : '0px');
                }
            });
        },
        imageLoaded(index) {
            // Recalculate panel height when image is loaded
            this.setPanelHeight(index);
        },
        handleTransitionEnd(index) {
            // Additional logic can go here if needed
        }
    }
};
</script>

<style scoped lang="scss">
.accordion {
    color: #444;
    cursor: pointer;
    padding: 18px 0 18px 0;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 15px;
}

@media (min-width: 1024px) {
    .accordion {
        padding: 18px 18px 18px 0;
    }
}

.panel {
    padding: 0 18px 0 0;
    overflow: hidden;
    transition: max-height 0.5s ease, opacity 0.5s ease;
    opacity: 0;
}

.panel.active {
    opacity: 1;
    margin-bottom: 20px;
}
</style>
