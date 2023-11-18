import { ConnectionCheckOutStartedEvent } from 'mongodb'
import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()

export const setData = (a, b) => {
    storage.set(a, b)
}

export const getDataString = (a) => {
    const c = storage.getString(a)
    return c
}

// export const getDataNumber = (a, b) => {
//     const c = storage.getNumber(a, b)
// }

// export const getDataBoolean = (a, b) => {
//     const c = storage.getBoolean(a, b)
// }
