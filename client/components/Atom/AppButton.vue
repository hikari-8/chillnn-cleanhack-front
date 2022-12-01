<template>
    <div class="button_container">
        <button :disabled="disabled" @click="click">
            <slot />
        </button>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class AppButton extends Vue {
    @Prop({ required: false, default: false }) disabled!: boolean
    public click() {
        this.$emit('click')
    }
}
</script>
<style lang="stylus" scoped>
.button_container {
    display: inline-block;

    button {
        border: 0;
        border-radius: 5px;
        font-size: 16px;
        padding: 5px 5px;
        cursor: pointer;

        @media only screen and (max-width: $spSize) {
            font-size: 14px;
            padding: 5px 5px;
        }

        &:disabled {
            color: $borderColor;
        }
    }
}
</style>
