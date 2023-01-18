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
import { UserModel, GroupModel } from 'chillnn-cleanhack-abr'
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
    public groupModel: GroupModel | null = null
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
        // console.log('paramsから取得したgroupID', this.groupID)
        // console.log('delaftの中を通っています')
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
            //グループID持ってたら、グループページに誘導
            if (this.userModel.groupID) {
                this.$router.push({
                    path: '/group/:groupID',
                    params: { groupID: this.groupID },
                })
            } else if (!this.userModel.groupID && this.groupID === ':groupID') {
                //groupIDを持ってない、かつparamsにもgroupidがなかったとき
                this.$router.push({
                    name: 'index',
                })
            } else if (!this.userModel.groupID && this.groupID !== ':groupID') {
                //groupIDを持ってない、かつparamsにgroupidがあった時
                //groupIDをuserに持たせて、userのアップデートをかける

                this.userModel.groupID = this.groupID
                this.groupModel = await this.userModel.fetchGroupDataByGroupID()
                //groupのmembersにもpushする
                if (this.groupModel) {
                    await this.groupModel.pushGroupMembers(
                        this.userModel.userID
                    )
                }
                await this.userModel.register()
                console.log(this.userModel, 'update後のuserModel')
                console.log(this.groupModel, 'update後のgroupModel')
                this.$router.push({
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
