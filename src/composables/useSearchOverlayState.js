import { ref } from 'vue'

// Shared state for the global search overlay. One overlay, one behavior,
// whichever entry point opens it: Ctrl+K / Cmd+K, the sidebar button, the
// mobile header button, or the homepage hero search. The module-level ref
// makes this a singleton across the whole app.
const isOpen = ref(false)

export function useSearchOverlayState() {
  return {
    isOpen,
    openSearch: () => { isOpen.value = true },
    closeSearch: () => { isOpen.value = false },
    toggleSearch: () => { isOpen.value = !isOpen.value }
  }
}
