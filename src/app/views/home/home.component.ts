import { Chart } from 'chart.js';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../share/modal/modal.component';
import { Account } from 'src/app/model/account';
import { AccountService } from 'src/app/services/account.service';

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

  
  public chart: any;
  show = true;
  data: any = Account;
  name: any;
  id: any;
  step: boolean = true;
  totalPage: any;
  totalElement: any;
  currentPage: any;
  numbers: any;
  req = {
    textSearch: null,
    active: null,
    role: null,
    customerTypeId: null,
    pageReq: {
      page: 0,
      pageSize: 10,
      sortField: null,
      sortDirection: null
    }
  }

  constructor(private account: AccountService) {
    this.today = new Date();
    this.createChart();
  }

  ngOnInit(): void {
    this.createChart();
    this.getAllAccount();
  }

  getAllAccount() {
    this.account.getAllAccount(this.req).subscribe((res: any) => {
      this.data = res.data;
      console.log(res.data);
      this.show = false
      this.totalPage = res.totalPages;
      console.log("Total Page", res.totalPages)
      this.currentPage = res.page;
      console.log("current Page", res.page);
      this.numbers = Array(this.totalPage).fill(0).map((x, i) => i + 1);
      console.log(this.numbers)
      this.totalElement = res.totalElements
    });
  }

  createChart(){
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	       datasets: [
          {
            label: "Báo cáo đơn hàng",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'green'
          },
          // {
          //   label: "Profit",
          //   data: ['542', '542', '536', '327', '17',
					// 				 '0.00', '538', '541'],
          //   backgroundColor: 'limegreen'
          // }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
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
