// This is a layout example for playwright-slack-report lib

import { Block, KnownBlock } from '@slack/types';
import { SummaryResults } from 'playwright-slack-report/dist/src';
const playwrightConfig = require('../playwright.config.ts');

export default function slackLayout(summaryResults: SummaryResults): Array<KnownBlock | Block> {
  const header = {
    type: 'section',
    text: {
      type: 'plain_text',
      text: `🎭 Test Results ${new Date().toLocaleString()} executed against the ${
        playwrightConfig.default.use.baseURL
      } environment.`,
      emoji: true
    }
  };

  const summary = {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `✅ *${summaryResults.passed + summaryResults.flaky}* | ❌ *${summaryResults.failed}* | ❄️ *${
        summaryResults.flaky
      }* | ⏩ *${summaryResults.skipped}*`
    }
  };

  if (summaryResults.failed !== 0) {
    const failedTestsNames = summaryResults.failures.map((testCase) => `❌ ${testCase.test}`).join('\n');
    const failedTestsList = {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Failed Tests:*\n${failedTestsNames}`
      }
    };

    return [header, failedTestsList, summary];
  }

  return [header, summary];
}
