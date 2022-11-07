export const template = `
<div class="form_block">
  <div class="form_welcome">
    <img id="logo" src="data:image/png;base64,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">
    <div class="text"><span>Sign in</span></div>
  </div>
  <form class="form">
      {{{inputLogin}}}
      {{{inputPassword}}}
        <div class="buttons">
      {{{buttonSignUp}}}
      {{{buttonSignIn}}}
        </div>
  </form>
  </div>
</div>
`