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
        <div v-else class="input_container font-semibold mb-4">
            <div>
                <div>
                    おかえりなさい！
                    {{ userModel.name }}
                    さん！🎉
                </div>
            </div>
        </div>
        <div v-if="lastRaffle && isNameUpdated" class="mt-24">
            <div
                class="p-6 bg-white border border-gray-200 rounded-lg shadow-md flex justify-between"
            >
                <div
                    class="mb-2 text-lg font-semibold tracking-tight text-gray-900"
                >
                    {{ groupModel.groupName }}のお掃除くじに招待されています。
                    <br />
                    参加しますか？🧼 🧹
                </div>
                <app-button class="my-3 ml-4" @click="joinGroup"
                    >参加する</app-button
                >
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {
    UserModel,
    GroupModel,
    RaffleObject,
    RaffleObjectModel,
    RaffleJoinUserModel,
} from 'chillnn-cleanhack-abr'
import { Vue, Component, Prop } from 'nuxt-property-decorator'
// component
import AppButton from '@/components/Atom/Button/AppButton.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'

@Component({
    components: {
        AppButton,
    },
})
export default class HomeBody extends Vue {
    @Prop({ required: true }) userModel!: UserModel
    @Prop({ required: true }) groupModel!: GroupModel
    isNameUpdated: boolean = false
    @Prop({ required: true }) lastRaffle!: RaffleObjectModel
    public blancLastraffle: RaffleObjectModel | null = null
    public joinUserModel: RaffleJoinUserModel | null = null

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
    }

    @AsyncLoadingAndErrorHandle()
    public async joinGroup() {
        //Modelからmastへ変更
        const mastOfJoinUser =
            await this.joinUserModel!.raffleJoinUserModelToMast()
        if (this.lastRaffle) {
            this.lastRaffle.activeMembers.push(mastOfJoinUser)
            if (this.lastRaffle.activeMembers[0].userID === 'blank') {
                this.lastRaffle.activeMembers.shift()
            }
        }
        //updateする
        if (!this.lastRaffle) {
            return null
        } else {
            await this.lastRaffle.register()
        }
    }
}
</script>
<style lang="stylus" scoped>
.auth_container {
    width: 600px;
}
</style>
