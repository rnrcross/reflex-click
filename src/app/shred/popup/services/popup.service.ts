import { ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, Injectable, Type } from '@angular/core';
import { PopupComponent } from '../popup.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private popupComponentRef: ComponentRef<PopupComponent> | null = null;

  constructor(
    private envInjector: EnvironmentInjector,
    private appRef: ApplicationRef,
  ) { }

  public open<T>(contentComponent: Type<T>): ComponentRef<T> {
    const componentRef = createComponent(contentComponent, { environmentInjector: this.envInjector });

    this.popupComponentRef = createComponent(
      PopupComponent,
      {
        environmentInjector: this.envInjector,
        projectableNodes: [[componentRef.location.nativeElement]],
      }
    );
    document.body.appendChild(this.popupComponentRef.location.nativeElement);
    this.appRef.attachView(componentRef.hostView);
    this.appRef.attachView(this.popupComponentRef.hostView);

    return componentRef
  }

  public close(): void {
    if (this.popupComponentRef) {
      this.appRef.detachView(this.popupComponentRef.hostView);
      this.popupComponentRef.destroy();
      this.popupComponentRef = null;
    }
  }
}
