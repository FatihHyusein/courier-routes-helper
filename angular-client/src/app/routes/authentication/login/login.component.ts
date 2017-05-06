import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Apollo} from 'apollo-angular';

import 'rxjs/add/operator/toPromise';

import {loginMutation} from '../authentication.model';
interface iLoginFormObject {
    username: string,
    password: string
}

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html'
})
export class LoginComponent {
    private registerFormObject: iLoginFormObject = {username: '', password: ''};
    private errors;

    constructor(private route: ActivatedRoute,
                private apollo: Apollo) {
    }

    public ngOnInit(): void {
    }

    public submitForm(): void {
        if (!this.registerFormObject.username || !this.registerFormObject.password) {
            this.errors = [{message: 'All Fields are required'}];
            return;
        }

        this.apollo.mutate({
            mutation: loginMutation,
            variables: {
                username: this.registerFormObject.username,
                password: this.registerFormObject.password,
            },
        }).subscribe(({data}) => {
            if (data['login'].tokens) {
                localStorage.token = data['login'].tokens[0];
            }

            this.registerFormObject = {username: '', password: ''};
            this.errors = [];
        }, (error) => {
            this.errors = error.graphQLErrors;
        });
    }

    public ngOnDestroy(): void {
    }
}
