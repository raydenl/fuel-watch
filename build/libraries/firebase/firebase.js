import firebase from 'firebase';
import { firebaseConfig } from './config';
export const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const database = firebase.database();
export const provider = new firebase.auth.FacebookAuthProvider();
export const credential = firebase.auth.FacebookAuthProvider.credential;
export const storage = firebase.storage();
//# sourceMappingURL=firebase.js.map