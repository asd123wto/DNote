import Vue from 'vue'
import Router from 'vue-router'
import DNote from '@/components/DNote'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
	// mode: 'history',
	routes: [
		{
			path: '/',
			name: 'DNote',
			component: DNote
		},
		{
			path: '/login',
			name: 'Login',
			component: Login
		}
	]
})
