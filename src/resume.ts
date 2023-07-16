export function resume<T = any>(id: string): T {
    const element = document.querySelector<HTMLTextAreaElement>(`#${id}`);

    if (element?.value)
        return JSON.parse(element.value)
        
    throw Error(`The call resume('${id}') did not find any data.
    Check that the following are correct:
    - The Resumable component is used with correct props
    - "data" prop is not undefined
    - "${id}" is the "id" of the Resumable component
    See examples: https://sr.ht/~ayoayco/astro-resume/#usage
Stack trace: `)
}
