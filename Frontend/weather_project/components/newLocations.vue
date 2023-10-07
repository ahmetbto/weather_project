<template>
	<div>
		<v-dialog :value="showDialog" persistent activator="parent" width="400">
			<v-card>

				<p class="title">Add new location</p>
				<v-card-text>
					<v-text-field placeholder="location-name" v-model="location"></v-text-field>
				</v-card-text>
				<p class="error" v-if="isError">Please fill textbox</p>
				<v-card-actions>

					<v-btn @click="save" color="primary" block>Save Location</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
export default {
	props: ["showDialog"],
	data() {
		return {

			location: "",
			cityInfo: "",
			isError: false
		}

	},


	methods: {
		async save() {

			if (this.location === "") {
				this.isError = true
			} else {
				this.cityInfo = {
					city_name: this.location

				}

				await this.$axios.post("/city/newCity", this.cityInfo).then((res) => {
					console.log("res", res)
				})
				this.location = ""
				return this.$emit("closeDialog", "false")
			}


		}
	},
}
</script>

<style scoped>
.title {
	padding: 5px 20px;
	background-color: rgb(32, 140, 190);
	text-align: center;
	color: white;
}

.error {
	color: red;
	font-size: 1rem;
	text-align: center;
	margin-top: -5px;
	display: block;
	background-color: white !important;
}
</style>