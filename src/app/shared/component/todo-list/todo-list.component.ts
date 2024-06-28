import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItem } from '../../model/todo.model';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, MatIconButton, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  animations: [
    trigger('itemAnimation', [
      state('void', 
        style({
          transform: 'translate3d(5%, 0, 0)',
          opacity: 0
        })
      ),
      state('enter', 
        style({opacity:1})
      ),
      transition('void => enter',[
        animate('0.8s cubic-bezier(0,.4,0,1)')
      ]),
      transition('leave => void',[
        animate('0.6s cubic-bezier(0,.4,0,1)')
      ])
    ])
  ]
})
export class TodoListComponent {
  @Input() items!: TodoItem[];
  @Output() deleteEvent = new EventEmitter<TodoItem>();

  // for animations
  private toEnter: TodoItem[] = [];
  private toLeave: TodoItem[] = [];

  // for animations
  animate(todoItem: TodoItem){
    let state = '';

    if(!this.toEnter.some(item => item.id === todoItem.id)){
      this.toEnter.push(todoItem);
      state = 'enter'; 
    }

    if(this.toLeave.some(item => item.id === todoItem.id)){
      this.toEnter.push(todoItem);
      state = 'leave'; 
    }

    return state;
  }

  onDelete(todoItem: TodoItem): void {
    this.toLeave.push(todoItem);
    this.deleteEvent.emit(todoItem);
  }
}
