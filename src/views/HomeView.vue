<script setup lang="ts">

</script>

<template>
  <main class="flex flex-col items-center justify-center  text-black">
    <!-- <h1 class="font-fig text-3xl font-bold py-4 text-center">Component-Based Software Development</h1> -->
    <a href="/Login" class="mt-3 flex items-center "><img src="../assets/help.png" alt="" class="animate-fade-down rounded " /></a>
    
    <br>
    <!-- <p class="font-fig font-bold text-base ">Group Name: Help Me PLEASE</p> -->
    <h2 class="font-fig font-bold">Team Members</h2>
    <div class="grid lg:grid-cols-3 md:grid-cols-1 gap-24 gap-y-12 mt-10">
      <div class="member flex flex-col items-center justify-center">
        <!-- pic -->
        <img src="../assets/S1.jpg" alt="" class="animate-fade-down h-48 rounded-lg mb-4 shadow-md -z-10" />
        <p><span class="font-fig font-bold">Name:</span> Tanapong Yamkamol</p>
        <p><span class="font-fig font-bold">Student ID:</span> 642115022</p>
      </div>
      <div class="member flex flex-col items-center justify-center">
        <!-- pic -->
        <img src="../assets/N.jpg" alt="" class="animate-fade-down h-48 rounded-lg mb-4 shadow-md -z-10" />
        <p><span class="font-fig font-bold">Name:</span> Sasipha Thonkhan</p>
        <p><span class="font-fig font-bold">Student ID:</span> 642115042</p>
      </div>
      <div class="member flex flex-col items-center justify-center">
        <!-- pic -->
        <img src="../assets/BB.jpg" alt="" class="animate-fade-down w-48 h-48 rounded-lg mb-4 shadow-md" />
        <p><span class="font-fig font-bold">Name:</span> Siriyakorn Chomchuen</p>
        <p><span class="font-fig font-bold">Student ID:</span> 642115047</p>

      </div>
    </div>
  </main>
</template>
