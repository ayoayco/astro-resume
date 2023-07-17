# Astro Resume

Utilities for serializing data from server for use in the client.

1. `Serialize` Astro component takes `id` and `data`
1. `deserialize(id: string)` function for use int he client takes an `id` string and returns the `data`

## Installation & Examples

### Install via npm

On your [Astro](https://astro.build) project:

```
npm i @ayco/astro-resume
```

### Usage

Serializing and deserializing basic primitive data

```astro
---
import Serialize from "@ayco/astro-resume";

const data = {
	hello: 'world',
}
---

<Serialize id="my-data" data={data} />

<script>
	import {deserialize} from '@ayco/astro-resume';
	const data = deserialize('my-data');
	console.log(data) // {hello: 'world'}
</script>

```

### Type Safety

You can define a type for the data and use it in the client script.

```astro
---
import Serialize from "@ayco/astro-resume";

const data = {
	hello: 'world',
	isOkay: true
}
// define the type of data to be serialized
export type Data = typeof data;
---

<Serialize id="my-data" data={data} />

<script>
	import {deserialize} from '@ayco/astro-resume';

	/**
	* reuse the type in the client
	* assuming this component's name is `ThisComponent.astro`
	*/
	import type {Data} from './ThisComponent.astro';

	const data = deserialize<Data>('my-data');

	console.log(data) // {hello: 'world', isOkay: true}
</script>
```

### Passing all Astro.props to client

If you need to make all the component props to the client script:

```astro
---
import Serialize from "@ayco/astro-resume";
export interface Props {
	hello: string;
	isOkay: boolean;
}
---

<Serialize id="preferences" data={{...Astro.props}} />

<script>
	import {deserialize} from '@ayco/astro-resume';
	import type {Props} from './ThisComponent.astro';
	const {hello, isOkay} = deserialize<Props>('preferences');
	console.log(hello, isOkay);
</script>
```

## What's happening here?

For simple applications with just a few components, this is a quick pattern to embed serialized information into your HTML. The `Serialize` component will do this for you, currently by using a hidden `textarea` element to hold the string.

The `deserialize()` function can then parse the value string for use in your client script. You have to manage the IDs yourself (i.e., make sure they are unique) and understand that the `deserialize()` function will crawl the whole document incurring some performance cost.

Another approach we see in other frameworks is embedding JSON in your HTML and the frameworks themselves managing/tracking the IDs for you, but we don't have access to this in Astro as we are not really shipping a framework to the browser. That's nice and ideal (in my opinion), but we do have to manage things ourselves.

There is a pattern [given in the Astro docs](https://docs.astro.build/en/guides/client-side-scripts/#pass-frontmatter-variables-to-scripts) to use a Custom Element that takes a `data-` prop which properly protects the scope of your component. That is a good pattern to follow for complex applications that don't use UI frameworks.

## Reporting Issues

To report issues or request features, send a plain text email to [~ayoayco/astro-resume@todo.sr.ht](mailto:~ayoayco/astro-resume@todo.sr.ht) or file a ticket via [SourceHut](https://todo.sr.ht/~ayoayco/astro-resume)

