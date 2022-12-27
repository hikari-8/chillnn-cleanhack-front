ノーマルテキスト
<template>
    <div
        class="app-text text-base-ordinary"
        :class="{
            middle: middle,
            bold: bold,
            pink: pink,
            boldPink: boldPink,
            'border-b-2 border-b-chillnn-primary': isActive,
            gray: gray,
            link: link,
            white: white !== false,
            today: isToday,
        }"
        v-html="value"
    />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class AppText extends Vue {
    @Prop() public value!: string
    @Prop({ default: false }) public middle!: boolean
    @Prop({ default: false }) public bold!: boolean
    @Prop({ default: false }) public pink!: boolean
    @Prop({ default: false }) public boldPink!: boolean
    @Prop({ default: false }) public gray!: boolean
    @Prop({ default: false }) public white!: boolean
    @Prop({ default: false }) public link!: boolean
    @Prop({ default: false }) public isActive!: boolean
    @Prop({ default: false }) public isToday!: boolean
}
</script>

<style lang="stylus" scoped>
.app-text {
    color: #4c4c4c;
    font-size: 14px;
    display: inline-block;

    @media only screen and (max-width: 1023px) {
        font-size: 14px;
    }
}

.middle {
    font-weight: 400;
}

.bold {
    font-weight: 500;
}

.pink {
    color: $primary;
    background-color: white;
}

.gray {
    color: #7e7e7e;
}

.white {
    color: white;
}

.link {
    color: #40AFFF;
}

.boldPink {
    font-weight: 600;
    color: $primary;
}

.today {
    position: relative;

    &:before {
        position: absolute;
        content: '';
        height: 4px;
        width: 28px;
        background-color: $primary;
        border-radius: 10px;
        top: 17px;
        left: -7px;
    }
}
</style>
