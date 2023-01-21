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
                        v-if="isWeekBlank"
                        class="text-sm font-medium text-gray-900 w-18"
                    >
                        {{ week }}曜日の
                    </div>
                    <!-- セレクトボックス -->
                    <select
                        id="time"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24 p-2.5"
                        v-model="raffleObjectModel.limitTime"
                    >
                        <option
                            disabled
                            selected
                            class="text-gray-600"
                            value=""
                        >
                            時間
                        </option>
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
                    <div class="text-sm font-medium text-gray-900 w-48">
                        にくじの参加を締め切る
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
    public week: string = ''
    public myGroupURL: string = ''
    public ww: string = ''
    public hh: string = ''
    public mm: string = ''
    public slackURL: string = ''
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
        { key: '23:45', value: '45 23' },
        { key: '10:00', value: '0 10' },
        { key: '10:30', value: '30 10' },
        { key: '11:00', value: '0 11' },
        { key: '11:30', value: '30 11' },
        { key: '12:00', value: '0 12' },
        { key: '12:30', value: '30 12' },
        { key: '13:00', value: '0 13' },
        { key: '13:30', value: '30 13' },
        { key: '14:00', value: '0 14' },
        { key: '14:30', value: '30 14' },
        { key: '15:00', value: '0 15' },
        { key: '15:30', value: '30 15' },
        { key: '16:00', value: '0 16' },
        { key: '16:30', value: '30 16' },
        { key: '17:00', value: '0 17' },
        { key: '17:15', value: '15 17' },
        { key: '17:30', value: '30 17' },
        { key: '18:00', value: '0 18' },
        { key: '18:30', value: '30 18' },
        { key: '19:00', value: '0 19' },
        { key: '19:30', value: '30 19' },
        { key: '20:00', value: '0 20' },
        { key: '20:30', value: '30 20' },
    ]

    public created() {
        this.slackURL = this.raffleObjectModel.slackURL
        const weekValue = this.raffleObjectModel.remindSlackWeek
        switch (weekValue) {
            case '0':
                this.week = '日'
                break
            case '1':
                this.week = '月'
                break
            case '2':
                this.week = '火'
                break
            case '3':
                this.week = '水'
                break
            case '4':
                this.week = '木'
                break
            case '5':
                this.week = '金'
                break
            case '6':
                this.week = '土'
                break
            case '':
                this.week = ''
                break
        }
        this.getMyGroupURL()
    }

    public get isWeekBlank() {
        if (this.week == '') {
            return false
        } else {
            return true
        }
    }
    public getMyGroupURL() {
        const myGroupID = this.raffleObjectModel.groupID
        // this.myGroupURL = `https://localhost:3000/group/${myGroupID}`
        this.myGroupURL = `https://dev-front.chillnn-training.chillnn-cleanhack.link/group/${myGroupID}`
    }

    public cronToLng() {
        //cronで保存されている値を、日本語に直してslackに送ります。
        const weekValue = this.raffleObjectModel.remindSlackWeek
        switch (weekValue) {
            case '0':
                this.ww = '日'
                break
            case '1':
                this.ww = '月'
                break
            case '2':
                this.ww = '火'
                break
            case '3':
                this.ww = '水'
                break
            case '4':
                this.ww = '木'
                break
            case '5':
                this.ww = '金'
                break
            case '6':
                this.ww = '土'
                break
            case '':
                this.ww = ''
                break
        }
        //後で、ここをlimittimeに変更する
        const timeValue = this.raffleObjectModel.limitTime
        this.hh = timeValue.substr(3, 5)
        this.mm = timeValue.substr(0, 2)
    }

    @AsyncLoadingAndErrorHandle()
    public async sendToSlack() {
        let params = new URLSearchParams()
        let message = {
            text: `${this.ww}曜日は終業後お掃除があります！🧼 🧹\n参加できる方は、${this.hh} 時 ${this.mm} 分までに下記のリンクからくじに参加してください！\n${this.myGroupURL}`,
        }

        //時間指定 (分、時、日、月、曜日)
        const setTime = `${this.raffleObjectModel.limitTime} * * ${this.raffleObjectModel.remindSlackWeek}`
        console.log('時間指定→', setTime)

        const sendAtSchedule = schedule.scheduleJob(setTime, () => {
            params.append('payload', JSON.stringify(message))
            const res = axios
                .post(this.slackURL, params)
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
