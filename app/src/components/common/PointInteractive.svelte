<script>
    export let width;
    export let datum;
    export let key;
    export let x;
    export let y;
    export let color;
    export let format;
    export let r = 3;

    $: anchor = (x) => {
		switch(true) {
			case x < 20:
			return 'start';
			case x  > width - 40:
			return 'end';
			default:
			return 'middle';
		}
    }
    
</script>

{#if datum !== undefined}
<g>
    <line
        x1={x(datum[key.x])}
        y1={y(0)}
        x2={x(datum[key.x])}
        y2={y(datum[key.y])}
        pointer-events='none'
        stroke='rgba(0,0,0,.5)'
        stroke-width=.3
        class='tooltip'
    />
    <circle
        r={r}
        cx={x(datum[key.x])}
        cy={y(datum[key.y])}
        stroke='rgba(0,0,0,1)'
        pointer-events='none'
        stroke-width=2
        fill={color}
        class='tooltip'
    />
    <text
        x={x(datum[key.x])}
        y={y(datum[key.y]) - 8}
        pointer-events='none'
        text-anchor={anchor(x(datum[key.x]))}
        class='tooltip value'
    >
        {format.y(datum[key.y])}
    </text>
    <text
        x={x(datum[key.x])}
        y={y(0) + 20}
        pointer-events='none'
        text-anchor={anchor(x(datum[key.x]))}
        class='tooltip label'
    >
        {format.x(datum[key.x])}
    </text>
</g>
{/if}

<style>
    text.tooltip {
		paint-order: stroke;
		stroke:#fff;
		stroke-width: 5px;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
</style>