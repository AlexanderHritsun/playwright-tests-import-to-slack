// Add those variables and reporter setup to your playwright config file.
const projectBaseDir = path.resolve(__dirname);
const slackReporterPath = path.join(projectBaseDir, 'node_modules', 'playwright-slack-report', 'dist', 'src', 'SlackReporter.js');

{
    reporter: process.env.CI
        ? [
            [
                slackReporterPath,
                {
                    channels: ['automation-results'], // provide one or more Slack channels,
                    slackWebHookUrl: 'your/slack/webhook/url/here',
                    sendResults: 'always', // "always" , "on-failure", "off"
                    maxNumberOfFailuresToShow: 10,
                    layout: slackLayout // import slackLayout from 'slackLayout.ts';
                }
            ],
            ['html'],
            ['json', { outputFile: 'playwright-report/results.json' }]
        ]
        : [['html'], ['json', { outputFile: 'playwright-report/results.json' }]], // json report is useful for sync with Jira/TestRail
}