<script>
	export let width;
  export let height;
  export let margin;
  export let scale;
  export let position;
	export let format;
	
	$: nTicks = (position === 'bottom' || position === 'top') 
		? width / 50
		: height / 50;

  $: transform = position === 'bottom'
    ? `translate(0, ${height - margin.bottom - margin.top})`
		: position === 'top'
		? `translate(0, ${margin.top})`
    : `translate(0, 0)`

  $: ticks = scale.ticks(nTicks)
		.map(d => ({value: format(d), offset: scale(d)}));
</script>

<g class='axis' {transform}>
  {#each ticks as tick}
    {#if position === 'bottom'}
    <g class='tick' transform='translate({tick.offset}, 0)'>
      <line y2=6 />
      <text y=20 text-anchor='middle'>
        {tick.value}
      </text>
    </g>
		{:else if position === 'top'}
    <g class='tick' transform='translate({tick.offset}, 0)'>
      <line y2=-6 />
      <text y=-10 text-anchor='middle'>
        {tick.value}
      </text>
    </g>
		{:else if position === 'right'}
    <g class='tick' transform='translate(0, {tick.offset})'>
			{#if tick.value === '0'}
      <line x2={width}/>
			{:else}
			<line x2={width} stroke-dasharray="2 3" />
			{/if}
      <text x={width} y=-5 text-anchor='end'>
        {tick.value}
      </text>
    </g>
    {:else if position === 'left'}
    <g class='tick' transform='translate(0, {tick.offset})'>
      {#if tick.value === '0'}
      <line x2={width}/>
			{:else}
			<line x2={width} stroke-dasharray="2 3" />
			{/if}
      <text x=0 y=-5 text-anchor='start'>
        {tick.value}
      </text>
    </g>
    {/if}
  {/each}
</g>

<style>
	line {
		stroke: #DCDCDC;
	}
	text {
		fill: #AAA;
		font-size: .75rem;
	}
</style>