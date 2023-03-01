<template>
  <footer>
    <div class="wrapper">
      <div class="content">
        <div>
          <div class="logo">Me &amp; T's</div>
          <div class="tagline">The fastest T-Shirt maker!</div>
        </div>
        <div>
          <a href="/return">Return Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy</a>
        </div>
        <div>
          <a href="/about">About Us</a>
          <a href="mailto:info@meandts.com">info@meandts.com</a>
          <div class="copyright">&copy; 2020 The Good Place Inc.</div>
        </div>
      </div>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
footer {
  background: #fff;
  padding-top: 50px;
}
.wrapper {
  padding: 50px 0 30px;
  background: #757472;
  color: #f5f1ed;
  box-shadow: inset 0 10px 4px rgba(0, 0, 0, 0.1);
}
.logo {
  font-family: magical-mystery-tour;
  font-size: 22px;
}
.tagline {
  font-weight: bold;
  font-style: italic;
}
a {
  display: block;
}
a,
a:visited,
a:active {
  color: #d5edf5;
}
a:hover {
  color: #f7fdff;
}
.copyright {
  margin-top: 10px;
}
@media (min-width: 501px) {
  .content {
    text-align: left;
    width: 900px;
    margin: 0 auto;
    overflow: hidden;
    > div {
      width: 300px;
      float: left;
    }
  }
}
@media (max-width: 500px) {
  .content {
    text-align: left;
    width: 100%;
    > div {
      margin: 0 20px 10px 20px;
    }
  }
}
</style>
