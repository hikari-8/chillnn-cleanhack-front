<template>
    <div>
        <ol class="relative border-l border-gray-200">
            <li class="mb-10 ml-8">
                <!-- 数字エリア(球) -->
                <div
                    class="mr-8 my-28 absolute flex items-center justify-center w-10 h-10 rounded-full -left-5 ring-1 ring-blue-300 bg-white"
                >
                    <div class="rounded-full shadow-lg">1</div>
                </div>
                <div
                    class="w-full items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                    <div class="flex text-sm font-normal">
                        <!-- イメージエリア -->
                        <img
                            class="w-[60%]"
                            src="@/assets/img/step/step1.png"
                        />
                        <!-- 説明エリア -->
                        <div class="my-auto">
                            <div class="font-semibold text-lg mb-4 p-1">
                                ユーザー名を登録する
                            </div>
                            <div class="text-sm font-semibold mb-4 p-1">
                                まずはユーザー設定から、<br />ユーザー名を登録してください
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <li class="mb-10 ml-8">
                <!-- 数字エリア(球) -->
                <div
                    class="bg-white mr-8 my-28 absolute flex items-center justify-center w-10 h-10 rounded-full -left-5 ring-1 ring-blue-300"
                >
                    <div class="rounded-full shadow-lg">2</div>
                </div>
                <div
                    class="w-full items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                    <div class="flex text-sm font-normal">
                        <!-- イメージエリア -->
                        <img
                            class="w-[60%]"
                            src="@/assets/img/step/step2.png"
                        />
                        <!-- 説明エリア -->
                        <div class="my-auto h-40">
                            <div class="font-semibold text-lg mb-4 p-1">
                                グループを作成する
                            </div>
                            <div class="text-sm font-medium mb-4 p-1">
                                グループから、グループ名を登録してください。<br />
                                グループを作成すると、管理者権限が付与されます。<br />
                                管理者は、くじを作成・編集・実行でき、他のグループメンバーに管理者権限を付与できます。
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <li class="mb-10 ml-8">
                <!-- 数字エリア(球) -->
                <div
                    class="bg-white mr-8 my-28 absolute flex items-center justify-center w-10 h-10 rounded-full -left-5 ring-1 ring-blue-300"
                >
                    <div class="rounded-full shadow-lg">3</div>
                </div>
                <div
                    class="w-full items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                    <div class="flex text-sm font-normal">
                        <!-- イメージエリア -->
                        <img
                            class="w-[60%]"
                            src="@/assets/img/step/step3.png"
                        />
                        <!-- 説明エリア -->
                        <div class="my-auto">
                            <div class="font-semibold text-lg mb-4 p-1">
                                くじのマスターデータを作成する
                            </div>
                            <div class="text-sm font-medium mb-4 p-1">
                                くじの設定から、くじのマスターデータを作成してください。<br />
                                掃除場所に、細かいオプションも付与できます。<br />
                                指定した時間に、slackのチャンネルにくじへの招待URLをスケジュールできます。
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <li class="mb-10 ml-8">
                <!-- 数字エリア(球) -->
                <div
                    class="bg-white mr-8 my-28 absolute flex items-center justify-center w-10 h-10 rounded-full -left-5 ring-1 ring-blue-300"
                >
                    <div class="rounded-full shadow-lg">4</div>
                </div>
                <div
                    class="w-full items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                    <div class="flex text-sm font-normal">
                        <!-- イメージエリア -->
                        <div class="">
                            <img
                                class="h-28 px-4 mb-4"
                                src="@/assets/img/step/slack1.png"
                            />
                            <img class="" src="@/assets/img/step/step4.png" />
                        </div>

                        <!-- 説明エリア -->
                        <div class="my-auto">
                            <div class="font-semibold text-lg mb-4 p-1 w-44">
                                くじを発行する
                            </div>
                            <div class="text-sm font-medium mb-4 p-1">
                                くじを発行すると、slackにリマインドが飛びます。
                                そのURLからくじに参加してください。
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <li class="mb-10 ml-8">
                <!-- 数字エリア(球) -->
                <div
                    class="bg-white mr-8 my-28 absolute flex items-center justify-center w-10 h-10 rounded-full -left-5 ring-1 ring-blue-300"
                >
                    <div class="rounded-full shadow-lg">5</div>
                </div>
                <div
                    class="w-full items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                    <div class="flex text-sm font-normal">
                        <!-- イメージエリア -->
                        <div class="">
                            <img
                                class="mb-8"
                                src="@/assets/img/step/step5.png"
                            />
                            <img
                                class="h-32"
                                src="@/assets/img/step/slack2.png"
                            />
                        </div>
                        <!-- 説明エリア -->
                        <div class="my-auto">
                            <div class="font-semibold text-lg mb-4 p-1 w-44">
                                くじを実行する
                            </div>
                            <div class="text-sm font-medium mb-4 p-1">
                                くじの参加人数と、各掃除場所の合計人数が等しくなるように調整して、くじを発行してください。<br />
                                実行結果は、slackのチャンネルに届きます。
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ol>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import AppBaseInput from '@/components/Atom/Input/AppBaseInput.vue'
import { userInteractor } from '~/api'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import AppButton from '@/components/Atom/Button/AppButton.vue'

@Component({
    components: {
        AppBaseInput,
        AppButton,
    },
})
export default class HowToUse extends Vue {}
</script>
<style lang="stylus" scoped></style>
