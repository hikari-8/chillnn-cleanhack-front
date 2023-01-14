<template>
    <div
        v-if="taskMastItem"
        class="flex items-center border-b border-solid border-chillnn-border-base py-[15px]"
    >
        <!-- ポチ -->
        <div class="w-[15%] text-center flex-grow-0">
            <span class="text-gray-600">⚫︎</span>
        </div>
        <!-- 掃除場所名 -->
        <div class="w-[50%] text-black flex-grow h-auto w-auto">
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
                    <div class="text-sm font-medium text-gray-900 py-2">
                        人
                    </div></span
                >
            </template>
        </div>

        <div class="w-[20%] flex-grow-0">
            <div class="flex justify-center gap-[10px]">
                <!-- ボタン -->
                <div class="button">
                    <app-button
                        :disabled="!taskMastItem"
                        @click="registered"
                        class="mx-auto"
                        >追加</app-button
                    >
                </div>
                <!-- ボタン -->
                <!-- <table-button @click="registered" explanation="追加">
                    <img class="w-4" src="@/assets/img/icon/plus.svg" />
                </table-button> -->
                <!-- <table-button @click="showModal = true" explanation="オプション">
                    <img
                        class="w-4"
                        src="@/assets/img/icon/trash-alt-regular.svg"
                    />
                </table-button> -->
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

    @AsyncLoadingAndErrorHandle()
    public async registered() {
        //Modelからmastへ変更
        const mastOfTaskMastItem = this.taskMastItem.taskMastModelToTaskMast()
        if (this.taskMasterObjModel)
            // tasksの配列に新しいデータ(mast)をpush
            this.taskMasterObjModel.tasks.push(await mastOfTaskMastItem)
        console.log('push後', this.taskMastItem)
        console.log('push後', this.taskMasterObjModel)
        console.log('push後', this.taskMasterObjModel.tasks.length)
        //ここでアップデートする
        if (!this.taskMasterObjModel) {
            return null
        } else {
            this.taskMasterObjModel.updateTaskMasterObj()
            this.$emit('registered')
        }
    }
}
</script>
<style lang="stylus" scoped></style>
