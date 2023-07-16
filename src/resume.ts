export function resume<T = any>(id: string): T {
    return JSON.parse(document.querySelector<HTMLTextAreaElement>(`#${id}`)?.value ?? '')
}
