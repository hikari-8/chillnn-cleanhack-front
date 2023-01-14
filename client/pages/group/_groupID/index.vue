<template>
    <div v-if="userModel">
        <div>グループの部屋だよん</div>
        <member-home :userModel="userModel" :groupModel="groupModel" />
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
import MemberHome from '@/components/Organisms/Home/memberJoinHome.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import { authInteractor } from '~/driver/amplify/auth'

// component
@Component({
    components: {
        AppButton,
        MemberHome,
    },
})
export default class Top extends Vue {
    public userModel: UserModel | null = null
    public groupModel: GroupModel | null = null
    public taskMasterObjectModel: TaskMasterObjectModel | null = null
    public blancRaffleObjectModel: RaffleObjectModel | null = null
    public raffleObjectModel: RaffleObjectModel | null = null

    public async created() {
        this.userModel = await userInteractor.fetchMyUserModel()
        this.groupModel = await this.userModel.fetchGroupDataByGroupID()
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
