<template>
    <div v-if="raffleObjectModel" class="user_edit_container h-full mb-2">
        <div>
            <!-- 時間設定と、ボタンのコンテナ -->
            <div class="flex mt-8 gap-x-3">
                <div
                    class="weekday flex text-center items-center gap-x-2 justify-center flex-shrink-0"
                >
                    <!-- 曜日 -->
                    <div
                        v-if="week"
                        class="text-sm font-medium text-gray-900 w-18"
                    >
                        {{ week }}曜日の
                    </div>
                    <!-- セレクトボックス -->
                    <select
                        id="time"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24 p-2.5"
                        v-model="raffleObjectModel.remindSlackTime"
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

                <div
                    class="flex items-center gap-x-3 justify-center flex-shrink-0"
                >
                    <div class="text-sm font-medium text-gray-900 w-32">
                        にくじを締め切る
                    </div>
                </div>
            </div>
        </div>

        <!-- マスターデータ: リマインド時間の編集 -->
    </div>
</template>
<script lang="ts">
import { RaffleObjectModel } from 'chillnn-cleanhack-abr'
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
export default class RaffleLimitTime extends Vue {
    @Prop({ required: true }) raffleObjectModel!: RaffleObjectModel
    public slackURL: string = ''
    public week: string = ''
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
        { key: '20:06', value: '06 20' },
        { key: '09:00', value: '00 9' },
        { key: '09:30', value: '00 9' },
        { key: '10:00', value: '00 10' },
        { key: '10:30', value: '30 10' },
        { key: '11:00', value: '00 11' },
        { key: '11:30', value: '30 11' },
        { key: '12:00', value: '00 12' },
        { key: '12:30', value: '30 12' },
        { key: '13:00', value: '00 13' },
        { key: '13:30', value: '30 13' },
        { key: '14:00', value: '00 14' },
        { key: '14:30', value: '30 14' },
        { key: '15:00', value: '00 15' },
        { key: '15:30', value: '30 15' },
        { key: '16:00', value: '00 16' },
        { key: '16:30', value: '30 16' },
        { key: '17:00', value: '00 17' },
        { key: '17:15', value: '15 17' },
        { key: '17:30', value: '30 17' },
        { key: '18:00', value: '00 18' },
        { key: '18:30', value: '30 18' },
        { key: '19:00', value: '00 19' },
        { key: '19:30', value: '30 19' },
        { key: '20:00', value: '00 20' },
        { key: '20:30', value: '30 20' },
    ]

    public created() {
        const weekValue = this.raffleObjectModel.remindSlackWeek
        switch (weekValue) {
            case '0':
                this.week = '日'
            case '1':
                this.week = '月'
            case '2':
                this.week = '火'
            case '3':
                this.week = '水'
            case '4':
                this.week = '木'
            case '5':
                this.week = '金'
            case '6':
                this.week = '土'
        }
    }

    @AsyncLoadingAndErrorHandle()
    public async sendToSlack() {
        let params = new URLSearchParams()
        let message = {
            text: `${this.raffleObjectModel.limitTime} * * ${this.raffleObjectModel.remindSlackWeek}時間にくじの参加が締め切られました。くじを実行してください🧼`,
        }
        let slackUrl =
            'https://hooks.slack.com/services/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'
        //times-hikari
        // let slackUrlTimesHikari =
        //     'https://hooks.slack.com/services/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'

        //時間指定 (分、時、日、月、曜日)
        const setTime = `${this.raffleObjectModel.limitTime} * * ${this.raffleObjectModel.remindSlackWeek}`
        console.log('時間指定→', setTime)

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
        //アラート
        alert(`通知がスケジュールされました`)
    }
}
</script>
<style lang="stylus" scoped>
.button {
  min-width: 200px;
  width: 200px
}
</style>
