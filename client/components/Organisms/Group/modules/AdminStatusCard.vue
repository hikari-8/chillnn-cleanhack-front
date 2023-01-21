<template>
    <div class="border-b border-solid">
        <ul role="list" class="divide-y divide-gray-200">
            <li class="py-2 sm:py-4">
                <div class="flex items-center space-x-4">
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate">
                            {{ memberName }}
                        </p>
                    </div>
                    <!-- ステータス -->
                    <div class="flex-shrink-0">
                        <!-- Activeマーク -->
                        <span
                            v-if="isAdmin"
                            class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full"
                        >
                            <span
                                class="w-2 h-2 mr-1 bg-green-500 rounded-full"
                            ></span>
                            Admin
                        </span>
                    </div>
                    <div class="flex justify-center gap-[10px]" v-if="isAdmin">
                        <!-- 空白-->
                        <div class="w-5"></div>
                    </div>
                    <div class="flex justify-center gap-[10px]" v-if="!isAdmin">
                        <!-- 追加ボタン -->
                        <span title="追加">
                            <table-button
                                :disabled="!memberID"
                                @click="giveAdminStatus"
                            >
                                <img
                                    class="w-5"
                                    src="@/assets/img/icon/plus-edit.svg"
                                />
                            </table-button>
                        </span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { userInteractor } from '~/api'
// component
import AppText from '@/components/Atom/Text/AppText.vue'
import ButtonBase from '@/components/Atom/Button/button_base.vue'
import ButtonBaseSub from '@/components/Atom/Button/button_base_sub.vue'
import AppBaseInput from '@/components/Atom/Input/AppBaseInput.vue'
import TableButton from '@/components/Atom/Button/TableButton.vue'
import { GroupModel, UserModel } from 'chillnn-cleanhack-abr'
import EditRaffleHeadCount from '@/components/Organisms/Raffle/modules/EditRaffleHeadCount.vue'
import AddItemArea from '@/components/Organisms/Common/AddItemArea/index.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'

@Component({
    components: {
        AppText,
        AppBaseInput,
        ButtonBase,
        ButtonBaseSub,
        TableButton,
        EditRaffleHeadCount,
        AddItemArea,
    },
})
export default class AdminStatusCard extends Vue {
    @Prop({ required: true }) groupModel!: GroupModel
    @Prop({ required: true }) userModel!: UserModel
    @Prop({ required: true }) memberID!: string
    public blancUserModel: UserModel | null = null
    public otherUserModel: UserModel | null = null
    public memberName: string = ''
    public isAdmin: boolean = false

    public async created() {
        // userを取得するために自分のuserModelをfetchしてきます
        this.blancUserModel = await userInteractor.fetchMyUserModel()
        this.otherUserModel = await this.blancUserModel!.fetchUserDataByUserID(
            this.memberID
        )
        if (!this.otherUserModel) {
            return
        } else {
            this.memberName = this.otherUserModel.name
            if (this.otherUserModel.role === 'admin') {
                this.isAdmin = true
            }
        }
    }

    @AsyncLoadingAndErrorHandle()
    public async giveAdminStatus() {
        await this.userModel.addAdminStatus(this.otherUserModel!)
        this.isAdmin = true
        this.$emit('registerAdmin')
    }
}
</script>
