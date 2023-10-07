<template>
	<div class="header"> <v-container>
			<v-row>
				<v-col cols="12" sm="7" md="7">

					<div class="left-section">
						<div class="logo">
							<img src="/images/logo.png">
						</div>


					</div>



				</v-col>
				<v-col cols="12" sm="5" md="5">
					<div class="right-section">

						<div v-if="!isAdmin" class="user-section">
							<nuxt-link to="/user/weather">
								<p> <v-icon class="icon"> mdi-sun-angle-outline </v-icon>Weather</p>
							</nuxt-link>
							<nuxt-link to="/user/reports">
								<p> <v-icon class="icon"> mdi-sun-angle-outline </v-icon>Reports</p>
							</nuxt-link>

						</div>

						<div v-if="isAdmin" class="user-section">
							<nuxt-link to="/admin/locations">
								<p> <v-icon class="icon"> mdi-sun-angle-outline </v-icon>Locations</p>
							</nuxt-link>
							<nuxt-link to="/admin/users">
								<p> <v-icon class="icon"> mdi-sun-angle-outline </v-icon>Users</p>
							</nuxt-link>

						</div>


						<div class="profile-section">
							<p @click="openPanel"> <v-icon class="profile-icon"> mdi-account-check </v-icon>{{
								currentUser.email }}</p>
							<span @mouseleave="closePanel" v-if="isPanelShow" @click="exit" class="exit-btn">Exit</span>

						</div>
					</div>

				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data() {
		return {
			role: true,
			isPanelShow: false
		}
	},
	methods: {
		exit() {
			this.$router.push("/")

		},
		openPanel() {
			this.isPanelShow = true
		},
		closePanel() {
			this.isPanelShow = false
		}

	},
	computed: {
		...mapState('users', ['currentUser']),

		isAdmin() {
			return this.currentUser.role === "admin"
		}

	},


}
</script>

<style lang="css" scoped>
.exit-btn {
	background-color: rgb(236, 240, 240);
	padding: 5px 20px;
	text-align: center;
	font-size: 1rem;
	margin-top: -15px;
	display: block;
	border-radius: px;
}

.exit-btn:hover {
	cursor: pointer;
	background-color: var(--mainColor1);
	color: white;
}

.logo {
	width: 115px;
	height: 115px;
	background-color: rgb(240, 236, 236);
	padding: 10px 0px;
	border: 1px dotted rgb(199, 194, 194);
	border-radius: 50%;
}

.logo img {
	width: 115px;
	height: 76px;
}

.icon {
	color: var(--mainColor3);
	font-size: 1.2rem;
	margin-right: 5px;
}

.profile-icon {
	color: var(--mainColor3);
	font-size: 1.2rem;
	margin-right: 5px;
}

.user-section {
	display: flex;
	flex-direction: row;
	justify-content: space-between;


}

.user-section p {
	color: white;
	font-size: 1rem;
	margin-left: 5px;
	padding-top: 2px;
	font-weight: 600;
	border-left: 1px solid rgba(94, 112, 156, 1);

	border-right: 1px solid rgba(94, 112, 156, 1);
	padding-left: 20px;
	padding-right: 20px;
	line-height: 30px;
}

.profile-section p {
	color: rgb(19, 17, 17);
	font-size: .9rem;
	padding: 5px 22px;
	background-color: white;
	border-radius: 3px;
}

.profile-section p:hover {
	cursor: pointer;


}

.profile-section {


	margin-left: 35px;

}

.right-section {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.header {
	width: 100%;
	background-color: var(--mainColor2);
	padding: 5px 20px;
	height: 67px;
}
</style>