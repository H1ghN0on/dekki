<template>
  <div class="preview">
    <div class="card" :class="{ flipped: side === 'back', 'fixed-side': fixedSide }">
      <div class="front">
        <div v-for="item in front" :key="item.id" :class="'attr ' + item.type"
          :style="{ 'font-size': item.fontSize + 'px', }">
          {{ item.value }}
        </div>
      </div>
      <div class="back">
        <div v-for="item in back" :key="item.id" :class="'attr ' + item.type"
          :style="{ 'font-size': item.fontSize + 'px' }">
          {{ item.value }}
        </div>
      </div>
    </div>
    <div v-if="!fixedSide" @click="flipCard" class="flip-btn">Перевернуть</div>
  </div>
</template>

<script>
export default {
  name: "DeckUpdatePreview",
  props: {
    front: {
      type: Array,
      required: true,
    },
    back: {
      type: Array,
      required: true,
    },
    fixedSide: String
  },

  methods: {
    flipCard() {
      this.side = this.side === "front" ? "back" : "front";
    },
  },


  data() {
    return {
      side: this.fixedSide || "front",
    }
  },

  watch: {
    fixedSide(newValue) {
      this.side = newValue ? newValue : "front";
    }
  }


};
</script>

<style lang="scss" scoped>
.preview {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;

  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: all 0.5s ease;
    background: white;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);

    &.fixed-side {
      transition: 0s;
    }

    &.flipped {
      transform: rotateY(180deg);
    }

    .front {
      position: absolute;
      backface-visibility: hidden;
      transform: rotateY(0deg);

    }

    .back {
      position: absolute;
      backface-visibility: hidden;
      transform: rotateY(180deg);

    }



    .attr {
      margin-top: 15px;

      &.main {
        font-weight: bold;

      }

    }
  }

  .flip-btn {
    cursor: pointer;
    position: absolute;
    bottom: -30px;
  }
}
</style>