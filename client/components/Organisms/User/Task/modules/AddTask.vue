<template>
    <!-- モーダルの内側 -->
    <div
        class="task_add_container w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full flex"
    >
        <div class="relative w-full h-full max-w-md md:h-auto">
            <div
                class="input_taskname_wapper flex items-center text-center gap-x-2 mb-8"
            >
                <label
                    for="email"
                    class="block text-sm font-medium text-gray-900 flex-shrink-0"
                    >掃除場所名</label
                >
                <!-- {{ taskMasterObject.taskName }} -->
                <app-base-input
                    v-model="taskMastItem.taskName"
                    class="input_taskname"
                ></app-base-input>
                <!-- 数字の追加と、できればオプションの追加-->
            </div>
            <div
                class="input_taskname_wapper flex items-center text-center gap-x-2"
            >
                <label
                    for="email"
                    class="block text-xs font-medium text-gray-900 flex-shrink-0"
                    >人数</label
                >
                <!-- セレクトボックス -->
                <select
                    id="headCount"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/5 p-2.5"
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

                <div class="block text-sm font-medium text-gray-900">人</div>
                <!-- 数字の追加と、できればオプションの追加-->
            </div>
            <div class="button flex">
                <app-button
                    :disabled="!taskMastItem"
                    @click="registered"
                    class="mx-auto mt-8"
                    >追加</app-button
                >
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

@Component({
    components: {
        AppButton,
        AppBaseInput,
    },
})
export default class AddTask extends Vue {
    @Prop({ default: true }) public taskMastItem!: TaskMastModel
    @Prop({ required: true }) userModel!: UserModel
    @Prop({ default: true }) public taskMasterObjModel!: TaskMasterObjectModel

    public updatedMasterModel: TaskMasterObjectModel | null = null

    public async created() {
        // console.log('modal中のtaskmastmodelです', this.taskMastItem)
    }
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
<style lang="stylus" scoped>
.caption {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    padding-top: 1rem;

    .input_description_wapper {
        margin-left: auto;
        margin-right: auto;

    }

    .input_description {
        width: 300px;
        border-radius: 0.375rem;
        border-width: 2px;
    }
}

.button {
    margin: 20px auto 0;
    display: inline-block;
    text-align: center;
    width: 100%;
}
</style>
