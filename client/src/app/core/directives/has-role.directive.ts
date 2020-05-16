import { Directive, Input, ViewContainerRef, TemplateRef, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[];
  currentUser$ = this.accountService.currentUser$;
  isVisible = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private accountService: AccountService) { }

    ngOnInit() {
      this.currentUser$.subscribe(() => {
        if (this.accountService.hasRole(this.appHasRole)) {
          if (!this.isVisible) {
            this.isVisible = true;
            this.viewContainerRef.createEmbeddedView(this.templateRef);
          }
        } else {
            this.isVisible = false;
            this.viewContainerRef.clear();
        }
      });
    }
}
