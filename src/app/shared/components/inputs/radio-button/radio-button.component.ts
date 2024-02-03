import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent {

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
