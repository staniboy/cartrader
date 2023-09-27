<template>
  <div
    class="relative -mt-[69px] h-screen w-100 bg-no-repeat bg-cover bg-bottom bg-[url(https://unsplash.com/photos/bkyIc6uJIdU/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MzB8fGx1eHVyeSUyMGNhcnxlbnwwfHx8fDE2ODIyODI4MjM&force=true&w=1920)]"
  >
    <div class="absolute z-10 w-full h-full flex justify-center items-center">
      <div class="text-center m-5 w-full md:w-2/3 xl:w-2/5">
        <h1
          class="sm: text-4xl md:text-5xl lg:text-6xl text-white font-serif mb-10"
        >
          Find Your Drive
        </h1>
        <SearchBar />
      </div>
    </div>
    <div class="z-1 absolute w-full h-full bg-white opacity-20"></div>
  </div>
</template>
