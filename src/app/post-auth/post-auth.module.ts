import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PostAuthRoutingModule } from "./post-auth-routing.module";
import { PostAuthComponent } from "./post-auth.component";
import { SharedModule } from "../shared/shared.module";
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    PostAuthComponent
  ],
  imports: [
    CommonModule,
    PostAuthRoutingModule,
    SharedModule,AgGridModule
  ],
  entryComponents: [PostAuthComponent],
  exports: [],
})
export class PostAuthModule {}
