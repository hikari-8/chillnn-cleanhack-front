<template>
    <div
        v-if="raffle"
        class="flex items-center border-b border-solid border-chillnn-border-base py-[15px]"
    >
        <!-- ポチ -->
        <div class="w-[15%] text-center flex-grow-0">
            <span class="text-gray-600">⚫︎</span>
        </div>
        <!-- 掃除場所名 -->
        <div class="w-[50%] text-black flex-grow h-auto w-auto mr-4">
            {{ copiedRaffle.taskName }}
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
                        v-model="copiedRaffle.headCount"
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
                <span title="更新する">
                    <table-button :disabled="!raffle" @click="registered">
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
import { TaskMasterObjectModel, RaffleMastModel } from 'chillnn-cleanhack-abr'
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
export default class EditRaffleHeadCount extends Vue {
    @Prop({ default: true }) public raffle!: RaffleMastModel
    public copiedRaffle: RaffleMastModel | null = null
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
    public created() {
        this.copiedRaffle = this.raffle
    }

    public isInputNull() {
        if (this.copiedRaffle?.taskName == null) {
            this.isTaskNameNull = true
            console.log('Task name is null')
        } else if (this.copiedRaffle?.headCount == null) {
            this.isHeadCountNull = true
            console.log('Task head count is null')
        } else {
            return
        }
    }

    @AsyncLoadingAndErrorHandle()
    public async undoRegister() {
        // this.copiedRaffle = null
        this.$emit('undoRegister')
    }

    @AsyncLoadingAndErrorHandle()
    public async registered() {
        //掃除場所名と人数がnullならalertを飛ばす
        this.isInputNull()
        if (this.isTaskNameNull || this.isHeadCountNull) {
            console.log(this.isTaskNameNull, '名前')
            console.log(this.isHeadCountNull, '人数')
            alert('掃除場所名と割り当てる人数の両方を設定してください 🙇‍♀️')
        } else {
            //コピーしたアイテムをもとに戻す
            if (this.copiedRaffle) {
                this.raffle = this.copiedRaffle
            }
            //アップデート(registerするとくじが発行されてしまうので、しない)
            this.$emit('registered')
        }
    }
}
</script>
<style lang="stylus" scoped></style>
