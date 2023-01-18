<template>
    <div>
        <!-- groupがない -->
        <div
            v-if="!groupModel && isRaffleNavPushed"
            class="mb-2 text-lg font-semibold tracking-tight text-gray-900"
        >
            現在、参加できるくじはありません 🙇‍♀️
        </div>
        <div v-if="lastRaffle && isNameUpdated">
            <div class="mt-24">
                <!-- くじはあるが、joinしていない -->
                <div
                    v-if="!isAlreadyJoined"
                    class="p-6 bg-white border border-gray-200 rounded-lg shadow-md flex justify-between"
                >
                    <div
                        v-if="groupModel"
                        class="mb-2 text-lg font-semibold tracking-tight text-gray-900"
                    >
                        {{
                            groupModel.groupName
                        }}のお掃除くじに招待されています。
                        <br />
                        参加しますか？🧼 🧹
                    </div>
                    <app-button class="my-3 ml-4" @click="joinGroup"
                        >参加する</app-button
                    >
                </div>
                <div>
                    <div
                        v-if="isAlreadyJoined"
                        class="p-6 bg-white border border-gray-200 rounded-lg shadow-md flex justify-between"
                    >
                        <div
                            v-if="groupModel"
                            class="mb-2 text-lg font-semibold tracking-tight text-gray-900"
                        >
                            現在、{{
                                groupModel.groupName
                            }}で参加できるくじはありません 🙇‍♀️
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- lastRaffleがない -->
        <div
            v-if="!lastRaffle && isNameUpdated && !isRaffleNavPushed"
            class="p-6 bg-white border border-gray-200 rounded-lg shadow-md flex justify-between mt-10"
        >
            <div
                v-if="groupModel"
                class="mb-2 text-lg font-semibold tracking-tight text-gray-900"
            >
                現在、{{ groupModel.groupName }}で参加できるくじはありません 🙇‍♀️
            </div>
        </div>
        <!-- lastRaffleはあるが、nameを登録してない -->
        <div
            v-if="lastRaffle && !isNameUpdated"
            class="p-6 bg-white border border-gray-200 rounded-lg shadow-md flex justify-between mt-10"
        >
            <div
                v-if="groupModel"
                class="mb-2 text-lg font-semibold tracking-tight text-gray-900"
            >
                現在、{{ groupModel.groupName }}でくじが発行されています。
                <br />参加するには、ユーザー設定からユーザー名を登録してください。🙇‍♀️
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
    RaffleJoinUser,
    RaffleStatus,
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
export default class RaffleJoinCard extends Vue {
    @Prop({ required: true }) userModel!: UserModel
    @Prop({ required: true }) groupModel!: GroupModel
    isNameUpdated: boolean = false
    @Prop({ required: true }) lastRaffle!: RaffleObjectModel
    @Prop({ required: true }) isAlreadyJoined!: boolean
    @Prop({ required: false }) isRaffleNavPushed!: boolean
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
        //status分岐する
        if (this.groupModel) {
            this.blancLastraffle =
                await this.groupModel.fetchLastRaffleItemByGroupID()
            if (!this.blancLastraffle) {
                return
            } else if (
                this.blancLastraffle.raffleStatus === RaffleStatus.EFFECTIVE
            ) {
                this.lastRaffle = this.blancLastraffle
                //Effectiveかつ、自分もまだ参加していなかったら参加できる
                //memberの配列を作成
                this.createMembersArray()
                const myUserID = this.userModel.userID
                //lastRaffleのmemberの配列に自分のuserIDがあるかどうか
                this.isAlreadyJoined = this.memberList.includes(myUserID)
                console.log(this.isAlreadyJoined, 'is already joined?')
                if (this.isAlreadyJoined) {
                    return
                } else {
                    //joinするuserのインスタンス作成
                    this.joinUserModel = this.userModel.createRaffleJoinUser()
                }
            } else {
                // 最後のraffleはあるけど、statusがdoneかすでにjoin済み
                //最後のraffleを表示させるだけ
                this.justDisplay = true
            }
            console.log(this.lastRaffle, 'lastItem')
        }
    }

    public createMembersArray() {
        //memberの配列を作成
        for (const member of this.lastRaffle!.activeMembers) {
            const memberID = member.userID
            this.memberList.push(memberID)
        }
    }

    @AsyncLoadingAndErrorHandle()
    public async joinGroup() {
        if (this.isAlreadyJoined) {
            alert('すでに参加済みのくじです！リロードしてください！')
        } else {
            //Modelからmastへ変更
            const mastOfJoinUser =
                await this.joinUserModel!.raffleJoinUserModelToMast()
            if (this.lastRaffle) {
                this.lastRaffle.activeMembers.push(mastOfJoinUser)
                // this.lastRaffle.activeMembers.push(mastOfJoinUser)
                // if (this.lastRaffle.activeMembers[0].userID === 'blank') {
                //     this.lastRaffle.activeMembers.shift()
                // }
            }
            //updateする
            if (!this.lastRaffle) {
                return null
            } else {
                await this.lastRaffle.register()
                this.$emit('registered')
                alert(
                    'くじに参加しました！くじが実行されるまでお待ちください！'
                )
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
.auth_container {
    width: 600px;
}
</style>
