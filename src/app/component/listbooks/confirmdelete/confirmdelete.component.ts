import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirmdelete',
  templateUrl: './confirmdelete.component.html',
  styleUrl: './confirmdelete.component.css'
})
export class ConfirmdeleteComponent {

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
onConfirm() {
this.confirm.emit()
}
onCancel() {
this.cancel.emit()}

}

