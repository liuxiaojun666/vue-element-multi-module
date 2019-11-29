<template>
    <div id="app">
        <transition name="slide-fade">
            <router-view class="router-view" />
        </transition>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>
#app {
    position: relative;
}
.router-view {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}
.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(1366px);
  opacity: 0;
}
</style>
