import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Todo} from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[];
  constructor(private http: HttpClient) {
  }

  getDataFromJson(): Observable<Todo[]> {
    return this.http.get<Todo[]>('assets/json/todo.json');
  }

  async delete(): Promise<any> {
    const todos: Todo[] = await this.getDataFromJson().toPromise();
    todos.forEach(todo => {
      if (todo.checked) {
        const deletedIndex = this.todos.findIndex(item => item.id === todo.id);
        this.todos.slice(deletedIndex, 1);
      }
    });
    return 'ok';
  }
}
