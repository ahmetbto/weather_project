<template>
	<div>
		<v-dialog :value="showNotificationBox" width="auto">
			<v-card class="box">
				<v-card-text>
					<span class="mdi mdi-check-circle icon"></span>

				</v-card-text>
				<p class="title">Kaydınız Başarıyla Silinmiştir.</p>
				<v-card-actions>
					<v-btn color="primary" block @click="closeBox">Ok</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
export default {
	props: ["showNotificationBox"],
	data() {
		return {
			dialog: true,

		}

	},
	methods: {
		closeBox() {
			return this.$emit("closeNotification", "false")

		}
	},
}
</script>

<style scoped>
.box {
	padding: 20px;
}

.icon {
	font-size: 4rem;
	color: green;
	margin-top: 30px;
	margin-left: 80px;
	margin-right: auto;
	display: inline-block;
	position: relative;
}
</style>