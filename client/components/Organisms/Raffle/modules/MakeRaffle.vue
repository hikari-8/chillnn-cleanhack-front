<template>
    <div class="slack_rimind_edit_container h-full mb-8 mt-20">
        <!-- くじが作成できない場合 -->
        <!-- v-if=""は""の中身がtrueの時に表示される -->
        <!-- <div v-if="isLastRaffleActive || !isLastRaffleNull"> -->
        <div v-if="isLastRaffleActive">
            <div class="font-semibold text-2xl">くじの発行/削除 🌞</div>

            <div class="font-semibold mt-12 mb-10">現在進行中のくじ</div>
            <div>
                <!-- カード部分 -->
                <div
                    class="px-12 py-8 bg-white border border-gray-200 rounded-lg shadow-md"
                >
                    <div class="flex justify-between">
                        <!-- 文言 -->
                        <div>
                            <div
                                class="mb-2 text-lg font-semibold tracking-tight text-gray-900"
                            >
                                <!-- Activeマーク -->
                                <span
                                    class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full"
                                >
                                    <span
                                        class="w-2 h-2 mr-1 bg-green-500 rounded-full"
                                    ></span>
                                    Active
                                </span>
                                {{ week }}曜日{{ hh }} 時{{ mm }} 分<span
                                    class="text-sm font-medium ml-2"
                                    >締切り</span
                                >
                            </div>
                        </div>
                        <div>
                            <app-button
                                @click="runRaffle"
                                class="text-sm h-16 p-1"
                                >くじを実行する</app-button
                            >
                        </div>
                    </div>
                    <!-- 発行したくじの内容 -->
                    <div v-if="lastRaffleItem">
                        <div class="flex justify-between">
                            <div class="label font-semibold">
                                発行したくじの内容
                            </div>
                            <div class="mb-8 mt-8">
                                <span class="text-sm font-medium">
                                    現在の参加人数
                                </span>
                                <span
                                    class="text-pink-600 text-lg font-semibold"
                                >
                                    {{ lastRaffleItem.activeMembers.length }}
                                </span>
                                <span class="text-sm font-medium"> 人</span>
                            </div>
                        </div>

                        <div class="task_edit_container">
                            <!-- task edit -->
                            <effective-raffle-list
                                :raffleObjectModel="lastRaffleItem"
                                @registered="registered"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-between mt-14 mb-12">
                <div class="text-sm text-gray-500 py-2">
                    現在進行中のくじがあります。<br />新しいくじを実行したい場合は、現在進行中のくじを削除してください。
                </div>
                <app-button class="" @click="deleteRaffle">削除する</app-button>
            </div>
        </div>
        <div v-if="!lastRaffleItem || !isLastRaffleActive">
            <div class="flex justify-between">
                <div class="font-semibold text-2xl">くじの発行 🌞</div>
                <!-- ボタン -->
                <div class="flex justify-end items-center">
                    <app-button @click="createRaffle" class="text-sm h-16 p-1"
                        >くじを発行する</app-button
                    >
                </div>
            </div>

            <div
                class="mt-10 px-12 pt-4 pb-8 bg-white border border-gray-200 rounded-lg shadow-md"
            >
                <div class="flex mb-10">
                    <!-- 制限時間 -->
                    <raffle-limit-time :raffleObjectModel="raffleObjectModel" />
                </div>
                <div class="label font-semibold mb-10">発行するくじの内容</div>
                <div class="task_edit_container">
                    <!-- task edit -->
                    <raffle-list :raffleObjectModel="raffleObjectModel" />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {
    UserModel,
    RaffleObjectModel,
    TaskMasterObjectModel,
    GroupModel,
    RaffleStatus,
} from 'chillnn-cleanhack-abr'
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { userInteractor } from '~/api'
// component
import RaffleList from '@/components/Organisms/Raffle/modules/RaffleList.vue'
import EffectiveRaffleList from '@/components/Organisms/Raffle/modules/EffectiveRaffleList.vue'
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
        EffectiveRaffleList,
    },
})
export default class MakeRaffle extends Vue {
    @Prop({ required: true }) raffleObjectModel!: RaffleObjectModel
    @Prop({ required: true }) taskMasterObjectModel!: TaskMasterObjectModel
    @Prop({ required: true }) groupModel!: GroupModel
    public blancRaffleObj: RaffleObjectModel | null = null
    public raffles: RaffleObjectModel[] | null = null
    public myGroupURL: string = ''
    public ww: string = ''
    public hh: string = ''
    public mm: string = ''
    public week: string = ''
    public lastRaffleItem: RaffleObjectModel | null = null
    public blancRaffleItem: RaffleObjectModel | null = null
    public isLastRaffleActive: boolean = false
    public isLastRaffleNull: boolean = false
    public memberList: string[] = []
    public ramdumMemberList: string[] = []
    public ramdumMemberListCopy: string[] = []
    public taskList: string[] = []
    public resultMessage: string = ''
    public blackUserModel: UserModel | null = null
    public userNameArray: string = ''
    public headCountSum: number = 0
    public isEarlierThanLimitTime: boolean = false

    public async registered() {
        // console.log
        // await this.lastRaffleItem?.register()
        // this.headCountSumFunc()
        this.$emit('registered')
    }

    @AsyncLoadingAndErrorHandle()
    public async runRaffle() {
        this.headCountSumFunc()
        if (this.lastRaffleItem?.activeMembers.length !== this.headCountSum) {
            alert(
                '掃除場所に割り当てた合計人数とくじの参加人数を同じにしてください !'
            )
        } else {
            this.compareTime()
            if (this.isEarlierThanLimitTime) {
                const result = window.confirm(
                    '設定した締切り時間よりも早い時刻ですが、本当にくじを実行しますか？'
                )
                if (result) {
                    await this.doRaffle()
                    //slackに結果を送る
                    await this.sendToSlackResult()
                } else return
            } else {
                await this.doRaffle()
                //slackに結果を送る
                await this.sendToSlackResult()
            }
        }
    }

    // 時間比較を行うためのメソッドです
    public compareTime() {
        const now = new Date()
        // 現在の時間と分です
        const nowhh = now.getHours()
        const nowmm = now.getMinutes()
        if (nowhh == parseInt(this.hh)) {
            if (nowmm == parseInt(this.mm)) {
                this.isEarlierThanLimitTime = false
            } else if (nowmm < parseInt(this.mm)) {
                console.log(this.mm, nowmm)
                this.isEarlierThanLimitTime = true
            } else {
                this.isEarlierThanLimitTime = false
            }
        } else if (nowhh < parseInt(this.hh)) {
            console.log(this.hh, nowhh)
            this.isEarlierThanLimitTime = true
        } else {
            this.isEarlierThanLimitTime = false
        }
    }

    public headCountSumFunc() {
        this.headCountSum = 0
        for (const task of this.lastRaffleItem?.tasks!) {
            this.headCountSum += task.headCount
        }
        return this.headCountSum
    }

    //statusがeffective and fixed → doneまで
    public async doRaffle() {
        //memberの配列を作成
        for (const member of this.lastRaffleItem!.activeMembers) {
            const memberID = member.userID
            this.memberList.push(memberID)
        }
        //memberの配列をシャッフルする
        while (this.memberList.length > 0) {
            //ランダムな数字rumdumNumを求める
            const arrayLength = this.memberList.length
            const ramdumNum = Math.floor(Math.random() * arrayLength)
            //残っている数字から、ramdumNumの数字を削除、別の場所にその数字を書き出す
            this.ramdumMemberList.push(this.memberList[ramdumNum])
            this.memberList.splice(ramdumNum, 1)
        }
        console.log(this.ramdumMemberList)
        // taskの配列の中でthis.ramdumMemberListをheadCount分回しながら、idを持たせていく
        for (const task of this.lastRaffleItem!.tasks) {
            this.ramdumMemberListCopy = this.ramdumMemberList
            if (task.headCount > 0) {
                //最初のメンバーを取ってきて、追加したら配列から削除する
                const firstMember = this.ramdumMemberListCopy[0]
                //headCountの数だけ回す
                for (var i = 0; i < task.headCount; i++) {
                    task.joinUserIDArray?.push(firstMember)
                    // console.log(firstMember, 'ramdumMemberListの最初のメンバー')
                    this.ramdumMemberListCopy.shift()
                    // console.log(this.ramdumMemberListCopy, '削除後ListCopyです')
                }
            }
        }
        //statusを変更する
        this.lastRaffleItem!.raffleStatus = RaffleStatus.DONE
        //updateする
        await this.lastRaffleItem!.register()
        console.log(this.lastRaffleItem, '確認')
    }

    @AsyncLoadingAndErrorHandle()
    public async createRaffle() {
        //lastRaffleItemのstatusがDONEな場合、raffleを作成するのが初めてでない限り、追加できない
        if (!this.raffleObjectModel.tasks.length) {
            alert('掃除場所を一つ以上登録してください!')
        } else if (!this.raffleObjectModel.limitTime) {
            alert('制限時間を登録してください!')
        } else if (
            this.raffleObjectModel.remindSlackWeek === 'blanc' ||
            this.raffleObjectModel.remindSlackTime === 'blanc'
        ) {
            alert('くじの設定から、くじ引きリマインド時間を登録してください!')
        } else if (
            this.lastRaffleItem?.raffleStatus === RaffleStatus.DONE ||
            !this.lastRaffleItem
        ) {
            await this.raffleObjectModel.register()
            await this.sendRemindToSlack()
            await this.sendToSlackRemindRunRaffle()
            this.isLastRaffleNull = false
            this.isLastRaffleActive = true
        } else {
            alert('実行中のくじがあります。')
        }
    }

    @AsyncLoadingAndErrorHandle()
    public async deleteRaffle() {
        this.lastRaffleItem!.raffleStatus = RaffleStatus.DONE
        await this.lastRaffleItem!.register()
        this.isLastRaffleActive = false
    }

    @AsyncLoadingAndErrorHandle()
    public async sendRemindToSlack() {
        this.cronToLng()
        await this.sendToSlack()
    }

    @AsyncLoadingAndErrorHandle()
    public async created() {
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
        //テスト/lastraffleをfetchして、statusを調べる
        this.lastRaffleItem =
            await this.raffleObjectModel.fetchLastRaffleItemByGroupID()
        if (!this.lastRaffleItem) {
            this.isLastRaffleNull = true
        } else if (this.lastRaffleItem?.raffleStatus !== RaffleStatus.DONE) {
            this.isLastRaffleActive = true
            const timeValue = this.lastRaffleItem.limitTime
            //○○時0分の時→4桁
            if (timeValue.length == 4) {
                this.hh = timeValue.substr(2, 4)
                this.mm = timeValue.substr(0, 1)
                if (this.mm == '0') {
                    this.mm = ' 00' //見やすくするため空白開ける
                }
            } else {
                this.hh = timeValue.substr(3, 5)
                this.mm = timeValue.substr(0, 2)
                if (this.mm == '0') {
                    this.mm = '00'
                }
            }
        }
        console.log(
            this.isLastRaffleActive,
            'isLastRaffleActive',
            this.isLastRaffleNull,
            'isLastRaffleNull'
        )
        // userを取得するために自分のuserModelをfetchしてきます
        this.blackUserModel = await userInteractor.fetchMyUserModel()
    }

    public getMyGroupURL() {
        const myGroupID = this.raffleObjectModel.groupID
        // this.myGroupURL = `https://localhost:3000/group/${myGroupID}`
        this.myGroupURL = `https://dev-front.chillnn-training.chillnn-cleanhack.link/group/${myGroupID}`
        console.log(this.myGroupURL)
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
        //○○時0分の時→4桁
        if (timeValue.length == 4) {
            this.hh = timeValue.substr(2, 4)
            this.mm = timeValue.substr(0, 1)
            if (this.mm == '0') {
                this.mm = ' 00' //見やすくするため空白開ける
            }
        } else {
            this.hh = timeValue.substr(3, 5)
            this.mm = timeValue.substr(0, 2)
            if (this.mm == '0') {
                this.mm = '00'
            }
        }
    }

    @AsyncLoadingAndErrorHandle()
    public async makeMessage() {
        if (this.lastRaffleItem) {
            for (const task of this.lastRaffleItem!.tasks) {
                if (task.headCount > 0) {
                    //taskName: userIDからfetchした名前
                    for (const userID of task.joinUserIDArray) {
                        console.log(userID, 'userID')
                        const userModel =
                            await this.blackUserModel!.fetchUserDataByUserID(
                                userID
                            )
                        const plusHonolific = userModel!.name + 'さん,　'
                        this.userNameArray += plusHonolific
                    }

                    this.resultMessage +=
                        task.taskName + ' : ' + this.userNameArray + '\n'
                }
                this.userNameArray = ''
            }
            console.log(this.resultMessage, 'resultMessageです')
        }
    }

    //結果を送信
    @AsyncLoadingAndErrorHandle()
    public async sendToSlackResult() {
        let params = new URLSearchParams()
        await this.makeMessage()
        let message = {
            text: `本日のお掃除場所担当が決定しました！🎉\n参加できる方は各自、清掃をよろしくお願いします！🛀 🧼 \n\n${this.resultMessage}`,
        }
        let slackUrl =
            'https://hooks.slack.com/services/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'
        //times-hikari
        // let slackUrlTimesHikari =
        //     'https://hooks.slack.com/services/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'

        params.append('payload', JSON.stringify(message))
        const res = axios
            .post(slackUrl, params)
            .then((res: any) => {
                console.log(res)
            })
            .catch((err: any) => {
                console.log(err)
            })
    }

    //制限時間になったら、管理者にリマインドを送信
    @AsyncLoadingAndErrorHandle()
    public async sendToSlackRemindRunRaffle() {
        let params = new URLSearchParams()
        let message = {
            text: `${this.hh} 時${this.mm} 分になりました！\n管理者の方は下記のリンク、またはアプリから掃除場所の人数を調整し、くじを実行してください！\n${this.myGroupURL}`,
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
        alert(`管理者へのリマインドがスケジュールされました`)
    }

    //リマインドを全員に送信
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
        alert(`全員へのリマインドがスケジュールされました`)
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
