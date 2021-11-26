import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { collection, collectionData, Firestore, orderBy, query } from '@angular/fire/firestore';
import { Constants } from '@core/configs/constants';
import { AuthService } from '@core/services/auth.service';
import { deleteDoc, doc } from 'firebase/firestore';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  @ViewChild('dt1') dt1: any;

  data$!: Observable<any>;
  selectedData: any;
  constantsTable = Constants.table;
  cols!: any[];

  typeData = [
    { label: 'Buyer', value: 'buyer' },
    { label: 'Tennant', value: 'tennant' },
    { label: 'Agent', value: 'agent' },
    { label: 'Other', value: 'other' }
  ];

  constructor(
    private firestore: Firestore,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public authService: AuthService
  ) {
    const messagesRef: any = collection(this.firestore, 'messages');

    this.data$ = collectionData(
      query(messagesRef, orderBy('timestamp', 'desc')),
      { idField: 'id' }
    );
  }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'mobile', header: 'Mobile' },
      { field: 'email', header: 'Email' },
      { field: 'message', header: 'Message' },
      { field: 'type', header: 'Type' },
      { field: 'timestamp', header: 'Created At' }
    ];
  }

  onSearch(event: any) {
    this.dt1.filterGlobal(event.target.value, 'contains')
  }

  onDeleteSelectedData() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected messages?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        await this.selectedData.reduce(async (a: any, item: any) => {
          // Wait for the previous item to finish processing
          await a;
          // Process this item
          await await deleteDoc(doc(this.firestore, "messages", item.id));
        }, Promise.resolve());

        this.selectedData = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Messages Deleted', life: 3000 });
      }
    });
  }
}
