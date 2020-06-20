import { Injectable } from '@angular/core';
import * as environment from '../../environments/environment'
import { Observable, Observer, observable, BehaviorSubject } from 'rxjs';
declare var require: any
const crypto = require('crypto')
const buffer = require('buffer')

@Injectable({
  providedIn: 'root'
})
export class RootService {

  resizedIV = buffer.Buffer.allocUnsafe(16);
  loginObser:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(

  ) { }

  loginChange(isLoggedIn){
    this.loginObser.next(isLoggedIn);
  }

  encryptKey(encrptionKey) {
    const key = crypto.createHash('sha256').update(environment.environment.ENCRYPTION_KEY).digest();
    const cipher = crypto.createCipheriv("aes-256-ctr", key, this.resizedIV);
    const encryptedKey = cipher.update(encrptionKey, "binary", "hex");
    return encryptedKey;
  }

  decryptKey(hash) {
    const key = crypto.createHash('sha256').update(environment.environment.ENCRYPTION_KEY).digest();
    const cipher = crypto.createDecipheriv("aes-256-ctr", key, this.resizedIV);
    const decriptionKey = cipher.update(hash, "hex", "binary");
    return decriptionKey;
  }
}
