<template>
	<v-app>
		<HeaderSection />
		<nuxt></nuxt>
		<FooterSection />
	</v-app>
</template>

<script>
import HeaderSection from '../components/HeaderSection.vue';
import FooterSection from '../components/FooterSection.vue';

export default {
	name: 'UserLayout',
	components: {
		HeaderSection,
		FooterSection
	},
	data() {
		return {};
	},
}
</script>
