export const template = `
<div class="chat_container">
  <div class="left_block">
    <div class="userchat_container">
      <div class="top_block">
        <div class="logo"></div>
        {{{buttonUser}}}
      </div>
      <div class="search_block">
        <input type="text" placeholder="&#x1F50D">
      </div>
      <div class="userchats_block">
        {{{buddy1}}}
        {{{buddy2}}}
        {{{buddy3}}}
        {{{buddy4}}}
        {{{buddy5}}}
        {{{buddy6}}}
        {{{buddy7}}}
        {{{buddy8}}}
        {{{buddy9}}}
        {{{buddy10}}}        
      </div>
    </div>
  </div>

  <div class="right_block">
    <div class="rb_header">
      <div class="rb_header_buddy">
        <div class="rb_avatar">😎</div>
        <div class="rb_name">Current User</div>
      </div>
      <div class="rb_header_dots">⠿</div>
    </div>
      <div class="rb_body">
        <div class="rb_body_date"></div>
        <div class="rb_buddy_post">
          <div class="HISpost">
            <div class="text"></div>
            <div class="time"></div>
          </div>
          <div class="media">
            <img>
            <div class="time"></div>
          </div>
        </div>
        <div class="rb_my_post">
          <div class="mypost">
            <div class="content"></div>
          </div>
        </div>
      </div>
      <div class="rb_footer">      
        <div class="rb_footer_pin"></div>
        <div class="rb_footer_input">{{{inputMessage}}}</div>
        <div class="rb_footer_send">{{{buttonSend}}}</div>
      </div>
  </div>
</div>
`
