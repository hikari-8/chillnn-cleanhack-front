<!-- // <template>
//     <div class="flex flex-wrap items-center">
//         <div class="font-medium">毎週</div>
//         <div class="mx-1">
//             <chillnn-app-select-box v-model="requiredPrepMilliDto.requiredPrepMilliBeforeDate" name="reserve limit day" rule="required" :dataSets="limitDaysList" :minWidthSize="90" />
//         </div>
//         <app-text class="mr-1" value="の" />
//         <div class="mx-1">
//             <chillnn-app-select-box v-model="requiredPrepMilliDto.requiredPrepMilliBeforeHour" name="reserve limit time" rule="required" :dataSets="limitTimesList" :minWidthSize="80" />
//         </div>
//         <app-text value="で締め切る" />
//     </div>
// </template> -->

<!-- // <script lang="ts"> -->
// import { Component, Vue, Prop } from "nuxt-property-decorator";
// import { RequiredPrepMilliDto } from "chillnn-abr-hotel/dist/entity/dto/commonModules/modules/RequiredPrepMilliDto";
// // component
// import AppSelectBox from "@/components/Molecules/AppSelectBox.vue";

// @Component({
//     components: {
//         AppText,
//         AppSelectBox,
//     },
// })
// export default class ReserveLimitInput extends Vue {
//     @Prop() public requiredPrepMilliDto!: RequiredPrepMilliDto<{ requiredPrepMilli: number }>;

//     public limitDaysList: { key: string; value: number }[] = [
//         { key: "当日", value: 0 },
//         { key: "１日前", value: 1 },
//         { key: "２日前", value: 2 },
//         { key: "３日前", value: 3 },
//         { key: "４日前", value: 4 },
//         { key: "５日前", value: 5 },
//         { key: "６日前", value: 6 },
//         { key: "７日前", value: 7 },
//         { key: "10日前", value: 10 },
//         { key: "14日前", value: 14 },
//         { key: "20日前", value: 20 },
//         { key: "30日前", value: 30 },
//         { key: "40日前", value: 40 },
//         { key: "50日前", value: 50 },
//         { key: "60日前", value: 60 },
//         { key: "70日前", value: 70 },
//         { key: "80日前", value: 80 },
//         { key: "90日前", value: 90 },
//         { key: "100日前", value: 100 },
//     ];
//     public limitTimesList: { key: string; value: number }[] = [
//         { key: "01:00", value: 1 },
//         { key: "02:00", value: 2 },
//         { key: "03:00", value: 3 },
//         { key: "04:00", value: 4 },
//         { key: "05:00", value: 5 },
//         { key: "06:00", value: 6 },
//         { key: "07:00", value: 7 },
//         { key: "08:00", value: 8 },
//         { key: "09:00", value: 9 },
//         { key: "10:00", value: 10 },
//         { key: "11:00", value: 11 },
//         { key: "12:00", value: 12 },
//         { key: "13:00", value: 13 },
//         { key: "14:00", value: 14 },
//         { key: "15:00", value: 15 },
//         { key: "16:00", value: 16 },
//         { key: "17:00", value: 17 },
//         { key: "18:00", value: 18 },
//         { key: "19:00", value: 19 },
//         { key: "20:00", value: 20 },
//         { key: "21:00", value: 21 },
//         { key: "22:00", value: 22 },
//         { key: "23:00", value: 23 },
//         { key: "24:00", value: 24 },
//     ];
// }
// </script>

// <style lang="stylus" scoped></style>
