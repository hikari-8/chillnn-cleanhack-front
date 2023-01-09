<template>
    <div
        class="mx-auto pb-32 auth_container w-600px"
        v-if="userModel && raffleObjectModel"
    >
        <!-- くじ -->
        <div class="mb-20">
            <make-raffle :raffleObjectModel="raffleObjectModel" />
        </div>
        <join-raffle
            :raffleObjectModel="raffleObjectModel"
            :taskMasterObjectModel="taskMasterObjectModel"
        />
    </div>
</template>
<script lang="ts">
import {
    UserModel,
    TaskMasterObjectModel,
    RaffleObjectModel,
} from 'chillnn-cleanhack-abr'
import { Vue, Component, Prop } from 'nuxt-property-decorator'
// component
import MakeRaffle from '@/components/Organisms/Raffle/modules/MakeRaffle.vue'
import AppButton from '@/components/Atom/Button/AppButton.vue'
import JoinRaffle from '@/components/Organisms/Raffle/modules/JoinRaffle.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'

@Component({
    components: {
        MakeRaffle,
        AppButton,
        JoinRaffle,
    },
})
export default class AppRaffleEdit extends Vue {
    @Prop({ required: true }) userModel!: UserModel
    @Prop({ required: true }) taskMasterObjectModel!: TaskMasterObjectModel
    public raffleObjectModel: RaffleObjectModel | null = null

    public get isShowLink() {
        return this.$route.params.userID !== this.userModel.userID
    }

    public async created() {
        if (this.taskMasterObjectModel) {
            //ここのawait必要か
            this.raffleObjectModel =
                await this.taskMasterObjectModel.getRaffleModel()
            console.log(this.raffleObjectModel)
            console.log(this.raffleObjectModel.tasks, 'tasksです')
        }
    }
}
</script>
<style lang="stylus" scoped>
.auth_container {
    width: 600px;
}
</style>
