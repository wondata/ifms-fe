declare var Ext: any;
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ChartOfAccountModel } from 'src/app/models/defaultSettings';
import { GridEditableFormService } from 'src/app/_services/grid-editable-form.service';
import { GetChildChartOfAccounts, ListChartsOfAccount, SaveChildChartAccount } from '../../store/action/transactions.action';
import { TransactionsState } from '../../store/states/transactions.state';


@Component({
  selector: 'app-chartofaccount',
  templateUrl: './chartofaccount.component.html',
  styleUrls: ['./chartofaccount.component.scss'],
})
export class ChartOfAccountComponent implements OnInit {

  @Select(TransactionsState.chartsOfAccount) listChartOfAccount$: Observable<any>;
  @Select(TransactionsState.getChildChartofAccounts) getChildChartofAccounts$: Observable<any>;

  grid: any;
  chartAccount: ChartOfAccountModel;
  editablePlugin: any;
  chartOfAccountData : any[];

  gridStore = Ext.create('Ext.data.Store', {

  });

  treeStore = Ext.create('Ext.data.TreeStore', {
    rootVisible: false
  });

  constructor(private readonly store: Store,
    private gridEditableFormService: GridEditableFormService) {

  }
  ngOnInit() {
    this.store.dispatch(new ListChartsOfAccount());

    this.listChartOfAccount$.subscribe((stateValue) => {
      this.treeStore.setRoot(stateValue);
      this.chartOfAccountData = stateValue;
    });
  }

    onTooltip = (component, tooltip, node, element, event) => {
      const record = node.data,
        name = record.get('Name'),
        code = record.get('Code'),
        count = record.get('count');
        tooltip.setHtml(`<span style="font-weight: bold">${name}</span><br>${code}<br>${count}`);
    }

    deleteChildChartAccount = (grid, info) => {

    }

    onChilddoubletap = ({ sender, location }) => {
      this.gridEditableFormService.openGridEditableForm(this.grid, this.gridStore, location.recordIndex, this.editablePlugin);
    }

    onGridReady = function(event) {
      this.grid = event.cmp;
      // this.getChartOfAccounts();
      this.editablePlugin = this.grid.getPlugins()[0];
      var cmp = this;

      this.editablePlugin.onSubmitTap = Ext.Function.createInterceptor(this.editablePlugin.onSubmitTap, function (name) {
        cmp.save(this.form.getValues());
        this.sheet.hide(); //hides the drawer
        return false; //return false if you don't want the default submit operation to be executed
      });
    }

    onSelect = ({ sender, selected }) => {
      let selectedItem = selected[0].data;

      this.chartAccount ={
        Id: selectedItem.Id,
        Name: selectedItem.Name,
        Code: selectedItem.Code,
        Type: selectedItem.Type,
        ParentId: selectedItem.ParentId
      };

      this.store.dispatch(new GetChildChartOfAccounts(this.chartAccount));
      this.getChildChartofAccounts$.subscribe((data) => {
          this.gridStore.setData(data);
      });
    };

    onAddNew = function () {
      const newModel = {} as any;
      let index = 0;
      this.gridStore.insert(index, newModel);

      this.gridEditableFormService.openGridEditableForm(this.grid, this.gridStore, index, this.editablePlugin);
    }

    save(param: any) {

      param.ParentId = this.chartAccount.Id;
      // param.Id = this.chartAccount.ParentId;
      param.Type = this.chartAccount.Type;

    this.store.dispatch(new SaveChildChartAccount(param));
  }


}
