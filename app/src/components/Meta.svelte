<script>
    export let title;
    export let description;
    export let lang;
    export let keywords;
    export let url;
</script>
<svelte:head>
<title>Evolución diaria de la vacunación contra la COVID-19 en España</title>
<meta name="theme-color" content='#00bbc4' />
<meta name="title" content={title}/>
<meta name="description" content={description}/>
<meta name="robots" content="index, follow"/>
<meta name="language" content={lang}/>
<meta name="keywords" content={keywords}/>

<meta property="og:type" content="website"/>
<meta property="og:url" content={url}/>
<meta property="og:title" content={title}/>
<meta property="og:description" content={description}/>
<meta property="og:image" content="https://fndvit.github.io/covid-vaccination-tracker/img/poster_social.png" />
<meta property="og:image:width" content="1600" />
<meta property="og:image:height" content="900" />


<meta property="twitter:card" content="https://fndvit.github.io/covid-vaccination-tracker/img/poster_social.png"/>
<meta property="twitter:url" content={url}/>
<meta property="twitter:title" content={title}/>
<meta property="twitter:description" content={description}//>
<meta property="twitter:image" content="img/poster_social.png"/>
<link rel="shortcut icon" type="image/x-icon" href="https://images.squarespace-cdn.com/content/v1/5e5b7eebeb83b746b6481a2d/1604671720103-EPJSELDNWVIPCWI63H7G/ke17ZwdGBToddI8pDm48kNCIUUInZz-JelovUC4TKJ9Zw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpy2nmdcYIRqEQwGN8P7xrL_yE-hs8s0G614KmYuoTh2b5xIcJ7iebeF3-4wt8VfJy4/favicon.ico?format=100w"/>
<link rel="apple-touch-icon" href="https://fndvit.github.io/covid-vaccination-tracker/img/poster_192.png"/>
<link rel="manifest" href="https://fndvit.github.io/covid-vaccination-tracker/manifest.json"/>
<link rel="canonical" href="https://fndvit.github.io/covid-vaccination-tracker/" />
</svelte:head>