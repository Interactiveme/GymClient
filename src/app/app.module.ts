import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HttpClientModule,HttpInterceptor,HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

//import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
//import { TooltipModule } from 'ngx-bootstrap/tooltip';
//import { ModalModule } from 'ngx-bootstrap/modal';

//import { TransitionModule } from 'ngx-bootstrap/transition';
//import { AlertModule } from 'ngx-bootstrap/alert';
//import { ButtonModule } from 'ngx-bootstrap/button';
//import { CarouselModule } from 'ngx-bootstrap/carousel';
//import { CollapseModule } from 'ngx-bootstrap/collapse';

//import { PopoverModule } from 'ngx-bootstrap/popover';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//import { ScrollspyModule } from 'ngx-bootstrap/scrollspy';
//import { TabModule } from 'ngx-bootstrap/tab';
//import { AffixModule } from 'ngx-bootstrap/affix';





import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';

import { WorkoutsComponent } from './workouts/workouts.component';
import { NewExerciseComponent } from './new-exercise/new-exercise.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { NewWorkoutComponent } from './new-workout/new-workout.component';
import { WorkoutService } from './services/workout-service'; 
import { LoginComponent } from './users/login.component';
import { RegisterComponent } from './users/register.component';
import { UserService } from './services/user-service'; 
import { AuthInterceptor } from './services/auth-interceptor'; 
import { ExerciseService } from './services/exercise-service'; 
import { StateService } from './services/state-service';

const routes =[{
  path:'workouts',
  component:WorkoutsComponent
},{
  path:'workouts/new/:id',
  component:NewWorkoutComponent
},{
  path:'workouts/new',
  component:NewWorkoutComponent
},{
  path:'login',
  component:LoginComponent
},{
  path:'register',
  component:RegisterComponent
},{
  path:'exercises/new/:workoutId',
  component:NewExerciseComponent
},{
  path:'exercises/new/:workoutId/:exerciseId',
  component:NewExerciseComponent
},{
  path:'exercises/:workoutId',
  component:ExercisesComponent
}];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    WorkoutsComponent,
    NewWorkoutComponent,
    NewExerciseComponent,
    ExercisesComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes)//,
//    NgbModule.forRoot(),
  //  BsDropdownModule.forRoot(),
   // TooltipModule.forRoot(),
   // ModalModule.forRoot(),
   // AlertModule.forRoot(),
   // CarouselModule.forRoot(),
   // CollapseModule.forRoot(),
   // PopoverModule.forRoot()
  ],
  providers: [
    StateService,
    WorkoutService,
    UserService,
    CookieService,
    ExerciseService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
    ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
