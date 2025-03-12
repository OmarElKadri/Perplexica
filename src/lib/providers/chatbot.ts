import { ChatOpenAI } from '@langchain/openai';
import { getChatbotApiUrl } from '../../config';
import logger from '../../utils/logger';

export const loadChatbotChatModels = async () => {
  const chatbotApiUrl = getChatbotApiUrl();

  if (!chatbotApiUrl) return {};

  try {
    const chatModels = {
      'chatbot': {
        displayName: 'Custom Chatbot',
        model: new ChatOpenAI({
          modelName: 'chatbot',
          temperature: 0.2,
          configuration: {
            baseURL: chatbotApiUrl,
            defaultHeaders: {
              'Content-Type': 'application/json',
            },
          },
          // No API key needed since it's an open endpoint
          openAIApiKey: 'not-needed',
        }),
      },
    };

    return chatModels;
  } catch (err) {
    logger.error(`Error loading Chatbot models: ${err}`);
    return {};
  }
}; 