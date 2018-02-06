import { Injectable } from '@angular/core';
import {Headers} from '@angular/http';
import {Http, Response,  RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Exercise } from '../models/exercise';
import { Workout } from '../models/workout';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class ExerciseService {

    url = 'http://localhost:3000/exercises';
    httpOptions = {
        headers: new HttpHeaders({ 
            'Content-Type': 'application/json',
            "x-access-token":this.cookieService.get("tokenKey")
         })
    };

    constructor(private http:HttpClient, private cookieService: CookieService) { }
    
    allExercises(workout: Workout):Observable<Exercise[]> {
        return this.http.get<Exercise[]>(`${this.url}/${workout._id}`);
    }

    loadExercise(id:any,exerciseId:any){
        const url = `${this.url}/${id}/${exerciseId}`;
        return this.http.get<Exercise>(url);
    }

    saveExercise (exercise: Exercise, workout:Workout) :Observable<any>{
        let item = {
            workoutId:workout._id,  
            name: exercise.name,
            weight:exercise.weight,
            reps:exercise.reps,
            sets:exercise.sets
        };
        
        if(exercise._id){
            const url = `${this.url}/${exercise._id}`;
            return this.http.put(
                url,
                item,
                this.httpOptions
            );
        }else{
            return this.http.post(
                this.url,
                item,
                this.httpOptions
            );
        }
    }
}