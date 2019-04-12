import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LivrariaPage } from './livraria';

@NgModule({
  declarations: [
    LivrariaPage,
  ],
  imports: [
    IonicPageModule.forChild(LivrariaPage),
  ],
})
export class LivrariaPageModule {}
