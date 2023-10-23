<template>
  <div class="student-class">
      <div class="p-5 w-72 cursor-pointer border border-gray-700 mb-4 transition-transform duration-300 transform hover:scale-105 hover:shadow-md">
          <img src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
              alt="" class="w-24 h-24 object-cover rounded-full ">

          <div class="ml-4">
              <span class="text-black" text-lg> {{ student?.name }} {{ student?.surname }}</span>
              <ul class="mt-2 list-disc list-inside">
              <li v-for="course in student?.courselist" :key="course" class="text-gray-700">{{ course }}</li>
          </ul>
          </div>
      </div> 
  </div>
</template>

<!-- <style scoped>
.student-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.student-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgb(0, 0, 0, 0.2);
}

.student-link {
  color: #2c3e50;
  text-decoration: none;
}

.student-card img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}
</style> -->

</template>
