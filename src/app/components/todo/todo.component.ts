import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/services/list.service';
import { FormControl, FormGroup } from '@angular/forms';
import { iList } from 'src/app/interfaces/list.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  constructor(
    private listService: ListService
  ) { }
  lists: any = [];
  list: iList = {
    title: ''
  };
  todoForm!: FormGroup;
  ngOnInit(): void {
    this.getLists();
    
    this.todoForm = new FormGroup({
      name: new FormControl(''),
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
      window.alert('Lista não pode ser vazia!');
      return;
    }
    console.log('add :>> ');
  }

}
