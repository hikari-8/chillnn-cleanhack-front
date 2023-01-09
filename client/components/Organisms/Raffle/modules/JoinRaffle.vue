<template>
    <div class="mx-auto pb-32 auth_container w-600px" v-if="raffleObjectModel">
        <div class="mb-20">くじにJoinするbodyです</div>
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
    // public raffleObjectModel: RaffleObjectModel | null = null

    public async test() {
        console.log('raffleID', this.raffleObjectModel.raffleID)
        console.log('raffleOBJ', this.raffleObjectModel)
        const testFetchRaffle =
            await this.taskMasterObjectModel.fetchRaffleItemByRaffleID(
                this.raffleObjectModel.raffleID
            )
        console.log(testFetchRaffle)
    }
}
</script>
<style lang="stylus" scoped></style>
