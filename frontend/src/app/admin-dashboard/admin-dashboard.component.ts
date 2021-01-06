import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocationService } from 'src/app/_services/location.service';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
declare var google;

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  location:any;
  lattitude: any;
  longitude: any;
  place:any;
  googleAutocomplete : any;
  constructor(private locationService : LocationService,private ngZone : NgZone,
    private toastr : ToastrService) { }

  ngOnInit(): void {
  	this.getPropertTypes();
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
      })
    });
  }


  getPropertTypes() {
    this.locationService.getLocation().subscribe((res:any)=>{
      if(res.success && res.data) {
        this.location = res.data;
        this.lattitude = res.data.location.coordinates[0]
        this.longitude = res.data.location.coordinates[1]
        this.place = res.data.place
        console.log(this.lattitude, this.longitude, this.place);
      } else {
        this.toastr.error(res.messageKey)
      }
    })
  }

  updateLocation(){
  	let updateData = {_id:this.location._id,
  	              place:this.place,
  	              lat:this.lattitude,
  	              long:this.longitude
  	          }
  	      console.log(updateData)
  	this.locationService.updateLocation(updateData).subscribe((res:any)=>{
      if(res.success && res.data) {
          this.toastr.success(res.messageKey)
      } else {
        this.toastr.error(res.messageKey)
      }
    })
  }


}
