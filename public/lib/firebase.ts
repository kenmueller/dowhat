import firebase from 'firebase/app'

if (!firebase.apps.length)
	firebase.initializeApp({
		apiKey: 'AIzaSyD5ZI0rZXHoGF1Ngmp97CNUus0EKLWm1ZU',
		authDomain: 'dowhat-live.firebaseapp.com',
		databaseURL: 'https://dowhat-live.firebaseio.com',
		projectId: 'dowhat-live',
		storageBucket: 'dowhat-live.appspot.com',
		messagingSenderId: '40492501082',
		appId: '1:40492501082:web:093e0da76ee0f9940a7063',
		measurementId: 'G-TGMTDYRTRH'
	})

export default firebase
