<template>
	<div>
		<v-row>
			<v-col cols="12" sm="4" md="4">

				<div class="left-section">
					<div class="logo">
						<img src="/images/logo.png">
					</div>
					<p>Lorem ipsum dolor sit amet.</p>
					<span>Lorem ipsum dolor sit amet.</span>
				</div>

			</v-col>

			<v-col cols="12" sm="8" md="8">
				<div class="right-section">
					<div class="login-box">
						<div class="logo-small">
							<img src="/images/logo.png">
						</div>
						<p class="title">Weather Project Login Here </p>
						<v-text-field class="textBox" v-model="user.email" label="username" required
							hide-details></v-text-field>
						<v-text-field class="textBox" v-model="user.password" label="password" required
							hide-details></v-text-field>
						<v-btn class="btn-send" block size="x-large" variant="flat" @click="login">
							Login
						</v-btn>
						<p v-if="isError" class="error-message">{{ errorMessage }}</p>
					</div>
				</div>

			</v-col>
		</v-row>
	</div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {

	data() {
		return {

			errorMessage: "",
			isError: false,
			userRole: "",
			user: {
				email: "user@gmail.com",
				password: "123456",
			},
		};
	},


	methods: {
		...mapMutations('users', ['Set_currentUser']),


		// Login Start
		async login() {
			this.isError = false;
			if (this.user.email === "" || this.user.password === "") {
				this.isError = true;
				this.errorMessage = "lütfen ilgili alanları doldurunuz";
			} else {

				await this.$axios.post("/users/login", this.user).then((res) => {

					if (res.data.status === "401") {
						this.isError = true;
						this.errorMessage = "Şifre Hatalı";
					}
					if (res.data.status === "200") {

						const token = res.data.token
						localStorage.setItem('token', token);

						this.userRole = res.data.role

						this.Set_currentUser(res.data)
						if (this.userRole === "admin") {
							this.$router.push("/admin/locations")
						} else {
							this.$router.push("/user/weather")
						}


					}


				}).catch(() => {
					this.isError = true;
					this.errorMessage = "Kullanıcı adı veya şifre hatalı";

				});
			}
		},



	}
}





</script>
<style lang="css" scoped>
.logo {
	width: 200px;
	text-align: center;
	margin-left: auto;
	margin-right: auto;
}

.logo-small {
	width: 100px;
	text-align: center;
	margin-left: auto;
	margin-right: auto;
}

.error-message {
	font-size: .9rem;
	color: rgb(180, 8, 8);
	margin-top: 10px;
	text-align: center;
}

.title {
	font-weight: 600;
	text-align: center;
}

.btn-send {
	background-color: var(--mainColor1) !important;
	margin-top: 20px;
	color: white;
}

.textBox {
	background-color: white;
	margin-top: 15px;

}

.textBox::placeholder {
	font-size: .5rem !important;
}

.left-section {
	width: 100%;
	background-color: var(--mainColor2);
	height: 100vh;
	padding: 80px 30px;
}

.left-section p {
	color: white;
	font-weight: 400;
	font-size: 1rem;
	text-align: center;
	margin-top: 100px;
}

.left-section span {
	color: white;
	font-weight: 600;
	font-size: 2rem;
	text-align: center;
	width: 100%;
	display: inline-block;
}

.right-section {
	width: 40%;
	margin-left: auto;
	margin-right: auto;
	margin-top: 15%;
	background-color: rgba(233, 229, 229, .2);
	min-height: 300px;
	padding: 50px;
	border-radius: 15px;
	border: 1px solid rgba(197, 195, 195, .4);
	box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 2px -1px, rgba(0, 0, 0, 0.02) 0px 2px 4px -1px;
	padding-bottom: 40px;
}
</style>
