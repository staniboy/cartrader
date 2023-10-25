<template>
  <header
    class="sticky top-0 z-50 flex justify-between items-center space-x-1 border-b bg-white p-4 shadow-md"
  >
    <NuxtLink class="text-3xl font-mono" to="/">cartrader</NuxtLink>
    <div>
      <div v-show="user" class="flex flex-row items-center gap-4">
        <nuxt-link
          to="/profile/listings"
          class="cursor-pointer hover:text-sky-500 text-md"
          >My Listings</nuxt-link
        >
        <button
          @click="logout"
          class="border rounded-md px-4 py-1 hover:bg-sky-500 hover:border-sky-500 hover:text-white font-bold text-md"
        >
          Logout
        </button>
      </div>
      <button
        v-show="!user"
        @click="login"
        class="border rounded-md px-4 py-1 hover:bg-sky-500 hover:border-sky-500 hover:text-white font-bold text-md"
      >
        Login
      </button>
    </div>
  </header>
</template>
<script setup>
const router = useRouter();
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const logout = () => {
  supabase.auth.signOut().catch((err) => console.log(err));
  router.push({ path: "/" });
};
const login = () => {
  supabase.auth
    .signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}`,
      },
    })
    .catch((err) => console.log(err));
};
</script>
