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
          modelName: 'deepseek-r1-distill-llama-70b',
          temperature: 0.2,
          streaming: true,
          configuration: {
            baseURL: chatbotApiUrl,
            defaultHeaders: {
              'Content-Type': 'application/json',
            },
          },
          // No API key needed since it's an open endpoint
          openAIApiKey: 'not-needed',
          modelKwargs: {
            model_name: 'gpt-3.5-turbo' // Use a known model for token counting
          },
        }),
      },
    };

    return chatModels;
  } catch (err) {
    logger.error(`Error loading Chatbot models: ${err}`);
    return {};
  }
}; 