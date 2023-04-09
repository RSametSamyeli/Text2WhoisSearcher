const fs = require('fs');
const whois = require('whois');

const inputFile = 'domain-list.txt';

fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const domains = data.split('\n').map(line => line.trim());

  domains.forEach(domain => {
    whois.lookup(domain, (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      const lines = data.split('\n');

      // Check if the domain is active
      let isActive = false;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].toLowerCase();
        if (
          line.includes('status: active') ||
          line.includes('domain status: active') ||
          line.includes('domain status........: active')
        ) {
          isActive = true;
          break;
        }
      }

      if (!isActive) {
        console.log(`Domain '${domain}' is not active`);
      }
    });
  });
});
