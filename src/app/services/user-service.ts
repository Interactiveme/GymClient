import { Injectable } from '@angular/core';
import {Headers} from '@angular/http';
import {Http, Response,  RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';

@Injectable()
export class UserService {
    
    url = 'http://localhost:3000/user';
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http:HttpClient) { }

    login (user:User) :Observable<any>{
        debugger;
        const url = `${this.url}/login`;
        return this.http.post(
            url,
            {
                userName:user.userName,
                password:user.password
            },
            this.httpOptions
        );    
    }

    register (user:User) :Observable<any>{
        debugger;
        const url = `${this.url}/register`;
        return this.http.post(
            url,
            {
                userName:user.userName,
                password:user.password
            },
            this.httpOptions
        );    
    }

} 