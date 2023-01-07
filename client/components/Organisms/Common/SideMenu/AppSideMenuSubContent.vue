<template>
    <div class="relative">
        <div class="app_side_menu_sub_content">
            <nuxt-link
                class="side_menu_sub_content_link flex items-end justify-between"
                :to="{ name: routeName }"
            >
                <div class="group">
                    <app-text
                        class="inline-block"
                        :value="title"
                        :routeName="routeName"
                        :isActive="isActive"
                    />
                    <div
                        :class="{ 'group-hover:block': tooltipText }"
                        class="absolute top-14 right-0 z-notification hidden w-44 rounded bg-black/90 p-2 transition before:absolute before:left-1/2 before:bottom-full before:-translate-x-1/2 before:border-8 before:border-transparent before:border-b-black before:content-['']"
                    >
                        <div v-html="tooltipText" class="text-xs text-white" />
                    </div>
                </div>
                <div
                    v-if="isNew"
                    class="flex h-5 w-11 items-center justify-center rounded bg-chillnn-secondary"
                >
                    <app-text value="BETA" :white="true" :bold="true" />
                </div>
            </nuxt-link>
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import AppText from '@/components/Atom/Text/AppText.vue'

@Component({
    components: {
        AppText,
    },
})
export default class AppSideMenuSubContent extends Vue {
    @Prop() public routeName!: string
    @Prop() public title!: string
    @Prop() public text!: string
    @Prop() public isNew!: boolean
    @Prop({ required: false, default: null }) public tooltipText!: string | null

    // ホテルポリシー用に作成したProp。複数のrouteNameの場合にも同じサイドメニュータイトルをアクティブにしたい時に使用
    @Prop({ required: false, default: null }) public routeNameArray!:
        | string[]
        | null

    public isActive: boolean = false

    @Watch('$route')
    public routerWatcher() {
        if (this.$route.name) {
            let partialMatch: boolean
            if (this.routeName === 'hotelID') {
                partialMatch = 'hotelID' === this.$route.name
            } else if (
                this.routeName ===
                'hotelID-reservationPage-snack-design-list-snackList'
            ) {
                partialMatch = this.$route.name.startsWith(
                    'hotelID-reservationPage-snack-design-list'
                )
            } else if (this.routeNameArray && this.routeNameArray.length) {
                // routeNameArrayが存在している場合、`this.$route.name`が`routeNameArray`と１つでもmatchしたらアクティブにする
                partialMatch = this.routeNameArray.some(
                    (item) => item === this.$route.name
                )
            } else {
                partialMatch = this.$route.name.startsWith(this.routeName)
            }
            this.isActive = partialMatch
        }
    }

    mounted() {
        this.routerWatcher()
    }
}
</script>

<style lang="stylus" scoped>
.app_side_menu_sub_content {
    margin: 0px 0 0 0;
    padding: 10px 0px 0px 20px;

    @media only screen and (max-width: 1023px) {
        background-color: white;
        padding: 10px 0px 0px 30px;
    }
}
</style>
