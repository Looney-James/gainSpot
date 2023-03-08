import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { EquipmentService } from './equipment.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {

  public selectedEquipment = {
    name: '',
    status: '',
    comments: ''
  };

  @ViewChild('reportModal') reportModal!: TemplateRef<any>;

  constructor(
    private equipmentService: EquipmentService,
    private modalService: NgbModal,
    private db: AngularFireDatabase
  ) { }

  ngOnInit(): void {
  }

  openReportModal() {
    this.modalService.open(this.reportModal);
  }

  submitReport() {
    const report = {
      name: this.selectedEquipment.name,
      status: this.selectedEquipment.status,
      comments: this.selectedEquipment.comments,
      timestamp: Date.now()
    };
    this.db.list('/reports').push(report);
    this.modalService.dismissAll();
  }
}