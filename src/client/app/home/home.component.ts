import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { TransferState, makeStateKey } from '@angular/platform-browser'

const AVERAGES_KEY = makeStateKey('averages')

import { TranslateService, LangChangeEvent } from '@ngx-translate/core'

import { ResultService } from '../services/result.service'
import { MetaService } from '../services/meta.service'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [MetaService],
})
export class HomeComponent implements OnInit {
    public chartData: Array<any> = []
    public averages: any
    public inIframe: boolean = false

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private resultService: ResultService,
        private state: TransferState,
        private metaService: MetaService,
        private translate: TranslateService
    ) {}

    ngOnInit() {
        this.averages = this.state.get(AVERAGES_KEY, null as any)

        if (!this.averages) {
            this.resultService.getAverages().subscribe(res => {
                this.averages = res
                this.state.set(AVERAGES_KEY, res as any)
                this.formatChartData()
            })
        } else {
            this.formatChartData()
        }

        if (isPlatformBrowser(this.platformId)) {
            if (window.self !== window.top) {
                this.inIframe = true
            } else {
                this.inIframe = false
            }
        }

        this.metaService.constructMetaTags()
        this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.metaService.constructMetaTags()
        })
    }

    formatChartData() {
        const _chartData = []
        this.averages.categories.map(category => {
            _chartData.push({
                name: category.name,
                value: category.average,
                icon: category.icon,
                color: category.color,
                index: category.index,
            })
        })
        this.chartData = _chartData.sort((a, b) => {
            if (a.index < b.index) {
                return -1
            } else {
                return 1
            }
        })
    }
}
