<script>
	import Axis from '../common/Axis.svelte';
	import PointInteractive from '../common/PointInteractive.svelte';
	import {area, curveStep} from 'd3-shape';
	import {scaleLinear, scaleBand} from 'd3-scale';
	import {max, extent} from 'd3-array'
    
    export let data;
	export let margin = {top: 20, right: 5, bottom: 20, left: 5};
	export let key;
	export let color;
	export let colorDiff;
	export let title;
	export let desc;
	export let layout;
	export let format;

	let datum, width, height;
    $: barwidth = (width - margin.left - margin.right) / data.length;
			
	$: x = scaleBand()
		.domain(data.map((d,i) => String(i)))
		.range([margin.left, width - margin.right]);
	
	// $: y = scaleLinear()
	// 	.domain([0, max(data, d => d[key.y[0]])])
	// 	.range([height - margin.bottom - margin.top, margin.top]);

	$: y = scaleLinear()
		.domain([0, max(data, d => d[key.y[0]])])
		.range([height, 0]);

	function valueDiff(d){
		// ccaa - national
		return d['value0'] - d['value1']
	}
	console.log('valueDiff------')
	console.log(valueDiff(data[2]));
	console.log(height);
</script> 

<div class='graphic {layout}' bind:clientWidth={width} bind:clientHeight={height}>
{#if width}
<svg xmlns:svg='https://www.w3.org/2000/svg' 
	viewBox='0 0 {width - margin.right - margin.left} {height}'
	{width}
	{height}
	role='img'
	aria-labelledby='title desc'
	>
	<title id='title'>{title}</title>
	<desc id='desc'>{desc}</desc>

    {#each data as d,i}
		<rect 
			height={Math.abs(height - Math.abs(y(valueDiff(d))))}
            width={x.bandwidth()}
			y={valueDiff(d) > 0? y(d['value0']) : y(d['value1'])}
			x={x(String(i))}
			fill={valueDiff(d) >0? colorDiff[0] : colorDiff[1]}
			stroke='none'
		/>
    {/each}

	
	<!-- <Axis {width} {height} {margin} scale={y} position='left' format={format.y} />
	<Axis {width} {height} {margin} scale={x} position='bottom' format={format.x} />  -->
	<!-- <PointInteractive {datum} {format} {x} {y} key={{x:'x', y:'y'}} {width} /> -->
	
</svg>
{/if}
</div>