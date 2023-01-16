<template>
    <div v-if="userModel">
        <app-home
            :userModel="userModel"
            :groupModel="groupModel"
            :taskMasterObjectModel="taskMasterObjectModel"
            :lastRaffle="lastRaffle"
        />
    </div>
</template>
<script lang="ts">
import {
    GroupModel,
    UserModel,
    TaskMasterObjectModel,
    RaffleObject,
    RaffleObjectModel,
} from 'chillnn-cleanhack-abr'
import { Component, Vue } from 'nuxt-property-decorator'
import { userInteractor } from '~/api'
import AppButton from '@/components/Atom/Button/AppButton.vue'
import AppHome from '@/components/Organisms/Home/index.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import { authInteractor } from '~/driver/amplify/auth'

// component
@Component({
    components: {
        AppButton,
        AppHome,
    },
})
export default class Top extends Vue {
    public userModel: UserModel | null = null
    public groupModel: GroupModel | null = null
    public taskMasterObjectModel: TaskMasterObjectModel | null = null
    public blancRaffleObjectModel: RaffleObjectModel | null = null
    public raffleObjectModel: RaffleObjectModel | null = null
    public groupID: string = ''
    public lastRaffle: RaffleObjectModel | null = null
    public blancLastRaffle: RaffleObjectModel | null = null

    public async created() {
        this.userModel = await userInteractor.fetchMyUserModel()
        if (this.userModel.groupID) {
            this.groupModel = await this.userModel.fetchGroupDataByGroupID()
        }
        //taskMasterObjectModelをgroupIDでfetchしてくる
        if (this.userModel) {
            this.taskMasterObjectModel =
                await this.userModel.fetchTaskMasterDataObjByGroupID(
                    this.userModel.groupID!
                )
            // console.log('Attention', this.taskMasterObjectModel)
        }
        if (this.groupModel) {
            this.blancLastRaffle =
                await this.groupModel.fetchLastRaffleItemByGroupID()
            if (this.blancLastRaffle) {
                this.lastRaffle = this.blancLastRaffle
            }
        }
    }

    @AsyncLoadingAndErrorHandle()
    public async register() {
        if (!this.userModel?.name) {
            return console.error('ユーザー名を入力してください')
        }
        await this.userModel.register()
        this.$emit('registered')
    }
}
</script>
<style lang="stylus" scoped>
.auth_container {
    width: 600px;
}
</style>
