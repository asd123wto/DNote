import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

import cookies from './js/Cookies'


Vue.config.productionTip = false

window.http = axios.create({
	baseURL: process.env.NODE_ENV === "development" ? "http://127.0.0.1:8080/" : "",
	responseType: 'json',
})

http.interceptors.request.use(config => {
	if(RPSG.isLogin())
		config.data.token = RPSG.cookies.get("token")
	return config;
})


http.interceptors.response.use(response => {
	// const data = response.data
	// if(data === null || data.length === 0)
	// 	throw new Error()
	//
	//
	// if(data.code != 0)

})


	window.RPSG = {
	cookies: cookies,
	isLogin: () => RPSG.cookies.get("token") !== null
}

new Vue({
	el: '#app',
	router,
	components: {App},
	template: '<App/>'
})
