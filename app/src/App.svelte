<script>
	import Total from './components/Total.svelte'
	import Comunidad from './components/Comunidad.svelte'
	import {scaleLinear, scaleTime} from 'd3-scale'
	import {extent, max, min} from 'd3-array'
	import {dateDiff, approxDate} from './dateDiff'
	import locale from '@reuters-graphics/d3-locale';
	export let data;

	const loc = new locale('es');

	Object.values(data)
		.flat()
		.forEach(d => { 
			d.fecha = new Date(d.fecha);
			d.hasta = new Date(d.hasta);
	});

	const { Totales, ...newData } = data;
	const _data = Object.values(newData);

	$: y = scaleLinear()
		.domain(extent(_data.flat(), d => d.entregadas))
		.range([36, 240]);

	const range = extent(_data.flat(), d => d.fecha);

	const dateRange = dateDiff(range[0], range[1]);

	const latestNumbers = Object.values(data)
		.flat()
		.sort((a, b) => b.fecha - a.fecha)
		.slice(0,20);

	const totalVacc = 5190735;
	const totalCurrent = latestNumbers.find(d => d.ccaa === 'Totales' ).entregadas;	

	latestNumbers.map(d => {
			const total = totalCurrent;
			d.share = d.entregadas / totalCurrent;
			d.sharePeople = d.share * totalVacc / 2;
			d.shareTarget = d.share * 2447000;
			d.daily = d.administradas / dateRange;
			d.vaccinesLeft = d.shareTarget * 2 - d.administradas;
			d.dateComplete  = new Date();
			d.dateComplete.setDate(d.fecha.getDate() + 1 * ( ( d.vaccinesLeft - d.vacuna_completa ) / d.daily ) )
			return {...d}
		});
	
	_data.forEach(d => {
		d.latest = latestNumbers.find(dd => d[0].ccaa === dd.ccaa);
	});

	const spainData = latestNumbers.find(d => d.ccaa === 'Totales')
	const spainDiff = dateDiff(new Date('2021-03-15'), spainData.dateComplete);
	const spainTardy = ( spainDiff <= 7)
        ? 'ontime'
        : ( spainDiff > 7 && spainDiff <= 21)
        ? 'late'
        : 'verylate';

</script>

<main>
	<svg 
		xmlns:svg="https://www.w3.org/2000/svg" 
		viewBox="0 0 0 0"
		width=0 height=0
	>	
		<pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="4" height="4">
			<path d="M-1,1 l2,-2
					 M0,4 l4,-4
					 M3,5 l2,-2" 
				  style="stroke:#808080; stroke-width:.3" />
		</pattern>
	</svg>
	<Total data={spainData} />
	<p class="text update">Actualizado a <strong>{loc.formatTime('%e de %B')(spainData.fecha)}</strong></p>
	<div class="title">
		<h1>A este ritmo, España completa la primera fase de la vacunación contra la COVID-19 <strong>a {approxDate(spainData.dateComplete)}</strong></h1>
		<img class="icon" src="img/{spainTardy}.svg" role="img" aria-roledescription={approxDate(spainData.dateComplete)} alt="Icono de un temporizador mostrando el retraso en la administración de vacunas en España" />
	</div>
	<p class="text summary">España ha adquirido alrededor de {loc.format(',.2r')(totalVacc/1e6)} millones de vacunas (de <em>Pfizer</em> y <em>Moderna</em>). Con esas dosis se puede vacunar a {loc.format(',.2r')(totalVacc/1e6/2)} millones de personas — cada vacuna necesita dos dosis administradas con unas semanas de diferencia. En la primera fase se tiene previsto vacunar a 2,4 millones — entre mayores en residencias, personas con un gran grado de dependencia y sanitarios.</p>
	<p class="text summary">El Ministerio de Sanidad es responsable del reparto de las dosis y la estrategia de vacunación, mientras que las comunidades autónomas son las responsables de ponerla en práctica. El próximo colectivo en vacunarse es el de los mayores de 80 años — en España hay 2,8 millones.</p>
	<div class="headers">
		<h2 class='header' style="visibility: hidden">Comunidad</h2>
        <p class='header'>Vacunas entregadas (Pfizer y Moderna)</p>
        <p class='header bold'>Vacunas administradas</p>
        <p class='header bold'>% de vacunas administradas</p>
        <p class='header'>Personas con la pauta completa</p>
	</div>
	<ul>
		{#each _data as d}
		<Comunidad data={d} height={y(max(d, d => d.entregadas))}/>
		{/each}
	</ul>
</main>

<style>
	:global(body, html) {
		background-color: #f2f2f2;
		font-family: neue-haas-grotesk-display, sans-serif;
		font-size: 14px;
	}
	:global(ul) {
		list-style-type: none;
		padding: 0;
	}
	:global(.blue) { 
		fill: #00bbc4;
		background-color: #00bac47c;
	}
	:global(.gray) { fill: #ffffff}
	:global(strong) { font-weight: 600;}
	:global(.text) {
		font-family: neue-haas-grotesk-text, sans-serif;
		font-size: .9rem;
		line-height: 1.5;
		color: #505050;
		padding:0 0 1.5rem 0;
		margin:0;
	}
	:global(.numbers, .headers) {
        display: grid;
        grid-template-columns: 23% 20% 20% 17% 20%;
    }
	.title {
		display: grid;
        grid-template-columns: 70% auto;
	}
	.icon {
		width:50%;
		margin:0 auto;
	}
	.summary {
		font-size: 1.15rem;
	}
	.update {
		margin:3rem 0 0 0;
		padding:0;
		color:crimson;
		font-weight: 400;
		font-size: 1rem;
	}
	main {
		padding: 1em;
		margin: 0 auto;
	}
	h1 {
		font-size:3rem;
		font-weight: 100;
		line-height: 1.2;
		margin-top:0;
		padding-top:0;
	}
	.headers {
		padding:.5rem 0;
		position:sticky;
		top: 0;
		z-index: 100;
		text-align:right;
		font-size:.7rem;
		text-transform: uppercase;
		background-color: #f2f2f2;
		align-content: end;
		height:3rem;
    }
	.header {
		margin:0;
		padding:0;	
		padding-left:2rem;
	}
	:global(.number, .header) {
        padding-left:1rem!important;
    }
	@media screen and (min-width: 640px) {
		:global(body, html) {
			font-size: 16px;
		}
		main {
			padding: 1em;
			margin: 0 auto;
			max-width: 42rem;
		}
	}
</style>