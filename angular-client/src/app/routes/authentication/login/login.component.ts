import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Apollo} from 'apollo-angular';

import 'rxjs/add/operator/toPromise';

import {registerMutation} from '../authentication.model';
interface iLoginFormObject {
    username: string,
    password: string
}

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html'
})
export class LoginComponent {
    private registerFormObject: iLoginFormObject = { username: '', password: '' };
    private errors;

    constructor(private route: ActivatedRoute,
                private apollo: Apollo) {
    }

    public ngOnInit(): void {
    }

    public submitForm(): void {
        if (!this.registerFormObject.username || !this.registerFormObject.password) {
            this.errors = [{ message: 'All Fields are required' }];

            return;
        }

        this.apollo.mutate({
            mutation: registerMutation,
            variables: {
                username: this.registerFormObject.username,
                password: this.registerFormObject.password,
            },
        }).toPromise()
            .then(() => {
                this.registerFormObject = { username: '', password: '' };
            })
            .catch(errors => this.errors = errors);
    }

    public ngOnDestroy(): void {
    }
}