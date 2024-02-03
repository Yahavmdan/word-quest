import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent {

  @Output()
  public onChangeState: EventEmitter<boolean> = new EventEmitter<boolean>(true);
  @Input()
  public value: boolean;

  public changeState(state: boolean): void {
    this.onChangeState.emit(state);
  }

}
