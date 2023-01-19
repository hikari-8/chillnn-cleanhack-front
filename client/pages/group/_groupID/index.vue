<template>
    <div v-if="userModel">
        <app-home
            :userModel="userModel"
            :groupModel="groupModel"
            :taskMasterObjectModel="taskMasterObjectModel"
            :lastRaffle="lastRaffle"
            :isAlreadyJoined="isAlreadyJoined"
            :joinUserModel="joinUserModel"
            :memberList="memberList"
            @registered="registered"
            @joinGroup="joinGroup"
        />
    </div>
</template>
<script lang="ts">
import {
    GroupModel,
    UserModel,
    TaskMasterObjectModel,
    RaffleObject,
    RaffleJoinUserModel,
    RaffleObjectModel,
} from 'chillnn-cleanhack-abr'
import { Component, Vue } from 'nuxt-property-decorator'
import { userInteractor } from '~/api'
import AppButton from '@/components/Atom/Button/AppButton.vue'
import AppHome from '@/components/Organisms/Home/index.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import { authInteractor } from '~/driver/amplify/auth'

// component
@Component({
    components: {
        AppButton,
        AppHome,
    },
})
export default class Top extends Vue {
    public userModel: UserModel | null = null
    public groupModel: GroupModel | null = null
    public taskMasterObjectModel: TaskMasterObjectModel | null = null
    public blancRaffleObjectModel: RaffleObjectModel | null = null
    public raffleObjectModel: RaffleObjectModel | null = null
    public groupID: string = ''
    public lastRaffle: RaffleObjectModel | null = null
    public blancLastRaffle: RaffleObjectModel | null = null
    public memberList: string[] = []
    public isAlreadyJoined: boolean = false
    public joinUserModel: RaffleJoinUserModel | null = null

    public async created() {
        this.userModel = await userInteractor.fetchMyUserModel()
        if (this.userModel.groupID) {
            this.groupModel = await this.userModel.fetchGroupDataByGroupID()
        } else {
            this.groupModel = this.userModel.createNewGroup()
        }
        //taskMasterObjectModelをgroupIDでfetchしてくる
        if (this.userModel) {
            this.taskMasterObjectModel =
                await this.userModel.fetchTaskMasterDataObjByGroupID(
                    this.userModel.groupID!
                )
            // console.log('Attention', this.taskMasterObjectModel)
        }
        if (this.groupModel) {
            this.blancLastRaffle =
                await this.groupModel.fetchLastRaffleItemByGroupID()
            if (this.blancLastRaffle) {
                this.lastRaffle = this.blancLastRaffle
                //Effectiveかつ、自分もまだ参加していなかったら参加できる
                //memberの配列を作成
                this.createMembersArray()
                const myUserID = this.userModel.userID
                //lastRaffleのmemberの配列に自分のuserIDがあるかどうか
                this.isAlreadyJoined = this.memberList.includes(myUserID)
                console.log(this.isAlreadyJoined, 'is already joined?')
                if (this.isAlreadyJoined) {
                    return
                } else {
                    //joinするuserのインスタンス作成
                    this.joinUserModel = this.userModel.createRaffleJoinUser()
                }
            }
        }
    }

    public createMembersArray() {
        //memberの配列を作成
        for (const member of this.lastRaffle!.activeMembers) {
            const memberID = member.userID
            this.memberList.push(memberID)
        }
    }

    @AsyncLoadingAndErrorHandle()
    public async joinGroup() {
        if (this.isAlreadyJoined) {
            alert('すでに参加済みのくじです！リロードしてください！')
        } else {
            //Modelからmastへ変更
            const mastOfJoinUser =
                await this.joinUserModel!.raffleJoinUserModelToMast()
            if (this.lastRaffle) {
                this.lastRaffle.activeMembers.push(mastOfJoinUser)
                // this.lastRaffle.activeMembers.push(mastOfJoinUser)
                // if (this.lastRaffle.activeMembers[0].userID === 'blank') {
                //     this.lastRaffle.activeMembers.shift()
                // }
            }
            //updateする
            if (!this.lastRaffle) {
                return null
            } else {
                await this.lastRaffle.register()
                await this.userModel?.register()
                this.isAlreadyJoined = true
                this.$emit('registered')
                alert(
                    'くじに参加しました！くじが実行されるまでお待ちください！'
                )
            }
        }
    }

    @AsyncLoadingAndErrorHandle()
    public async registered() {
        const blancUserModel = await this.userModel?.fetchUserDataByUserID(
            this.userModel.userID
        )
        // ここで、groupIDがfetchされてきてない(serverとのラグがあるかも)
        console.log(blancUserModel, 'どうかな？blanc')
        if (!blancUserModel) {
            return
        } else {
            this.userModel = blancUserModel
        }
        if (this.userModel.groupID) {
            this.groupModel = await this.userModel.fetchGroupDataByGroupID()
        }
        this.$emit('registered')
    }
}
</script>
<style lang="stylus" scoped>
.auth_container {
    width: 600px;
}
</style>
