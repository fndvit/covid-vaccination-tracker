<script>
	import Axis from './Axis.svelte';
	import {area, curveStep} from 'd3-shape';
	import {scaleTime, scaleLinear} from 'd3-scale';
	import {max, extent, bisector} from 'd3-array'
	import {timeFriday} from 'd3-time'
	import {draw} from 'svelte/transition'
    
    export let data;
	export let margin = {top: 0, right: 0, bottom: 0, left: 0};
	export let width;
	export let height;
	export let format;
	export let key;

	let datum;

	data.forEach(d => {
		d[key.x].setHours(0,0,0,0);
	})
		
	$: x = scaleTime()
		.domain(extent(data, d => d[key.x]))
		.range([margin.left, width - margin.right]);
	
	$: y = scaleLinear()
		.domain([0, max(data, d => d[key.y])])
		.range([height - margin.bottom - margin.top, margin.top]);

	$: path_blue = area()
		.x(d => x(d[key.x]))
		.y0(d => y(0))
		.y1(d => y(d[key.y]))
		.curve(curveStep);

	$: path_gray = area()
		.x(d => x(d[key.x]))
		.y0(d => y(0))
		.y1(d => y(d[key.bg]))
		.curve(curveStep);

	const mouseMove = (m) => {
		//Set the data in ascending order
		const mX = (m.offsetX) ? m.offsetX + 12 : m.clientX;
		const _data = [...data];
		_data.sort((a,b) => a[key.x] - b[[key.x]]);
		const index = x.invert(mX);
		index.setHours(0,0,0,0);
		const i = bisector(d => d[key.x]).center(_data, index);
		datum = _data[i];
	}

	const leave = (m) => {
		datum = undefined;

	}

	const getAnchor = (x) => {
		switch(true) {
			case x < 20:
				return 'start';
			case x  > width - 40:
				return 'end';
			default:
				return 'middle'
		}
	}

</script> 

{#if width}
<svg xmlns:svg="https://www.w3.org/2000/svg" 
	viewBox="0 0 {width} {height}"
	{width} {height}
	role="document"
	aria-label='Evolución diaria de las dosis administradas en {data[0].ccaa}'
	xml:lang="es"
	on:touchmove|preventDefault
	on:pointermove|preventDefault={mouseMove}
	on:mouseleave={leave}
	on:touchend={leave}
	>
	<g>
		<path 
			d={path_gray(data)}
			role="img"
			aria-roledescription="barra dosis entregadas diariamente"
			aria-label="Dosis entregadas: {data[data.length - 1][key.bg]}"
			fill='url(#diagonalHatch)'
		/>
		<path 
			d={path_blue(data)}
			class="bar blue"
			role="img"
			aria-roledescription="barra dosis administradas"
			aria-label="Dosis administradas: {data[data.length - 1][key.y]}"
		/>
	</g>
	<Axis {width} {height} {margin} scale={y} position='left' format={format.y} />
	<Axis {width} {height} {margin} scale={x} position='bottom' format={format.x} time={timeFriday}/>
	<g>
		{#if datum !== undefined}
		<line
			x1={x(datum[key.x])}
			y1={y(0)}
			x2={x(datum[key.x])}
			y2={y(datum[key.y])}
			pointer-events="none"
			stroke="rgba(0,0,0,.5)"
			stroke-width=.3
			class="tooltip"
		/>
		<circle
			r=3
			cx={x(datum[key.x])}
			cy={y(datum[key.y])}
			stroke="rgba(0,0,0,1)"
			pointer-events="none"
			stroke-width=2
			class="tooltip blue"
		/>
		<text
			x={x(datum[key.x])}
			y={y(datum[key.y]) - 8}
			pointer-events="none"
			text-anchor={getAnchor(x(datum[key.x]))}
			class="tooltip value"
		>
			{format.y(datum[key.y])}
		</text>
		<text
			x={x(datum[key.x])}
			y={y(0) + 20}
			pointer-events="none"
			text-anchor={getAnchor(x(datum[key.x]))}
			class="tooltip date"
		>
			{format.x(datum[key.x])}
		</text>
		{/if}
	</g>
</svg>
{/if}

<style>
	text.tooltip {
		paint-order: stroke;
		stroke:#f2f2f2;
		stroke-width: 5px;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	.value {
		fill: #333;
		font-size: .9rem;
		font-weight: 600;
	}
	.date {
		fill: #505050;
		font-size: .75rem;
	}
</style>