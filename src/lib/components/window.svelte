<script lang="ts" module>
  import type { WithChildren } from "bits-ui";
  import type { HTMLAttributes } from "svelte/elements";

  export type WindowPropsWithoutHTML = WithChildren;

  export type WindowProps = HTMLAttributes<HTMLDivElement> & WindowPropsWithoutHTML;
</script>

<script lang="ts">
  import { cn } from "$lib/utils";
  let { children, class: className }: WindowProps = $props();
</script>

<div class={cn("aspect-video bg-muted-background rounded-xl shadow-glow w-full", className)}>
  <div class="border-b border-inherit p-4">
    <div class="flex gap-2 items-center">
      <div class="bg-[#ef4444] rounded-full size-2"></div>
      <div class="bg-[#eab308] rounded-full size-2"></div>
      <div class="bg-[#22c55e] rounded-full size-2"></div>
    </div>
  </div>
  <div class="bg-zinc-900/25 h-full overflow-auto w-full">
    {@render children?.()}
  </div>
</div>
