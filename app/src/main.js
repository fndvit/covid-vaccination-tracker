import App from './App.svelte';

const url = 'https://raw.githubusercontent.com/fndvit/covid-vaccination-tracker/main/app/public/data.json';

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


