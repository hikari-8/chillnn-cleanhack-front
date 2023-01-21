<template>
    <div
        v-if="taskMastItem"
        class="flex items-center border-b border-solid border-chillnn-border-base py-[15px]"
    >
        <!-- ポチ -->
        <div class="w-[15%] text-center flex-grow-0">
            <!-- モーダルを閉じる -->
            <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                @click="undoRegister"
            >
                <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                    ></path>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
            <!-- <span class="text-gray-600">⚫︎</span> -->
        </div>
        <!-- 掃除場所名 -->
        <div class="w-[50%] text-black flex-grow h-auto w-auto mr-4">
            <app-base-input
                v-model="taskMastItem.taskName"
                class="input_taskname"
            ></app-base-input>
        </div>
        <!-- 人数 -->
        <div class="w-[15%] text-center flex-grow-0">
            <template>
                <span
                    class="flex text-center justify-center flex-grow-0 align-center gap-x-1"
                >
                    <!-- セレクトボックス -->
                    <select
                        id="headCount"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                        v-model="taskMastItem.headCount"
                    >
                        <option disabled selected value=""></option>
                        <option
                            v-for="selectedHeadCount in headCountList"
                            :value="selectedHeadCount.value"
                            :key="selectedHeadCount.id"
                        >
                            {{ selectedHeadCount.key }}
                        </option>
                    </select>
                    <div
                        class="text-center text-sm font-medium text-gray-900 pb-2 pt-3"
                    >
                        人
                    </div></span
                >
            </template>
        </div>

        <div class="w-[20%] flex-grow-0">
            <div class="flex justify-center gap-[10px]">
                <!-- 追加ボタン -->
                <span title="追加">
                    <table-button
                        :disabled="taskMastItem.optionItem"
                        @click="registered"
                    >
                        <img
                            class="w-5"
                            src="@/assets/img/icon/plus-edit.svg"
                        />
                    </table-button>
                </span>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
/* eslint-disable no-console */
import { Component, Prop, Vue } from 'nuxt-property-decorator'
// component
import AppButton from '@/components/Atom/Button/AppButton.vue'
import {
    TaskMasterObjectModel,
    TaskMastModel,
    UserModel,
} from 'chillnn-cleanhack-abr'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import AppBaseInput from '@/components/Atom/Input/AppBaseInput.vue'
import TableButton from '@/components/Atom/Button/TableButton.vue'

@Component({
    components: {
        AppButton,
        AppBaseInput,
        TableButton,
    },
})
export default class AddTask extends Vue {
    @Prop({ default: true }) public taskMastItem!: TaskMastModel
    @Prop({ required: true }) userModel!: UserModel
    @Prop({ default: true }) public taskMasterObjModel!: TaskMasterObjectModel
    public updatedMasterModel: TaskMasterObjectModel | null = null
    public isTaskNameNull: boolean = false
    public isHeadCountNull: boolean = false
    public headCountList: { key: number; value: number }[] = [
        { key: 1, value: 1 },
        { key: 2, value: 2 },
        { key: 3, value: 3 },
        { key: 4, value: 4 },
        { key: 5, value: 5 },
        { key: 6, value: 6 },
        { key: 7, value: 7 },
        { key: 8, value: 8 },
        { key: 9, value: 9 },
        { key: 10, value: 10 },
    ]
    public groupID: string = this.userModel.groupID || 'blanc'

    get taskName() {
        return this.taskMastItem.taskName
    }

    public isInputNull() {
        if (this.taskMastItem.taskName == null) {
            this.isTaskNameNull = true
        } else if (this.taskMastItem.headCount == null) {
            this.isHeadCountNull = true
        } else {
            return
        }
    }

    @AsyncLoadingAndErrorHandle()
    public async undoRegister() {
        this.$emit('undoRegister')
    }

    @AsyncLoadingAndErrorHandle()
    public async registered() {
        //掃除場所名と人数がnullならalertを飛ばす
        this.isInputNull()
        if (this.isTaskNameNull || this.isHeadCountNull) {
            alert('掃除場所名と割り当てる人数の両方を設定してください 🙇‍♀️')
        } else {
            //Modelからmastへ変更
            const mastOfTaskMastItem =
                await this.taskMastItem.taskMastModelToTaskMast()
            if (this.taskMasterObjModel)
                // tasksの配列に新しいデータ(mast)をpush
                this.taskMasterObjModel.tasks.push(mastOfTaskMastItem)
            //ここでアップデートする
            if (!this.taskMasterObjModel) {
                return null
            } else {
                await this.taskMasterObjModel.updateTaskMasterObj()
                this.$emit('registered')
            }
        }
    }
}
</script>
<style lang="stylus" scoped></style>
