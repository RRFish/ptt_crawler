import { v4 as uuidv4 } from 'uuid';

function createUuid(){
    return uuidv4();
}

class IdAppender {

    eachAppendUuid(objList) {
        const objList_m = [...objList]
        return objList_m.map((item)=>{
            return {
                ...item,
                uuid: createUuid()
            }
        })
    }

    eachMatchUuid(objList, uuid) {
        const objList_m = [...objList]
        return objList_m.find((item)=>{
            return item.uuid === uuid
        })        
    }
}
const idAppender = new IdAppender()


export {
    idAppender
}