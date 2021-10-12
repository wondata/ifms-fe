declare var Ext: any;
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ListAccounts, ListBankReconciliation } from '../../store/action/transactions.action';
import { TransactionsState } from '../../store/states/transactions.state';

@Component({
  selector: 'app-bankreconciliation',
  templateUrl: './bankreconciliation.component.html',
  styleUrls: ['./bankreconciliation.component.scss'],
})
export class BankReconciliationComponent implements OnInit {
  @Select(TransactionsState.listBankReconciliation) listBankReconciliation$: Observable<any>;
  @Select(TransactionsState.listAccounts) listAccounts$: Observable<any>;

    data_bankReconcil = Ext.create('Ext.data.Store', {
    });

    data_slaAccount = Ext.create('Ext.data.Store', {
    });

    data_show = [
         {"name":"All","abbrev":"ALL"},
         {"name":"Check/ Bank Debit","abbrev":"C/BD"},
         {"name":"Deposit","abbrev":"Bank Credit"}
     ];

    formRef : any;

  constructor(private readonly store: Store) {

  }

  stored: any;

  ngOnInit() {
    this.store.dispatch(new ListBankReconciliation());
    this.store.dispatch(new ListAccounts());

     this.listBankReconciliation$.subscribe((data) => {
        this.data_bankReconcil.setData(data);
      });
    this.listAccounts$.subscribe((data) => {
        this.data_slaAccount.setData(data);
      });
  }

  onReady = (event) => {
    this.formRef = event.cmp;

  }

  onPreview = (event) => {

    }

  onSave = (event) => {

    }

}
