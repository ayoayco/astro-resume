# Astro Resume

Utilities for serializing data from server for use in the client.

1. `Resumable` Astro component takes `id` and `data`
1. `resume(id: string): Object` function for use int he client takes an `id` string and returns the `data` as Object

## Intallation

```
npm i @ayco/astro-resume
```

## Usage

```astro
---
import Resumable from '../Resumable.astro';
const data = {
    hello: 'world'
}
---

<Resumable id="astro-obj" data={data} />

<div id="render-here"></div>

<script>
    import resume from '../resume';
    console.log(resume('astro-obj'));
    const renderDiv = document.querySelector('#render-here');
    if (renderDiv) {
        renderDiv.innerHTML =  JSON.stringify(resume('astro-obj'))
    }
</script>
```