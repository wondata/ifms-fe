declare var Ext: any;
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { CreateVoucher } from '../../store/action/transactions.action';
@Component({
  selector: 'app-voucher-form',
  templateUrl: './voucher-form.component.html',
  styleUrls: ['./voucher-form.component.scss'],
})
export class VoucherFormComponent {
  isPhone = Ext.os.is.Phone;
  top = !this.isPhone ? '10' : null;
  left = !this.isPhone ? '10' : null;
  width = !this.isPhone ? '400' : null;
  height = !this.isPhone ? '600' : null;

  voucherForm: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly store: Store) {
    this.voucherForm = this.fb.group({
      OwnerCostCenter: ['', Validators.required],
      VoucherType: [''],
      Date: [''],
      SequenceNo: [''],
      OtherRefNo: [''],
      Amount: [''],
      ModeOfPayment: [''],
      Project: [''],
    });
  }
  ngOnInit(): void {}

  onSubmitVoucherForm(): void {
    if (this.voucherForm.valid) {
      this.voucherForm.markAsPristine();
      this.store
        .dispatch(new CreateVoucher(this.voucherForm.value))
        .subscribe(() => {
          Ext.toast('Successfully added VoucherForm');
        });
    } else {
      Ext.toast('All required fields should be filled!');
    }
  }
}
