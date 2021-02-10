import App from './App.svelte';

const url = 'https://github.com/fndvit/covid-vaccination-tracker/blob/main/app/public/data.json?raw=true';

fetch(url)
  .then((res) => res.json())
  .then((json) => {
	const data = json;

    const app = new App({
      target: document.body,
      props: {
		data: data
      }
	});
});

export default app;


