<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		showOnHover = false,
		children,
		child,
		...restProps
	}: WithElementRef<HTMLButtonAttributes> & {
		child?: Snippet<[{ props: Record<string, unknown> }]>;
		showOnHover?: boolean;
	} = $props();

	const mergedProps = $derived({
		class: cn(
			`
     [&>svg]:shrink-0 [&>svg]:size-4
     absolute aspect-square flex
     focus-visible:ring-2
     hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
     items-center justify-center outline-hidden p-0
     peer-hover/menu-button:text-sidebar-accent-foreground
     right-1 ring-sidebar-ring rounded-md text-sidebar-foreground top-1.5
     transition-transform w-5
   `,
			// Increases the hit area of the button on mobile.
			`
     after:-inset-2 after:absolute
     md:after:hidden
   `,
			"peer-data-[size=sm]/menu-button:top-1",
			"peer-data-[size=default]/menu-button:top-1.5",
			"peer-data-[size=lg]/menu-button:top-2.5",
			"group-data-[collapsible=icon]:hidden",
			showOnHover &&
				`
      data-[state=open]:opacity-100
      group-focus-within/menu-item:opacity-100
      group-hover/menu-item:opacity-100
      md:opacity-0
      peer-data-[active=true]/menu-button:text-sidebar-accent-foreground
    `,
			className
		),
		"data-slot": "sidebar-menu-action",
		"data-sidebar": "menu-action",
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
