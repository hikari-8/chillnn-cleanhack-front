<template>
    <div>
        <div
            class="mx-auto pb-32 auth_container w-600px"
            v-if="userModel && raffleObjectModel"
        >
            <!-- くじ -->
            <div class="mb-20">
                <make-raffle
                    :raffleObjectModel="raffleObjectModel"
                    :taskMasterObjectModel="taskMasterObjectModel"
                    :groupModel="groupModel"
                />
            </div>
        </div>
        <div v-else>
            <div class="mx-auto pb-32 auth_container w-600px text-gray-700">
                <div class="font-semibold mb-8 text-sm mt-20">
                    💡くじを実行するには、グループの作成とくじの設定を完了する必要があります。
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {
    UserModel,
    TaskMasterObjectModel,
    RaffleObjectModel,
    GroupModel,
} from 'chillnn-cleanhack-abr'
import { Vue, Component, Prop } from 'nuxt-property-decorator'
// component
import MakeRaffle from '@/components/Organisms/Raffle/modules/MakeRaffle.vue'
import AppButton from '@/components/Atom/Button/AppButton.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'

@Component({
    components: {
        MakeRaffle,
        AppButton,
    },
})
export default class AppRaffleEdit extends Vue {
    @Prop({ required: true }) userModel!: UserModel
    @Prop({ required: true }) taskMasterObjectModel!: TaskMasterObjectModel
    @Prop({ required: true }) groupModel!: GroupModel
    public raffleObjectModel: RaffleObjectModel | null = null

    public get isShowLink() {
        return this.$route.params.userID !== this.userModel.userID
    }

    public async created() {
        if (this.taskMasterObjectModel) {
            this.raffleObjectModel =
                await this.taskMasterObjectModel.getRaffleModel()
        }
    }

    //    @AsyncLoadingAndErrorHandle()
    // public async registered() {
    //     this.raffleObjectModel = null
    //     this.postModels = await this.userModel!.fetchMyPosts()
    //     this.isShowModal = false
    // }
}
</script>
<style lang="stylus" scoped>
.auth_container {
    width: 600px;
}
</style>
