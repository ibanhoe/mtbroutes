import { Injectable } from '@angular/core';
import { Path } from '../model/path';

@Injectable({
  providedIn: 'root'
})
export class PathService {

  path : Path;

  constructor() { }

  getPath(id: string): Path{
    console.log("Id de path ->"+id);
    this.generate(id);

    return this.path;
  }

  generate(id: string): void{
    
    if (id == "1") {
      this.path = new Path(1, "Casa");
      this.path.setTrack(this.path.casaPath);
      this.path.setCheckpoints(this.path.checkpointsCasa);
    } else{
      this.path = new Path(2, "Xitle");
      this.path.setTrack(this.path.xitlePath);
      this.path.setCheckpoints(this.path.checkPointsXitle);
    }
  }

}
