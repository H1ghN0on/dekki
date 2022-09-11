<template>
  <div class="preview">
    <div class="card" :class="{ flipped: !isFront }">
      <div class="front">
        <div v-for="item in front" :key="item.id" :class="'attr ' + item.type">
          {{ item.value }}
        </div>
      </div>
      <div class="back">
        <div v-for="item in back" :key="item.id" :class="'attr ' + item.type">
          {{ item.value }}
        </div>
      </div>
    </div>
    <div @click="flipCard" class="flip-btn">Перевернуть</div>
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
  },

  methods: {
    flipCard() {
      this.isFront = !this.isFront;
    },
  },

  data() {
    return {
      isFront: true,
    };
  },
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
      &.name {
        font-weight: bold;
        font-size: 4em;
      }

      &.description {
        font-size: 1.5em;
        margin-top: 15px;
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