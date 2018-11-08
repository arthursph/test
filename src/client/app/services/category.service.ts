import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class CategoryService {
    constructor(public http: HttpClient) {}

    getAllCategories(): Observable<any> {
        return this.http
            .get('/api/categories')
    }

    getCategoryByName(category): Observable<any> {
        return this.http
            .get('/api/category/name/' + category)
    }
}
