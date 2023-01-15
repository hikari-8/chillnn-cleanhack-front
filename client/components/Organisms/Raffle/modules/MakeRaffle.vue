<template>
    <div class="slack_rimind_edit_container h-full mb-8 mt-20">
        <!-- マスターデータ: くじの編集 -->
        <div class="flex justify-between">
            <div class="font-semibold text-2xl">くじの発行 🌞</div>
            <!-- ボタン -->
            <div class="flex justify-end items-center">
                <app-button @click="createRaffle" class="text-sm h-16 p-1"
                    >くじを発行する</app-button
                >
                <!-- テストボタン -->
                <app-button>
                    <nuxt-link
                        :to="{
                            path: '/group/:groupID',
                            params: { groupID: groupModel.groupID },
                        }"
                        tag="div"
                        class="link"
                        :groupModel="groupModel"
                    >
                        URLを取得する(テスト)
                    </nuxt-link>
                </app-button>
            </div>
        </div>

        <div class="flex mb-2">
            <!-- 制限時間 -->
            <raffle-limit-time :raffleObjectModel="raffleObjectModel" />
        </div>

        <div class="mt-2 mb-12 text-sm text-gray-500">
            <!-- ＊この時間になると、くじの参加を締切ります。<br /> -->
            <!-- 　これ以降に、参加者の合計人数と掃除場所に割り当てた人数の合計が<br />　等しくなるように調整して、くじを実行してください。 -->
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
    RaffleStatus,
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
    public raffles: RaffleObjectModel[] | null = null
    public isLastRaffleDone: boolean = false
    public myGroupURL: string = ''
    public ww: string = ''
    public hh: string = ''
    public mm: string = ''
    public week: string = ''

    @AsyncLoadingAndErrorHandle()
    public async getLastRaffleStatus() {
        this.raffles = await this.raffleObjectModel.fetchRafflesByGroupID()
        //最後のraffleのstatusがDONEじゃないなら追加できない
        // console.log('raffles:', this.raffles)
        const array = JSON.stringify(this.raffles)
        // console.log('rafflesをJSONに変換:', array)
        const jsonArray = JSON.parse(array)
        // console.log('rafflesをJSONに変換:', jsonArray)
        // console.log('rafflesの一番最後:', jsonArray.slice(-1)[0])
        const lastRaffle = jsonArray.slice(-1)[0]
        const lastItemStatus = lastRaffle.mast.raffleStatus
        console.log('status:', lastItemStatus)
        if (lastItemStatus !== RaffleStatus.DONE) {
            this.isLastRaffleDone = false
        }
    }

    @AsyncLoadingAndErrorHandle()
    public async createRaffle() {
        await this.raffleObjectModel.register()
        await this.sendRemindToSlack()
        //後で、limitTime設定してなかったら追加させないロジック追加
        // await this.getLastRaffleStatus()
        // if (this.isLastRaffleDone) {
        //     //たまにupdateされちゃう時あるから注意
        //     await this.raffleObjectModel.register()
        //     this.$emit('registered')
        //     //slackに通知を送る
        //     await this.sendRemindToSlack()
        // } else {
        //     alert('現在進行中のくじがあります。')
        // }
    }

    @AsyncLoadingAndErrorHandle()
    public async sendRemindToSlack() {
        this.cronToLng()
        await this.sendToSlack()
    }

    public created() {
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
        console.log('mygroupURL: ', this.myGroupURL)
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
        const timeValue = this.raffleObjectModel.limitTime
        this.hh = timeValue.substr(3, 5)
        this.mm = timeValue.substr(0, 2)
        if (this.mm == '0') {
            this.mm = '00'
        }
    }

    @AsyncLoadingAndErrorHandle()
    public async sendToSlack() {
        let params = new URLSearchParams()
        let message = {
            text: `${this.ww}曜日は終業後お掃除があります！🧼 🧹\n参加できる方は、${this.hh} 時${this.mm} 分までに下記のリンクからくじに参加してください！\n${this.myGroupURL}`,
        }
        let slackUrl =
            'https://hooks.slack.com/services/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'
        //times-hikari
        // let slackUrlTimesHikari =
        //     'https://hooks.slack.com/services/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'

        //時間指定 (分、時、日、月、曜日)
        const setTime = `${this.raffleObjectModel.remindSlackTime} * * ${this.raffleObjectModel.remindSlackWeek}`
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
.user_edit_container {
    .button_container {
        padding-top: 10px;
        display: flex;
        justify-content: center;
    }
}
</style>
