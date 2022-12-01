<template>
    <div class="app_container">
        <div class="logo_container">
            <!-- left -->
            <div class="logo">
                <img src="~/assets/img/logo.svg" />
            </div>
            <div class="title">
                <img src="~/assets/img/CHILLSTAGRAM.png" />
            </div>
        </div>
        <div class="app_inner">
            <!-- app -->
            <nuxt />
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component({
    components: {},
})
export default class DefaultLayout extends Vue {}
</script>
<style lang="stylus" scoped>
.app_container {
    background-color: $backgroundColor;
    background-image: url('https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=678&q=80');
    background-size: cover;
    min-height: 100vh;

    .logo_container {
        padding: 150px 0 60px;
        text-align: center;
        height: 100px;

        @media only screen and (max-width: $spSize) {
            padding: 80px 0 30px;
        }
    }

    .app_inner {
        margin: 0 auto;
        width: 500px;
        box-shadow: 0 0 100px 0 $shadowColor;
        border-radius: 50px;
        background-color: $transparentWhite;

        @media only screen and (max-width: $spSize) {
            border-radius: 20px;
            width: 90%;
        }
    }
}
</style>
