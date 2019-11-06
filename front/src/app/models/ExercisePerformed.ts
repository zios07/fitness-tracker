import { User } from "./User";
import { Exercise } from "./Exercise";

export class ExercisePerformed {
    
    id: string;
    user: User;
    exercise: Exercise;
    date: Date;
    time: number;
    caloriesBurned: number;
}