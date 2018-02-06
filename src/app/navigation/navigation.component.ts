import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { StateService } from '../services/state-service';


@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
  })
export class NavigationComponent implements OnInit{
    isExpanded = false;
    //isLoggedIn = false;
    classes =[
        "collapse" ,
        "navbar-collapse"
    ];
    constructor( public stateService:StateService) { }
  
    ngOnInit(): void {       
        
    }

    logout(){
        this.stateService.logout();

    }
    
    toggleMenu() {
      this.isExpanded = !this.isExpanded;
      if(this.isExpanded){
        this.classes =[
            "navbar-collapse"
        ];
      }else{
        this.classes =[
            "collapse" ,
            "navbar-collapse"
        ];
      }
    }
  }