import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {

    
    
}

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

class DB {

    constructor(collection) {
        this.collection = collection
    }

    reformat(doc) {
        return { id: doc.id, ...doc.data() }
    }

    findAll = async () => {
        const data = await db.collection(this.collection).get()
        return data.docs.map(this.reformat)
    }

    findOne = async id => {
        const doc = await db.collection(this.collection).doc(id).get()
        return doc.exists ? this.reformat(doc) : undefined
    }

    // update item containing id already
    update = async item => {
        const { id, ...rest } = item
        await db.collection(this.collection).doc(id).set(rest)
    }

    // add new item not containing id yet
    create = async item => {
        const { id, ...rest } = item
        await db.collection(this.collection).add(rest)
    }

    remove = async id => {
        await db.collection(this.collection).doc(id).delete()
    }
}



class Meals extends DB {

    constructor() {
        super('meals')
    }
}

class Dishes extends DB {

    constructor() {
        super('dishes')
    }

    reformat(doc) {
        return { ...super.reformat(doc), availableTo: doc.data().availableTo.toDate() }
    }

    findByMealId = async id => {
        const data = await db.collection(this.collection).where('mealId', '==', id).get()
        return data.docs.map(this.reformat)
    }
}

export default {
    Meals: new Meals(),
    Dishes: new Dishes()
}
