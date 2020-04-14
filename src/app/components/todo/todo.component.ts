import { Component, OnInit } from '@angular/core';
import {Todo} from '../../interfaces/todo';
import {HttpClient} from '@angular/common/http';
import {ServerResponse, Status, TodoService} from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[];
  todosCopy: Todo[];
  todoText: string;
  editedTodoIndex: number;
  searchText: string;
  foundTodos: Todo[];

  constructor(
    private http: HttpClient,
    private dataService: TodoService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.dataService.getAllTodos().subscribe(
      (todoList: Todo[]) => {
        this.todos = this.todosCopy = todoList;
        this.filterTodosArray();
      }
    );
  }

/*  addTodo1(): void {
    const todo = {
      id: Math.max(...this.todos.map(item => item.id)) + 1,
      text: this.name
    } as Todo;
    this.todos.push(todo);
  }*/

  deleteTodo(todo: Todo): void {
    this.editedTodoIndex = undefined;
    this.dataService.deleteTodo(todo.id).subscribe((response: ServerResponse) => {
      if (response.status === Status.success) {
        this.todos = this.todos.filter((t: Todo) => {
          return t.id !== response.id;
        });
      }
    });
  }

  addTodo(): void {
    if (this.todoText) {
      this.dataService.createTodo(this.todoText).subscribe((newTodo: Todo) => {
        const isTodoExist = this.todos.some((todo: Todo) => {
          return todo.id === newTodo.id;
        });
        if (!isTodoExist) {
          this.todos.push(newTodo);
        }
      });
      this.todoText = '';
    } else {
      alert('This input must be заполненно');
    }
  }

  clickTodo(todo): void {
    this.dataService.getTodoById(todo.id).subscribe((t: Todo) => {
      console.log(`You clicked on todo #${t.id}`);
    });
  }

  editTodo(index) {
    if (this.editedTodoIndex === index) {
      this.dataService.updateTodo(this.todos[index]).subscribe((newTodo: Todo) => {
        this.editedTodoIndex = undefined;
      });
    } else {
      this.editedTodoIndex = index;
    }
  }

  updateText($event: any) {
    this.todos[this.editedTodoIndex].text = $event;
  }

  searchTodo() {
    this.dataService.findTodo(this.searchText).subscribe((todosArr: Todo[]) => {
      this.foundTodos = todosArr;
      this.searchText = undefined;
      console.log(this.foundTodos);
    });
  }

  resetTodo() {
    this.foundTodos = [];
  }

  filterTodosArray(event?) {
    const text = event?.target?.value || '';
    this.todos = text ? this.todosCopy.filter(todo => todo.text === text) : this.todosCopy;
    console.log(this.todos);
  }
}
