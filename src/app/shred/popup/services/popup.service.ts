import { ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, Injectable, Type } from '@angular/core';
import { PopupComponent } from '../popup.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private popupComponent!: ComponentRef<PopupComponent>;

  constructor(
    private envInjector: EnvironmentInjector,
    private appRef: ApplicationRef,
  ) { }

  public open(component: Type<unknown>): void {
    const componentRef = createComponent(component, { environmentInjector: this.envInjector });
    this.popupComponent = createComponent(
      PopupComponent,
      {
        environmentInjector: this.envInjector,
        projectableNodes: [[componentRef.location.nativeElement]],
      }
    );

    document.body.appendChild(this.popupComponent.location.nativeElement);

    this.appRef.attachView(componentRef.hostView);
    this.appRef.attachView(this.popupComponent.hostView);
  }
}
