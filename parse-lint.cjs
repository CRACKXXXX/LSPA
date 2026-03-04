const fs = require('fs');
const path = require('path');
const report = JSON.parse(fs.readFileSync('eslint-report.json', 'utf8'));
report.forEach(file => {
  const unused = file.messages.filter(m => m.ruleId === 'no-unused-vars' || m.ruleId === 'react-hooks/rules-of-hooks' || m.ruleId === 'react-hooks/exhaustive-deps');
  if (unused.length > 0) {
    console.log(path.relative(process.cwd(), file.filePath));
    unused.forEach(m => console.log(`  Line ${m.line}: [${m.ruleId}] ${m.message}`));
  }
});
