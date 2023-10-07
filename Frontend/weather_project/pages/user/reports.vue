<template>
	<v-app>
		<div class="reports">
			<v-container>
				<v-row>

					<v-col class="box" cols="8" sm="8" md="8">
						<div class="title-section">

							<p>GetThe Report List</p>
							<span>Lorem ipsum, dolor sit amet consteolor sit amet conster page</span>

						</div>
						<div class="data-table">

							<table id="simle-table">
								<tr>
									<th>Location Name</th>
									<th>IP Adress</th>
									<th>Result</th>
									<th>Result Time</th>
									<th>State</th>
								</tr>
								<tr v-for="item in logList" :key='item.id'>
									<td>{{ item.location_id }}</td>
									<td>{{ item.ip_adress }}</td>
									<td>{{ item.result }}</td>
									<td>{{ item.createdAt.slice(0, 10) }} </td>
									<td>{{ item.result_state }}</td>
								</tr>

							</table>
						</div>

					</v-col>

				</v-row>
			</v-container>
		</div>
	</v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
	layout: "userLayout",
	head: {
		title: 'Weather Reports',

	},
	data() {
		return {
			userInfo: {},
			logList: [],

		}
	},
	mounted() {

		this.getReportList();
	},
	computed: {
		...mapState('users', ['currentUser']),
	},
	methods: {

		async getReportList() {

			this.logInfo = {
				user_id: "654",
				location_id: this.selectedCityID,
				ip_adress: "234",
				result: "234",
				result_time: "4",
				result_state: "4"

			}


			console.log("***************", this.userInfo)
			await this.$axios.get("/users/log", {
				params: {
					user_id: this.currentUser.id
				},

			}).then((res) => {
				this.logList = res.data.logList
				console.log("res", res.data.logList)
				this.logList = this.logList?.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
			})



		}
	},


}

</script>

<style lang="css" scoped>
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