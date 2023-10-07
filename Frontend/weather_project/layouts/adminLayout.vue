<template>
	<v-app>
		<HeaderSection class="header" />
		<nuxt></nuxt>
		<FooterSection class="footer" />
	</v-app>
</template>

<script>

import HeaderSection from '../components/HeaderSection.vue';
import FooterSection from '../components/FooterSection.vue';

export default {
	name: 'AdminLayout',
	components: [
		HeaderSection,
		FooterSection
	],
	data() {
		return {};
	},

}
</script>
<style>
.footer {
	position: relative;

}

.header {
	z-index: 1;
}
</style>
