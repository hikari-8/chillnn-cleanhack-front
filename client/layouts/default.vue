<template>
    <div class="app_container" v-if="userModel">
        <!-- <div class="app_header"> -->
        <!-- header -->
        <!-- <app-header :user-model="userModel" /> -->
        <!-- </div> -->
        <div class="app">
            <!-- app -->
            <nuxt />
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { UserModel } from 'chillnn-cleanhack-abr'
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
    public isSignIn: boolean = false
    public groupID: string = ''

    public async created() {
        //パスの中の動的なセグメントを取得
        if (this.$route.params.groupID) {
            this.groupID = this.$route.params.groupID
        } else {
            const groupID = this.$route.query.groupID
            this.groupID = (typeof groupID === 'string' && groupID) || ''
        }
        console.log('paramsから取得したgroupID', this.groupID)
        console.log('delaftの中を通っています')
        const isSignIn = await authInteractor.isSignIn()
        if (!isSignIn) {
            this.$router.push({
                name: 'auth-signup',
                query: {
                    groupID: this.groupID,
                },
            })
        } else {
            this.userModel = await userInteractor.fetchMyUserModel()
            if (
                this.userModel.groupID ||
                this.groupID !== '' ||
                this.groupID !== undefined
            ) {
                console.log('第二段階目に分岐しました')
                this.$router.push({
                    // name: 'group',
                    path: '/group/:groupID',
                    params: { groupID: this.groupID },
                })
            } else {
                console.log('elseの方のindexに分岐しました')
                this.$router.push({
                    name: 'index',
                })
            }
        }
        this.userModel = await userInteractor.fetchMyUserModel()
    }
}
</script>
<style lang="stylus" scoped>
.app_container {
    // background-color: $backgroundColor;
    min-height: 100vh;

    .app_header {
        position: sticky;
        top: 0;
        box-shadow: 0 0 5px 0 $shadowColor;
        z-index: 90;
    }
}
</style>
