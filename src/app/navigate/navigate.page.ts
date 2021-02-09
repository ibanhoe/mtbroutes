import { AfterContentInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import { PathService } from '../api/path.service';
import { Path } from '../model/path';
import { Coordinate } from '../model/coordinate';

declare var google;

@Component({
  selector: 'app-navigate',
  templateUrl: 'navigate.page.html',
  styleUrls: ['navigate.page.scss']
})
export class NavigatePage implements OnInit, AfterContentInit {

  option = "";
  map;
  watchID;

  pathLine: google.maps.Polyline;
  markers: google.maps.Marker[];
  livePathLine: google.maps.Polyline;

  isStopped = true;
  isStarted = false;
  @ViewChild('mapElement', { static: true }) mapElement: ElementRef;

  

  constructor(private geolocation: Geolocation, private pathService: PathService) {
  }

  ngOnInit(): void {

  }

  ngAfterContentInit(): void {

    this.geolocation.getCurrentPosition().then(pos => {
      console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);


      let current = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)

      this.map = new google.maps.Map(
        this.mapElement.nativeElement,
        {
          center: current,
          zoom: 13
        }
      );

      let marker = new google.maps.Marker({
        position: current,
        map: this.map
      });



    });

    this.markers = new Array();

  }

  selectPath(): void {
    console.log("The selected path is:" + this.option);

    this.cleanMap();

    this.drawPath(this.pathService.getPath(this.option));
  }

  cleanMap() {
    console.log("cleaning map...")

    console.log("cleaning path");
    if (this.pathLine != undefined)
      this.pathLine.setMap(null);

    console.log("cleaning markers");
    if (this.markers != undefined && this.markers.length > 0) {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }

      this.markers = new Array();
    }
  }


  startTracking(): void {
    console.log("Start Tracking...");

    this.livePathLine = new google.maps.Polyline({
      geodesic: true,
      strokeColor: "#0000FF",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    this.livePathLine.setMap(this.map);

    this.watchID = navigator.geolocation.watchPosition(this.onSuccess, this.onError, { enableHighAccuracy: true, timeout: 10000 });

    this.isStarted = true;
    this.isStopped = false;

  }

  stopTracking(): void {

    console.log("Stop Tracking...")
    navigator.geolocation.clearWatch(this.watchID);

    this.isStarted = false;
    this.isStopped = true;
  }

  onSuccess(position) {
    console.log(position.coords.latitude + "/" + position.coords.longitude + "/" + position.coords.accuracy);
    let livePosition = new Coordinate(position.coords.latitude, position.coords.longitude);
    
    const path = this.livePathLine.getPath();

    path.push(livePosition);

  }

  onError(error) {
    alert('code: ' + error.code + '\n' +
      'message: ' + error.message + '\n');
  }


  drawPath(path: Path): void {

    console.log("drawing path...");

    this.pathLine = new google.maps.Polyline({
      path: path.track,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    this.pathLine.setMap(this.map);

    for (let i = 0; i < path.checkpoints.length; i++) {
      let infowindow = new google.maps.InfoWindow({
        content: '<b>' + path.checkpoints[i].id + ' : ' + path.checkpoints[i].name + '</b><br/>' + path.checkpoints[i].comment
      });

      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(path.checkpoints[i].lat, path.checkpoints[i].lng),
        title: path.checkpoints[i].id + ' : ' + path.checkpoints[i].name,
        map: this.map
      });

      marker.addListener("click", () => {
        infowindow.open(this.map, marker);
      });

      this.markers[i] = marker;

    }
  }

}
