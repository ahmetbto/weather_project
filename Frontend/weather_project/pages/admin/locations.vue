<template>
	<v-app>
		<div class="reports">
			<v-container>
				<v-row>

					<v-col class="box" cols="8" sm="8" md="8">
						<div class="title-section">

							<p> Locations List</p>
							<span>Lorem ipsum, dolor sit amet consteolor sit amet conster page</span>

						</div>
						<div class="data-table">
							<div class="new-section">
								<p @click="showDialog" class="new-btn">New Location</p>
							</div>


							<table id="simle-table">
								<tr>
									<th>Location Name</th>
									<th>Delete</th>
									<th>Edit</th>

								</tr>
								<tr v-for="item in locationList" :key='item.id'>
									<td>{{ item.cityName }}</td>
									<td>
										<p @click="deleteLocation((`${item.id}`))" class="delete-btn">Delete</p>
									</td>
									<td>
										<p @click="editLocation((`${item.cityName}`))" class="edit-btn">Edit</p>
									</td>

								</tr>

							</table>
						</div>

					</v-col>

				</v-row>
			</v-container>
			<new-locations :showDialog="isDialog" @closeDialog="close($event)"></new-locations>
			<edit-locations :cityId="editCityId" :locationName="cityname" :editDialog="isEditBox"
				@closeEdit="closeEditBox($event)"></edit-locations>
			<notification-box :showNotificationBox="isNotificationBox"
				@closeNotification="closeNotification($event)"></notification-box>

		</div>
	</v-app>
</template>

<script>
import EditLocations from '~/components/EditLocations.vue';
import newLocations from '~/components/newLocations.vue';
import NotificationBox from '~/components/NotificationBox.vue';
export default {
	components: { newLocations, NotificationBox, EditLocations },
	layout: "adminLayout",
	head: {
		title: 'Weather Reports',

	},
	data() {
		return {
			cityname: "",
			editCityId: "",
			isDialog: false,
			isEditBox: false,
			isNotificationBox: false,
			userInfo: {},
			locationList: [],

		}
	},
	mounted() {

		this.getlocationList();
	},

	methods: {
		editLocation(cityname) {
			this.cityname = cityname
			this.isEditBox = true
			this.editCityId = (this.locationList.find(item => item.cityName === this.cityname)).id

		},

		// Delete 
		async deleteLocation(id) {
			await this.$axios.delete("/city",
				{
					params: {
						location_id: id,
					},

				}).then((res) => {
					this.isNotificationBox = true
					this.getlocationList();

				})
		},
		close() {
			this.isDialog = false
			this.getlocationList();
		},
		closeNotification() {
			this.isNotificationBox = false

		},
		closeEditBox() {
			this.isEditBox = false
			this.getlocationList();
		},
		async getlocationList() {
			await this.$axios.get("/city").then((res) => {
				this.locationList = res.data.city
				console.log("res", res.data.city)

			})



		},
		showDialog() {
			this.isDialog = true

		},
	},


}

</script>

<style lang="css" scoped>
.delete-btn {
	background-color: rgb(150, 50, 50);
	padding: 2px 3px;
	color: white;
	width: 80px;
	text-align: center;
	font-size: .7rem;
	margin-left: auto;
	margin-right: auto;
	border-radius: 3px;
	margin-top: 7px;
}

.delete-btn:hover {
	cursor: pointer;
	background-color: rgb(172, 50, 50);
}

.edit-btn {
	background-color: rgb(43, 107, 18);
	padding: 2px 3px;
	color: white;
	width: 80px;
	text-align: center;
	font-size: .7rem;
	margin-left: auto;
	margin-right: auto;
	border-radius: 3px;
	margin-top: 7px;
}

.edit-btn:hover {
	cursor: pointer;
	background-color: rgb(47, 131, 14);
}

.new-section {
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
}

.new-btn {
	margin-left: auto;
	display: block;
	position: relative;
	background-color: green;
	color: white;
	font-size: 1rem;
	text-align: center;
	padding: 5px 20px;
	border-radius: 2px;
}

.new-btn:hover {
	cursor: pointer;
	background-color: rgb(10, 156, 10);
}

.data-table {
	margin-top: 40px;
}

#simle-table {
	border-radius: 5px;
	border-collapse: collapse;
	width: 100%;
}

#simle-table td,
#simle-table th {
	border: 1px solid #ddd;
	padding: 4px;
	font-size: 1rem;

}

#simle-table tr:nth-child(even) {
	background-color: #f2f2f2;
}

#simle-table tr {
	background-color: #d6d3d3;

}

#simle-table tr:hover {
	background-color: #ddd;
}

#simle-table th {
	padding-top: 12px;
	padding-bottom: 12px;
	text-align: left;
	background-color: #837f7f;
	color: white;
	height: 10px !important;
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

.reports {
	width: 100%;
	min-height: 85vh;
	background-image: url("/images/bg1.png");
}
</style>