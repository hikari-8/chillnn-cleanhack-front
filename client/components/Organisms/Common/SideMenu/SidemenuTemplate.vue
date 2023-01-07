<template>
    <transition name="sidemenu">
        <div class="sidebar" v-if="!!showSideMenu">
            <!-- アコーディオン -->
            <div class="sidebar-block-only-open">
                <div class="sidebar-block__only-open-menu">
                    <slot></slot>
                </div>
            </div>
        </div>
    </transition>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class SideMenuTemplate extends Vue {
    @Prop() public showSideMenu!: boolean
}
</script>
<style lang="stylus" scoped>
.sidebar {
    position: sticky;
    top: 0;
    height: 100vh;
    max-height: 100vh;
    background-color: $color-background-sidemenu;
    box-sizing: border-box;
    // overflow: visible;
    overflow-y: scroll;
    z-index: $sidemenu;
}
.sidebar::-webkit-scrollbar {  /* Chrome, Safari 対応 */
        display:none;
    }

.sidebar-block-only-open {
    height: 100vh;
    background: rgba(255, 255, 255, 0.96);
    box-sizing: border-box;
    transition: 0.5s all;
}

.sidebar-block__only-open-menu {
    position: relative;
    margin: 0 auto;
}

.sidemenu-enter-active, .sidemenu-leave-active {
  transform: translate(0px, 0px);
  transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
}

.sidemenu-enter, .sidemenu-leave-to {
  transform: translateX(-100vw) translateX(0px);
}
</style>
