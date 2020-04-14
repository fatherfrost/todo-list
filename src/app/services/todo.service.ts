import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Todo} from '../interfaces/todo';

export enum Status {
  success = 'success',
  error = 'error'
}
export interface ServerResponse {
  status: Status;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[];

  constructor(private http: HttpClient) {
  }

  getDataFromJson(): Observable<any> {
    return this.http.get('assets/json/todo.json');
  }

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('http://localhost:4201/api/todos/');
  }

  getTodoById(id): Observable<Todo> {
    return this.http.get<Todo>('http://localhost:4201/api/todos/' + id);
  }

  createTodo(text): Observable<Todo> {
    return this.http.post<Todo>('http://localhost:4201/api/todos', {text});
  }

  deleteTodo(id: string): Observable<ServerResponse> {
    return this.http.delete<ServerResponse>('http://localhost:4201/api/todos/' + id);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>('http://localhost:4201/api/todos/' + todo.id, {text: todo.text});
  }

  findTodo(text): Observable<Todo[]> {
    return this.http.get<Todo[]>('http://localhost:4201/api/todos?text=' + text);
  }
}
