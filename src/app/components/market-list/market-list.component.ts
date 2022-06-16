import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ListService } from 'src/app/services/list.service';
import { FormControl, FormGroup } from '@angular/forms';
import { iTask } from 'src/app/interfaces/task.interface';

@Component({
  selector: 'app-market-list',
  templateUrl: './market-list.component.html',
  styleUrls: ['./market-list.component.css']
})
export class MarketListComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    private listService: ListService
  ) { }
  ids: any = [];
  lists: any = [];
  formGroup!: FormGroup;
  marketTasks: Array<any> = [];
  x: Array<any> = [];
  marketTask: iTask = {
    title: '',
    listId: 0
  }

  ngOnInit(): void {
    this.getLists();
    this.getMarketTasks();

    this.formGroup = new FormGroup({
      task: new FormControl(''),
    });
  }

  getMarketTasks() {
    this.taskService.getTasks().subscribe((data: Array<any>) => {
      this.marketTasks = data.filter(task => task.listId);
    });
  }

  addMarketTask(listId: number) {
    if (this.formGroup.value.task) {
      this.marketTask.title = this.formGroup.value.task;
      this.marketTask.listId = listId;
      this.taskService.addTask(this.marketTask).subscribe();
      this.formGroup.reset();
      this.getMarketTasks();
    } else {
      window.alert('Tarefa vazia !');
      return;
    }
  }

  markAsDone(id: any) {
    this.taskService.removeTask(id).subscribe();
    this.getMarketTasks();
  }

  updateTask(item: any) {
    if (this.formGroup.value.task) {
      item.title = this.formGroup.value.task;
      this.taskService.updateTask(item.id, item).subscribe();
    } else {
      window.alert('Tarefa vazia!');
      return;
    }
  }

  removeList(id: number) {
    console.log('id :>> ', id);
    this.listService.removeList(id).subscribe(data => {
      console.log('data :>> ', data);
    });
    this.getLists();
  }

  getLists() {
    this.listService.getLists().subscribe(data => {
      this.lists = data;
    })
  }
}