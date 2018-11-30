import { Dispatch } from 'redux';
import { auth, database, credential } from "../libraries/firebase"
import { AuthAction, User } from './types'
import * as actionCreators from './actionCreators'
import Sentry from '../libraries/sentry'

//type Dispatch = (action: AuthAction) => Promise<void>;

// //Register the user using email and password
// export function register(data) {
//     return (dispatch) => {
//         return new Promise((resolve, reject) => {
//             const { email, password, username } = data;
//             auth.createUserWithEmailAndPassword(email, password)
//                 .then((resp) => {
//                     let user = { username, uid: resp.user.uid }
//                     const userRef = database.ref().child('users');

//                     userRef.child(user.uid).update({ ...user })
//                         .then(() => {
//                             dispatch({ type: t.LOGGED_IN, user });
//                             resolve(user)
//                         })
//                         .catch((error) => reject({ message: error }));
//                 })
//                 .catch((error) => reject(error));
//         })
//     };
// }

//Create the user object in realtime database
export function createUser(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
        const userRef = database.ref().child('users');

        userRef.child(user.uid).update({ uid: user.uid, email: user.email })
            .then(() => {
                resolve(user)
            })
            .catch((error) => reject(error));
    });
}

// //Sign the user in with their email and password
// export function login(data) {
//     return (dispatch) => {
//         return new Promise((resolve, reject) => {
//             const { email, password } = data;
//             auth.signInWithEmailAndPassword(email, password)
//                 .then((resp) => {
//                     //Get the user object from the realtime database
//                     let { user } = resp;
//                     database.ref('users').child(user.uid).once('value')
//                         .then((snapshot) => {

//                             const exists = (snapshot.val() !== null);

//                             //if the user exist in the DB, replace the user variable with the returned snapshot
//                             if (exists) user = snapshot.val();

//                             if (exists) dispatch({ type: t.LOGGED_IN, user });
//                             resolve({ exists, user });
//                         })
//                         .catch((error) => reject(error));
//                 })
//                 .catch((error) => reject(error));
//         });
//     }
// }

// //Send Password Reset Email
// export function resetPassword(data) {
//     return (dispatch) => {
//         return new Promise((resolve, reject) => {
//             const { email } = data;
//             auth.sendPasswordResetEmail(email)
//                 .then(() => resolve())
//                 .catch((error) => reject(error));
//         });
//     }
// }

//Sign user out
export const signOut = () =>
    async (dispatch: Dispatch<AuthAction>) => {
        dispatch(actionCreators.loggingOut())
        try {
            await auth.signOut()
        }
        catch (err) {
            dispatch(actionCreators.loggingOutError({ title: "Error", message: "An error occurred." }))
            Sentry.captureException(err);
        }
    }

//Sign user in using Facebook
export const signInWithFacebook = (token: string) =>
    async (dispatch: Dispatch<AuthAction>) => {
        dispatch(actionCreators.loggingIn())
        try {
            const creds = credential(token);
            await auth.signInAndRetrieveDataWithCredential(creds)
        }
        catch (err) {
            dispatch(actionCreators.loggingInError({ title: "Error", message: "An error occurred." }))
            Sentry.captureException(err);
        }
        // if (userCredential.user) {
        //     const user = userCredential.user;
        //     //Get the user object from the realtime database
        //     const snapshot = await database.ref('users').child(user.uid).once('value')

        //     //if the user exist in the DB
        //     if (snapshot.val() !== null) {
        //         dispatch(actionCreators.loggedIn(user));
        //     } else {
        //         const newUser = await createUser(user)
        //         dispatch(loggedIn(newUser));
        //     }
        // }
    }

export const startAuthListener = () =>
    (dispatch: Dispatch<AuthAction>) =>
        new Promise<User | undefined>(resolve => {
            auth.onAuthStateChanged(async (firebaseUser) => {
                if (firebaseUser) {
                    const user: User = {
                        uid: firebaseUser.uid,
                        displayName: firebaseUser.displayName || undefined,
                        email: firebaseUser.email || undefined,
                    }
                    dispatch(actionCreators.loggedIn(user))
                    resolve(user)
                } else {
                    dispatch(actionCreators.loggedOut())
                    resolve()
                }
            })
        })


// export function isLoggedIn(): Promise<boolean> {
//     return new Promise((resolve, reject) => {
//         auth.onAuthStateChanged(async (user) => {
//             if (user !== null) {
//                 // get the user object from the realtime database
//                 const snapshot = await database.ref('users').child(user.uid).once('value')
//                 //.then((snapshot) => {
//                 const existsInDb = (snapshot.val() !== null);

//                 // if the user exist in the DB
//                 if (existsInDb) {
//                     resolve(true);
//                 } else {
//                     resolve(false)
//                 }
//                 //})
//                 // .catch((error) => {
//                 //     // unable to get user
//                 //     reject(error)
//                 // });
//             } else {
//                 resolve(false)
//             }
//         })
//     });
// }