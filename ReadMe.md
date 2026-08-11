<p align="center">
  <a href="https://www.metaprojection.ca">
    <img src="https://raw.githubusercontent.com/rosslh/metaprojection.ca/master/icon.png" height="50px" width="50px" alt="MetaProjection icon">
  </a>
</p>

<h1 align="center">MetaProjection</h1>

<p align="center">
  <a href="https://www.metaprojection.ca">MetaProjection</a> is a web application that provides Canadian voters with up-to-date electoral projections. By aggregating data from multiple trusted sources, it offers a clear overview of how the election is shaping up, both at the federal level and within individual electoral districts.
</p>

<p align="center">
  <img src="https://img.shields.io/uptimerobot/status/m792388124-b7e4417815ddd9388914883d?up_message=online&style=flat&label=Status" alt="Uptime Robot status">
  <img src="https://img.shields.io/uptimerobot/ratio/m792388124-b7e4417815ddd9388914883d?style=flat&label=Uptime%20(1mo)" alt="Uptime Robot ratio (30 days)">
  <a href="https://mapledeploy.ca/?utm_source=badge&utm_medium=referral&utm_campaign=server-f1b4d852&utm_content=markdown-shields"><img src="https://mapledeploy.ca/api/badge/shields" alt="Hosted in Canada with MapleDeploy"></a>
</p>

## Features

### Interactive Electoral Map

The centerpiece of the application is an interactive map displayed prominently at the top of the page. This map provides a visual representation of how each electoral district across Canada is likely to vote. The color-coded districts allow users to quickly grasp the projected political landscape at a glance.

### Personalized District Information

MetaProjection takes user experience a step further by utilizing geolocation technology. Upon granting permission, the application can identify the user's current electoral district and highlight it on the map. This feature allows voters to immediately see the projected outcome for their local area, fostering a more engaged and informed electorate.

### Comprehensive Data Aggregation

By compiling projections from various reputable sources, MetaProjection offers a balanced and nuanced view of the electoral landscape. This approach helps mitigate potential biases and provides users with a more accurate overall picture of the upcoming election.

## How It Works

1. Visit [MetaProjection](https://www.metaprojection.ca/)
2. Allow geolocation access for personalized district information (optional)
3. Explore the interactive map to view projections for different regions
4. Dive deeper into specific districts or overall federal projections as needed

MetaProjection aims to be an essential tool for Canadian voters, political analysts, and anyone interested in staying informed about the country's electoral dynamics.

## Technologies used

- **Framework**: [React](https://reactjs.org/) / [Gatsby](https://www.gatsbyjs.org/)
- **CSS-in-JS**: [Emotion](https://emotion.sh/docs/introduction)
- **Mapping**: [Leaflet](https://leafletjs.com/) / [OpenStreetMap](https://www.openstreetmap.org)
- **State management**: [MobX](https://github.com/mobxjs/mobx)
- **Scraping**: [Puppeteer](https://github.com/GoogleChrome/puppeteer)
- **Integration testing**: [Cypress](https://www.cypress.io/)
- **Error tracking**: [Sentry](https://sentry.io/welcome/)
- **Hosting**: [MapleDeploy](https://mapledeploy.ca/?utm_source=github&utm_medium=referral&utm_content=metaprojection-readme)
- **Continuous integration**: [GitHub Actions](https://github.com/features/actions)
