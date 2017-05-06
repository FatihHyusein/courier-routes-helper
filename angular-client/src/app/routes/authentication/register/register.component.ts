import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Apollo} from 'apollo-angular';

import 'rxjs/add/operator/toPromise';

import {registerMutation} from '../authentication.model';

interface iRegisterFormObject {
    username: string,
    password: string
}

@Component({
    selector: 'register-component',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, OnDestroy {
    private registerFormObject: iRegisterFormObject = {username: '', password: ''};
    private errors;

    constructor(private route: ActivatedRoute,
                private apollo: Apollo) {
    }

    public ngOnInit(): void {
    }

    public submitForm(): void {
        debugger;

        if (!this.registerFormObject.username || !this.registerFormObject.password) {
            this.errors = [{message: 'All Fields are required'}];

            return;
        }

        debugger;
        this.apollo.mutate({
            mutation: registerMutation,
            variables: {
                username: this.registerFormObject.username,
                password: this.registerFormObject.password,
            },
        }).subscribe(() => {
            this.registerFormObject = {username: '', password: ''};
        });
    }

    public ngOnDestroy(): void {
    }
}
