export class DeltaCalories {
    date: Date;
    caloriesBurned: number;
    caloriesEaten: number;
    delta: number;

    constructor(date:Date, caloriesBurned:number, caloriesEaten:number, delta:number) {
        this.date = date;
        this.caloriesBurned = caloriesBurned;
        this.caloriesEaten = caloriesEaten;
        this.delta = delta;
    }
}