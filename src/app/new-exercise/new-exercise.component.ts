import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Exercise } from '../models/exercise';
import { ExerciseService } from '../services/exercise-service';
import { Workout } from '../models/workout';
import { WorkoutService } from '../services/workout-service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-new-exercise',
  templateUrl: './new-exercise.component.html',
  styleUrls: ['./new-exercise.component.css']
})
export class NewExerciseComponent implements OnInit {

  model = new Exercise('', '', '', 0, 0, 0);
  workout : Workout = null;
  submitted = false;
  private workoutId: string = null;
  private exerciseId: string = null;
  private sub: Subscription;

  constructor(
    private exerciseService: ExerciseService,
    private workoutService: WorkoutService,
    private router: Router,
    private route: ActivatedRoute)
  { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.workoutId = <string>params['workoutId'];
      this.exerciseId = <string>params['exerciseId'];
    });

    if (this.workoutId) {
      this.workoutService.loadWorkout(this.workoutId).subscribe(workout => {
        this.workout = workout;
        console.log(this.workout);
      });
    }

    if (this.exerciseId) {
      this.exerciseService.loadExercise(this.workoutId,this.exerciseId).subscribe(ex => {
        this.model = ex;
        console.log(this.model);
      });
    }
  }

  createExercise() {

    this.submitted = true;

    this.exerciseService.saveExercise(this.model, this.workout).subscribe(data => {
      console.log(data);
      this.router.navigate(['/exercises', this.workout._id]);
      
    });
  }

  
  get diagnostic() {
    return JSON.stringify({ model: this.model, submitted: this.submitted });
  }
}