import { Component, OnInit } from '@angular/core';
import {Todo} from '../../interfaces/todo';
import {HttpClient} from '@angular/common/http';
import {TodoService} from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  name: string;
  constructor(
    private http: HttpClient,
    private service: TodoService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.todos = await this.service.getDataFromJson().toPromise();
    this.service.todos = this.todos;
  }

  addTodo(): void {
    this.todos.push({
      id: Math.max(...this.todos.map(todo => todo.id)) + 1,
      name: this.name,
      checked: false,
    });
  }

  deleteTodos(): void {
    this.service.delete();
  }
}
