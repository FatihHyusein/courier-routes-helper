import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Apollo} from 'apollo-angular';

import 'rxjs/add/operator/toPromise';
import {IUser} from "../../../../../../ts-server/typings";
import {usersQuery} from "../admin.model";

@Component({
    selector: 'users-component',
    templateUrl: 'users.component.html'
})
export class UsersComponent {
    private users: [IUser];

    constructor(private route: ActivatedRoute,
                private apollo: Apollo) {
    }

    public ngOnInit(): void {
        this.apollo.watchQuery({
            query: usersQuery
        }).subscribe(({data}) => {
            this.users = data['users'];
        });
    }
}
