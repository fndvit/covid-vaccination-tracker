<script>
    import { Map, Geocoder, Marker, controls } from '@beyonk/svelte-mapbox'
    import {onMount} from 'svelte'
    export let options;
    export let accessToken;
    export let layout;
    // export let newCenter;
    export let steps;
    export let index;

    let map;
    const { GeolocateControl, NavigationControl, ScaleControl } = controls;
    options.showCompass = false;
    $:if(map) {
        map.flyTo(steps[index])
    }

</script>

<div class={layout}>

    <Map
        {accessToken}
        bind:this={map}
        {options}
    >
    <NavigationControl {options} />
    </Map>

</div>

<style>
    :global(.mapboxgl-ctrl-group){
        box-shadow: rgba(0,0,0,.2) 1px 1px 9px!important;
    }
</style>