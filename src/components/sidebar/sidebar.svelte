<script lang="ts">
  import AppSidebar from "$lib/components/app-sidebar.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import { useSidebar } from "$lib/components/ui/sidebar/index.js";

  import { MenuIcon } from "@lucide/svelte";

  const sidebar = useSidebar();
  let { children } = $props();
</script>

<Sidebar.Provider>
  <AppSidebar />
  <main class="gap-4 grid p-4">
    <Button onclick={() => sidebar.toggle()} size="icon" variant="outline">
      <MenuIcon />
    </Button>
    {@render children?.()}
  </main>
</Sidebar.Provider>
