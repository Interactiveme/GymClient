import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { WorkoutService } from '../services/workout-service';
import { Workout } from '../models/workout';
import {Router} from '@angular/router';


@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit  {
  title = 'Workouts';   
  workouts: Workout[];
  
  constructor(
    private workoutService: WorkoutService,
    private router: Router)
  {
  }

  ngOnInit(): void {
    this.loadWorkoutList();
  }

  loadWorkoutList(){
    this.workoutService.allWorkouts().subscribe(
      workouts => 
      this.workouts = workouts
    );
  }

  deleteWorkout(event, workout){
    this.workoutService.deleteWorkout(workout).subscribe(data => {
      this.loadWorkoutList();
    });
  }

  viewExercise(event, workout){
    this.router.navigate(['/exercises', workout._id]);
  }
}
