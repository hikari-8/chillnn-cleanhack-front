<template>
    <!-- 一旦、user/index.vueで作って、cognito周りができたら_userIDにつなげる -->
    <div class="user_detail_container">
        <div>userホーム画面</div>
        <div v-if="userModel" class="mx-auto py-32 auth_container w-600px">
            <div class="alluser_area mb-10">
                <user-edit
                    :user-model="userModel"
                    label="ユーザー名"
                    :description="true"
                    class="mb-4"
                />
                <div class="button_container">
                    <!-- 後で：ボタンの表記,
                    登録と更新の使い分け -->
                    <app-button @click="registerName">更新</app-button>
                </div>
            </div>
            <!-- <div><div>テスト</div>
            <div>{{this.}}</div></div>
            </div> -->

            <div class="open_grop_model">
                <div v-show="isMyPage" class="button_container">
                    <div class="button" @click="openModal">＋</div>
                </div>
                <app-modal v-model="isShowModal">
                    <edit-group
                        v-if="blancGroup"
                        :group-model="blancGroup"
                        @registered="registered"
                    />
                </app-modal>
            </div>

            <div class="admin_area mb-10">
                <!-- これ以降は管理者のみ表示 -->

                <div class="font-semibold">くじ引きリマインド時間設定</div>
                <!-- 時間設定 -->
                <div
                    class="app_select_weekday flex gap-x-3 mt-4 items-center justify-center"
                >
                    <div class="text-sm font-medium text-gray-900">毎週</div>
                    <!-- セレクトボックス -->
                    <select
                        id="week"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        v-model="weekdayKey"
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
                    <div class="text-sm font-medium text-gray-900">曜日</div>
                    <!-- セレクトボックス -->
                    <select
                        id="time"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
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

                <div class="mb-8 text-sm text-gray-500">
                    ＊この時間に、自動的にくじ引きのURLが添付された通知が指定されたSlackに届きます。
                </div>
                <app-button @click="sendToSlack"
                    >Slackに送信(テスト)</app-button
                >
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import AppTitle from '@/components/Atom/Text/AppTitle.vue'
import AppInput from '@/components/Atom/AppInput.vue'
import AppSelectWeekday from '@/components/Atom/AppSelectWeekday.vue'
import AppButton from '@/components/Atom/AppButton.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import axios from 'axios'
import { UserModel, GroupModel } from 'chillnn-cleanhack-abr'
const schedule = require('node-schedule')
import { userInteractor } from '~/api'
import UserEdit from '@/components/Organisms/User/Edit/modules/UserEdit.vue'
import AppModal from '@/components/Organisms/Common/AppModal/index.vue'
// @ts-ignore --pagesの配下からGUIで引っ張ってきたので、tsがパスに対してwarnを出している
import EditGroup from '@/components/Organisms/Group/index.vue'
import { groupMastRepository } from '~/api/modules/GraphqlGroupMastRepository'
// component
@Component({
    components: {
        AppTitle,
        AppInput,
        AppSelectWeekday,
        AppButton,
        UserEdit,
        AppModal,
        EditGroup,
    },
})
export default class UserPage extends Vue {
    public userModel: UserModel | null = null
    public myUserModel: UserModel | null = null
    public blancGroup: GroupModel | null = null
    public isShowModal: boolean = false
    public message: Object = {}
    public slackURL: string = ''
    public params: Object = {}
    public pattern: any = null
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
        { key: '14:09', value: '09 14' },
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

    public get isMyPage() {
        return (
            this.myUserModel &&
            this.myUserModel.userID === this.$route.params.userID
        )
    }

    public async created() {
        const userID = this.$route.params.userID
        this.myUserModel = await userInteractor.fetchMyUserModel()
        this.userModel = await userInteractor.fetchUserModelByUserID(userID)
        console.log(this.userModel)
    }

    @AsyncLoadingAndErrorHandle()
    public async registerName() {
        if (this.userModel!.name) {
            await this.userModel!.register()
            this.$emit('registerd')
            console.log(this.userModel)
        } else return alert('ユーザー名を登録してください。')
    }

    public openModal() {
        if (this.userModel) {
            this.blancGroup = this.userModel.createGroupModel()
            this.isShowModal = true
        }
    }

    @AsyncLoadingAndErrorHandle()
    public async registered() {
        this.isShowModal = false
    }

    @AsyncLoadingAndErrorHandle()
    public async sendToSlack() {
        let params = new URLSearchParams()
        let message = { text: '14:09 指定のテストです' }
        let slackUrl =
            'https://hooks.slack.com/services/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'
        //times-hikati
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
.auth_container {
    width: 600px;
}
</style>
