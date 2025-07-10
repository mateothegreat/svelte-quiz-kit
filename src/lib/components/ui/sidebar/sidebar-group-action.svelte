<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		child,
		...restProps
	}: WithElementRef<HTMLButtonAttributes> & {
		child?: Snippet<[{ props: Record<string, unknown> }]>;
	} = $props();

	const mergedProps = $derived({
		class: cn(
			`
     [&>svg]:shrink-0 [&>svg]:size-4
     absolute aspect-square flex
     focus-visible:ring-2
     hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
     items-center justify-center outline-hidden p-0 right-3 ring-sidebar-ring
     rounded-md text-sidebar-foreground top-3.5 transition-transform w-5
   `,
			// Increases the hit area of the button on mobile.
			`
     after:-inset-2 after:absolute
     md:after:hidden
   `,
			"group-data-[collapsible=icon]:hidden",
			className
		),
		"data-slot": "sidebar-group-action",
		"data-sidebar": "group-action",
		...restProps,
	});
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<button bind:this={ref} {...mergedProps}>
		{@render children?.()}
	</button>
{/if}
