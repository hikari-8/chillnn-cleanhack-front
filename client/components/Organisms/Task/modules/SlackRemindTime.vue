<template>
    <div v-if="taskMasterObjectModel" class="user_edit_container h-full mb-8">
        <!-- 時間設定と、ボタンのコンテナ -->
        <div class="flex mt-8 gap-x-3 justify-between">
            <div
                class="app_select_weekday flex text-center items-center gap-x-2"
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
                    v-model="taskMasterObjectModel.remindSlackTime"
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
                <div
                    class="flex items-center gap-x-3 justify-center flex-shrink-0"
                >
                    <div class="text-sm font-medium text-gray-900 w-32">
                        にSlackに送信する
                    </div>
                </div>
            </div>

            <div class="flex flex-end items-center gap-x-3 flex-shrink-0">
                <div class="button">
                    <app-button @click="registered">更新</app-button>
                </div>
            </div>
        </div>
        <div class="text-sm font-medium text-gray-900 mt-4 mb-2">
            <span>SlackのWEBhookURL</span>
        </div>
        <app-base-input
            v-model="taskMasterObjectModel.slackURL"
            class="input_taskname w-82"
        ></app-base-input>
        <!-- マスターデータ: リマインド時間の編集 -->

        <div class="mb-8 text-sm text-gray-500 mt-2">
            ＊くじを発行すると、この時間に自動的にくじ引きのURLが添付された通知が<br />　指定されたSlackに届きます。<br />
            　再度リマインド日時を変更すると、最後に登録された日時でリマインドされます。
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

    public limitWeekdaysList: { key: string; value: string }[] = [
        { key: '日', value: '0' },
        { key: '月', value: '1' },
        { key: '火', value: '2' },
        { key: '水', value: '3' },
        { key: '木', value: '4' },
        { key: '金', value: '5' },
        { key: '土', value: '6' },
    ]
    public limitTimesList: { key: string; value: string }[] = [
        // テスト用↓
        { key: '08:50', value: '50 8' },
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

    public cronToLng() {
        //cronで保存されている値を、日本語に直してslackに送ります。
        const weekValue = this.taskMasterObjectModel.remindSlackWeek
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
        const timeValue = this.taskMasterObjectModel.remindSlackTime
        this.hh = timeValue.substr(3, 5)
        this.mm = timeValue.substr(0, 2)
    }

    @AsyncLoadingAndErrorHandle()
    public async registered() {
        await this.taskMasterObjectModel.updateTaskMasterObj()
        const groupID = this.userModel.groupID
        if (groupID) {
            await this.userModel.fetchTaskMasterDataObjByGroupID(groupID)
        }
        this.cronToLng()
        //ここでは、slackのリマインド時間を設定するだけ
    }
}
</script>
<style lang="stylus" scoped></style>
