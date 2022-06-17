import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/services/list.service';
import { FormControl, FormGroup , Validators} from '@angular/forms';
import { iList } from 'src/app/interfaces/list.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  constructor(
    private listService: ListService,
    private toastService: ToastrService
  ) { }
  lists: any = [];
  list: iList = {
    title: ''
  };
  todoForm!: FormGroup;
  ngOnInit(): void {
    this.getLists();
    
    this.todoForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  getLists() {
    this.listService.getLists().subscribe(data => {
      this.lists = data;
    });
  }

  addList() {
    if (this.todoForm.value.name) {
      this.list.title = this.todoForm.value.name;
      this.listService.addList(this.list).subscribe(data =>{
        console.log('data :>> ', data);
        location.reload();
      });
    }else{
      this.toastService.warning('Campo de tarefas não pode estar vazio', 'Atenção')
      return;
    }
    console.log('add :>> ');
  }

}
