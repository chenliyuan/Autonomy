import http from './index';

export const saveItem = p => http.post('/api/saveItem', p);
export const getItem= p => http.get('/api/GetItem', p);

export const getItems = p => http.get('/api/getItems', p);
export const deleteItemContent = p => http.del('api/DeleteItemContent', p);
export const getItemstree = p => http.get('api/GetItemstree', p)
export const deleteItem = p => http.del('api/DeleteItem', p)
export const updateItem = p => http.post('api/UpdateItem', p)


export const getSubItem=p=>http.get('/api/GetSubItem',p);
export const updateSubItem=p=>http.post('/api/UpdateSubItem',p);
export const getSubitems = p => http.get('/api/getSubitems', p);
export const getSubItemstree = p => http.get('/api/GetSubItemstree', p);
export const deleteSubItem = p => http.del('api/DeleteSubItem', p)
export const saveSubItem = p => http.post('/api/saveSubItem', p);



export const getDataList = p => http.get('api/getDataList', p)
export const deleteData = p => http.del('api/DeleteItemContent', p)
export const saveData = p =>http.post('/api/saveData', p);
export const saveDataList = p => http.post('/api/SaveDataList', p);
export const updateData=p=>http.post('/api/UpdateContent',p);
export const getBreastfeed = p => http.get('/api/GetContentGroupbyDay', p)


export const getMotto = p => http.get('/api/GetMotto', p);

export const getMottoList = p => http.get('/api/GetMottoList', p);
export const saveMotto =p=>http.post('/api/SaveMotto',p)
export const deleteMotto =p=>http.del('/api/DeleteMotto',p)
export const updateMotto =p=>http.post('/api/UpdateMotto',p)


// var jsUrl="http://nnsam.cn"
export const  getRank=p=>http.get('/getRank',p);
export const  getWeekData=p=>http.get('/getWeekData',p)
export const  getCurrWeekData=p=>http.get('/getCurrWeekData',p)
