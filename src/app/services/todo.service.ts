import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Todo} from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) {
  }

  getDataFromJson(): Observable<any> {
    return this.http.get('assets/json/todo.json');
  }

  async delete(arr: any[]): Promise<void> {
    arr.forEach(todo => {
      console.log(todo.value.name, ' ', todo.value.checked);
      if (todo.value.checked) {
        localStorage.removeItem(todo.key);
      }
    });
  }
}
