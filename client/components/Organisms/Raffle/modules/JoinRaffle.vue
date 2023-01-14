<template>
    <div class="mx-auto pb-32 auth_container w-600px" v-if="raffleObjectModel">
        <div class="mb-20">くじにJoinするbodyです</div>
        <div>参加者へ招待を送る</div>
        <!-- <app-button @click="test">
            <nuxt-link
                :to="{
                    name: 'group-groupID',
                    params: { groupID: groupModel.groupID },
                }"
                tag="div"
                class="link"
                :userModel="userModel"
                >URLを取得する(テスト)
            </nuxt-link></app-button
        > -->
        <app-button @click="test">取得する(テスト)</app-button>
    </div>
</template>
<script lang="ts">
import { RaffleObjectModel, TaskMasterObjectModel } from 'chillnn-cleanhack-abr'
import { Vue, Component, Prop } from 'nuxt-property-decorator'
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
    public raffles: RaffleObjectModel[] | null = null
    // public raffleObjectModel: RaffleObjectModel | null = null

    public async test() {
        //一回のみ有効↓、２回目になるとエラーが出る
        this.raffles = await this.raffleObjectModel.fetchRafflesByGroupID()
        // console.log('raffles:', this.raffles)
        const array = JSON.stringify(this.raffles)
        // console.log('rafflesをJSONに変換:', array)
        const jsonArray = JSON.parse(array)
        // console.log('rafflesをJSONに変換:', jsonArray)
        // console.log('rafflesの一番最後:', jsonArray.slice(-1)[0])
        const lastRaffle = jsonArray.slice(-1)[0]
        const lastItemStatus = lastRaffle.mast.raffleStatus
        console.log('status:', lastItemStatus)
    }
}
</script>
<style lang="stylus" scoped></style>
