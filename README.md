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
import Resumable from "@ayco/astro-resume";
const data = {
	hello: 'world'
}
---

<Resumable id="astro-obj" data={data} />

<script>
	import {resume} from '@ayco/astro-resume';
	console.log(
		resume('astro-obj')
	)
</script>

```