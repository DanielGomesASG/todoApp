import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ListService } from 'src/app/services/list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { iTask } from 'src/app/interfaces/task.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private listService: ListService,
    private toastService: ToastrService
  ) { }
  dtoHelper!: any;
  lists: any = [];
  formGroup!: FormGroup;
  updateForm !: FormGroup;
  listTasks: Array<any> = [];
  listTask: iTask = {
    title: '',
    listId: 0
  }

  ngOnInit(): void {
    this.getLists();
    this.getAppTasks();

    this.formGroup = new FormGroup({
      task: new FormControl('', [Validators.required]),
    });

    this.updateForm = new FormGroup({
      task: new FormControl('', [Validators.required])
    });
  }

  getAppTasks() {
    this.taskService.getTasks().subscribe((data: Array<any>) => {
      this.listTasks = data.filter(task => task.listId);
    });
  }

  addTask(listId: number) {
    if (this.formGroup.value.task) {
      this.listTask.title = this.formGroup.value.task;
      this.listTask.listId = listId;
      this.taskService.addTask(this.listTask).subscribe(data => {
        this.getAppTasks()
      });
      this.toastService.success('Tarefa adicionada com sucesso!');
      this.formGroup.reset();
    } else {
      this.toastService.warning('Campo de tarefa não pode ser vazio', 'Atençãoa');
      // window.alert('Campo de tarefa está vazio');
      return;
    }
  }

  markAsDone(id: number) {
    this.taskService.removeTask(id).subscribe();
    this.toastService.success('Tarefa conclúida !', 'Parabéns !');
    this.getAppTasks();
  }

  removeTask(id: number){
    this.taskService.removeTask(id).subscribe();
    this.toastService.warning('Tarefa removida', 'Não foi dessa vez :(');
    this.getAppTasks();
  }

  updateTask(item: any) {
    this.dtoHelper = item;
  }

  saveUpdate() {
    this.dtoHelper.title = this.formGroup.value.task
    this.taskService.updateTask(this.dtoHelper.id, this.dtoHelper).subscribe();
    this.toastService.success('Tarefa Atualizada', 'OK');
    this.formGroup.reset();
    this.getAppTasks();
  }

  removeList(id: number) {
    this.listService.removeList(id).subscribe();
    this.toastService.warning('Lista removida', 'Removido');
    this.getLists();
  }

  getLists() {
    this.listService.getLists().subscribe(data => {
      this.lists = data;
    });
  }
}
