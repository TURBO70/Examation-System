function SummaryComponent(total, correct, wrong, grade) {
  return `
    <div class="grid grid-cols-4 gap-4 text-center">
      <div class="bg-gray-200 p-4 rounded-xl">
        <p class="font-semibold">Total Questions</p>
        <p>${total}</p>
      </div>

      <div class="bg-green-100 p-4 rounded-xl">
        <p class="font-semibold">Correct Answers</p>
        <p>${correct}</p>
      </div>

      <div class="bg-red-100 p-4 rounded-xl">
        <p class="font-semibold">Incorrect Answers</p>
        <p>${wrong}</p>
      </div>

      <div class="bg-[#8fb0c3] text-white p-4 rounded-xl">
        <p class="font-semibold">Grade</p>
        <p>${grade}</p>
      </div>
    </div>
  `;
}
