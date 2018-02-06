export class Exercise {
    
      constructor(
        public _id: string,
        public workoutId:string,  
        public name: string,
        public weight:number,
        public reps:number,
        public sets:number
      ) {  }
    }