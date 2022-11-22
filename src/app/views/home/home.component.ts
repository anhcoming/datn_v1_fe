import { Chart } from 'chart.js/auto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../share/modal/modal.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  today: any;
  @ViewChild('modal') private modal!: ModalComponent
  modalStyle = 'modal-style-primary'
  modalTitle = 'Bạn có muốn xóa thành phần này'
  modalBody = 'Nội dung bên trong'
  modalColorButton = 'btn-primary'


  constructor() {
    this.today = new Date();
  }

  ngOnInit(): void {
  }

  reset() {
    console.log("reset");
  }

  submit = () => {
    console.log("Submit")
  }

  open() {
    this.modal.open('xxl')
  }
}
