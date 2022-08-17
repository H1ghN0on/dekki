<template>
  <HelloWorld />
</template>

<script>
import HelloWorld from "@/components/HighNoon.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background: #f5f5f5;
}
#app {
  font-family: "Raleway";
  color: $primary-text;
}
</style>
