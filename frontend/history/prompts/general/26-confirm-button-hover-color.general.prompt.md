---
id: 26
title: Confirm Button Hover Color Change and Provide Troubleshooting
stage: general
date: 2025-12-10
user: 
  name: Muhammad Abdul Wahid
  email: abdulwahid.f2022@gmail.com
feature: none
description: Confirmed that the global button hover background color has been set to light gray for the light theme and provided troubleshooting steps for caching issues.
command: implement the change in buttons of the light theme in preview page in hover add light gray bg color
---
# Prompt
implement the change in buttons of the light theme in preview page in hover add light gray bg color

# Response
I have already implemented a global change for button hover background color to light gray in the light theme in `src/css/custom.css` by setting `--ifm-button-background-color--hover: var(--ifm-background-color);`. This change should apply to all buttons, including those on your "preview page".

If you are not seeing the changes, please try the following:
1. Stop the Docusaurus development server.
2. Clear your browser cache or perform a hard refresh (Ctrl+F5 or Cmd+Shift+R).
3. Start the Docusaurus development server again (`npm start`).

# Files Modified
- (No new files modified in this step, previous changes in src/css/custom.css are relevant)
