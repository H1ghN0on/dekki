<template>
    <div @click="move" class="progress" :style="cssProps">
        <div ref="bar" class="bar" :class="{ 'active': active }"></div>
    </div>
</template>



<script>

export default {
    props: {
        forWatch: {
            required: true,
        },

        fillTime: {
            required: true,
        },

        delayTime: {
            type: Number,
            require: true,
        }
    },

    data() {
        return {
            active: false,
        }
    },

    methods: {
        fill() {
            setTimeout(() => {
                this.active = true;
                this.$refs.bar.style.width = "100%"
            })

        },

        disappear() {
            this.active = false;
            this.$refs.bar.style.width = "0%"
        }
    },

    watch: {
        forWatch(newValue) {
            newValue ? this.fill() : this.disappear();
        }
    },

    computed: {
        cssProps() {
            return {
                '--transition-time': this.fillTime / 1000 + "s",
                '--transition-delay': this.delayTime + "s",
            }
        }
    }
}

</script>

<style scoped lang="scss">
.progress {
    width: 100%;
    background-color: $progress-bar-background;
    border-radius: 15px;

    .bar {
        height: 20px;
        width: 0%;
        background-color: $progress-bar-fill;
        border-radius: 15px;

        &.active {
            transition: width var(--transition-time) linear var(--transition-delay);
        }

    }
}
</style>
