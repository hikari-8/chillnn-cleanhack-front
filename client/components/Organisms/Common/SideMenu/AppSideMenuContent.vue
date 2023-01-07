<template>
    <nuxt-link class="side_menu_content-link" :to="{ name: routeName }">
        <div class="app_side_menu_content">
            <app-text
                :bold="true"
                :value="title"
                :routeName="routeName"
                :isActive="isActive"
            />
            <!-- <app-sub-text :value="text"></app-sub-text> -->
        </div>
        <div class="badge">
            <slot />
        </div>
    </nuxt-link>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import AppText from '@/components/Atom/Text/AppText.vue'

@Component({
    components: {
        AppText,
    },
})
export default class AppSideMenuContent extends Vue {
    @Prop() public routeName!: string
    @Prop() public title!: string
    @Prop() public text!: string
    public isActive: boolean = false

    @Watch('$route')
    public routerWatcher() {
        this.isActive = this.routeName === this.$route.name
        if (this.$route.name) {
            const partialMatch = this.$route.name.match(this.routeName + '/*')
            this.isActive = partialMatch ? true : false
        }
        if (this.routeName === 'userID') {
            this.isActive = this.$route.name === 'userID'
        }
    }

    mounted() {
        this.routerWatcher()
    }
}
</script>

<style lang="stylus" scoped>
.side_menu_content-link {
    position relative;
    @media only screen and (max-width: 1023px) {
    }
    .app_side_menu_content {
        @media only screen and (max-width: 1023px) {
            background-color: white;
            margin: 0px 0px 0px 0px;
        }
        .side_menu_content {

        }
    }
    .badge {
        position absolute
        left 150px
        top 10px
    }
}
</style>
