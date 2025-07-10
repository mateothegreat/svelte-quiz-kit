<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="card-header"
	class={cn(
		`
    [.border-b]:pb-6
    @container/card-header auto-rows-min gap-1.5 grid grid-rows-[auto_auto]
    has-data-[slot=card-action]:grid-cols-[1fr_auto]
    items-start px-6
  `,
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
