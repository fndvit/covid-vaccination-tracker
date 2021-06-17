<script>
	import { Canvas } from 'svelte-canvas'
	import { extent } from 'd3-array'
	import { scaleLinear } from 'd3-scale'
    import { Delaunay } from 'd3-delaunay'
	import Circle from './Circle.svelte'
	import Square from './Square.svelte'

	export let data;
	export let step = 0;
	export let layout;
	export let mark;

	const margin = { top: 10, right: 10, bottom: 25, left: 25 }

	let width, height;
	let picked = null, click = false

	$: x = scaleLinear()
				 	.domain(extent(data, d => d.coords[step].x))
					.range([margin.left, width - margin.right])
					.nice()

	$: y = scaleLinear()
					.domain(extent(data, d => d.coords[step].y))
					.range([height - margin.bottom, margin.top])
					.nice()
	
    $: delaunay = Delaunay.from(data, d => x(d.coords[step].x), d => y(d.coords[step].y))

</script>
<div class="graphic {layout}" bind:clientWidth={width} bind:clientHeight={height}>
	<Canvas 
		{width} {height} 
		style='cursor: pointer'
		on:mousemove={({ offsetX: x, offsetY: y }) => picked = delaunay.find(x, y)}
		on:mouseout={() => picked = null}
		on:mousedown={() => click = true}
		on:mouseup={() => click = false}
	>

		{#each data as d, i}
			{#if mark === 'circle'}
			<Circle 
				x={x(d.coords[step].x)}
				y={y(d.coords[step].y)} 
				fill="#00336633"
				r={d.coords[step].r}
                stroke={i === picked && "#000"} 
			/>
			{:else if mark === 'square'}
			<Square 
				x={x(d.coords[step].x)}
				y={y(d.coords[step].y)} 
				fill="tomato"
				height={d.coords[step].height}
				width={d.coords[step].width}
                stroke={i === picked && "#000"} 
			/>
			{/if}
		{/each}
	</Canvas>
</div>

<style>
    .canvas {
        position:relative;
    }
</style>