import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent {

  @Output()
  public onChangeState: EventEmitter<boolean> = new EventEmitter<boolean>(true);
  @Input()
  public falseText: string;
  @Input()
  public trueText: string;

  public changeState(state: boolean): void {
    this.onChangeState.emit(state);
  }

}
