const { devices } = require('@playwright/test');

module.exports = {
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop 1920x1080'], channel: 'chrome' },
    },
  ],
};
