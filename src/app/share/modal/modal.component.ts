import { Component, OnInit, Output, TemplateRef, ViewChild, EventEmitter, Input } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @ViewChild('modal') private modalContent!: TemplateRef<ModalComponent>;
  @Output() submitModalEvent = new EventEmitter<string>();
  @Output() resetModalEvent = new EventEmitter<string>();

  @Input() modalStyle: any;
  @Input() modalBody: any;
  @Input() modalButtonColor: any;
  @Input() modalTitle: any;
  private modalRef!: NgbModalRef;
  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static'
    config.keyboard = false
  }

  ngOnInit(): void {
  }
  
  reset(){
    this.resetModalEvent.emit();
  }
  
  submit(){
    this.submitModalEvent.emit();
  }
  open(size: any): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalContent, { size: size })
      this.modalRef.result.then((result) => {
        console.log(result);
        this.submitModalEvent.emit();
        this.resetModalEvent.emit();
      }, (reason) => {
        console.log(reason);
      });
    })
  }

}
