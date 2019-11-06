import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  url: string = environment.API_URL + "/foods";

  constructor(
    private http: HttpClient) {}


  getFoods() {
    return this.http.get(this.url);
  }

  save(food) {
    return this.http.post(this.url, food);
  }

  delete(id) {
    return this.http.delete(this.url + "/" + id);
  }
}
