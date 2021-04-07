import { ApplicationInsights } from '@microsoft/applicationinsights-web'

const ai = new ApplicationInsights({ config: {
    instrumentationKey: '3359785b-da51-4c93-a0ae-d0e885f257d7',
    disableCookiesUsage: true,
    enableAutoRouteTracking: true
    /* ...Other Configuration Options... */
  } });
  ai.loadAppInsights();
  

export const appInsights = ai.appInsights