import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ListService } from 'src/app/services/list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { iTask } from 'src/app/interfaces/task.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-market-list',
  templateUrl: './market-list.component.html',
  styleUrls: ['./market-list.component.css']
})
export class MarketListComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private listService: ListService,
    private toastService: ToastrService
  ) { }
  dtoHelper!: any;
  lists: any = [];
  formGroup!: FormGroup;
  updateForm !: FormGroup;
  marketTasks: Array<any> = [];
  marketTask: iTask = {
    title: '',
    listId: 0
  }

  ngOnInit(): void {
    this.getLists();
    this.getMarketTasks();

    this.formGroup = new FormGroup({
      task: new FormControl('', [Validators.required]),
    });

    this.updateForm = new FormGroup({
      task: new FormControl('', [Validators.required])
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
      this.toastService.success('Tarefa adicionada com sucesso!');
      this.formGroup.reset();
      this.getMarketTasks();
    } else {
      this.toastService.warning('Campo de tarefa não pode ser vazio', 'Atenção');
      // window.alert('Campo de tarefa está vazio');
      return;
    }
  }

  markAsDone(id: number) {
    this.taskService.removeTask(id).subscribe();
    this.toastService.success('Tarefa conclúida !', 'Parabéns !');
    this.getMarketTasks();
  }

  removeTask(id: number){
    this.taskService.removeTask(id).subscribe();
    this.toastService.warning('Tarefa removida', 'Não foi dessa vez :(');
    this.getMarketTasks();
  }

  updateTask(item: any) {
    this.dtoHelper = item;
  }

  saveUpdate() {
    this.dtoHelper.title = this.formGroup.value.task
    this.taskService.updateTask(this.dtoHelper.id, this.dtoHelper).subscribe();
    this.toastService.success('Tarefa Atualizada', 'OK');
    this.formGroup.reset();
    this.getMarketTasks();
  }

  removeList(id: number) {
    console.log('id :>> ', id);
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