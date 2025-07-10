<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="sidebar-menu-badge"
	data-sidebar="menu-badge"
	class={cn(
		`
    absolute flex font-medium h-5 items-center justify-center min-w-5
    pointer-events-none px-1 right-1 rounded-md select-none tabular-nums
    text-sidebar-foreground text-xs
  `,
		`
    peer-data-[active=true]/menu-button:text-sidebar-accent-foreground
    peer-hover/menu-button:text-sidebar-accent-foreground
  `,
		"peer-data-[size=sm]/menu-button:top-1",
		"peer-data-[size=default]/menu-button:top-1.5",
		"peer-data-[size=lg]/menu-button:top-2.5",
		"group-data-[collapsible=icon]:hidden",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
