<template>
    <div>
        <!-- 編集を要する画面の場合(ex. 「施設設定」,「設定」,「プランの編集等」) -->
        <div
            v-if="isEdit && !twoRows"
            class="mb-16"
            :class="{ 'mx-24 xl:mx-40': !noMarginX, 'mt-6': !noMarginTop }"
        >
            <!-- タイトル -->
            <div
                class="flex items-center"
                :class="{
                    'mb-5': !description,
                    'mb-2': description,
                    'mt-10': !noMarginTop,
                }"
            >
                <div class="font-semibold">
                    {{ title }}
                </div>
                <slot name="title_side_description" />
            </div>
            <!-- 補足説明 -->
            <div v-if="description" class="mb-5 text-sm" v-html="description" />
            <!-- カードの内容 -->
            <div class="my-2.5 rounded-xl bg-white px-8 py-6 shadow-sm">
                <slot />
            </div>
        </div>
        <!-- 多くの情報をリスト化して広く表示する画面の場合(ex. 「顧客管理」,「商品管理」) -->
        <div
            v-else-if="!isEdit && !twoRows"
            class="md:mx-10 md:mb-16 md:mt-6 xl:mx-16"
        >
            <!-- タイトル -->
            <div
                class="mt-10 font-semibold"
                :class="{ 'mb-5': !description, 'mb-2': description }"
            >
                {{ title }}
            </div>
            <!-- 補足説明 -->
            <div v-if="description" class="mb-5 text-sm" v-html="description" />
            <!-- カードの内容 -->
            <div
                class="rounded-xl bg-white p-3 shadow-sm md:p-8"
                :class="{ 'bg-[#EAE9D8]': bgYellow }"
            >
                <slot />
            </div>
        </div>
        <!-- baseページのためのWrapper -->
        <div v-else-if="twoRows" class="ml-8 mb-16 mt-6 xl:ml-12">
            <!-- タイトル -->
            <div
                class="mt-10 font-semibold"
                :class="{ 'mb-5': !description, 'mb-2': description }"
            >
                {{ title }}
            </div>
            <!-- 補足説明 -->
            <div v-if="description" class="mb-5 text-sm" v-html="description" />
            <!-- カードの内容 -->
            <div class="rounded-xl bg-white py-3 shadow-sm">
                <slot name="Left" />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({
    components: {},
})
export default class BodyWrapper extends Vue {
    @Prop({ required: false }) title!: string
    @Prop({ required: false }) description!: string
    // 編集を要する画面か否かのBoolean
    @Prop({ required: true }) isEdit!: boolean
    @Prop({ default: false }) twoRows!: boolean

    @Prop({ default: false }) public noMarginX!: boolean
    @Prop({ default: false }) public noMarginTop!: boolean
    @Prop({ required: false, default: false }) bgYellow!: boolean
}
</script>
