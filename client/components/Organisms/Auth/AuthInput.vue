<template>
    <div class="auth_input_container">
        <div class="label">{{ label }}</div>
        <div class="input w-max">
            <app-base-input v-model="localValue" :type="type" />
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'
// component
import AppInput from '@/components/Atom/AppInput.vue'
import AppBaseInput from '@/components/Atom/Input/AppBaseInput.vue'

@Component({
    components: {
        AppBaseInput,
    },
})
export default class AuthInput extends AppInput {
    @Prop({ required: true }) label!: string | number
}
</script>
<style lang="stylus" scoped></style>
