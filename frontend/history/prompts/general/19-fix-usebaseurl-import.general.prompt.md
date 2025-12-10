---
id: 19
title: Fix useBaseUrl Import Warning
stage: general
date: 2025-12-10
user: 
  name: Muhammad Abdul Wahid
  email: abdulwahid.f2022@gmail.com
feature: none
description: Corrected the import statement for useBaseUrl in HomepageFeatures.tsx to fix a warning message and ensure correct image loading.
command: "[WARNING] {\"moduleIdentifier\":\"C:\\Users\\goku\\MyWebsiteProjects\\hackathon-1\\frontend\\node_modules\\babel-loader\\lib\\index.js??ruleSet[1].rules[5].use[0]!C:\\Users\\goku\\MyWebsiteProjects\\hackathon-1\\frontend\\src\\components\\HomepageFeatures\\index.tsx\",\"moduleName\":\"./src/components/HomepageFeatures/index.tsx\",\"loc\":\"1:1589-1599\",\"message\":\"export 'useBaseUrl' (imported as 'useBaseUrl') was not found in '@docusaurus/useBaseUrl' (possible exports: addBaseUrl, default, useBaseUrlUtils)\"} fix this issue"
---
# Prompt
[WARNING] {"moduleIdentifier":"C:\\Users\\goku\\MyWebsiteProjects\\hackathon-1\\frontend\\node_modules\\babel-loader\\lib\\index.js??ruleSet[1].rules[5].use[0]!C:\\Users\\goku\\MyWebsiteProjects\\hackathon-1\\frontend\\src\\components\\HomepageFeatures\\index.tsx","moduleName":"./src/components/HomepageFeatures/index.tsx","loc":"1:1589-1599","message":"export 'useBaseUrl' (imported as 'useBaseUrl') was not found in '@docusaurus/useBaseUrl' (possible exports: addBaseUrl, default, useBaseUrlUtils)"} fix this issue

# Response
I have corrected the import statement for `useBaseUrl` in `src/components/HomepageFeatures/index.tsx`. This should resolve the warning and the image loading issue.

# Files Modified
- src/components/HomepageFeatures/index.tsx

