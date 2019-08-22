const fetch = require("node-fetch");
const JSDOM = require("jsdom").JSDOM;
const puppeteer = require("puppeteer");

const output = {
  parties: [
    {
      name: "cpc",
      projections: {},
      leader: "Andrew Scheer",
    },
    {
      name: "lpc",
      projections: {},
      leader: "Justin Trudeau",
    },
    {
      name: "ndp",
      projections: {},
      leader: "Jagmeet Singh",
    },
    {
      name: "bq",
      projections: {},
      leader: "Yves-François Blanchet",
    },
    {
      name: "gpc",
      projections: {},
      leader: "Elizabeth May",
    },
    {
      name: "ind",
      projections: {},
    },
    {
      name: "ppc",
      projections: {},
      leader: "Maxime Bernier",
    },
  ],
};

function getShortPartyString(input) {
  input = input.toLowerCase().trim();
  if (input.charAt(0) === "o") {
    // "other"
    return "ind";
  }
  return (
    ["lpc", "cpc", "ndp", "bq", "gpc", "ind", "ppc"].find(
      x => input.charAt(0) === x.charAt(0)
    ) || null
  );
}

function get338() {
  const partyColors = {
    lpc: "#990000",
    cpc: "#0000FF",
    ndp: "#b45f06",
    bq: "#00b0f0",
    gpc: "#00b050",
    ind: "#808080",
    ppc: "#551A8B",
  };
  const nearestColor = require("nearest-color").from(partyColors);
  const url = "http://338canada.com/districts/districts.htm";
  return fetch(url)
    .then(resp => resp.text())
    .then(text => {
      const dom = new JSDOM(text);
      const { document } = dom.window;
      const list = Array.from(
        document.querySelectorAll("table tbody tr td:last-child")
      )
        .map(x => {
          const color = x.innerHTML.match(/color:(.*);/);
          return {
            party: color ? nearestColor(color[1]).name : null,
            seats: parseFloat(x.textContent),
          };
        })
        .filter(x => !isNaN(x.seats));
      for (const result of list) {
        output.parties.find(
          x => x.name == result.party
        ).projections.threethirtyeight = result.seats;
      }
      return output;
    });
}

function getCalculatedPolitics() {
  const url =
    "https://www.calculatedpolitics.com/project/2019-canada-election/";
  return fetch(url)
    .then(resp => resp.text())
    .then(text => {
      const dom = new JSDOM(text);
      const { document } = dom.window;
      const list = [...document.querySelectorAll("table tr")]
        .filter(
          x =>
            x.children.length == 6 &&
            /\d/.test(x.textContent) &&
            [
              "liberal",
              "conservative",
              "new democrat",
              "bloc qu",
              "green",
            ].some(word => x.textContent.toLowerCase().includes(word))
        )
        .map(x => {
          const party = getShortPartyString(x.children[0].textContent);
          const seats = parseFloat(x.children[4].textContent);
          return { party, seats };
        });

      for (const result of list) {
        output.parties.find(
          x => x.name == result.party
        ).projections.calculatedPolitics = result.seats;
      }
      return output;
    });
}

async function getCBC() {
  const url = "https://newsinteractives.cbc.ca/elections/poll-tracker/canada/";
  const browser = await puppeteer.launch(); // using puppeteer because they load dynamic content
  const page = await browser.newPage();

  await page.goto(url);

  await page.addScriptTag({ content: `${getShortPartyString}` });

  await page.waitForSelector("div.seat-proj");
  await page.waitFor(3000); // wait for data-rankvalue to populate

  const list = await page.evaluate(() =>
    [...document.querySelectorAll("div.seat-proj")].map(x => {
      return {
        party: getShortPartyString(x.textContent),
        seats: parseFloat(x.getAttribute("data-rankvalue")),
      };
    })
  );

  await browser.close();

  for (const result of list) {
    output.parties.find(x => x.name == result.party).projections.cbc =
      result.seats;
  }
  return output;
}

function getCdnElectionWatch() {
  const url = "http://cdnelectionwatch.blogspot.com/";
  return fetch(url)
    .then(resp => resp.text())
    .then(text => {
      const dom = new JSDOM(text);
      const { document } = dom.window;
      const root = [
        ...document.querySelectorAll(".sidebar.section div.widget.Text"),
      ].find(x => x.textContent.toLowerCase().includes("current projection"));

      const list = [...root.querySelectorAll("table tbody tr")]
        .filter(x => x.querySelector("td img[alt]:only-child"))
        .map(x => {
          const party = getShortPartyString(
            x.querySelector("td img[alt]:only-child").getAttribute("alt")
          );
          const seats = parseFloat(x.textContent);
          return { party, seats };
        });

      for (const result of list) {
        output.parties.find(
          x => x.name === result.party
        ).projections.cdnElectionWatch = result.seats;
      }
      return output;
    });
}

function getAverages() {
  for (const party of output.parties) {
    party.sum = 0;
    for (const projection in party.projections) {
      party.sum += party.projections[projection];
    }
    party.avg = party.sum / Object.keys(party.projections).length;

    party.avg = Math.round(party.avg * 100) / 100;

    delete party.sum;
  }
}

function validateOutput() {
  output.valid = true; // TODO: add actual checks here and cause build to fail if not valid
}

function sort() {
  output.parties = output.parties.sort((a, b) => b.avg - a.avg);
}

function saveToFile() {
  var fs = require("fs");
  const date = new Date().toISOString().substring(0, 10);
  fs.writeFile(
    `federal/${date}.json`,
    JSON.stringify(output, null, 2),
    "utf8",
    () => {}
  );
}

Promise.all([
  get338(),
  getCalculatedPolitics(),
  getCBC(),
  getCdnElectionWatch(),
]).then(() => {
  getAverages();
  sort();
  validateOutput();
  saveToFile();
});
