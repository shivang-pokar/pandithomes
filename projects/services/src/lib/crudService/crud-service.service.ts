import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { CookieService } from 'ngx-cookie-service';
import { forkJoin, map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudServiceService {

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage,
    private cookieService: CookieService,
  ) { }

  updateWithCollNamer(collName: string, obj: any, id: string) {
    obj = JSON.parse(JSON.stringify(obj))
    obj["updatedBy"] = this.cookieService.get('uid');
    obj["deleteFlag"] = "N";
    obj["updatedAt"] = new Date().getTime();
    return this.angularFirestore.collection<any>(collName).doc(id).update(obj);
  }

  addWithCollName(collName: string, obj: any, id?: string) {
    if (!id) {
      id = this.angularFirestore.createId();;
    }
    obj["id"] = id;
    obj["createdBy"] = this.cookieService.get('uid');
    obj["createdAt"] = new Date().getTime();
    obj["updatedBy"] = new Date().getTime();
    obj["updatedAt"] = new Date().getTime();
    obj["deleteFlag"] = "N";
    obj = JSON.parse(JSON.stringify(obj));
    return this.angularFirestore.collection<any>(collName).doc(id).set(obj, { merge: true });
  }

  collection$(path: string, query?: any) {
    (query: any) => query.orderBy('updatedAt', 'desc').where("deleteFlag", "==", "N");
    return this.angularFirestore.collection(path, query).valueChanges()
  }

  collectData(collName: string) {
    return this.angularFirestore.collection<any>(collName, ref => ref.orderBy('updatedAt', 'desc').where("deleteFlag", "==", "N")).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );;
  }

  firebaseFileUpload(path: string, event: any, preFix?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let filesList: any = [];
      Array.prototype.forEach.call(event.target.files, async (file, fileIndex) => {
        let name = (preFix) ? preFix + '_' + file.name : file.name;
        filesList.push(this.fileUpload(path + '/' + name, file))
        /* new Compressor.default(file, {
          quality: 0.6,
          success(result) {
            
            if (fileIndex == (event.target.files.length - 1)) {
              
            }
          }
        }) */
      });

      forkJoin(filesList).subscribe((resp: any) => {
        let fileList: any = [];
        resp.forEach(async (fileItem: any, keyIndex: number) => {
          let meta = await fileItem.getMetadata()
          meta.parent = fileItem.parent.name;
          let url = await fileItem.getDownloadURL()
          meta.url = url;
          fileList.push(this.uploadFileStorage(meta, path))
          if (keyIndex == (resp.length - 1)) {
            console.log(fileList)
            resolve(fileList);
          }
        }, (er: any) => {
          reject(er)
        })
      });
      console.log(filesList.length)


    });
  }

  uploadFileStorage(meta: any, path: string) {
    let fileItem: any = {}
    fileItem.name = meta.name
    fileItem.path = path
    fileItem.size = meta.size
    fileItem.timeCreated = meta.timeCreated
    fileItem.contentType = meta.contentType
    fileItem.url = meta.url
    return fileItem;
  }

  fileUpload(path: any, file: any) {
    let ref = this.angularFireStorage.ref(path)
    let task = ref.put(file);

    return task.snapshotChanges().pipe(
      /* take(1), */
      map((action: any) => {
        return action.ref
      }))
  }

}
