<template>
	<v-app>
		<div class="reports">
			<v-container>
				<v-row>

					<v-col class="box" cols="8" sm="8" md="8">
						<div class="title-section">

							<p> Users List</p>
							<span>Lorem ipsum, dolor sit amet consteolor sit amet conster page</span>

						</div>


					</v-col>

				</v-row>
			</v-container>
			>

		</div>
	</v-app>
</template>

<script>

export default {

	layout: "adminLayout",
	head: {
		title: 'Weather Users',

	},
	data() {
		return {


		}
	},



}

</script>

<style lang="css" scoped>
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