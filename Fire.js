import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDsqe1DHNCCEuPA-bd_zS4eo8VqdVCYdO4",
    authDomain: "studyapp-ef114.firebaseapp.com",
    databaseURL: "https://studyapp-ef114.firebaseio.com",
    projectId: "studyapp-ef114",
    storageBucket: "studyapp-ef114.appspot.com",
    messagingSenderId: "498593855428",
    appId: "1:498593855428:web:b6bac3dfbb5269bd76d691"
};



class Fire {

    constructor(callback) {
        this.init(callback);
    }
    init(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null, user);
            } else {
                firebase
                    .auth()
                    .signInAnonymously()
                    .catch(error => {
                        callback(error);
                    });
            }
        });
    }

    getLists(callback) {
        let ref = this.ref.orderBy("name");

        this.unsubscribe = ref.onSnapshot(snapshot => {
            lists = [];

            snapshot.forEach(doc => {
                lists.push({ id: doc.id, ...doc.data() });
            });

            callback(lists);
        });
    }

    getCourses(callback) {
        let reff = this.reff.orderBy("name");
        this.unselect = reff.onSnapshot(snapshat => {
            courses = [];

            snapshat.forEach(doc => {
                courses.push({ id: doc.id, ...doc.data() });
            });

            callback(courses);
        });
    }


    addList(list) {
        let ref = this.ref;

        ref.add(list);
    }

    updateList(list) {
        let ref = this.ref;

        ref.doc(list.id).update(list);
    }

    addCourse(course) {
        let reff = this.reff;

        reff.add(course);
    }

    updateCourse(course) {
        let reff = this.reff;

        reff.doc(course.id).update(course);
    }
    
    get userId() {
        return firebase.auth().currentUser.uid;
    }

    get ref() {
        return firebase
        .firestore()
        .collection("users")
        .doc(this.userId)
        .collection("lists");
    }
    get reff() {
        return firebase
        .firestore()
        .collection("users")
        .doc(this.userId)
        .collection("courses");

    }

    retach() {
        this.unselect();
    }

    detach() {
        this.unsubscribe();
    }

    
}

export default Fire