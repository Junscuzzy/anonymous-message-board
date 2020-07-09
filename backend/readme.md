# Anonymous Message Board

FreeCodeCamp challenge - Information Security Projects

Build a full stack JavaScript app that is functionally similar to this: https://spiky-well-vein.glitch.me/.

## User stories

- [*] Only allow your site to be loading in an iFrame on your own pages.
- [*] Do not allow DNS prefetching.
- [*] Only allow your site to send the referrer for your own pages.
- [*] I can POST a thread to a specific message board by passing form data text and deletepassword_ to /api/threads/{board}.(Recommend res.redirect to board page /b/{board}) Saved will be at least _id, text, createdon_(date&time), bumpedon_(date&time, starts same as created_on), reported(boolean), deletepassword_, & replies(array).
- [*] I can POST a reply to a thread on a specific board by passing form data text, deletepassword_, & threadid_ to /api/replies/{board} and it will also update the bumped_on date to the comments date.(Recommend res.redirect to thread page /b/{board}/{thread_id}) In the thread's replies array will be saved _id, text, createdon_, deletepassword_, & reported.
- [*] I can GET an array of the most recent 10 bumped threads on the board with only the most recent 3 replies each from /api/threads/{board}. The reported and deletepasswords_ fields will not be sent to the client.
- [*] I can GET an entire thread with all its replies from /api/replies/{board}?thread_id={thread_id}. Also hiding the same fields the client should be see.
- [*] I can delete a thread completely if I send a DELETE request to /api/threads/{board} and pass along the threadid_ & deletepassword_. (Text response will be 'incorrect password' or 'success')
- [ ] I can delete a post(just changing the text to '[deleted]' instead of removing completely like a thread) if I send a DELETE request to /api/replies/{board} and pass along the threadid_, replyid_, & deletepassword_. (Text response will be 'incorrect password' or 'success')
- [ ] I can report a thread and change its reported value to true by sending a PUT request to /api/threads/{board} and pass along the threadid_. (Text response will be 'success')
- [ ] I can report a reply and change its reported value to true by sending a PUT request to /api/replies/{board} and pass along the threadid_ & replyid_. (Text response will be 'success')
Complete functional tests that wholly test routes and pass.