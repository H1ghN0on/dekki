<template>
    <div class="dialog" v-if="show" @click="hideDialog">
        <div @click.stop class="dialog__content">
            <slot></slot>
        </div>
    </div>
</template>
  
<script>


export default {
    name: "my-dialog",
    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        hideDialog() {
            this.$emit("update:show", false);
        },
    },
};
</script>
  
<style>
.dialog {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    z-index: 10001;
    display: flex;

}

.dialog__content {
    margin: auto;
    background: white;
    min-height: 50px;
    min-width: 300px;
    max-height: 90%;
    border-radius: 10px;
    padding: 20px;
    overflow: hidden;
    max-width: 90vw;
}
</style>