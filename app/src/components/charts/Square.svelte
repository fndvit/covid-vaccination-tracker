<script>
	import { Layer } from 'svelte-canvas'
	import { tweened } from 'svelte/motion';
	import { quadOut, cubicOut } from 'svelte/easing';

	export let x = 0;
	export let y = 0;
	export let width = 1; 
	export let height = 1;
	export let fill = "black"; 
	export let stroke = null; 
    export let strokeWidth = 1;
	
    const _x = tweened(x, { duration: 600, easing:quadOut});
    const _y = tweened(y, { duration: 600, easing:quadOut});
	const _width = tweened(width, { duration: 600, easing:cubicOut});
	const _height = tweened(height, { duration: 600, easing:cubicOut});


    $: _x.set(x);
    $: _y.set(y);
	$: _width.set(width);
	$: _height.set(height);
	
	$: render = ({ context }) => {
		context.fillStyle = fill;
		context.beginPath();
		context.rect($_x, $_y, $_width, $_height);
		context.fill();
		
		if (stroke) {
			context.strokeStyle = stroke;
			context.lineWidth = strokeWidth;
			context.beginPath();
			context.rect($_x, $_y, $_width + strokeWidth / 2, $_height + strokeWidth / 2);
			context.stroke();
		} 
	}
</script>

<Layer {render} priority={stroke && 1} />