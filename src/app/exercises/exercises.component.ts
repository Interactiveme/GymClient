import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ExerciseService } from '../services/exercise-service';
import { WorkoutService } from '../services/workout-service';
import { Workout } from '../models/workout';
import { Exercise } from '../models/exercise';
import {Router, ActivatedRoute} from '@angular/router';

import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit  {
  title = 'Exercises';   
  exercises: Exercise[];
  private sub: Subscription;
  private workoutId: String;
  private workout:Workout;



  constructor(
    private exerciseService: ExerciseService,
    private workoutService: WorkoutService,
    private router: Router,
    private route: ActivatedRoute    
  )
  {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.workoutId = <string>params['workoutId'];
    });

    if (this.workoutId) {
      this.workoutService.loadWorkout(this.workoutId).subscribe(workout => {
        this.workout = workout;
        console.log(this.workout);
        this.loadExerciseList();
      });
    }
    
  }

  loadExerciseList(){
    this.exerciseService.allExercises(this.workout).subscribe(
      exercises => 
      this.exercises = exercises
    );
  }

  deleteExercise(event, exercise){
    this.workoutService.deleteWorkout(exercise).subscribe(data => {
      this.loadExerciseList();
    });
  }

  editExercise(event, exercise){    
    this.router.navigate(['/exercises/new/',exercise.workoutId, exercise._id]);
  }

  addExercise(event){
    this.router.navigate(['/exercises/new', this.workout._id]);
  }
  
}
