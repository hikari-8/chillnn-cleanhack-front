<template>
    <div v-if="taskMasterObjectModel" class="user_edit_container h-full mb-8">
        <!-- 時間設定と、ボタンのコンテナ -->
        <div class="flex mt-8 gap-x-3 justify-between">
            <div
                class="app_select_weekday flex text-center items-center gap-x-2"
            >
                <!-- 週の予定 -->
                <!-- <div class="text-sm font-medium text-gray-900 w-10">毎週</div> -->
                <div class="text-sm font-medium text-gray-900 w-10">本日</div>
                <!-- セレクトボックス -->
                <div
                    class="inline-flex p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-3"
                >
                    <select
                        name=""
                        id=""
                        class="px-2 outline-none appearance-none bg-transparent"
                        v-model="taskMasterObjectModel.remindSlackHour"
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
                        v-model="taskMasterObjectModel.remindSlackMin"
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
                    <div class="text-sm font-medium text-gray-900">
                        分にくじの参加URLをSlackに通知する
                    </div>
                </div>
            </div>

            <div class="flex flex-end items-center gap-x-3 flex-shrink-0">
                <div class="button">
                    <app-button @click="registered">更新</app-button>
                </div>
            </div>
        </div>
        <div
            class="flex text-sm font-medium text-gray-900 mt-4 mb-2 text-center items-center"
        >
            <span>SlackのチャンネルID</span>
            <app-base-input
                v-model="taskMasterObjectModel.channelID"
                class="input_taskname w-60 ml-3"
            ></app-base-input>
        </div>

        <!-- マスターデータ: リマインド時間の編集 -->

        <div class="mb-8 text-sm text-gray-500 mt-8">
            ＊くじを発行すると、この時間に自動的にくじ引きのURLが添付された通知が<br />　指定されたSlackチャンネルに届きます。<br />
            <div class="mt-2">
                ＊メンバーは添付されたURLをクリックすることで、くじに参加できます。<br />
                　👉 slackのチャンネルIDの取得方法は<a
                    href="https://zenn.dev/dashi296/articles/4324507780a3cf"
                    target="_blank"
                    class="border-b-2 hover:text-blue-500 text-bold"
                    >こちら</a
                >
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {
    UserModel,
    TaskMasterObjectModel,
    GroupModel,
} from 'chillnn-cleanhack-abr'
import { Vue, Component, Prop } from 'nuxt-property-decorator'
// component
import TaskList from '~/components/Organisms/Task/modules/TaskList.vue'
import AppButton from '@/components/Atom/Button/AppButton.vue'
import AppTitle from '@/components/Atom/Text/AppTitle.vue'
import AppText from '@/components/Atom/Text/AppText.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import AppBaseInput from '@/components/Atom/Input/AppBaseInput.vue'

@Component({
    components: {
        TaskList,
        AppButton,
        AppTitle,
        AppText,
        AppBaseInput,
    },
})
export default class SlackRemindTime extends Vue {
    @Prop({ required: true }) userModel!: UserModel
    @Prop({ required: true }) taskMasterObjectModel!: TaskMasterObjectModel
    @Prop({ required: true }) groupModel!: GroupModel
    public week: string = ''
    public hh: string = ''
    public mm: string = ''
    public remindGroupTime: number = 0

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

    public unixToLng() {
        //制限時間をstringに直して、0を00に変換する (文章用)
        this.hh = String(this.taskMasterObjectModel.limitHour)
        if (this.hh == '0') {
            this.hh = '00'
        }

        this.mm = String(this.taskMasterObjectModel.limitMin)
        if (this.mm == '0') {
            this.mm = '00'
        }
    }

    public timeToUnix() {
        //通知する時刻をUNIXに変換する
        // 現在の時間
        const now = new Date()
        // UNIXタイムスタンプを所得する(ミリ秒単位)
        const nowUNIXMM = now.getTime()
        //タイムスタンプを取得
        const nowUNIX = Math.floor(nowUNIXMM / 1000)

        // 時間を設定
        const specificYear = now.getFullYear()
        const specificMonth = now.getMonth() //表示させる時は、＋1する必要がある
        const specificDate = now.getDate()
        const groupRemindHour = this.taskMasterObjectModel.remindSlackHour
        const groupRemindMin = this.taskMasterObjectModel.remindSlackMin

        //UNIXを作成: groupへのリマインド通知 remindGroupTime
        let remindGroupDate = new Date(
            specificYear,
            specificMonth,
            specificDate,
            groupRemindHour,
            groupRemindMin
        )
        let remindGroupMM = remindGroupDate.getTime()
        this.remindGroupTime = Math.floor(remindGroupMM / 1000)
    }

    @AsyncLoadingAndErrorHandle()
    public async registered() {
        this.timeToUnix()
        this.taskMasterObjectModel.remindTimeUnix = this.remindGroupTime
        await this.taskMasterObjectModel.updateTaskMasterObj()
        const groupID = this.userModel.groupID
        if (groupID) {
            await this.userModel.fetchTaskMasterDataObjByGroupID(groupID)
        }
        this.unixToLng()
        //ここでは、slackのリマインド時間を設定するだけ
    }
}
</script>
<style lang="stylus" scoped></style>
