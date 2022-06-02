import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crud';
  hello="calling function";
   getName(para:any){
     alert(para);
  }
  myEvent(val:any){
    alert(val);
  }
}
