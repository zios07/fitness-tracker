import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  url: string = environment.API_URL + "/exercises";

  constructor(
    private http: HttpClient) {
  }

  getExercises() {
    return this.http.get(this.url);
  }

  save(exercise) {
    return this.http.post(this.url, exercise);
  }

  delete(id) {
    return this.http.delete(this.url + "/" + id);
  }
}
