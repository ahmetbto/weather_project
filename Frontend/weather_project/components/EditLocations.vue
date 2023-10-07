<template>
	<div>
		<v-dialog :value="editDialog" persistent activator="parent" width="400">
			<v-card>

				<p class="title">Edit this location</p>
				<v-card-text>
					<p class="location-name">{{ locationName }}</p>
					<v-text-field placeholder="new location name" v-model="location"></v-text-field>
				</v-card-text>
				<span class="error-message" v-if="isError">Please fill textbox</span>
				<v-card-actions>

					<v-btn @click="update" color="primary" block>Update</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
export default {
	props: ["editDialog", "locationName", "cityId"],
	data() {
		return {

			location: "",
			cityInfo: "",
			isError: false
		}

	},


	methods: {
		async update() {

			if (this.location === "") {
				this.isError = true
			} else {
				this.cityInfo = {
					city_name: this.location,
					id: this.cityId

				}
				console.log("***this.cityInfo***", this.cityInfo)
				await this.$axios.patch("/city", this.cityInfo).then((res) => {
					console.log("res", res)
				})
				this.location = ""
				return this.$emit("closeEdit", "false")
			}


		}
	},
}
</script>

<style scoped>
.location-name {
	font-weight: 600;
}

.title {
	padding: 5px 20px;
	background-color: rgb(32, 140, 190);
	text-align: center;
	color: white;
}

.error-message {
	color: red;
	font-size: 1rem;
	text-align: center;
	margin-top: -5px;
	display: block;
	background-color: white !important;
}
</style>