<script>
	import Axis from './Axis.svelte';
	import {area, curveStep} from 'd3-shape';
	import {scaleTime, scaleLinear} from 'd3-scale';
	import {max, extent} from 'd3-array'
	import {timeFriday} from 'd3-time'
    
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

		// const index = x.invert(m.offsetX + 10);
		// index.setHours(0,0,0,0);

		// const datum = data.find(d => d[key.x].getTime() === index.getTime())


		// console.log(datum)
	}

	const leave = (m) => {
		// interactive = false;
		// visible = (interactive) ? 'show' : 'hide';
	}

</script> 

{#if width}
<svg xmlns:svg="https://www.w3.org/2000/svg" 
	viewBox="0 0 {width} {height}"
	{width} {height}
	role="document"
	aria-describedby="title  desc"
	xml:lang="es"
	on:mousemove={mouseMove}
	on:mouseleave={leave}
	>
	<title>Evolución diaria de las dosis administradas en {data[0].ccaa}</title>
	<desc>Gráfico de barras comparando la evolución diaria las dosis administradas en {data[0].ccaa} respecto a las entregadas.</desc>
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
	<Axis {width} {height} {margin} scale={x} position='bottom' format={format.x} time={timeFriday}/>
</svg>
{/if}