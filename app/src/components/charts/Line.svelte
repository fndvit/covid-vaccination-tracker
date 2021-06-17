<script>
	import Axis from '../common/Axis.svelte';
	import PointInteractive from '../common/PointInteractive.svelte';
	import {line, curveStep,area} from 'd3-shape';
	import {scaleTime, scaleLinear} from 'd3-scale';
	import {max, extent, bisector} from 'd3-array'
    
    export let data;
	export let margin = {top: 20, right: 5, bottom: 20, left: 5};
	export let format;
	export let key;
	export let color;
	export let colorDiff;
	export let title;
	export let desc;
	export let layout;

	let datum, width, height;
		
	$: x = scaleTime()
		.domain(extent(data, d => d[key.x]))
		.range([margin.left, width - margin.right]);
	
	$: y = scaleLinear()
		.domain([0, max(data, d => d[key.y[0]])])
		.range([height - margin.bottom - margin.top, margin.top]);

	$: path = line()
		.x(d => x(d[key.x]))
		.y(d => y(d[key.y[0]]))
		.curve(curveStep);

	$: path2 = line()
		.x(d => x(d[key.x]))
		.y(d => y(d[key.y[1]]))
		.curve(curveStep);

	$: aboveAreaPath1 = area()
		.x(d => x(d[key.x]))
		.y0(0)
		.y1(d => y(d[key.y[0]]))
		.curve(curveStep);
	
	$: belowAreaPath1 = area()
		.x(d => x(d[key.x]))
		.y0(d => y(d[key.y[0]]))
		.y1(height)
		.curve(curveStep);

	$: aboveAreaPath2 = area()
		.x(d => x(d[key.x]))
		.y0(0)
		.y1(d => y(d[key.y[1]]))
		.curve(curveStep);
	
	$: belowAreaPath2 = area()
		.x(d => x(d[key.x]))
		.y0(d => y(d[key.y[1]]))
		.y1(height)
		.curve(curveStep);

	const mouseMove = (m) => {
		const mX = (m.offsetX) ? m.offsetX : m.clientX;
		const _data = [...data];
		_data.sort((a,b) => a[key.x] - b[[key.x]]);
		const index = x.invert(mX);
		const i = bisector(d => d[key.x]).center(_data, index);
		datum = _data[i];
	}

	const leave = (m) => {
		datum = undefined;
	}

</script> 

<div class='graphic {layout}' bind:clientWidth={width} bind:clientHeight={height}>
{#if width}
<svg xmlns:svg='https://www.w3.org/2000/svg' 
	viewBox='0 0 {width} {height}'
	{width}
	{height}
	role='img'
	aria-labelledby='title desc'
	on:touchmove|preventDefault
	on:pointermove|preventDefault={mouseMove}
	on:mouseleave={leave}
	on:touchend={leave}
	>
	<title id='title'>{title}</title>
	<desc id='desc'>{desc}</desc>
	<g>
		<clipPath id="abovearea">	
			<path 
				d={aboveAreaPath2(data)}
			/>
		</clipPath>
		<clipPath id="belowarea">	
			<path 
				d={belowAreaPath2(data)}
			/>
		</clipPath>
		<path 
			clip-path="url(#abovearea)"
			fill={color[0]}
			fill-opacity= 0.25
			d={belowAreaPath1(data)}
		/>
		<path 
			clip-path="url(#belowarea)"
			fill={color[1]}
			fill-opacity= 0.25
			d={aboveAreaPath1(data)}
		/>
		<path 
			d={path(data)}
			stroke={color[0]}
			fill='none'
			stroke-width=3
		/>
		<path 
			d={path2(data)}
			stroke={color[1]}
			fill='none'
			stroke-width=3
		/>
	</g>

	<Axis {width} {height} {margin} scale={y} position='left' format={format.y} />
	<Axis {width} {height} {margin} scale={x} position='bottom' format={format.x} />

	<PointInteractive {datum} {format} {x} {y} {key} {width} />
	
</svg>
{/if}
</div>