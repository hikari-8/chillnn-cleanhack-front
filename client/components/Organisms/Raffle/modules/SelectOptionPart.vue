<template>
    <div v-if="lastRaffle">
        <div v-for="option in optionList" :key="option.index">
            <div class="flex items-center mb-4">
                <input
                    v-model="userModel.selectedOption"
                    type="checkbox"
                    :value="option"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label
                    :for="option"
                    class="ml-2 text-sm font-medium text-gray-900"
                    >{{ option }}</label
                >
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
// component
import AppText from '@/components/Atom/Text/AppText.vue'
import ButtonBase from '@/components/Atom/Button/button_base.vue'
import ButtonBaseSub from '@/components/Atom/Button/button_base_sub.vue'
import AppBaseInput from '@/components/Atom/Input/AppBaseInput.vue'
import TableButton from '@/components/Atom/Button/TableButton.vue'
import { RaffleObjectModel, UserModel } from 'chillnn-cleanhack-abr'
import EditRaffleHeadCount from '@/components/Organisms/Raffle/modules/EditRaffleHeadCount.vue'
import AddItemArea from '@/components/Organisms/Common/AddItemArea/index.vue'
import qs from 'qs'

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
export default class SelectOptionPart extends Vue {
    @Prop({ default: false }) public lastRaffle!: RaffleObjectModel
    @Prop({ default: true }) public userModel!: UserModel
    // @Prop({ default: false }) public task!: Object
    // @Prop({ default: false }) public index!: number
    public taskIndex: number = 0
    // @Prop({ default: false }) public orderChange!: number
    public showModal: boolean = false
    public outDate: boolean = false
    public outStock: boolean = false
    public isShowSummaryModal: boolean = false
    public isShowModal: boolean = false
    public isShowOptionModal: boolean = false
    public isOptionView: boolean = false
    public selectedOption: string[] = []
    public optionList: string[] = []

    public created() {
        //配列で回す
        for (const task of this.lastRaffle.tasks) {
            if (task.optionName !== '') {
                this.optionList.push(task.optionName!)
            }
        }
    }
}
</script>
