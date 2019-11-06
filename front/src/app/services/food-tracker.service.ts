import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FoodEaten } from '../models/FoodEaten';

@Injectable({
  providedIn: 'root'
})
export class FoodTrackerService {

  url: string = environment.API_URL + "/foods/tracker";

  constructor(
    private http: HttpClient) {}

  getFoods() {
    return this.http.get(this.url);
  }

  save(foodEaten: FoodEaten) {
    return this.http.post(this.url, foodEaten);
  }

  delete(id) {
    return this.http.delete(this.url + "/" + id);
  }

  getByDate(date) {
    return this.http.get(this.url + "/search?date=" + date);
  }

}
