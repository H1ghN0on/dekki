<template>
    <input :value="modelValue" @input="updateValue" class="checkbox" type="checkbox" />
</template>

<script>


export default {
    name: "base-input",
    props: {
        label: String,
        modelValue: {
            type: [Boolean, Number],
            required: true,
        },
    },
    methods: {
        updateValue(e) {
            console.log(e.target);
            this.$emit("update:modelValue", e.target.checked);
        },
    },
};

</script>


<style lang="scss" scoped>
.checkbox {}
</style>