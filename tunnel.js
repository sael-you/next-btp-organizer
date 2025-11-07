const localtunnel = require('localtunnel');

(async () => {
  const tunnel = await localtunnel({ port: 3000 });

  console.log('\n===========================================');
  console.log('Morocco Building Project Organizer is live!');
  console.log('===========================================');
  console.log('\nPublic URL:', tunnel.url);
  console.log('Local URL:  http://localhost:3000');
  console.log('\nPress Ctrl+C to stop the tunnel\n');

  tunnel.on('close', () => {
    console.log('Tunnel closed');
    process.exit(0);
  });

  // Keep the process running
  process.on('SIGINT', () => {
    console.log('\nClosing tunnel...');
    tunnel.close();
  });
})();
