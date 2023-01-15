<template>
    <div class="mx-auto pb-32 auth_container w-600px" v-if="raffleObjectModel">
        <div class="mb-20">くじにJoinするbodyです</div>
        <div>参加者へ時間指定で招待を送る</div>
        <app-button @click="makeRaffle"
            >Slackにメッセージを送る(テスト)</app-button
        >
    </div>
</template>
<script lang="ts">
import {
    RaffleObjectModel,
    TaskMasterObjectModel,
    GroupModel,
} from 'chillnn-cleanhack-abr'
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import axios from 'axios'
const schedule = require('node-schedule')

// component
import AppButton from '@/components/Atom/Button/AppButton.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'

@Component({
    components: {
        AppButton,
    },
})
export default class JoinRaffle extends Vue {
    @Prop({ required: true }) taskMasterObjectModel!: TaskMasterObjectModel
    @Prop({ required: true }) raffleObjectModel!: RaffleObjectModel
    @Prop({ required: true }) groupModel!: GroupModel
    public raffles: RaffleObjectModel[] | null = null
    public myGroupURL: string = ''
    public week: string = ''
    public hh: string = ''
    public mm: string = ''
    // public raffleObjectModel: RaffleObjectModel | null = null

    async created() {
        this.getMyGroupURL()
        console.log('mygroupURL: ', this.myGroupURL)
    }

    public getMyGroupURL() {
        const myGroupID = this.groupModel.groupID
        // this.myGroupURL = `https://localhost:3000/group/${myGroupID}`
        this.myGroupURL = `https://dev-front.chillnn-training.chillnn-cleanhack.link/group/${myGroupID}`
    }

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
        //後で、ここをlimittimeに変更する
        const timeValue = this.raffleObjectModel.limitTime
        this.hh = timeValue.substr(3, 5)
        this.mm = timeValue.substr(0, 2)
    }

    @AsyncLoadingAndErrorHandle()
    public async makeRaffle() {
        if (!this.raffleObjectModel.limitTime) {
            alert('制限時間を設定してください')
        }
        {
            this.cronToLng()
            this.sendToSlack()
        }
    }

    @AsyncLoadingAndErrorHandle()
    public async sendToSlack() {
        let params = new URLSearchParams()
        let message = {
            text: `${this.week}曜日は終業後お掃除があります！🧼 🧹\n参加できる方は、${this.hh} 時${this.mm} 分までに下記のリンクからくじに参加してください！\n${this.myGroupURL}`,
        }
        let slackUrl =
            'https://hooks.slack.com/services/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'
        //times-hikari
        // let slackUrlTimesHikari =
        //     'https://hooks.slack.com/services/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'

        //時間指定 (分、時、日、月、曜日)
        const setTime = `${this.taskMasterObjectModel.remindSlackTime} * * ${this.taskMasterObjectModel.remindSlackWeek}`
        console.log('時間指定→', setTime)
        const sendScheduleAndMessage = schedule.scheduleJob(setTime, () => {
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
        alert(`Slackに招待が通知されました`)
    }

    // public async test() {
    //     //一回のみ有効↓、２回目になるとエラーが出る
    //     this.raffles = await this.raffleObjectModel.fetchRafflesByGroupID()
    //     // console.log('raffles:', this.raffles)
    //     const array = JSON.stringify(this.raffles)
    //     // console.log('rafflesをJSONに変換:', array)
    //     const jsonArray = JSON.parse(array)
    //     // console.log('rafflesをJSONに変換:', jsonArray)
    //     // console.log('rafflesの一番最後:', jsonArray.slice(-1)[0])
    //     const lastRaffle = jsonArray.slice(-1)[0]
    //     const lastItemStatus = lastRaffle.mast.raffleStatus
    //     console.log('status:', lastItemStatus)
    // }
}
</script>
<style lang="stylus" scoped></style>
