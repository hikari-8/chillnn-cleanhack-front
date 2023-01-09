<template>
    <div class="slack_rimind_edit_container h-full mb-8 mt-20">
        <!-- マスターデータ: くじの編集 -->
        <div class="flex justify-between">
            <div class="font-semibold text-2xl">くじの発行 🌞</div>
            <!-- ボタン -->
            <div class="flex justify-end items-center">
                <app-button @click="createRaffle" class="text-sm w-44 h-16 p-1"
                    >くじを発行する</app-button
                >
            </div>
        </div>

        <div class="flex mb-2">
            <!-- 制限時間 -->
            <raffle-limit-time :raffleObjectModel="raffleObjectModel" />
        </div>

        <div class="mt-2 mb-12 text-sm text-gray-500">
            ＊この時間になると、くじの参加を締切ります。<br />
            　これ以降に、参加者の合計人数と掃除場所に割り当てた人数の合計が<br />　等しくなるように調整して、くじを実行してください。
        </div>
        <div></div>
        <div class="label font-semibold mb-10">発行するくじの内容</div>
        <div class="task_edit_container">
            <!-- task edit -->
            <raffle-list :raffleObjectModel="raffleObjectModel" />
        </div>
    </div>
</template>
<script lang="ts">
import {
    RaffleObjectModel,
    TaskMasterObjectModel,
    GroupModel,
} from 'chillnn-cleanhack-abr'
import { Vue, Component, Prop } from 'nuxt-property-decorator'
// component
import RaffleList from '@/components/Organisms/Raffle/modules/RaffleList.vue'
import RaffleLimitTime from '@/components/Organisms/Raffle/modules/RaffleLimitTime.vue'
import AppButton from '@/components/Atom/Button/AppButton.vue'
import AppTitle from '@/components/Atom/Text/AppTitle.vue'
import AppText from '@/components/Atom/Text/AppText.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import axios from 'axios'
const schedule = require('node-schedule')

@Component({
    components: {
        RaffleList,
        AppButton,
        AppTitle,
        AppText,
        RaffleLimitTime,
    },
})
export default class MakeRaffle extends Vue {
    @Prop({ required: true }) raffleObjectModel!: RaffleObjectModel
    @Prop({ required: true }) taskMasterObjectModel!: TaskMasterObjectModel
    @Prop({ required: true }) groupModel!: GroupModel
    public blancRaffleObj: RaffleObjectModel | null = null

    @AsyncLoadingAndErrorHandle()
    public async createRaffle() {
        await this.createRaffle()
        // fetchする
        const updatedRaffle = await this.groupModel.fetchRaffleObjectModel(
            this.raffleObjectModel.raffleID
        )
        console.log('登録後fetchしたraffle:', updatedRaffle)
        //mastに変換する
        if (!updatedRaffle) return null
        const updatedRaffleMast =
            await updatedRaffle.RaffleObjectModelToGroupObject()
        console.log('GroupDataにpushしました→', updatedRaffleMast)
        if (this.groupModel) this.groupModel.records.push(updatedRaffleMast)
        //アップデートする
        if (!this.groupModel) {
            return null
        } else {
            this.groupModel.updateGroupMast()
        }
    }
}
</script>
<style lang="stylus" scoped>
.user_edit_container {
    .button_container {
        padding-top: 10px;
        display: flex;
        justify-content: center;
    }
}
</style>
