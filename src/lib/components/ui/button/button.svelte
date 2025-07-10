<script lang="ts" module>
  import { cn, type WithElementRef } from "$lib/utils.js";
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
  import { tv, type VariantProps } from "tailwind-variants";

  export const buttonVariants = tv({
    base: `
      [&_svg:not([class*='size-'])]:size-4
      [&_svg]:pointer-events-none [&_svg]:shrink-0
      aria-disabled:opacity-50 aria-disabled:pointer-events-none
      aria-invalid:border-destructive aria-invalid:ring-destructive/20
      dark:aria-invalid:ring-destructive/40 
      disabled:opacity-50 disabled:pointer-events-none
      focus-visible:border-ring focus-visible:ring-[3px]
      focus-visible:ring-ring/50
      font-medium gap-2 inline-flex items-center justify-center outline-none
      rounded-md shrink-0 text-sm transition-all whitespace-nowrap
    `,
    variants: {
      variant: {
        default: `
          bg-primary 
          hover:bg-primary/90

          shadow-xs text-primary-foreground  
           
    
             
        `,
        destructive: ` 

        
          bg-destructive
          dark:bg-destructive/60   dark:focus-visible:ring-destructive/40
          focus-visible:ring-destructive/20 
          hover:bg-destructive/90
          shadow-xs   text-white

 
    
 

        `,

        outline: `
          asdf bg-background border
          dark:bg-input/30 dark:border-input dark:hover:bg-input/50
          hover:bg-accent hover:text-accent-foreground
          shadow-xs
        `,
        secondary: ` 
          bg-secondary
          hover:bg-secondary/80
          shadow-xs text-secondary-foreground
        `,
        ghost: `
          dark:hover:bg-accent/50
          hover:bg-accent hover:text-accent-foreground 
        `,

        link: `
          hover:underline
          text-primary underline-offset-4
        `
      },
      size: {
        default: `
          h-9
          has-[>svg]:px-3
          px-4 py-2
        `,
        sm: `
          gap-1.5 h-8
          has-[>svg]:px-2.5
          px-3 rounded-md
        `,
        lg: `
          h-10
          has-[>svg]:px-4
          px-6 rounded-md
        `,
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  });

  export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
  export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

  export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
    WithElementRef<HTMLAnchorAttributes> & {
      variant?: ButtonVariant;
      size?: ButtonSize;
    };
</script>

<script lang="ts">
  let {
    class: className,
    variant = "default",
    size = "default",
    ref = $bindable(null),
    href = undefined,
    type = "button",
    disabled,
    children,
    ...restProps
  }: ButtonProps = $props();
</script>

{#if href}
  <a
    bind:this={ref}
    data-slot="button"
    class={cn(buttonVariants({ variant, size }), className)}
    href={disabled ? undefined : href}
    aria-disabled={disabled}
    role={disabled ? "link" : undefined}
    tabindex={disabled ? -1 : undefined}
    {...restProps}>
    {@render children?.()}
  </a>
{:else}
  <button
    bind:this={ref}
    data-slot="button"
    class={cn(buttonVariants({ variant, size }), className)}
    {type}
    {disabled}
    {...restProps}>
    {@render children?.()}
  </button>
{/if}
