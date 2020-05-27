import {Injectable, NgZone} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Todo} from '../interfaces/todo';
import {SseService} from './sse.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient, private sseService: SseService, private zone: NgZone) {
  }

  getDataFromJson(): Observable<any> {
    return this.http.get('assets/json/todo.json');
  }

  getServerSentEvent(url: string) {
    return new Observable(observer => {
      const eventSource = this.sseService.getEventSource(url);

      eventSource.onmessage = event => {
        this.zone.run(() => {
          console.log('EVENT TUDUDUDUD');
          observer.next(event);
        });
      };

      eventSource.onerror = error => {
        this.zone.run(() => {
          console.log('ERROR TUDUDUDUD');
          observer.error(error);
        });
      };

    });
  }

  upload(): Observable<Todo> {
    return this.http.get<Todo>('http://localhost:3000/test');
  }

  async delete(arr: any[]): Promise<void> {
    arr.forEach(todo => {
      if (todo.value.checked) {
        localStorage.removeItem(todo.key);
      }
    });
  }
}
