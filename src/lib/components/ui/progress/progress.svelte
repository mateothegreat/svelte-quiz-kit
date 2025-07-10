<script lang="ts">
  import { cn } from "$lib/utils";
  import type { HTMLAttributes } from "svelte/elements";

  type $$Props = HTMLAttributes<HTMLDivElement> & {
    value: number;
    max?: number;
  };

  let { value, max = 100, class: className, ...restProps }: $$Props = $props();

  const percentage = $derived(Math.max(0, Math.min(100, (value / max) * 100)));
</script>

<div
  class={cn("bg-secondary h-4 overflow-hidden relative rounded-full w-full", className)}
  {...restProps}>
  <div
    class="bg-primary flex-1 h-full transition-all w-full"
    style="transform: translateX(-{100 - percentage}%)">
  </div>
</div>
