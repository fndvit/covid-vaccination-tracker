<script>
    export let title;
    export let description;
    export let lang;
    export let keywords;
    export let url;
</script>
<svelte:head>
<title>{title}</title>
<meta name="title" content={title}>
<meta name="description" content={description}>
<meta name="robots" content="index, follow">
<meta name="language" content={lang}>
<meta name="keywords" content={keywords}>

<meta property="og:type" content="website">
<meta property="og:url" content={url}>
<meta property="og:title" content={title}>
<meta property="og:description" content={description}>
<meta property="og:image" content="img/poster.jpg">
<meta property="og:image:width" content="1600" />
<meta property="og:image:height" content="900" />

<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content={url}>
<meta property="twitter:title" content={title}>
<meta property="twitter:description" content={description}>
<meta property="twitter:image" content="img/poster.jpg">
</svelte:head>