import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class StateService {
     isLoggedIn = false;
     session= "";
     userName ="";

    constructor(    
        private router: Router,
        private cookieService: CookieService
        
    ) {

        var session = this.cookieService.get("tokenKey");      
        var isLoggedIn = false;
        if(session != "")
            isLoggedIn = true;
        
        var userName = this.cookieService.get("userName");      
        this.setState({
            isLoggedIn:isLoggedIn,
            session:session,
            userName:userName
        });

    }

    setState(state){
        console.log(state);
        this.isLoggedIn = state.isLoggedIn;
        this.session = state.session;
        this.userName = state.userName;

        this.cookieService.set("tokenKey",this.session);      
        this.cookieService.set("userName",this.userName);      
    }

    logout(){
        this.isLoggedIn = false;
        this.session = "";
        this.userName ="";
        this.cookieService.set("tokenKey",this.session);      
        this.cookieService.set("userName",this.userName);      
        
        this.router.navigate(['/']);
        
    }
}