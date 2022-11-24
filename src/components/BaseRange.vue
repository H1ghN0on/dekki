<template>
    <input class="range" type="range" :max="max" :min="min" />
</template>

<script>

export default {
    name: "base-input",
    props: {
        label: String,
        modelValue: {
            type: [Number, Number],
            required: true,
        },
        min: Number,
        max: Number,
        className: String,

    },
    methods: {
        updateValue(e) {
            this.$emit("update:modelValue", e.target.value);
        },
    },
};

</script>


<style lang="scss" scoped>
.range {


    &::-moz-range-progress {
        background-color: $primary-text;
    }

    &::-moz-range-track {
        background-color: $secondary-text;
    }

    &::-moz-range-thumb {
        box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
        border: 1px solid #000000;
        height: 15px;
        width: 10px;
        border-radius: 3px;
        background: #ffffff;
        cursor: pointer;
    }

    &::-webkit-slider-thumb {
        box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
        border: 1px solid #000000;
        height: 15px;
        width: 10px;
        border-radius: 3px;
        background-color: blue;
        cursor: pointer;
        margin-top: -4px;
    }

    &::-webkit-slider-runnable-track {
        width: 100%;
        height: 8.4px;
        cursor: pointer;

        background-color: $secondary-text;
        border-radius: 1.3px;
        border: none;
    }

    &::-moz-focus-outer {
        border: 0;
    }



    &:focus {
        outline: none;
        /* Убирает голубую границу у элемента. Хотя, возможно, и стоит создавать некоторое оформления для состояния фокуса в целях обеспечения доступности. */
    }

    &::-ms-thumb {
        box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
        border: 1px solid #000000;
        height: 15px;
        width: 10px;
        border-radius: 3px;
        background: #ffffff;
        cursor: pointer;
    }

}
</style>