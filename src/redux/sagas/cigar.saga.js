
import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
//all cigars
function* getAllCigarInfo(action) {
    try {
        const response = yield axios.get('/api/cigar');
        yield put({
            type: 'SET_CIGAR_INFO',
            payload: response.data,
        });

    }catch(err) {
        console.log('GET cigars error: ', err);
    }

}
//get one cigar
function* getCigarInfo(action){
    try{
        const response = yield axios.get(`api/cigar/single/${action.payload.id}`);
        yield put({
            type: 'SET_ONE_CIGAR_INFO',
            payload:{
                ...response.data[0],
            },
        })
    } catch(err) {
        console.log('GET movie error: ', err);
    }
    
}

function* cigarSaga(action) {
    yield takeLatest('GET_CIGAR_INFO', getAllCigarInfo);
    yield takeLatest('PUT_CIGAR_INFO', newCigarInfoSaga);
    yield takeLatest('GET_ONE_CIGAR_INFO', getCigarInfo);

}

function* newCigarInfoSaga(action) {
    try {
        yield axios.post('/api/cigar', action.payload);
        yield put({ type: 'GET_CIGAR_INFO' });
    } catch(err) {
        console.log('PUT cigar error: ', err);
    }
}
  export default cigarSaga;