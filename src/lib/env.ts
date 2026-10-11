// Возможности окружения. Считаются при вызове, а не при загрузке модуля,
// чтобы работать и без matchMedia (тесты, SSR).

function matches(query: string): boolean {
  return typeof matchMedia === 'function' && matchMedia(query).matches
}

/** Пользователь просит меньше движения (prefers-reduced-motion: reduce). */
export function reduced(): boolean {
  return matches('(prefers-reduced-motion: reduce)')
}

/** Есть мышь с наведением: превью у курсора и вступление только для неё. */
export function finePointer(): boolean {
  return matches('(hover: hover) and (pointer: fine)')
}
