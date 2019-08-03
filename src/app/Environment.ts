export const firebaseConfig = {
  apiKey: "AIzaSyAN3ta_ZOZUcZv9FAdjmfHs1a9G9fLg9T0",
  authDomain: "fir-1-201e7.firebaseapp.com",
  databaseURL: "https://fir-1-201e7.firebaseio.com",
  projectId: "fir-1-201e7",
  storageBucket: "gs://fir-1-201e7.appspot.com/",
  messagingSenderId: "345276339120",
  appId: "1:345276339120:web:4b650c85ef312f6e"
  };

  export const SnapShots = snap => {
      let MyArray = [];
      snap.forEach(Element => {
          let obj = Element.val();
          obj.key = Element.key;
          MyArray.push(obj);
      });
      return MyArray;
  }