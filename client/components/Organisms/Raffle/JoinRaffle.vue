<template>
    <div class="mx-auto py-32 auth_container w-600px" v-if="userModel">
        <div class="font-semibold mb-8 text-2xl">くじに参加する ✋</div>

        <raffle-join-card
            :userModel="userModel"
            :groupModel="groupModel"
            :lastRaffle="lastRaffle"
            :isAlreadyJoined="isAlreadyJoined"
            :isRaffleNavPushed="isRaffleNavPushed"
            @registered="registered"
        />
    </div>
</template>
<script lang="ts">
import {
    UserModel,
    GroupModel,
    RaffleObject,
    RaffleObjectModel,
    RaffleJoinUserModel,
    RaffleJoinUser,
} from 'chillnn-cleanhack-abr'
import { Vue, Component, Prop } from 'nuxt-property-decorator'
// component
import AppButton from '@/components/Atom/Button/AppButton.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import RaffleJoinCard from '@/components/Organisms/Raffle/modules/RaffleJoinCard.vue'

@Component({
    components: {
        AppButton,
        RaffleJoinCard,
    },
})
export default class JoinRaffle extends Vue {
    @Prop({ required: true }) userModel!: UserModel
    @Prop({ required: true }) groupModel!: GroupModel
    isNameUpdated: boolean = false
    @Prop({ required: true }) lastRaffle!: RaffleObjectModel
    @Prop({ required: true }) isAlreadyJoined!: boolean
    public blancLastraffle: RaffleObjectModel | null = null
    public joinUserModel: RaffleJoinUserModel | null = null
    public blancJoinUserArray: RaffleJoinUser[] = []
    public isRaffleNavPushed: boolean = false

    public async created() {
        //名前を登録してあるかどうか
        if (this.userModel.name !== '名無し') {
            this.isNameUpdated = true
        }
        //参加可能なくじがあるかどうか(あとでstatusわけしないと)
        if (this.groupModel) {
            this.blancLastraffle =
                await this.groupModel.fetchLastRaffleItemByGroupID()
            if (!this.blancLastraffle) {
                return
            } else {
                this.lastRaffle = this.blancLastraffle
            }
            console.log(this.lastRaffle, 'lastItem')
        }
        //joinするuserのインスタンス作成
        this.joinUserModel = this.userModel.createRaffleJoinUser()
        this.isRaffleNavPushed = true
    }

    @AsyncLoadingAndErrorHandle()
    public async registered() {
        this.$emit('registered')
    }

    @AsyncLoadingAndErrorHandle()
    public async joinGroup() {
        //Modelからmastへ変更
        const mastOfJoinUser =
            await this.joinUserModel!.raffleJoinUserModelToMast()
        if (this.lastRaffle) {
            this.lastRaffle.activeMembers.push(mastOfJoinUser)
        }
        //updateする
        if (!this.lastRaffle) {
            return null
        } else {
            await this.lastRaffle.register()
            this.$emit('registered')
            console.log(this.lastRaffle, 'register後のthis.lastRaffle')
        }
    }
}
</script>
<style lang="stylus" scoped>
.auth_container {
    width: 600px;
}
</style>
