<template>
    <div class="app_container">
        <div class="logo_container p-16">
            <!-- left -->
            <div class="title flex items-center ml-20">
                <div class="logo w-5 h-5 mr-2">
                    <img src="~/assets/img/icon.png" />
                </div>
                <div class="text-xl font-semibold">CLEAN HACK</div>
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
    background-size: cover;
    min-height: 100vh;

    .logo_container {
        // padding: 150px 0 60px;
        text-align: center;
        height: 100px;


        @media only screen and (max-width: $spSize) {
            padding: 80px 0 30px;
        }

        .title {
          color: #4CD9D0;
        }
    }

            .logo {
            width: 30px;
            height: 30px;
            }

    .app_inner {
        margin: 0 auto;
        width: 500px;
        // box-shadow: 0 0 100px 0 $shadowColor;
        border-radius: 50px;
        background-color: $transparentWhite;

        @media only screen and (max-width: $spSize) {
            border-radius: 20px;
            width: 90%;
        }
    }
}
</style>
