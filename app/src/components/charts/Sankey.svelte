<script>
	import * as Sankey from 'd3-sankey';

	export let data;
    export let title = "Sankey title";
	export let desc = "Sankey desc";
	export let layout;
	/* --------------------------------------------
	 * Allow for dynamic coloring
	 */
	export let colorLinks = d => 'rgba(0, 0, 0, .2)';
	export let colorNodes = d => '#333';
	export let colorText = d => '#263238';

	export let nodeWidth = 5;
	export let nodePadding = 10;
	export let linkSort = null;
	export let nodeId = d => d.id;
	export let nodeAlign = Sankey.sankeyLeft;
	let width, height;
	const margin = { top: 10, right: 10, bottom: 25, left: 25 };
	let datum;

	console.log(width);
	$: sankey = Sankey.sankey()
		.nodeAlign(nodeAlign)
		.nodeWidth(nodeWidth)
		.nodePadding(nodePadding)
		.nodeId(nodeId)
		.size([width, height])
		.linkSort(linkSort);

	$: sankeyData = sankey(data);

	$: link = Sankey.sankeyLinkHorizontal();

	$: fontSize = width <= 320 ? 8 : 12;

	const mouseMove = (m) => {
        const mX = (m.offsetX) ? m.offsetX : m.clientX;
        const mY = (m.offsetY) ? m.offsetY : m.clientY;
        datum = undefined;
		console.log(sankeyData);
	}

	const leave = (m) => {
		datum = undefined;
    }
    

</script>

<div class="graphic {layout}" bind:clientWidth={width} bind:clientHeight={height}>
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
	<g class="sankey-layer">
		<g class='link-group'>
			{#each sankeyData.links as d}
				<path
					d={link(d)}
					fill='none'
					stroke={colorLinks(d)}
					stroke-opacity='0.5'
					stroke-width={d.width} />
			{/each}
		</g>
		<g class='rect-group'>
			{#each sankeyData.nodes as d, i}
				<rect
					x={d.x0}
					y={d.y0}
					height={d.y1 - d.y0}
					width={d.x1 - d.x0}
					fill={colorNodes(d)} />
				<text
					x={d.x0 < width / 4 ? d.x1 + 6 : d.x0 - 6}
					y={(d.y1 + d.y0) / 2}
					dy="{(fontSize / 2) - 2}"
					style="fill: {colorText(d)};
								font-size: {fontSize}px;
								text-anchor: {d.x0 < width / 4 ? 'start' : 'end'};">
					{d.id}
				</text>
			{/each}
		</g>
	</g>
</svg>
{/if}
</div>

<style>
	text {
		pointer-events: none;
	}
</style>

