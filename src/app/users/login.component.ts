import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { UserService } from '../services/user-service';
import { User } from '../models/user';
import {Router} from '@angular/router';
import { StateService } from '../services/state-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit  {
  title = 'Login';   
  model = new User('', '', '');
  
  constructor(
    private userService: UserService,
    private router: Router,
    public stateService:StateService)
  {}

  ngOnInit(): void {
  }

  login ():void{
    console.log(this.model);
    this.userService.login(this.model).subscribe(data => {
      console.log(data);

      this.stateService.setState({
        session: data.token,
        isLoggedIn: true,
        userName : data.userName
      });
      
      this.router.navigate(['/workouts']);
      
    });;
  }

  navigateToRegister(event):void{
    console.log(event);
    this.router.navigate(['/register']);
  }

}