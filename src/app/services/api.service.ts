/**
 * Created by ApolloYr on 2/5/2018.
 */
import { Injectable } from "@angular/core";
import { BasicApi } from "./basicapi.service";

@Injectable()
export class Api extends BasicApi {
    getCategoryList() {
        return this.get('/uploadmanagement/getCategoryList');
    }

    getImageList() {
        return this.get('/uploadmanagement/getImageList');
    }

    getImage(id) {
        return this.get('/uploadmanagement/getImage', { id: id });
    }

    checkout(data) {
        return this.post('/download/checkout', data);
    }

    download(code) {
        return this.get('/download/download/' + code);
    }
}