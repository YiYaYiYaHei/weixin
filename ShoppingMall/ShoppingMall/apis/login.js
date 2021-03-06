import * as ajax from '@/utils/request.js';

export default {
	login: params => ajax.post('/wx/login', params),
	refreshToken: params => ajax.post('/wx/refreshToken', params),
	loginPhone: params => ajax.post('/wx/loginPhone', params),
	
	homeGetLimitList: params => ajax.get('/wx/home/limit/list', params),
	homeGetGroupList: params => ajax.get('/wx/home/group/list', params),
	homeGetGoodsList: params => ajax.post('/wx/home/goods/list', params, {showLoading: false}),
	homeGetGoodsDeatil: params => ajax.post('/wx/home/goods/detail', params),
	
	classificationGetClassList: params => ajax.get('/wx/classification/tab/list', params),
	classificationGetList: params => ajax.post('/wx/classification/list', params),
	
  getList: (params, taskCallBack) => ajax.post('/plat/net', params, {isTask: true, taskCallBack: taskCallBack}),
  addTask: params => ajax.get('/plat/cabinet', params),
	fileUpload: params => ajax.upload('/upload', params),
	fileDownLoad: (params) => ajax.download('/download', params, {}),
	
	shoppingCarAdd: params => ajax.post('/wx/shoppingCar/add', params),
	shoppingCarGetNum: () => ajax.get('/wx/shoppingCar/queryNum'),
	shoppingCarList: params => ajax.post('/wx/shoppingCar/query', params),
	shoppingCarUpdate: params => ajax.put('/wx/shoppingCar/update', params, {showLoading: false}),
	shoppingCarDelete: params => ajax.del(`/wx/shoppingCar/delete/${params.carId}`),
	
	pay: params => ajax.get(`https://unidemo.dcloud.net.cn/payment/wx/mp?code=${params.code}&amount=1`)
};