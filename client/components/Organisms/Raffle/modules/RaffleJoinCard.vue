<template>
    <div>
        <!-- groupがない(くじに参加するタブが押されている時) -->
        <div
            v-if="!groupModel && isRaffleNavPushed"
            class="mb-2 text-lg font-semibold tracking-tight text-gray-900"
        >
            現在、参加できるくじはありません 🙇‍♀️
        </div>
        <!-- 名前がない -->
        <div
            v-if="!isNameUpdated && isRaffleNavPushed"
            class="p-6 bg-white border border-gray-200 rounded-lg shadow-md flex justify-between mt-10"
        >
            <div
                class="mb-2 text-lg font-semibold tracking-tight text-gray-900"
            >
                くじに参加するには、ユーザー設定からユーザー名を登録してください。🙇‍♀️
            </div>
        </div>

        <!-- lastRaffleはある -->
        <!-- くじはeffective、joinしてるかしてないか -->
        <div v-if="lastRaffle && isNameUpdated">
            <div class="mt-24" v-if="!islastRaffleDone">
                <!-- くじはあるが、joinしていない -->
                <div
                    v-if="!isAlreadyJoined"
                    class="p-6 bg-white border border-gray-200 rounded-lg shadow-md"
                >
                    <div>
                        <div class="flex justify-between">
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

                        <div class="mb-8 text-sm text-gray-500 mt-4">
                            ＊参加される場合は、当てはまるものにチェックをつけてください
                        </div>
                    </div>
                    <div>
                        <select-option-part
                            :userModel="userModel"
                            :lastRaffle="lastRaffle"
                        />
                    </div>
                </div>
                <!-- くじはあるが、すでにjoin済み -->
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
                            }}に参加しています！くじが実行されるまでお待ちください！🧼
                        </div>
                    </div>
                </div>
            </div>
            <!--lastraffleはあるが、DONE -->
            <div
                v-if="islastRaffleDone"
                class="p-6 bg-white border border-gray-200 rounded-lg shadow-md flex justify-between mt-10"
            >
                <div
                    v-if="groupModel"
                    class="mb-2 text-lg font-semibold tracking-tight text-gray-900"
                >
                    現在、{{ groupModel.groupName }}で参加できるくじはありません
                    🙇‍♀️
                </div>
            </div>
        </div>
        <!-- lastRaffleがない(初期の初期でグループ追加後) -->
        <div v-if="groupModel">
            <div
                v-if="!lastRaffle && groupModel.groupName"
                class="p-6 bg-white border border-gray-200 rounded-lg shadow-md flex justify-between mt-10"
            >
                <div
                    class="mb-2 text-lg font-semibold tracking-tight text-gray-900"
                >
                    現在、{{ groupModel.groupName }}で参加できるくじはありません
                    🙇‍♀️
                </div>
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
import SelectOptionPart from '@/components/Organisms/Raffle/modules/SelectOptionPart.vue'

@Component({
    components: {
        AppButton,
        SelectOptionPart,
    },
})
export default class RaffleJoinCard extends Vue {
    @Prop({ required: true }) userModel!: UserModel
    @Prop({ required: true }) groupModel!: GroupModel
    public isNameUpdated: boolean = false
    @Prop({ required: true }) lastRaffle!: RaffleObjectModel
    @Prop({ required: true }) isAlreadyJoined!: boolean
    @Prop({ required: false }) isRaffleNavPushed!: boolean
    @Prop({ required: true }) islastRaffleDone!: boolean
    // public isLastRaffleDone: boolean = false
    public optionNameList: string[] = []

    public async created() {
        //名前を登録してあるかどうか
        if (this.userModel.name !== '名無し') {
            this.isNameUpdated = true
        }
        // if (this.lastRaffle) {
        //     if (this.lastRaffle.raffleStatus == RaffleStatus.DONE) {
        //         this.islastRaffleDone = true
        //     } else {
        //         this.islastRaffleDone = false
        //     }
        // }
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
