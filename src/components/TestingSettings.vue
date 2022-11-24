<template>

    <div class="testing-settings">
        <div class="testing-number">
            <label>Сколько карточек использовать в тестировании?</label>
            <div class="input-container">
                <base-range :min="0" :max="100" />
                <base-input class="number" type="number" :min="'0'" :max="'100'" />
            </div>
        </div>
        <base-button class="submit-btn" @click="$emit('submit')">
            К тесту
        </base-button>
    </div>

</template>


<script>
import BaseButton from "@/components/BaseButton"
import BaseRange from "@/components/BaseRange"
import BaseInput from "@/components/BaseInput"

export default {
    components: { BaseButton, BaseRange, BaseInput },
}

</script>


<style lang="scss" scoped>
.testing-settings {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .testing-number {
        label {
            font-size: 1.5em;
            font-weight: bold;
        }

        .input-container {
            display: flex;
            margin-top: 30px;

            .range {
                width: 85%;
                background: none;
            }


            .number {
                width: 15%;
                margin-left: 10px;
                font-size: 1em;
                outline: none;
                padding: 10px 0;
                padding-left: 5px;

            }

        }


    }

    .submit-btn {
        margin-top: 10px;
        font-size: 0.9em;
        padding: 15px 30px;
    }

}
</style>