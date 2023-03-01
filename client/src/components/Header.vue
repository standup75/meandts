<template>
  <header>
    <h1><a href="/">Me &amp; T's</a></h1>
  </header>
</template>
<style lang="scss" scoped>
  header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    background: #363534;
    text-shadow: inset 0 0 38px #999;
    h1 {
	    font-family: magical-mystery-tour;
      font-size: 32px;
      padding: 5px;
      margin: 0;
      text-align: center;
      a, a:visited, a:active, a:hover {
        text-shadow: 0 0 10px #000;
        color: #F5F1ED;
      }
    }
  }
</style>