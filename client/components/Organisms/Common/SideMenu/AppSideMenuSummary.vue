<template>
    <div>
        <div
            @click="isShow = !isShow"
            class="app-side-menu-summary"
            :class="{ 'app-side-menu-summary--opened': isShow }"
        >
            <app-text class="large" :bold="true" :value="title"></app-text>
            <!-- <app-sub-text :value="text"></app-sub-text> -->
        </div>
        <transition
            name="accordion"
            @before-enter="beforeEnter"
            @enter="enter"
            @before-leave="beforeLeave"
            @leave="leave"
        >
            <div v-show="isShow" class="app-side-menu-summary__contents">
                <slot></slot>
            </div>
        </transition>
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
export default class AppSideMenuSummary extends Vue {
    @Prop() public title!: string
    @Prop() public text!: string
    @Prop({ default: null }) public summaryRoute!: string
    public isShow: boolean = false
    public isActive: boolean = false

    @Watch('$route')
    public routerWatcher() {
        if (this.$route.name) {
            let partialMatch: boolean
            if (this.summaryRoute) {
                partialMatch = this.$route.name.startsWith(
                    'hotelID' + this.summaryRoute
                )
            } else {
                const homeRoute = [
                    'hotelID',
                    'hotelID-hpb',
                    'hotelID-reservationPage-snack',
                ]
                partialMatch = homeRoute.includes(this.$route.name)
            }
            this.isActive = partialMatch ? true : false
            this.isShow = partialMatch ? true : false
        }
    }

    mounted() {
        this.routerWatcher()
    }

    // accordionの挙動はここを参照 https://qiita.com/randy39/items/67d956f5b10ebce7a0a5
    public beforeEnter(el: any) {
        el.style.height = '0'
    }
    public enter(el: any) {
        el.style.height = el.scrollHeight + 'px'
    }
    public beforeLeave(el: any) {
        el.style.height = el.scrollHeight + 'px'
    }
    public leave(el: any) {
        el.style.height = '0'
    }
}
</script>

<style lang="stylus" scoped>
.app-side-menu-summary {
    cursor: pointer;
    position: relative;
    margin: 15px 0 0px 0;
    padding-left: 16px;

    @media only screen and (max-width: 1023px) {
        background-color: white;
        margin: 20px 0 0px 0;
    }

    &:before {
        content: '';
        position: absolute;
        top: 10px;
        left: 0px;
        width: 6px;
        height: 6px;
        border: 0px;
        border-bottom: solid 2px #4c4c4c;
        border-right: solid 2px #4c4c4c;
        transform: rotate(-45deg);
    }

    .large {
        display: inline-block;
    }
}

.app-side-menu-summary--opened {
    &:before {
        top: 9px;
        left: 1px;
        transform: rotate(45deg);
    }
}

.accordion-enter-active, .accordion-leave-active {
    transition: all 0.4s;
    overflow: hidden;
}

.accordion-enter, .accordion-leave-to {
    height: 0;
    transition: all 0.4s;
}
</style>
