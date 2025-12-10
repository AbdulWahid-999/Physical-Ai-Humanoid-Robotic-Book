import React, {type ReactNode} from 'react';
import Layout from '@theme-original/Layout';
import type LayoutType from '@theme/Layout';
import type {WrapperProps} from '@docusaurus/types';
import ChatbotInterface from '@site/src/components/Chatbot/ChatbotInterface'; 

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): ReactNode {
  return (
    <>
      <Layout {...props} />
      <ChatbotInterface /> 
    </>
  );
}
// src/theme/Layout/index.js


// Import the component you created

