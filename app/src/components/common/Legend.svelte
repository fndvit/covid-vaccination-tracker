<script>
export let legendItems;

</script>

<ul>
    {#each legendItems as item}
    <li>
        <div class='color {item.class}' style='background-image:{item.color}'>
            <svg width='1.2rem' height='1.2rem' aria-label='Color para identificar {item.label}'>
                <rect   
                        fill={item.color}
                        width='1.2rem'
                        height='1.2rem'
                        x=0
                        y=0
                />
            </svg>
        </div>
        <p class='label'>{@html item.label}</p>
    </li>
    {/each}
</ul>

<style>
    .color {
        width:1.2rem;
        height:1.2rem;
    }
    li {
        display: grid;
        grid-template-columns: 1rem auto;
        max-width:10rem;
        float:left;
        margin-right:1rem;
        margin-left:4px;
    }
    .label {
        padding-left:.5rem;
        padding-top:.1rem;
        margin:0;
        color:#505050;
        font-size: .85rem;
        font-weight: 400;
    }
</style>