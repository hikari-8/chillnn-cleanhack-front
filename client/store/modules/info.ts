import { ErrorCode } from 'chillnn-cleanhack-abr'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

export interface IInfoObject {
    type: 'INFO' | 'WARNING' | 'ERROR'
    message: string
    errCode?: ErrorCode
}

@Module({
    stateFactory: true,
    name: 'modules/info', // store以下のファイル構造に一致させる。
    namespaced: true,
})
export default class InfoModule extends VuexModule {
    private infos: IInfoObject[] = []

    public get getInfos() {
        return this.infos
    }

    @Action
    public addInfo(info: IInfoObject) {
        this.ADD_INFO(info)

        if (info.type === 'INFO') {
            setTimeout(() => {
                this.removeInfo(info)
            }, 3000)
        }
    }

    @Action
    public removeInfo(info: IInfoObject) {
        this.REMOVE_INFO(info)
    }

    @Action
    public removeAllErrors() {
        this.REMOVE_ALL_ERRORS()
    }

    @Mutation
    private ADD_INFO(info: IInfoObject) {
        this.infos.push(info)
    }

    @Mutation
    private REMOVE_INFO(info: IInfoObject) {
        this.infos = this.infos.filter((item) => item !== info)
    }

    @Mutation
    private REMOVE_ALL_ERRORS() {
        this.infos = this.infos.filter((item) => item.type !== 'ERROR')
    }
}
