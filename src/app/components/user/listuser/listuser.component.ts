import { Component } from '@angular/core';
import { Challenge } from 'src/models/challenge';
import { User } from 'src/models/user';
import { SharedDataService } from 'src/service/challenge.sharedservices';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.scss']
})
export class ListuserComponent {
  model:User = {_id:"", name:'', surname:'', username:"", email:"", password:'',level:0, exp:0, role:""}  


constructor(private userService: UserService, private sharedDataService: SharedDataService){}

  ngOnInit(): void {
    // this.obtenerUsers();
    this.obtenerUsers();
    this.sharedDataService.userAdded.subscribe(() => {
      this.obtenerUsers();
    });
  }

  users: User [] = [];

  obtenerUsers(){
    this.userService.getUsers().subscribe(data => {
      console.log(data);
      this.users = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarUser(id:string){
    var answer = confirm('Estas seguro de querer eliminarlo?');
    if(answer){
      this.userService.deleteUser(id).subscribe(data => {
        this.obtenerUsers();    
      }, error => {
        console.log(error);
      })
    }    
  }

  editarUser(i:any){
    this.sharedDataService.user = this.users[i];
    this.sharedDataService.editClickedUser.next(true);
  }

  deshabilitarUser(id:string){
    var answer = confirm('Estas seguro de querer deshabilitarlo?');
    if(answer){
      const body = null;
      this.userService.disableUser(id, body).subscribe(data => {
        this.obtenerUsers();    
      }, error => {
        console.log(error);
      })
    }    
  }
}
