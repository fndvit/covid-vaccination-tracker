<script>
	import Comunidad from './components/Comunidad.svelte'
	export let data;

</script>

<main>
	<!-- {#each data as d} -->
	<Comunidad data={data[0]} />
	<!-- {/each} -->
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
</style>