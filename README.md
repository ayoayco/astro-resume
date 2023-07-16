# Astro Resume

Utilities for serializing data from server for use in the client.

1. `Resumable` Astro component takes `id` and `data`
1. `resume(id: string): Object` function for use int he client takes an `id` string and returns the `data` as Object

## Installation & Usage

### Install via npm

On your [Astro](https://astro.build) project:

```
npm i @ayco/astro-resume
```

### Usage

Serializing and deserializing basic primitive data

```astro
---
import Resumable from "@ayco/astro-resume";

const data = {
	hello: 'world',
}
---

<Resumable id="astro-obj" data={data} />

<script>
	import {resume} from '@ayco/astro-resume';
	const data = resume('astro-obj');
	console.log(data) // {hello: 'world'}
</script>

```

### Type Safety

You can define a type for the data and use it in the client script.

```astro
---
import Resumable from "@ayco/astro-resume";

const data = {
	hello: 'world',
	isOkay: true
}
// define the type of data to be serialized
export type Data = typeof data;
---

<Resumable id="astro-obj" data={data} />

<script>
	import {resume} from '@ayco/astro-resume';

	/**
     * reuse the type in the client
	 * assuming this component's name is `Component.astro`
	 */
	import type {Data} from './Component.astro';

	const data = resume<Data>('astro-obj');

	console.log(data) // {hello: 'world'}
</script>
```

## Reporting Issues

To report issues or request features, send a plain text email to [~ayoayco/astro-resume@todo.sr.ht](mailto:~ayoayco/astro-resume@todo.sr.ht) or file a ticket via [SourceHut](https://todo.sr.ht/~ayoayco/astro-resume)

