import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Workout } from '../models/workout';
import { WorkoutService } from '../services/workout-service';
import { ExerciseService } from '../services/exercise-service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.css']
})
export class NewWorkoutComponent implements OnInit {

  model = new Workout('', '');
  submitted = false;
  private id: string = null;
  private sub: Subscription;

  constructor(
    private workoutService: WorkoutService,
    private router: Router,
    private route: ActivatedRoute)
  { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = <string>params['id'];
    });

    if (this.id) {
      this.workoutService.loadWorkout(this.id).subscribe(workout => {
        this.model = workout;
      });
    }
  }

  createWorkout() {

    this.submitted = true;

    this.workoutService.saveWorkout(this.model).subscribe(data => {
      this.router.navigate(['/workouts']);
    });
  }

  get diagnostic() {
    return JSON.stringify({ model: this.model, submitted: this.submitted });
  }
}