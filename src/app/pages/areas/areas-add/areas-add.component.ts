import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AreasService } from '../../../services/areas/areas.service';
import { MapLoaderService } from '../areas-add/map.loader';

declare var google: any;

@Component({
  selector: 'areas-add',
  templateUrl: './areas-add.component.html',
  styleUrls: ['./areas-add.component.scss'],
})
export class AreasAddComponent implements AfterViewInit {
  map: any;
  drawingManager: any;
  polygonList: any;
  areaName: string;
  loading: boolean;
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private areasService: AreasService,
  ) {

  }

  ngAfterViewInit() {
    MapLoaderService.load().then(() => {
      this.drawPolygon();
    });
  }

  drawPolygon() {

    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 24.7136, lng: 46.6753 },
      zoom: 8,
    });
    const coords = [
      [
        [24.716594018140366, 46.327033180508],
        [24.729068191614903, 46.02216257503925],
        [24.60427025316135, 45.97821726253925],
        [24.504342167345136, 46.019415993008],
        [24.546821332199396, 46.19794382503925],
        [24.549319658996723, 46.2775947039455],
        [24.649211889469754, 46.283087868008],
        [24.661692808567448, 46.3654853289455],
        [24.716594018140366, 46.327033180508],
      ],
    ];
    this.drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['polygon'],
      },
      drawingpaths: coords,
    });

    this.drawingManager.setMap(this.map);
    // google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event) => {
    //   // Polygon drawn
    //   if (event.type === google.maps.drawing.OverlayType.POLYGON) {
    //     //this is the coordinate, you can assign it to a variable or pass into another function.
    //   }
    // });
    google.maps.event.addListener(this.drawingManager, 'polygoncomplete', (polygon) => {
      const len = polygon.getPath().getLength();
      const polyArrayLatLng = [];
      for (let i = 0; i < len; i++) {
        const vertex = polygon.getPath().getAt(i);
        const vertexLatLng = [vertex.lat(), vertex.lng()];
        polyArrayLatLng.push(vertexLatLng);
      }
      // the last point of polygon should be always the same as the first point (math rule)
      polyArrayLatLng.push(polyArrayLatLng[0]);
      this.polygonList = polyArrayLatLng;
    });

  }

  addPolygon() {
    if (!this.areaName) {
      this.toastr.info('يرجي اختيار اسم المنطقة');
      return;
    }
    if (!this.polygonList) {
      this.toastr.info('يرجي تحديد ابعاد المنطقة ');
      return;
    }

    const body = {
      name: this.areaName,
      loc: {
        type: 'Polygon',
        coordinates: [this.polygonList],
      },
    };
    this.areasService.createArea(body).subscribe(
      response => {
        if (response?.body?._id) {
          this.loading = false;
          this.toastr.success('تم إضافة المنطقة بنجاح');
          this.router.navigate(['/pages/areas/list']);
        } else {
          this.toastr.warning('حدث خطأ ما حاول مرة اخري');
          this.loading = false;
        }
      }, err => {
        this.toastr.warning('حدث خطأ ما حاول مرة اخري', err?.error?.message);
        this.loading = false;
      });
  }
}
