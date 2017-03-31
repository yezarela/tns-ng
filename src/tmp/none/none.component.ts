import { Component, OnInit } from '@angular/core'
import { Page } from 'ui/page'
import { RouterExtensions } from 'nativescript-angular/router'


@Component({
    selector: '',
    templateUrl: '',
    styleUrls: ['']
})
export class NoneComponent implements OnInit {
    private isLoading = true
    private canGoBack: boolean

    constructor(
        private router: RouterExtensions,
        private page: Page,
    ) { }

    ngOnInit() {
        this.page.actionBarHidden = true;
        this.canGoBack = this.router.canGoBackToPreviousPage()
    }





}
