<script lang="ts">
	import type { HTMLInputAttributes, HTMLInputTypeAttribute } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	type InputType = Exclude<HTMLInputTypeAttribute, "file">;

	type Props = WithElementRef<
		Omit<HTMLInputAttributes, "type"> &
			({ type: "file"; files?: FileList } | { type?: InputType; files?: undefined })
	>;

	let {
		ref = $bindable(null),
		value = $bindable(),
		type,
		files = $bindable(),
		class: className,
		...restProps
	}: Props = $props();
</script>

{#if type === "file"}
	<input
		bind:this={ref}
		data-slot="input"
		class={cn(
			`
     bg-transparent border border-input
     dark:bg-input/30
     disabled:cursor-not-allowed disabled:opacity-50
     flex font-medium h-9
     md:text-sm
     min-w-0 outline-none
     placeholder:text-muted-foreground
     pt-1.5 px-3 ring-offset-background rounded-md
     selection:bg-primary selection:text-primary-foreground
     shadow-xs text-sm transition-[color,box-shadow] w-full
   `,
			`
     focus-visible:border-ring focus-visible:ring-[3px]
     focus-visible:ring-ring/50
   `,
			`
     aria-invalid:border-destructive aria-invalid:ring-destructive/20
     dark:aria-invalid:ring-destructive/40
   `,
			className
		)}
		type="file"
		bind:files
		bind:value
		{...restProps}
	/>
{:else}
	<input
		bind:this={ref}
		data-slot="input"
		class={cn(
			`
     bg-background border border-input
     dark:bg-input/30
     disabled:cursor-not-allowed disabled:opacity-50
     flex h-9
     md:text-sm
     min-w-0 outline-none
     placeholder:text-muted-foreground
     px-3 py-1 ring-offset-background rounded-md
     selection:bg-primary selection:text-primary-foreground
     shadow-xs text-base transition-[color,box-shadow] w-full
   `,
			`
     focus-visible:border-ring focus-visible:ring-[3px]
     focus-visible:ring-ring/50
   `,
			`
     aria-invalid:border-destructive aria-invalid:ring-destructive/20
     dark:aria-invalid:ring-destructive/40
   `,
			className
		)}
		{type}
		bind:value
		{...restProps}
	/>
{/if}
