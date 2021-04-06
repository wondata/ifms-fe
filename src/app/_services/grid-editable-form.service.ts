declare var Ext: any

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class GridEditableFormService {

    constructor() {}

    openGridEditableForm(grid: any, store: any, index: number, editablePlugin: any) {
        let form = Ext.factory(editablePlugin.getDefaultFormConfig());
        editablePlugin.form = form;
        var fields = editablePlugin.getEditorFields(grid.getColumns());
        var fs = form.down('fieldset');
        fs.setItems(fields);
        form.reset();
        form.setRecord(store.getAt(index));

        var toolbar = Ext.factory(editablePlugin.getToolbarConfig(), Ext.form.TitleBar);
        editablePlugin.submitButton = toolbar.down('button[action=submit]');
        toolbar.down('button[action=cancel]').on('tap', 'onCancelTap', editablePlugin);
        editablePlugin.submitButton.on('tap', 'onSubmitTap', editablePlugin);
        
        editablePlugin.sheet = grid.add({
            xtype: 'sheet',
            items: [toolbar,form],
            hideOnMaskTap: true,
            enter: 'right',
            exit: 'right',
            right: 0,
            width: 420,
            layout: 'fit',
            stretchY: true,
            hidden: true
        });
        editablePlugin.sheet.show();
    }

}