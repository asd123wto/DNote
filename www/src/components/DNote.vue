<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
	</div>
</template>

<script>
	let data = {
		msg : "a"
	};

	export default {
		data() {
			return data
		},
		mounted() {
			data.msg = 2
		}
	}
</script>

<style scoped>
	h1, h2 {
		font-weight: normal;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: #42b983;
	}
</style>
