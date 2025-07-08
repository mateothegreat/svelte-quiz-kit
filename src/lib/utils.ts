import type { StyleProperties } from "bits-ui";
import { clsx, type ClassValue } from "clsx";
import type { Snippet } from "svelte";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
export type WithOutHTML<T> = T extends { html?: any } ? Omit<T, "html"> : T;
export type WithChild<
  /**
   * The props that the component accepts.
   */
  Props extends Record<PropertyKey, unknown> = {},
  /**
   * The props that are passed to the `child` and `children` snippets. The `ElementProps` are
   * merged with these props for the `child` snippet.
   */
  SnippetProps extends Record<PropertyKey, unknown> = { _default: never },
  /**
   * The underlying DOM element being rendered. You can bind to this prop to
   * programmatically interact with the element.
   */
  Ref = HTMLElement
> = Omit<Props, "child" | "children"> & {
  child?: SnippetProps extends { _default: never }
    ? Snippet<[{ props: Record<string, unknown> }]>
    : Snippet<[SnippetProps & { props: Record<string, unknown> }]>;
  children?: SnippetProps extends { _default: never } ? Snippet : Snippet<[SnippetProps]>;
  style?: StyleProperties | string | null | undefined;
  ref?: Ref | null | undefined;
};
