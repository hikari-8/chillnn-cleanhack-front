<template>
    <div class="mx-auto py-32 auth_container w-600px" v-if="userModel">
        <div class="font-semibold mb-8 text-2xl">くじに参加する ✋</div>

        <raffle-join-card
            :userModel="userModel"
            :groupModel="groupModel"
            :lastRaffle="lastRaffle"
            :isAlreadyJoined="isAlreadyJoined"
            :islastRaffleDone="islastRaffleDone"
            :isRaffleNavPushed="isRaffleNavPushed"
            @joinGroup="joinGroup"
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
    @Prop({ required: true }) islastRaffleDone!: boolean
    // @Prop({ required: true }) joinUserModel!: RaffleJoinUserModel
    // @Prop({ required: true }) memberList!: string[]
    public blancLastraffle: RaffleObjectModel | null = null
    public blancJoinUserArray: RaffleJoinUser[] = []
    public isRaffleNavPushed: boolean = true

    public async created() {
        //名前を登録してあるかどうか
        if (this.userModel.name !== '名無し') {
            this.isNameUpdated = true
        }
    }

    @AsyncLoadingAndErrorHandle()
    public async registered() {
        this.$emit('registered')
    }

    @AsyncLoadingAndErrorHandle()
    public async joinGroup() {
        this.$emit('joinGroup')
    }
}
</script>
<style lang="stylus" scoped>
.auth_container {
    width: 600px;
}
</style>
