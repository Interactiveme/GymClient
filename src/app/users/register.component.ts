import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { UserService } from '../services/user-service';
import { User } from '../models/user';
import {Router} from '@angular/router';
import { StateService } from '../services/state-service';


@Component({
  selector: 'app-regiser',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit  {
  title = 'Login';   
  model = new User('', '', '');
  
  
  
  constructor(
    private userService: UserService,
    private stateService:StateService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  register ():void{
    console.log(this.model);
    this.userService.register(this.model).subscribe(data => {
        console.log(data);
        this.stateService.setState({
          session: data.token,
          isLoggedIn: true,
          userName : data.userName
        });
        this.router.navigate(['/workouts']);
        
      });;
  }

}