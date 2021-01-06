import { Component, NgZone, OnInit } from '@angular/core';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { LocationService } from 'src/app/_services/location.service';
import { ToastrService } from 'ngx-toastr';
declare var google;

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  lattitude: any;
  longitude: any;
  place:any;
  googleAutocomplete : any;
  constructor(
    private router : Router,
    private ngZone : NgZone,
    private locationService : LocationService,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {
  	this.googleAutocomplete = new google.maps.places.Autocomplete(document.getElementById('searchText'));
    google.maps.event.addListener(this.googleAutocomplete, 'place_changed', () => {
      this.ngZone.run(()=>{
        let lat = this.googleAutocomplete.getPlace().geometry.location.lat();
        let lng = this.googleAutocomplete.getPlace().geometry.location.lng();
        let place = (<HTMLInputElement>document.getElementById('searchText')).value;

        this.lattitude = lat
        this.longitude = lng
        this.place = place
        console.log(lat, lng, place);

        console.log(this.lattitude, this.longitude, this.place);
        this.checkLocation();
      })
    });
  }

  checkLocation(){
    let checkData = {
                  lat:this.lattitude,
                  long:this.longitude
              }
          console.log(checkData)
    this.locationService.checkLocation(checkData).subscribe((res:any)=>{
      if(res.success && res.data) {
          if(res.data[0] && res.data[0].distance <=100)
          {
           this.toastr.success("We serve here")
          }
          else
          {
           this.toastr.error("Sorry we do not serve here")
          }
      } else {
        this.toastr.error(res)
      }
    })
  }

}
