<script setup lang="ts">

</script>

<!-- <template>
  <main class="flex flex-col items-center justify-center  text-black">
    
    <a href="/Login" class="mt-3 flex items-center "><img src="../assets/help.png" alt="" class="animate-fade-down rounded " /></a>
    
    <br>
    
    <h2 class="font-pri font-bold">Team Members</h2>
    <div class="grid lg:grid-cols-3 md:grid-cols-1 gap-24 gap-y-12 mt-10">
      <div class="member flex flex-col items-center justify-center">
        
        <img src="../assets/S1.jpg" alt="" class="animate-fade-down h-48 rounded-lg mb-4 shadow-md -z-10" />
        <p><span class="font-pri font-bold">Name:</span> Tanapong Yamkamol</p>
        <p><span class="font-pri font-bold">Student ID:</span> 642115022</p>
      </div>
      <div class="member flex flex-col items-center justify-center">
        
        <img src="../assets/N.jpg" alt="" class="animate-fade-down h-48 rounded-lg mb-4 shadow-md -z-10" />
        <p><span class="font-pri font-bold">Name:</span> Sasipha Thonkhan</p>
        <p><span class="font-pri font-bold">Student ID:</span> 642115042</p>
      </div>
      <div class="member flex flex-col items-center justify-center">
        
        <img src="../assets/BB.jpg" alt="" class="animate-fade-down w-48 h-48 rounded-lg mb-4 shadow-md" />
        <p><span class="font-pri font-bold">Name:</span> Siriyakorn Chomchuen</p>
        <p><span class="font-pri font-bold">Student ID:</span> 642115047</p>

      </div>
    </div>
  </main>
</template> -->

<template>
  <main class="min-h-screen flex flex-col items-center justify-center text-black ">
    <a href="/Login" class="mt-3 flex items-center animate-fade-down">
      <img src="../assets/navlogo.png" alt="Company Logo" class="h-40 md:h-60 lg:h-80 rounded-lg bg-gray-100 shadow-lg" />
    </a>
    <div class="bg-white rounded-lg p-4 shadow-lg mt-8">
      <h2 class="font-pri text-2xl font-bold text-center mb-6">Meet the Team</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Team Member 1 -->
        <div class="member flex flex-col items-center animate-fade-down">
          <img src="../assets/S1.jpg" alt="Tanapong Yamkamol" class="h-48 w-48 rounded-lg shadow-md" />
          <p class="font-pri font-bold text-lg">Tanapong Yamkamol</p>
          <p class="font-pri">Student ID: 642115022</p>
        </div>

        <!-- Team Member 2 -->
        <div class="member flex flex-col items-center animate-fade-down">
          <img src="../assets/N.jpg" alt="Sasipha Thonkhan" class="h-48 w-48 rounded-lg shadow-md" />
          <p class="font-pri font-bold text-lg">Sasipha Thonkhan</p>
          <p class="font-pri">Student ID: 642115042</p>
        </div>

        
        <!-- Team Member 3 -->
        <div class="member flex flex-col items-center animate-fade-down">
          <img src="../assets/BB.jpg" alt="Siriyakorn Chomchuen" class="h-48 w-48 rounded-lg shadow-md" />
          <p class="font-pri font-bold text-lg">Siriyakorn Chomchuen</p>
          <p class="font-pri">Student ID: 642115047</p>
        </div>
      </div>
    </div>
  </main>
</template>

