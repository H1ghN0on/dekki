<template>
    <div class="lds-ripple" :style="cssProps">
        <div></div>
        <div></div>
    </div>
</template>

<script>
export default {
    name: "BaseLoading",
    props: {
        width: {
            type: Number,
            default: 180,
        },
        height: {
            type: Number,
            default: 180,
        },
        color: {
            type: String,
            default: "black"
        },
        borderWidth: {
            type: Number,
            default: 4,
        }
    },

    computed: {
        cssProps() {
            return {
                '--loading-width': this.width + "px",
                '--loading-height': this.height + "px",
                '--loading-color': this.color,
                '--border-width': this.borderWidth + "px",
            }
        }
    }
}
</script>

<style scoped lang="scss">
.lds-ripple {
    position: relative;
    width: var(--loading-width);
    height: var(--loading-height);
}

.lds-ripple div {
    position: absolute;
    border: var(--border-width) solid var(--loading-color);
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
}

@keyframes lds-ripple {
    0% {
        top: calc(var(--loading-width)/2);
        left: calc(var(--loading-height)/2);
        width: 0;
        height: 0;
        opacity: 0;
    }

    4.9% {
        top: calc(var(--loading-width)/2);
        left: calc(var(--loading-height)/2);
        width: 0;
        height: 0;
        opacity: 0;
    }

    5% {
        top: calc(var(--loading-width)/2);
        left: calc(var(--loading-height)/2);
        width: 0;
        height: 0;
        opacity: 1;
    }


    100% {
        top: 0px;
        left: 0px;
        width: var(--loading-width);
        height: var(--loading-height);
        opacity: 0;
    }
}
</style>