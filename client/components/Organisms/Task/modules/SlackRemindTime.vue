<template>
    <div v-if="taskMasterObjectModel" class="user_edit_container h-full mb-8">
        <div class="font-semibold">くじ引きリマインド時間設定</div>

        <!-- 時間設定と、ボタンのコンテナ -->
        <div class="flex mt-8 gap-x-3">
            <div
                class="app_select_weekday flex text-center items-center gap-x-2 justify-center flex-shrink-0"
            >
                <!-- 週の予定 -->
                <div class="text-sm font-medium text-gray-900 w-10">毎週</div>
                <!-- セレクトボックス -->
                <select
                    id="week"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-18 p-2.5"
                    v-model="taskMasterObjectModel.remindSlackWeek"
                >
                    <option disabled selected value=""></option>
                    <option
                        v-for="selectedWeekday in limitWeekdaysList"
                        :value="selectedWeekday.value"
                        :key="selectedWeekday.id"
                    >
                        {{ selectedWeekday.key }}
                    </option>
                </select>

                <div class="text-sm font-medium text-gray-900 w-12">曜日の</div>
                <!-- セレクトボックス -->
                <select
                    id="time"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24 p-2.5"
                    v-model="timeKey"
                >
                    <option disabled selected value="">時間</option>
                    <option
                        v-for="selectedTime in limitTimesList"
                        :value="selectedTime.value"
                        :key="selectedTime.id"
                    >
                        {{ selectedTime.key }}
                    </option>
                </select>
            </div>

            <div class="flex items-center gap-x-3 justify-center flex-shrink-0">
                <div class="text-sm font-medium text-gray-900 w-32">
                    にSlackに送信する
                </div>
            </div>
            <div class="flex items-center gap-x-3 justify-center flex-shrink-0">
                <div class="button">
                    <app-button @click="registered">更新</app-button>
                </div>
            </div>
        </div>
        <!-- マスターデータ: リマインド時間の編集 -->

        <div class="mb-8 text-sm text-gray-500 mt-2">
            ＊この時間に、自動的にくじ引きのURLが添付された通知が指定されたSlackに届きます。
        </div>
        <!-- ボタン -->
        <div class="button">
            <app-button @click="sendToSlack">Slackにテスト送信</app-button>
        </div>
    </div>
</template>
<script lang="ts">
import { UserModel, TaskMasterObjectModel } from 'chillnn-cleanhack-abr'
import { Vue, Component, Prop } from 'nuxt-property-decorator'
// component
import TaskList from '~/components/Organisms/Task/modules/TaskList.vue'
import AppButton from '@/components/Atom/Button/AppButton.vue'
import AppTitle from '@/components/Atom/Text/AppTitle.vue'
import AppText from '@/components/Atom/Text/AppText.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import axios from 'axios'
const schedule = require('node-schedule')

@Component({
    components: {
        TaskList,
        AppButton,
        AppTitle,
        AppText,
    },
})
export default class SlackRemindTime extends Vue {
    @Prop({ required: true }) userModel!: UserModel
    @Prop({ required: true }) taskMasterObjectModel!: TaskMasterObjectModel
    public slackURL: string = ''
    public weekdayKey: string = ''
    public timeKey: string = ''

    public limitWeekdaysList: { key: string; value: number }[] = [
        { key: '日', value: 0 },
        { key: '月', value: 1 },
        { key: '火', value: 2 },
        { key: '水', value: 3 },
        { key: '木', value: 4 },
        { key: '金', value: 5 },
        { key: '土', value: 6 },
    ]
    public limitTimesList: { key: string; value: string }[] = [
        // テスト用↓
        { key: '13:13', value: '13 13' },
        { key: '09:00', value: '* 9' },
        { key: '09:30', value: '* 9' },
        { key: '10:00', value: '* 10' },
        { key: '10:30', value: '30 10' },
        { key: '11:00', value: '* 11' },
        { key: '11:30', value: '30 11' },
        { key: '12:00', value: '* 12' },
        { key: '12:30', value: '30 12' },
        { key: '13:00', value: '* 13' },
        { key: '13:30', value: '30 13' },
        { key: '14:00', value: '* 14' },
        { key: '14:30', value: '30 14' },
        { key: '15:00', value: '* 15' },
        { key: '15:30', value: '30 15' },
        { key: '16:00', value: '* 16' },
        { key: '16:30', value: '30 16' },
        { key: '17:00', value: '* 17' },
        { key: '17:15', value: '15 17' },
        { key: '17:30', value: '30 17' },
        { key: '18:00', value: '* 18' },
        { key: '18:30', value: '30 18' },
        { key: '19:00', value: '* 19' },
        { key: '19:30', value: '30 19' },
        { key: '20:00', value: '* 20' },
        { key: '20:30', value: '30 20' },
    ]

    @AsyncLoadingAndErrorHandle()
    public async registered() {
        this.taskMasterObjectModel.updateTaskMasterObj()
        const groupID = this.userModel.groupID
        if (groupID) {
            await this.userModel.fetchTaskMasterDataObjByGroupID(groupID)
            console.log('曜日', this.taskMasterObjectModel.remindSlackWeek)
        }
    }

    @AsyncLoadingAndErrorHandle()
    public async sendToSlack() {
        let params = new URLSearchParams()
        let message = { text: '13:13 指定のテストです' }
        let slackUrl =
            'https://hooks.slack.com/services/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'
        //times-hikari
        // let slackUrlTimesHikari =
        //     'https://hooks.slack.com/services/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'

        //アラート
        alert(`通知がスケジュールされました`)

        //時間指定 (分、時、日、月、曜日)
        const setTime = `${this.timeKey} * * ${this.weekdayKey}`
        console.log(this.timeKey, setTime)

        const sendAtSchedule = schedule.scheduleJob(setTime, () => {
            params.append('payload', JSON.stringify(message))
            const res = axios
                .post(slackUrl, params)
                .then((res: any) => {
                    console.log(res)
                })
                .catch((err: any) => {
                    console.log(err)
                })
        })
    }
}
</script>
<style lang="stylus" scoped>
.button {
  min-width: 200px;
  width: 200px
}
</style>
