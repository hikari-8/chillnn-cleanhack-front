<template>
    <div class="task_list_container">
        <!-- 仮デザ -->
        <!-- ボタン部分 -->
        <div class="my-[10px] flex items-center justify-between mb-2">
            <template>
                <button-base-sub>↕︎並び替え</button-base-sub>
            </template>
            <div class="flex items-center">
                <!-- ドラッグアンドドロップ -->
                <!-- <button-base>並び替えを終了する</button-base>
                <app-caption
                    class="pl-2"
                    value="売り出し中のプランをドラッグ&ドロップで並び替えてください"
                /> -->

                <div class="flex">
                    <button-base>新規追加＋</button-base>
                </div>
            </div>
        </div>

        <div class="flex border-b-2 border-solid border-black pb-2">
            <app-caption value="順番" :boldCenter="true" class="w-[10%]" />
            <app-caption
                value="掃除場所名"
                :boldCenter="true"
                class="w-[55%]"
            />
            <app-caption value="人数" :boldCenter="true" class="w-[10%]" />
        </div>
        <div class="mb-[25px]">
            <!-- <draggable v-if="exampleTasks" class="task_draggable"> -->
            <div v-show="exampleTasks" class="task_draggable">
                <div v-for="(task, index) in exampleTasks" :key="task.idx">
                    <!-- {{ name }} -->
                    <task-item :task="task" :index="index" />
                </div>
                <div class="mt-7 text-center">
                    くじを作成するために、掃除場所データを登録してください。
                </div>
            </div>
            <!-- </draggable> -->
        </div>

        <!-- <div class="mb-[10px] flex items-center justify-between"> -->
        <!-- title -->
        <!-- <div class="my-[10px] flex items-center">
                <template v-if="!orderChange">
                    <button-base-sub @click="orderChange = !orderChange"
                        >↕︎並び替え</button-base-sub
                    >
                </template>
                <div v-else class="flex items-center">
                    <button-base @click="updateOrder"
                        >並び替えを終了する</button-base
                    >
                    <app-caption
                        class="pl-2"
                        value="売り出し中のプランをドラッグ&ドロップで並び替えてください"
                    />
                </div>
            </div> -->
        <!-- add -->
        <!-- <div class="flex">
                <button-base v-if="!orderChange" @click="goAdd"
                    >新規追加＋</button-base
                >
            </div> -->
        <!-- </div> -->
        <!-- <div class="mb-5 flex border-b-2 border-solid border-black pb-[5px]">
            <app-caption value="順番" :boldCenter="true" class="w-[7%]" />
            <app-caption value="プラン名" :boldCenter="true" class="w-[30%]" />
            <app-caption value="残在庫" :boldCenter="true" class="w-[13%]" />
            <app-caption value="単価" :boldCenter="true" class="w-1/4" />
            <div class="w-1/4" />
        </div> -->
        <!-- <div
            class="bg-chillnn-bg-layer-4 py-2 text-center text-xs font-bold"
            v-if="privateMasts || notsaleMasts"
        >
            売り出し中
        </div> -->
        <!-- <div class="mb-[30px]">
            <draggable
                v-model="insalePlans"
                class="plan_draggable"
                :disabled="!orderChange"
            >
                <div v-for="(plan, idx) in insalePlans" :key="plan.planID">
                    <plan-item
                        :idx="idx"
                        :plan="plan"
                        @delete-emit="deleteEmit"
                        :orderChange="orderChange"
                    />
                </div>
                <div v-if="!insalePlans.length" class="mt-7 text-center">
                    売り出し中のプランはありません。
                </div>
            </draggable>
        </div> -->
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'nuxt-property-decorator'
import {} from 'chillnn-cleanhack-abr'
// component
import AppTitle from '@/components/Atom/Text/AppTitle.vue'
import AppCaption from '@/components/Atom/Text/AppText.vue'
import AppText from '@/components/Atom/Text/AppText.vue'
import AppBaseInput from '@/components/Atom/Input/AppBaseInput.vue'
import draggable from 'vuedraggable'
import ButtonBase from '@/components/Atom/Button/button_base.vue'
import ButtonBaseSub from '@/components/Atom/Button/button_base_sub.vue'
import TaskItem from '@/components/Organisms/User/Task/modules/TaskItem.vue'

@Component({
    components: {
        AppTitle,
        AppText,
        AppBaseInput,
        ButtonBase,
        ButtonBaseSub,
        AppCaption,
        TaskItem,
        draggable,
    },
})
export default class TaskList extends Vue {
    public edited: boolean = false
    public orderChange: boolean = false
    public exampleTasks: { idx: number; name: string; headcount: number }[] = [
        { idx: 1, name: '洗面所', headcount: 2 },
        { idx: 2, name: '床', headcount: 3 },
        { idx: 3, name: 'トイレ', headcount: 1 },
    ]
    // public initialValue: PlanMast[] = []
    // @Prop() public privateMasts!: PlanMast[]
    // @Prop() public notsaleMasts!: PlanMast[]
    // @Prop() public addRouteName!: string
    // @Emit('updateOrder') public updateOrder() {
    //     this.orderChange = false
    // }
    // @Emit('delete-emit') public deleteEmit() {}

    // @Watch('insalePlans')
    // public getChange() {
    //     if (
    //         this.initialValue !== [] &&
    //         JSON.stringify(this.initialValue) !==
    //             JSON.stringify(this.insalePlans)
    //     ) {
    //         this.edited = true
    //     } else {
    //         this.edited = false
    //     }
    // }
    // @Prop()
    // public value!: PlanMast[]
    // @Emit() public input(_: PlanMast[]) {}
    // public get insalePlans() {
    //     return this.value
    // }
    // public set insalePlans(val: PlanMast[]) {
    //     this.input(val)
    // }
    // public goAdd() {
    //     this.$router.push({
    //         name: this.addRouteName,
    //         params: { hotelID: this.$route.params.hotelID },
    //     })
    // }

    // public created() {
    //     this.initialValue = [...this.value]
    // }
}
</script>
<style lang="stylus" scoped></style>
