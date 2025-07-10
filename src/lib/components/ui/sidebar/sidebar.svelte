<script lang="ts">
	import * as Sheet from "$lib/components/ui/sheet/index.js";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { SIDEBAR_WIDTH_MOBILE } from "./constants.js";
	import { useSidebar } from "./context.svelte.js";

	let {
		ref = $bindable(null),
		side = "left",
		variant = "sidebar",
		collapsible = "offcanvas",
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		side?: "left" | "right";
		variant?: "sidebar" | "floating" | "inset";
		collapsible?: "offcanvas" | "icon" | "none";
	} = $props();

	const sidebar = useSidebar();
</script>

{#if collapsible === "none"}
	<div
		class={cn(
			`
     bg-sidebar flex flex-col h-full text-sidebar-foreground
     w-[var(--sidebar-width)]
   `,
			className
		)}
		bind:this={ref}
		{...restProps}
	>
		{@render children?.()}
	</div>
{:else if sidebar.isMobile}
	<Sheet.Root
		bind:open={() => sidebar.openMobile, (v) => sidebar.setOpenMobile(v)}
		{...restProps}
	>
		<Sheet.Content
			data-sidebar="sidebar"
			data-slot="sidebar"
			data-mobile="true"
			class="
     [&>button]:hidden
     bg-sidebar p-0 text-sidebar-foreground w-[var(--sidebar-width)]
   "
			style="--sidebar-width: {SIDEBAR_WIDTH_MOBILE};"
			{side}
		>
			<Sheet.Header class="sr-only">
				<Sheet.Title>Sidebar</Sheet.Title>
				<Sheet.Description>Displays the mobile sidebar.</Sheet.Description>
			</Sheet.Header>
			<div class="flex flex-col h-full w-full">
				{@render children?.()}
			</div>
		</Sheet.Content>
	</Sheet.Root>
{:else}
	<div
		bind:this={ref}
		class="
    group hidden
    md:block
    peer text-sidebar-foreground
  "
		data-state={sidebar.state}
		data-collapsible={sidebar.state === "collapsed" ? collapsible : ""}
		data-variant={variant}
		data-side={side}
		data-slot="sidebar"
	>
		<!-- This is what handles the sidebar gap on desktop -->
		<div
			data-slot="sidebar-gap"
			class={cn(
				`
      bg-transparent duration-200 ease-linear relative transition-[width]
      w-[var(--sidebar-width)]
    `,
				"group-data-[collapsible=offcanvas]:w-0",
				"group-data-[side=right]:rotate-180",
				variant === "floating" || variant === "inset"
					? `
       group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+[var(--spacing(4))]+2px)]
     `
					: "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)]"
			)}
		></div>
		<div
			data-slot="sidebar-container"
			class={cn(
				`
      duration-200 ease-linear fixed h-svh hidden inset-y-0
      md:flex
      transition-[left,right,width] w-[var(--sidebar-width)] z-10
    `,
				side === "left"
					? `
       group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]
       left-0
     `
					: `
       group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]
       right-0
     `,
				// Adjust the padding for floating and inset variants.
				variant === "floating" || variant === "inset"
					? `
       group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+[var(--spacing(4))]+2px)]
       p-2
     `
					: `
       group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)]
       group-data-[side=left]:border-r
       group-data-[side=right]:border-l
     `,
				className
			)}
			{...restProps}
		>
			<div
				data-sidebar="sidebar"
				data-slot="sidebar-inner"
				class="
      bg-sidebar flex flex-col
      group-data-[variant=floating]:border
      group-data-[variant=floating]:border-sidebar-border
      group-data-[variant=floating]:rounded-lg
      group-data-[variant=floating]:shadow-sm
      h-full w-full
    "
			>
				{@render children?.()}
			</div>
		</div>
	</div>
{/if}
