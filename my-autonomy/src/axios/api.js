import {
  get,
  post,
  put,
  del,
} from './index';

export const saveItem = p => post('/api/saveItem', p);
export const getItem= p => get('/api/GetItem', p);

export const getItems = p => get('/api/getItems', p);
export const deleteItemContent = p => del('api/DeleteItemContent', p);
export const getItemstree = p => get('api/GetItemstree', p)
export const deleteItem = p => del('api/DeleteItem', p)
export const updateItem = p => post('api/UpdateItem', p)


export const getSubItem=p=>get('/api/GetSubItem',p);
export const updateSubItem=p=>post('/api/UpdateSubItem',p);
export const getSubitems = p => get('/api/getSubitems', p);
export const getSubItemstree = p => get('/api/GetSubItemstree', p);
export const deleteSubItem = p => del('api/DeleteSubItem', p)
export const saveSubItem = p => post('/api/saveSubItem', p);



export const getDataList = p => get('api/getDataList', p)
export const deleteData = p => del('api/DeleteItemContent', p)
export const saveData = p => post('/api/saveData', p);
export const saveDataList = p => post('/api/SaveDataList', p);
export const updateData=p=>post('/api/UpdateContent',p);
export const getBreastfeed = p => get('/api/GetContentGroupbyDay', p)


export const getMotto = p => get('/api/GetMotto', p);

export const getMottoList = p => get('/api/GetMottoList', p);
export const saveMotto =p=>post('/api/SaveMotto',p)
export const deleteMotto =p=>del('/api/DeleteMotto',p)
export const updateMotto =p=>post('/api/UpdateMotto',p)


// var jsUrl="http://nnsam.cn"
export const  getRank=p=>get('/getRank',p);

