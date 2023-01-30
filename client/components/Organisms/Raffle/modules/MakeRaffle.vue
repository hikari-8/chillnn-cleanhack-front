<template>
    <div class="slack_rimind_edit_container h-full mb-8 mt-20">
        <!-- くじが作成できない場合 -->
        <div v-if="isLastRaffleActive">
            <div class="font-semibold text-2xl">くじの実行 🎯</div>

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
                                本日{{ hh }} 時{{ mm }} 分<span
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
                        <div
                            v-if="lastRaffleItem.tasks"
                            class="flex justify-between"
                        >
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
            <div class="font-semibold text-2xl mt-14">くじの削除 ❌</div>
            <div
                class="flex mt-6 mb-12 pl-5 pr-4 py-4 bg-white border border-gray-200 rounded-lg shadow-md justify-between"
            >
                <div class="text-sm text-gray-500 py-2">
                    現在進行中のくじがあります。<br />新しいくじを作成したい場合は、現在進行中のくじを削除してください。
                </div>
                <div class="py-2">
                    <app-button class="h-12 px-2" @click="deleteRaffle"
                        >削除</app-button
                    >
                </div>
            </div>
        </div>
        <div v-if="isLastRaffleNull || !isLastRaffleActive">
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
    RaffleMast,
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
    public hh: string = ''
    public mm: string = ''
    public lastRaffleItem: RaffleObjectModel | null = null
    public isLastRaffleActive: boolean = false
    public isLastRaffleNull: boolean = false
    public memberList: string[] = []
    public ramdumMemberList: string[] = []
    public ramdumMemberListCopy: string[] = []
    public taskList: string[] = []
    public resultMessage: string = ''
    public blancUserModel: UserModel | null = null
    public userNameArray: string = ''
    public headCountSum: number = 0
    public isEarlierThanLimitTime: boolean = false
    public deleteUserArray: string[] = []
    public optionAvailableUsers: string[] = []
    public ramdomOptionUserList: string[] = []
    public noOptionRaffleArray: RaffleMast[] = []
    public updateLastRaffleItem: RaffleObjectModel | null = null
    public remindAdminTime: number = 0
    public message: string = ''
    public setUserModel: UserModel | null = null

    //created
    @AsyncLoadingAndErrorHandle()
    public async created() {
        //テスト/lastraffleをfetchして、statusを調べる
        this.lastRaffleItem =
            await this.raffleObjectModel.fetchLastRaffleItemByGroupID()

        if (!this.lastRaffleItem) {
            this.isLastRaffleNull = true
        } else if (this.lastRaffleItem?.raffleStatus !== RaffleStatus.DONE) {
            this.isLastRaffleActive = true
            this.isLastRaffleNull = false
            this.getSelectedTime(this.lastRaffleItem)
        }
        // userを取得するために自分のuserModelをfetchしてきます
        this.blancUserModel = await userInteractor.fetchMyUserModel()
        this.getTime()
    }

    // プロパティの更新用
    public async registered() {
        this.$emit('registered')
    }

    // くじを作成する
    @AsyncLoadingAndErrorHandle()
    public async createRaffle() {
        //lastRaffleItemのstatusがDONEな場合、raffleを作成するのが初めてでない限り、追加できない
        if (!this.raffleObjectModel.tasks.length) {
            alert('掃除場所を一つ以上登録してください!')
        } else if (
            !this.raffleObjectModel.limitHour &&
            !this.raffleObjectModel.limitMin
        ) {
            alert('制限時間を登録してください!')
        } else if (
            !this.raffleObjectModel.remindSlackHour ||
            !this.raffleObjectModel.remindSlackMin
        ) {
            alert('くじの設定から、くじ引きリマインド時間を登録してください!')
        } else if (!this.raffleObjectModel.channelID) {
            alert(
                'くじの設定から、送信するslackのチャンネルIDを登録してください!'
            )
        } else if (
            this.lastRaffleItem?.raffleStatus === RaffleStatus.DONE ||
            !this.lastRaffleItem
        ) {
            this.timeToUnix()
            this.raffleObjectModel.limitTimeUnix = this.remindAdminTime
            await this.raffleObjectModel.register()
            this.getSelectedTime(this.raffleObjectModel)
            //アラート
            alert(`全員へのリマインドがスケジュールされました`)
            alert(`管理者へのリマインドがスケジュールされました`)
            this.$emit('registerRaffle')
            this.isLastRaffleNull = false
            this.isLastRaffleActive = true
        } else {
            alert(
                'キャッシュが残っている可能性があります。お手数ですが、一度リロードしてください'
            )
        }
    }

    //くじを実行する
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
                    //statusを変更する
                    this.lastRaffleItem!.raffleStatus = RaffleStatus.DONE

                    //slackへの結果をアップデート
                    await this.makeResultMessage()
                    this.lastRaffleItem!.resultMessage = this.message
                    //updateする
                    await this.lastRaffleItem!.register()
                    this.$emit('registered')
                    //viewの変更
                    if (
                        this.lastRaffleItem?.raffleStatus === RaffleStatus.DONE
                    ) {
                        this.isLastRaffleActive = false
                        this.isLastRaffleNull = false
                    }
                } else return
            } else {
                await this.doRaffle()
                //slackへの結果をアップデート
                await this.makeResultMessage()
                this.lastRaffleItem!.resultMessage = this.message
                //statusを変更する
                this.lastRaffleItem!.raffleStatus = RaffleStatus.DONE
                //updateする
                await this.lastRaffleItem!.register()
                this.$emit('registered')
                //viewの変更
                if (this.lastRaffleItem?.raffleStatus !== RaffleStatus.DONE) {
                    this.isLastRaffleActive = false
                    this.isLastRaffleNull = false
                }
                //前回localstrageに保存した予約した通知を削除する
                // this.deleteNotification()
            }
        }
    }

    @AsyncLoadingAndErrorHandle()
    public async deleteRaffle() {
        // テスト-初期化してみる
        this.hh = ''
        this.mm = ''
        this.$emit('deleteRaffle')
        this.isLastRaffleActive = false
    }

    public getTime() {
        // 時間を設定
        const now = new Date()
        const specificYear = now.getFullYear()
        const specificMonth = now.getMonth() //表示させる時は、＋1する必要がある
        const specificDate = now.getDate()
        const groupRemindHour = this.lastRaffleItem?.remindSlackHour
        const groupRemindMin = this.lastRaffleItem?.remindSlackMin
        const adminRimindHour = this.lastRaffleItem?.limitHour
        const adminRimindMin = this.lastRaffleItem?.limitMin

        //UNIXを作成: groupへのリマインド通知 remindGroupTime
        let remindGroupDate = new Date(
            specificYear,
            specificMonth,
            specificDate,
            groupRemindHour,
            groupRemindMin
        )
        let remindGroupMM = remindGroupDate.getTime()
        let remindGroupTime = Math.floor(remindGroupMM / 1000)
    }

    public async setUser(userID: string) {
        this.setUserModel = await this.blancUserModel!.fetchUserDataByUserID(
            userID
        )
    }

    // ============================================
    // slackへの結果通知
    // ============================================

    //くじの結果部分
    @AsyncLoadingAndErrorHandle()
    public async makeMessage() {
        if (this.lastRaffleItem) {
            for (const task of this.lastRaffleItem!.tasks) {
                if (task.headCount > 0) {
                    //taskName: userIDからfetchした名前
                    for await (const userID of task.joinUserIDArray) {
                        this.setUserModel =
                            await this.blancUserModel!.fetchUserDataByUserID(
                                userID
                            )
                        const plusHonolific =
                            this.setUserModel?.name + 'さん,　'
                        this.userNameArray += plusHonolific
                    }

                    this.resultMessage +=
                        task.taskName + ' : ' + this.userNameArray + '\n'
                }
                this.userNameArray = ''
            }
        }
    }

    //結果のメッセージ(全体)
    @AsyncLoadingAndErrorHandle()
    public async makeResultMessage() {
        await this.makeMessage()
        this.message = `本日のお掃除場所担当が決定しました！🎉\n参加できる方は各自、清掃をよろしくお願いします！🛀 🧼 \n\n${this.resultMessage}`
    }

    // ============================================
    // 単純な計算
    // ============================================

    //人数を計算するメソッド
    public headCountSumFunc() {
        this.headCountSum = 0
        for (const task of this.lastRaffleItem?.tasks!) {
            this.headCountSum += task.headCount
        }
        return this.headCountSum
    }

    // 時間比較を行うためのメソッド
    public compareTime() {
        const now = new Date()
        // 現在の時間と分です
        const nowhh = now.getHours()
        const nowmm = now.getMinutes()
        if (nowhh == parseInt(this.hh)) {
            if (nowmm == parseInt(this.mm)) {
                this.isEarlierThanLimitTime = false
            } else if (nowmm < parseInt(this.mm)) {
                this.isEarlierThanLimitTime = true
            } else {
                this.isEarlierThanLimitTime = false
            }
        } else if (nowhh < parseInt(this.hh)) {
            this.isEarlierThanLimitTime = true
        } else {
            this.isEarlierThanLimitTime = false
        }
    }

    //制限時間をstringに直して、0を00に変換する (文章用)
    public getSelectedTime(input: RaffleObjectModel) {
        // 一回初期化
        this.hh = ''
        this.mm = ''
        if (input) {
            this.hh = String(input.limitHour)
            if (this.hh == '0') {
                this.hh = '00'
            }

            this.mm = String(input.limitMin)
            if (this.mm == '0') {
                this.mm = '00'
            }
        }
    }

    //通知する時刻をUNIXに変換する
    public timeToUnix() {
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
        const adminRimindHour = this.raffleObjectModel.limitHour
        const adminRimindMin = this.raffleObjectModel.limitMin

        //UNIXを作成: Adminへのリマインド通知 remindAdminTime
        let remindAdminDate = new Date(
            specificYear,
            specificMonth,
            specificDate,
            adminRimindHour,
            adminRimindMin
        )
        let remindAdminMM = remindAdminDate.getTime()
        this.remindAdminTime = Math.floor(remindAdminMM / 1000)
    }

    //くじロジック
    public async doRaffle() {
        // optionを持つくじから割り当てる
        this.updateLastRaffleItem = this.lastRaffleItem
        for (const raffle of this.updateLastRaffleItem!.tasks) {
            //for文で回している時にその大元をいじったら回す数が一つ減るから、消した分回せなくなるっぽい
            //よって、noOptionArray配列に回して、for文で回し終わった後に消す
            if (!raffle.optionName && raffle.optionName === '') {
                // optionがなければ、noOptionArray配列へ
                this.noOptionRaffleArray.push(raffle)
            } else {
                // option付きのraffleからuserの配列を取り出してランダムに並べる
                // ramdomOptionUserList
                this.optionAvailableUsers = raffle.optionValidUsers
                while (this.optionAvailableUsers.length > 0) {
                    //ランダムな数字randumNumを求める
                    const arrayLength = this.optionAvailableUsers.length
                    const ramdumNum = Math.floor(Math.random() * arrayLength)
                    //残っている数字から、ramdumNumの数字を削除、別の場所にその数字を書き出す
                    this.ramdomOptionUserList.push(
                        this.optionAvailableUsers[ramdumNum]
                    )
                    this.optionAvailableUsers.splice(ramdumNum, 1)
                }

                // 要素の1番目からraffleに割り当てて、削除配列へ、またblanc用パラメーターは初期化する
                if (raffle.headCount > 0) {
                    //headCountの数だけ回す
                    for (var i = 0; i < raffle.headCount; i++) {
                        //最初のメンバーを取ってきて、追加したら配列から削除する
                        const firstMember = this.ramdomOptionUserList[0]
                        if (!firstMember) {
                            console.log('firstMember is empty')
                            return null
                        } else {
                            raffle.joinUserIDArray?.push(firstMember)
                        }
                        // firstMember削除
                        this.deleteUserArray.push(firstMember)
                        this.ramdomOptionUserList.shift()
                    }
                }
                //初期化
                this.optionAvailableUsers = []
                this.ramdomOptionUserList = []
            }
        }

        // updateLastRaffleItem.tasksからnoOptionRaffleArrayを一旦削除して、後でpushする
        for (const noOptionRaffle of this.noOptionRaffleArray) {
            let index = this.updateLastRaffleItem!.tasks.indexOf(noOptionRaffle)
            this.updateLastRaffleItem?.tasks.splice(index, 1)
        }
        // //memberの配列を作成
        for (const member of this.lastRaffleItem!.activeMembers) {
            const memberID = member.userID
            this.memberList.push(memberID)
        }
        // 上で作ったdelete用の配列を削除する
        for (const deleteMember of this.deleteUserArray) {
            let index = this.memberList.indexOf(deleteMember)
            this.memberList.splice(index, 1)
        }
        //memberの配列をシャッフルする
        while (this.memberList.length > 0) {
            //ランダムな数字rumdumNumを求める
            const arrayLength = this.memberList.length
            const randumNum = Math.floor(Math.random() * arrayLength)
            //残っている数字から、ramdumNumの数字を削除、別の場所にその数字を書き出す
            this.ramdumMemberList.push(this.memberList[randumNum])
            this.memberList.splice(randumNum, 1)
        }
        // taskの配列の中でthis.ramdumMemberListをheadCount分回しながら、idを持たせていく
        //noOptionArray配列の中のtaskで作成する
        for (const task of this.noOptionRaffleArray!) {
            this.ramdumMemberListCopy = this.ramdumMemberList
            if (task.headCount > 0) {
                // joinUserIDArrayに値が何故か入っている時があるので、削除
                task.joinUserIDArray = []
                //headCountの数だけ回す
                for (var i = 0; i < task.headCount; i++) {
                    //最初のメンバーを取ってきて、追加したら配列から削除する
                    const firstMember = this.ramdumMemberListCopy[0]
                    task.joinUserIDArray?.push(firstMember)
                    this.ramdumMemberListCopy.shift()
                }
            }
        }
        //this.updateLastRaffleItem.tasksに最初に削除したraffleをpushして、元のtasksに戻す
        for (const raffle of this.noOptionRaffleArray) {
            this.updateLastRaffleItem!.tasks.push(raffle)
        }
        if (this.updateLastRaffleItem) {
            this.lastRaffleItem = this.updateLastRaffleItem
        }
    }
}
</script>
<style lang="stylus" scoped>
.user_edit_container {
    .button_container {
        padding-top: 10px;
        // display: flex;
        // justify-content: center;
    }
}
</style>
