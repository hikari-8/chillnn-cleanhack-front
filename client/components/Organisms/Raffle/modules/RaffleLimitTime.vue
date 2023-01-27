<template>
    <div v-if="raffleObjectModel" class="user_edit_container h-full mb-2">
        <div>
            <!-- 時間設定と、ボタンのコンテナ -->
            <div class="flex mt-8 gap-x-3">
                <!-- セレクトボックス -->
                <div
                    class="inline-flex p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-3"
                >
                    <select
                        name=""
                        id=""
                        class="px-2 outline-none appearance-none bg-transparent"
                        v-model="raffleObjectModel.limitHour"
                    >
                        <option disabled selected value="">時</option>
                        <option
                            v-for="selectedHour in hoursList"
                            :value="selectedHour.value"
                            :key="selectedHour.id"
                        >
                            {{ selectedHour.key }}
                        </option>
                    </select>
                    <span class="">:</span>
                    <select
                        name=""
                        id=""
                        class="px-2 outline-none appearance-none bg-transparent"
                        v-model="raffleObjectModel.limitMin"
                    >
                        <option disabled selected value="">分</option>
                        <option
                            v-for="selectedMin in minList"
                            :value="selectedMin.value"
                            :key="selectedMin.id"
                        >
                            {{ selectedMin.key }}
                        </option>
                    </select>
                </div>

                <div
                    class="flex items-center gap-x-3 justify-center flex-shrink-0"
                >
                    <div class="text-sm font-medium text-gray-900 w-48">
                        分にくじの参加を締め切る
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

    public hoursList: { key: string; value: number }[] = [
        { key: '00', value: 0 },
        { key: '01', value: 1 },
        { key: '02', value: 2 },
        { key: '03', value: 3 },
        { key: '04', value: 4 },
        { key: '05', value: 5 },
        { key: '06', value: 6 },
        { key: '07', value: 7 },
        { key: '08', value: 8 },
        { key: '09', value: 9 },
        { key: '10', value: 10 },
        { key: '11', value: 11 },
        { key: '12', value: 12 },
        { key: '13', value: 13 },
        { key: '14', value: 14 },
        { key: '15', value: 15 },
        { key: '16', value: 16 },
        { key: '17', value: 17 },
        { key: '18', value: 18 },
        { key: '19', value: 19 },
        { key: '20', value: 20 },
        { key: '21', value: 21 },
        { key: '22', value: 22 },
        { key: '23', value: 23 },
    ]
    public minList: {
        key: string
        value: number
    }[] = [
        // テスト用↓
        { key: '00', value: 0 },
        { key: '05', value: 5 },
        { key: '10', value: 10 },
        { key: '15', value: 15 },
        { key: '20', value: 20 },
        { key: '25', value: 25 },
        { key: '30', value: 30 },
        { key: '35', value: 35 },
        { key: '40', value: 40 },
        { key: '45', value: 45 },
        { key: '50', value: 50 },
        { key: '55', value: 55 },
    ]
    public created() {
        this.slackURL = this.raffleObjectModel.channelID
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

    @AsyncLoadingAndErrorHandle()
    public async sendToSlack() {
        let params = new URLSearchParams()
        let message = {
            text: `${this.ww}曜日は終業後お掃除があります！🧼 🧹\n参加できる方は、${this.hh} 時 ${this.mm} 分までに下記のリンクからくじに参加してください！\n${this.myGroupURL}`,
        }
    }
}
</script>
<style lang="stylus" scoped>
.button {
  min-width: 200px;
  width: 200px
}
</style>
