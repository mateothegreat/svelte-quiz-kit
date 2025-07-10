<script lang="ts">
  import { onMount } from "svelte";
  import { quiz } from "../../src/components/quiz/quiz";

  const config: quiz.Config = $state({
    title: "Sample Quiz",
    description: "Test your knowledge with this sample quiz",
    passingScore: 70,
    maxAttempts: 3,
    timeLimit: 60, // Optional: 60 seconds
    questions: [
      {
        id: "q1",
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswer: "Paris"
      },
      {
        id: "q2",
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
      }
    ]
  });

  onMount(() => {
    quiz.open({ config }, () => {
      console.log("Quiz modal closed");
    });
  });
</script>

<main class="container flex flex-col font-system gap-2 mx-auto p-6">
  <section class="flex flex-col gap-2"></section>
</main>
