import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  id: any;
  data:any;
  checkOrder:any;
  show:any;
  index: any;
  status:any

  constructor(private order: OrderService, private activeRoute: ActivatedRoute) {
    this.id = this.activeRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getDetail()
  }
  getDetail() {
    this.order.getDetail(this.id).subscribe((res: any) => {
      this.data = res;
      console.log("Ở đây", this.data)
      this.show = false
      this.checkOrder = "active"
      this.index = res.history.length
    //   let detailStatus = res.history[this.index]
    //   if(detailStatus.includes)
    this.status = res.status
    })
  }
  
}
