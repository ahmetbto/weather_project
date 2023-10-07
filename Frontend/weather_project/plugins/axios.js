export default function ({ app, $axios, redirect }) {
	$axios.setBaseURL(app.$config.baseURL)

}
