import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ExercisePerformed } from '../models/ExercisePerformed';

@Injectable({
  providedIn: 'root'
})
export class ExerciseTrackerService {

  url: string = environment.API_URL + "/exercises/tracker";

  constructor(
    private http: HttpClient) {}

  getExercises() {
    return this.http.get(this.url);
  }

  save(exercicePerformed: ExercisePerformed) {
    return this.http.post(this.url, exercicePerformed);
  }

  delete(id) {
    return this.http.delete(this.url + "/" + id);
  }

  getByDate(date) {
    return this.http.get(this.url + "/search?date=" + date);
  }

}
