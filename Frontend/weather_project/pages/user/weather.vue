<template>
	<div class="weather">
		<v-container>
			<v-row>

				<v-col class="box" cols="8" sm="8" md="8">

					<div class="title-section">

						<p>Welcome to weahter page</p>
						<span>Lorem ipsum, dolor sit amet consteolor sit amet conster page</span>

					</div>
					<div class="city-select-box">

						<div class="select-list">
							<select class="cityList" @change="categorySelected($event)">
								<option v-for="(item) in cityList" :key="item.id" :value="item.cityName">
									{{ item.cityName }}
								</option>
							</select>

						</div>
						<p class="check-weather-btn" @click="getTheWeather">Hava Durumu Sorgula</p>



					</div>
					<p class="error" v-if="isError">Kayıt Bulunamadı</p>

					<div v-if="isWeatherResult" class="weather-result">
						<div class="left-section">
							<p class="location">Location:{{ selectedCityWeather.name }}</p>
							<span class="country">{{ selectedCityWeather.country }}</span>

							<p class="feelslike_c">{{ selectedCityWeather.feelslike_c }}</p>
							<span class="localtime">Time:{{ selectedCityWeather.localtime }}</span>

						</div>


						<p></p>
					</div>
				</v-col>

			</v-row>
		</v-container>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	layout: "userLayout",
	head: {
		title: 'Weather',

	},
	data() {
		return {
			isError: false,
			isWeatherResult: false,
			cityList: [],
			selectedCityName: "",
			selectedCityID: "",
			logInfo: {},
			selectedCityWeather: {
				name: "",
				country: "",
				localtime: "",
				feelslike_c: "",
				feelslike_f: ""


			}
		}
	},
	computed: {
		...mapState('users', ['currentUser']),
	},
	mounted() {
		this.getCityList();

	},
	methods: {
		categorySelected(event) {
			this.selectedCityName = event.target.value
			this.selectedCityID = (this.cityList.find(item => item.cityName === this.selectedCityName)).id

		},

		getCityList() {
			this.$axios.get("/city").then((res) => {
				this.cityList = res.data.city
			})
		},
		async getTheWeather() {
			this.isError = false
			await this.$axios.get(`http://api.weatherapi.com/v1/current.json?key=4cf3073571b140c8aa942141230610&q=${this.selectedCityName}`).then((res) => {
				this.selectedCityWeather.name = res.data.location.name
				this.selectedCityWeather.country = res.data.location.country
				this.selectedCityWeather.localtime = res.data.location.localtime
				this.selectedCityWeather.feelslike_c = res.data.current.feelslike_c
				this.selectedCityWeather.feelslike_f = res.data.current.feelslike_f

				console.log("******************", res)
				this.isWeatherResult = true

				// Log Create
				this.createLog()
			}).catch(() => {
				this.isError = true
				this.isWeatherResult = false
			})
		},
		async createLog() {
			this.logInfo = {
				user_id: this.currentUser.id,
				location_id: this.selectedCityID,
				ip_adress: "",
				result: "234",
				result_time: "4",
				result_state: "Success"

			}
			await this.$axios.post("/users/log", this.logInfo).then((res) => {
				console.log("res", res)
			})

		}

	},

}

</script>

<style lang="css" scoped>
.error {
	color: white;
	background-color: red;
	text-align: center;
	font-size: .9rem;
	margin-top: 30px;
	width: 200px;
	margin-right: auto;
	margin-left: auto;
	border-radius: 3px;
	padding: 3px 1px;
}

.left-section {
	text-align: center;
}

.localtime {
	font-size: .9rem;
	font-weight: 500;
	color: rgb(133, 133, 133);
}

.feelslike_c {
	margin-top: 30px;
	background-color: #2f8bb9;
	border-radius: 50%;
	width: 120px;
	height: 120px;
	text-align: center;
	padding-top: 30px;
	font-size: 2.5rem;
	color: white;
	display: block;
	margin-left: auto;
	margin-right: auto;
}

.location {
	font-size: 1.2rem;
	font-weight: 600;

}

.country {
	font-size: 1rem;
	font-weight: 500;
	color: gray;
	margin-top: -10px;
	display: block;
}

.weather-result {
	width: 70%;
	background-color: #eef0f1;
	margin-left: auto;
	margin-right: auto;
	margin-top: 50px;
	border-radius: 5px;
	padding: 50px;
}

.cityList {
	width: 100%;
	border: none;
	outline: none;
	padding-left: 30px;
	font-size: 1.2rem;
}

.select-list {
	padding-top: 5px;
	width: 60%;
	display: block;
	border: none;
	outline: none;
}

.check-weather-btn {
	font-size: 1rem;
	padding-top: 15px;
	background-color: #4DB7FE;
	border-top-right-radius: 35px;
	border-bottom-right-radius: 35px;
	margin-right: 0px;
	height: 55px;
	position: absolute;
	right: 0;
	width: 38%;
	color: white;

}

.check-weather-btn:hover {
	background-color: #228fd8;
	cursor: pointer;
}

.city-select-box {
	text-align: center;
	margin-top: 50px;
	background-color: rgba(255, 255, 255, .9);
	border-radius: 35px;
	width: 70%;
	margin-left: auto;
	margin-right: auto;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 0px 20px;
	position: relative;
	height: 55px;
}

.title-section p {
	font-weight: 600;
	font-size: 2rem;
	color: white;
	text-align: center;
}

.title-section span {
	font-weight: 400;
	font-size: 1.2rem;
	color: var(--mainColor3);
	text-align: center;
	display: block;

}

.box {
	margin-left: auto;
	margin-right: auto;
	display: block;
	position: relative;

	margin-top: 5%;
}

.weather {
	width: 100%;
	min-height: 85vh;
	background-image: url("/images/bg1.png");
}
</style>