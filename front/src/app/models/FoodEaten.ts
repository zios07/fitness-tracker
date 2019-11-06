import { User } from "./User";
import { Food } from "./Food";

export class FoodEaten {
    id: string;
    user: User;
    food: Food;
    date: Date;
    servingQty: number;
    caloriesEaten: number;
}