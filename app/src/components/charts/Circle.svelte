<script>
	import { Layer } from 'svelte-canvas'
	import { tweened } from 'svelte/motion';
	import { quadOut, cubicOut } from 'svelte/easing';

	export let x = 0;
	export let y = 0;
	export let r = 1; 
	export let fill = "black"; 
	export let stroke = null; 
    export let strokeWidth = 1;
	
    const _x = tweened(x, { duration: 600, easing:quadOut});
    const _y = tweened(y, { duration: 600, easing:quadOut});
	const _r = tweened(r, { duration: 600, easing:cubicOut});

    $: _x.set(x);
    $: _y.set(y);
	$: _r.set(r);
	
	$: render = ({ context }) => {
		context.fillStyle = fill;
		context.beginPath();
		context.arc($_x, $_y, $_r, 0, 2 * Math.PI);
		context.fill();
		
		if (stroke) {
			context.strokeStyle = stroke;
			context.lineWidth = strokeWidth;
			context.beginPath();
			context.arc($_x, $_y, $_r + strokeWidth / 2, 0, 2 * Math.PI);
			context.stroke();
		} 
	}
</script>

<Layer {render} priority={stroke && 1} />