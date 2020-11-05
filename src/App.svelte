<script>
  /**
   * 데이터의 흐름
   * State → View → Action → Reduce → State
   */
  import { onMount } from "svelte";
  import { state } from "../store/store";
  import {
    selectMyAnswer,
    computerAnswerShuffle,
    winLossCalculation,
    gameReset,
  } from "../store/action";

  const gameOptions = [
    { emoji: "✌🏻", name: "가위" },
    { emoji: "✊🏻", name: "바위" },
    { emoji: "✋🏻", name: "보" },
  ];

  let timer;

  onMount(() => {
    startComputerAnswerShuffle();
  });

  // 컴퓨터 답변 섞기
  const startComputerAnswerShuffle = () => {
    timer = setInterval(() => {
      computerAnswerShuffle();
    }, 100);
  };

  // 컴퓨터 답변 그만 섞기
  const stopComputerAnswerShuffle = () => {
    clearInterval(timer);
  };

  // 내 답변 선택
  const chooseAnswer = (index) => {
    stopComputerAnswerShuffle();

    selectMyAnswer(index);

    winLossCalculation();
  };

  // 게임 다시 시작
  const gameRestart = () => {
    gameReset();

    startComputerAnswerShuffle();
  };
</script>

<section class="result" class:result-on={$state.result}>
  <!-- 게임 결과 -->
  <div class="result-emoji">{$state.result?.emoji || '👋🏻'}</div>
  <p class="result-message">{$state.result?.message || ''}</p>
</section>

<section class="answer">
  <!-- 컴퓨터 답변 -->
  <div class="answer-wrap">
    <div class="answer-computer">
      {gameOptions[$state.computer.answer - 1]?.emoji}
    </div>
  </div>

  <p class="answer-vs">vs</p>

  <!-- 내 답변 -->
  <div class="answer-wrap">
    {#if $state.result}
      <div class="answer-my">{gameOptions[$state.my.answer - 1].emoji}</div>
    {:else}
      <div>❔</div>
    {/if}
  </div>
</section>

<!-- 답변 선택 버튼 -->
<section class="buttons">
  {#each gameOptions as option, index}
    <button
      on:click={() => !$state.result && chooseAnswer(index + 1)}>{option.emoji}</button>
  {/each}
  <button on:click={() => gameRestart()}> ↩️ </button>
</section>
