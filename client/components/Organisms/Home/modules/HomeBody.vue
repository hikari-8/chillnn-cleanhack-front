<template>
    <div class="mx-auto py-32 auth_container w-600px" v-if="userModel">
        <div class="font-semibold mb-8 text-2xl">Home 🏠</div>
        <div
            v-if="!isNameUpdated"
            class="input_container flex font-semibold mb-4"
        >
            <div class="mt-12">
                ようこそCLEAN HACKへ　🎉
                <br />
                ユーザー設定からお名前を登録してください！
            </div>
        </div>
        <div v-if="isNameUpdated" class="input_container font-semibold mb-4">
            <div>
                <div>
                    おかえりなさい！
                    {{ userModel.name }}
                    さん！🎉
                </div>
            </div>
        </div>
        <raffle-join-card
            :userModel="userModel"
            :groupModel="groupModel"
            :lastRaffle="lastRaffle"
            :isAlreadyJoined="isAlreadyJoined"
            @joinGroup="joinGroup"
            @registered="registered"
        />
    </div>
</template>
<script lang="ts">
import {
    UserModel,
    GroupModel,
    RaffleObjectModel,
    RaffleJoinUserModel,
    RaffleJoinUser,
    RaffleStatus,
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
export default class HomeBody extends Vue {
    @Prop({ required: true }) userModel!: UserModel
    @Prop({ required: true }) groupModel!: GroupModel
    isNameUpdated: boolean = false
    @Prop({ required: true }) lastRaffle!: RaffleObjectModel
    @Prop({ required: true }) isAlreadyJoined!: boolean
    public blancLastraffle: RaffleObjectModel | null = null
    public joinUserModel: RaffleJoinUserModel | null = null
    public blancJoinUserArray: RaffleJoinUser[] = []
    public memberList: string[] = []
    public justDisplay: boolean = false

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
