<script>
	import numeral from 'numeral';

	export let scale;
	export let title;
	export let mapWidth;
	export let mapHeight;
	export let width = 320;
	export let position = ['top', 'center'];
	export let format;
	
	$: t = position[0] === 'top'
		? 0
		: position[0] === 'bottom'
		? mapHeight - 48
		: position [0];
	
	$: l = position[1] === 'left'
		? 0
		: position[1] === 'center'
		? mapWidth / 2 - width / 2
		: position[1] === 'right'
		? mapWidth - width
		: position[1];
	
	$: colors = scale.range();
	$: extent = scale.domain();
	$: max = extent[0] > extent[1] ? extent[0] : extent[1];
	$: min = extent[0] < extent[1] ? extent[0] : extent[1];
	$: d = (max-min) / colors.length;

	$: values = [... Array(colors.length)].map((_d, i) => min + d * i);
	$: bw = width / (max - min);

	
	$: bandWidth = values.map((d, i) => {
		return (i < values.length - 1)
			? (values[i + 1] - d) * bw
			: (max - d) *bw;
	})
	
</script>

<div class="legend" style="top: {t}px; left: {l}px">
	<p>{title}</p>
	<ul class="scale" style="width: {width}px">
	{#each colors as color, i }	
		<li style="width: {bandWidth[i]}px">
			<div class="color" style="background: {color};"></div>
			{#if i > 0}
			<div class="ticks"></div>
			<p class="value" style="width: {bandWidth[i]}px; margin-left:-{bandWidth[i] / 2}px">{numeral(values[i]).format(format)}</p>
			{/if}
		</li>
	{/each}
	</ul>
</div>

<style>
	h5 {
		margin: 0 0 .33rem 0;
		font-size: .9rem;
	}
	ul {
		position: absolute;
		margin: 0;
		padding: 0;
	}
	li {
		display: inline-block;
		vertical-align: top;
	}
	.legend {
		position: absolute;
	}
	.scale {
		min-width: 20rem;
	}
	.color {
		height: .6rem;
	}
	.ticks {
		border-left: .5px solid #808080;
		height: .4rem;
	}
	.value {
		padding: .1rem 0 0 0;
		margin: 0;
		font-size: .8rem;
		color: #808080;
		text-align: center;
	}
</style>