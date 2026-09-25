const base = 'http://localhost:65432';

async function main() {
  const root = await fetch(base + '/');
  const rootText = await root.text();
  console.log('ROOT', root.status, rootText);

  const faviconRes = await fetch(base + '/favicon.ico');
  console.log('FAVICON', faviconRes.status, faviconRes.statusText);

  const registerRes = await fetch(base + '/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'secret123',
    }),
  });

  const registerText = await registerRes.text();
  console.log('REGISTER', registerRes.status, registerText);

  const registerJson = JSON.parse(registerText);
  const token = registerJson.token;

  const aiRes = await fetch(base + '/api/ai/fitness-insights', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      totalWorkouts: 10,
      averageDuration: 45,
      totalCaloriesBurned: 1200,
    }),
  });

  const aiText = await aiRes.text();
  console.log('AI', aiRes.status, aiText);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
