<template>
    <div class="item" :style="cssProps">
        <div class="name">{{ name }}</div>
        <div class="progress">
            <div v-if="progress != 0" class="bar-part bar1">
                <span v-if="progress > 5">{{ progress }}%</span>
            </div>
            <div v-if="100 - progress != 0" class="bar-part bar2">
                <span v-if="100 - progress > 5">{{ 100 - progress }}%</span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        progress: {
            type: Number, required: true
        },

        name: {
            type: String, required: true
        }
    },


    computed: {
        cssProps() {
            return {
                '--bar1-width': this.progress + "%",
                '--bar2-width': 100 - this.progress + "%",
                '--bar2-border-left': !this.progress ? "1px solid black" : "none",
            }
        }
    }
}

</script>


<style lang="scss" scoped>
.item {
    .name {
        text-align: left;
        font-size: 1.3em;
        font-weight: bold;
    }

    .progress {
        margin-top: 10px;
        width: 600px;
        display: flex;


        .bar-part {
            color: white;
            padding: 5px;
            display: flex;
            justify-content: center;
            align-items: center;

            font-size: 1em;
            font-weight: bold;

            &.bar1 {
                background: $correct;
                width: var(--bar1-width);

            }

            &.bar2 {
                background: $wrong;
                width: var(--bar2-width);
            }
        }


    }
}
</style>