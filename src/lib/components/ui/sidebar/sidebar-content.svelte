<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="sidebar-content"
	data-sidebar="content"
	class={cn(
		`
    flex flex-1 flex-col gap-2
    group-data-[collapsible=icon]:overflow-hidden
    min-h-0 overflow-auto
  `,
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
