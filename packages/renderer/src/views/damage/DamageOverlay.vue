<template>
  <div class="overlay">
    <div class="overlay-move"></div>
    <div class="overlay-close"></div>
  </div>
</template>

<style scoped lang="less">
  .overlay {
    position: absolute;
    top: 0;
    left: 0;

    height: 100vh;
    width: 100vw;
    display: flex;

    .overlay-move {
      flex: 1;
      -webkit-app-region: drag;
      background-color: aquamarine;
      opacity: 0;

      &:hover {
        opacity: 1;
      }
    }

    .overlay-close {
      flex: 1;
      background-color: salmon;
      opacity: 0;

      &:hover {
        opacity: 1;
      }
    }
  }
</style>
