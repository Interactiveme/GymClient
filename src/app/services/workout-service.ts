import { Injectable } from '@angular/core';
import {Headers} from '@angular/http';
import {Http, Response,  RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { Workout } from '../models/workout';

@Injectable()
export class WorkoutService {

    //url = 'http://localhost:3000/workouts';
    url = 'https://gymserver100.herokuapp.com/workouts';
    httpOptions = {
        headers: new HttpHeaders({ 
            'Content-Type': 'application/json',
            "x-access-token":this.cookieService.get("tokenKey")
         })
    };
    
    constructor(private http:HttpClient, private cookieService: CookieService) { }
        
    allWorkouts() :Observable<Workout[]> {
        return this.http.get<Workout[]>(this.url);
    }

    loadWorkout(id:any){
        const url = `${this.url}/${id}`;
        return this.http.get<Workout>(url);
    }

    deleteWorkout(workout){
        const url = `${this.url}/${workout._id}`;
        return this.http.delete(
            url,
            this.httpOptions
        );
    }

    saveWorkout (workout:Workout) :Observable<any>{
        if(workout._id){
            const url = `${this.url}/${workout._id}`;
            return this.http.put(
                url,
                {
                    name:workout.name
                },
                this.httpOptions
            );
        }else{
            return this.http.post(
                this.url,
                {
                    name:workout.name
                },
                this.httpOptions
            );
        }
    }
} 