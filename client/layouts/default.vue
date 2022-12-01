<template>
    <div class="app_container">
        <div class="app_header">
            <!-- header -->
            <app-header v-if="userModel" :user-model="userModel" />
        </div>
        <div class="app">
            <!-- app -->
            <nuxt />
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { UserModel } from 'chillnn-training-abr'
import AppHeader from '@/components/Organisms/Common/AppHeader/index.vue'
import { authInteractor } from '~/driver/amplify/auth'
import { userInteractor } from '~/api'
@Component({
    components: {
        AppHeader,
    },
})
export default class DefaultLayout extends Vue {
    public userModel: UserModel | null = null

    public async created() {
        const isSignIn = await authInteractor.isSignIn()
        if (!isSignIn) {
            this.$router.push({ name: 'auth-signin' })
        }

        this.userModel = await userInteractor.fetchMyUserModel()
    }
}
</script>
<style lang="stylus" scoped>
.app_container {
    background-color: $backgroundColor;
    min-height: 100vh;

    .app_header {
        position: sticky;
        top: 0;
        box-shadow: 0 0 5px 0 $shadowColor;
    }

    .app {
        margin: 0 auto;
        max-width: 800px;
        padding: 15px $sidePaddingPC;

        @media only screen and (max-width: $spSize) {
            padding: 15px $sidePaddingSP;
        }
    }
}
</style>
