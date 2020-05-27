import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TodoService} from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos = [];
  name: string;
  constructor(
    private http: HttpClient,
    private service: TodoService
  ) {
  }

  async ngOnInit(): Promise<void> {
    const evtSource1 = new EventSource('http://localhost:3000/companies/connect');
    evtSource1.addEventListener('message', event => {
      const data = JSON.parse(event.data);
      console.log(data);
    });
  }

  addTodo(): void {
    const todo = {
      name: this.name,
      checked: false,
    };
    const id = this.findNewId();
    this.todos.push({key: id, value: todo});
    localStorage.setItem(id, JSON.stringify(todo));
    this.name = '';
  }

  getAll(): any[] {
    const arr = [];
    for (let i = 0; i < localStorage.length; i++){
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      arr.push({key, value: JSON.parse(value)});
    }
    arr.sort((a, b) => parseInt(a.key, 10) - parseInt(b.key, 10));
    this.todos = arr;
    return arr;
  }

  findNewId(): string {
    let max = 0;
    for (let i = 0; i < localStorage.length; i++) {
      if (!!parseInt(localStorage.key(i), 10) && parseInt(localStorage.key(i), 10) > max) {
        max = parseInt(localStorage.key(i), 10);
      }
    }
    return (max + 1).toString();
  }

  deleteTodos(): void {
    const all = this.getAll();
    this.service.delete(all);
  }

  deleteTodo(key): void {
    localStorage.removeItem(key);
    const index = this.todos.findIndex(item => item.key === key);
    this.todos.slice(index, 1);
  }

  check(id): void {
    const index = this.todos.findIndex(item => item.key === id);
    this.todos[index].value.checked = !this.todos[index].value.checked;
    const todoValue = localStorage.getItem(id);
    const value = JSON.parse(todoValue);
    value.checked = !value.checked;
    localStorage.setItem(id, JSON.stringify(value));
  }
}
