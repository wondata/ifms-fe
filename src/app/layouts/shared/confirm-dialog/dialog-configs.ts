import { MatDialogConfig } from "@angular/material/dialog";

export class ConfirmDeleteDialogConfig extends MatDialogConfig {

    constructor(data: any = {}) {
        super();

        this.width = "500px";
        this.data = {
            title: "Confirmation",
            message: "Are you sure you want to delete the selected record?"
        };
        this.disableClose = true
    }
}