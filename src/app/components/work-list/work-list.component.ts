import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.css']
})
export class WorkListComponent implements OnInit {

  constructor(private taskService: TaskService) { }
  workTasks: Array<any> = [];

  ngOnInit(): void {
    this.getWorkTasks();
  }

  getWorkTasks() {
    this.taskService.getTasks().subscribe((data: Array<any>) => {
      this.workTasks = data.filter(task => task.listId == 2);
    });
  }

  addWorkTask(){
    
  }

}
