/**
 * Test Figma API connection
 * Run with: node scripts/testFigmaConnection.js
 */

const FIGMA_API_BASE = 'https://api.figma.com/v1';
const FIGMA_TOKEN = process.env.FIGMA_PERSONAL_ACCESS_TOKEN || process.env.FIGMA_TOKEN;

if (!FIGMA_TOKEN) {
  console.error('❌ FIGMA_PERSONAL_ACCESS_TOKEN (or FIGMA_TOKEN) is not set in the environment.');
  process.exit(1);
}

async function testConnection() {
  try {
    console.log('Testing Figma API connection...\n');

    // Test 1: Get current user
    console.log('1. Testing /me endpoint...');
    const meResponse = await fetch(`${FIGMA_API_BASE}/me`, {
      headers: {
        'X-Figma-Token': FIGMA_TOKEN,
      },
    });

    console.log(`   Status: ${meResponse.status} ${meResponse.statusText}`);

    if (meResponse.ok) {
      const meData = await meResponse.json();
      console.log(`   ✅ User: ${meData.email || 'N/A'}`);
      console.log(`   Handle: ${meData.handle || 'N/A'}`);
    } else {
      const errorData = await meResponse.text();
      console.log(`   ❌ Error: ${errorData}`);
    }

    // Test 2: Try to fetch the file without node-id
    console.log('\n2. Testing file access (without node-id)...');
    const fileKey = 'a4HeaeWKeacfWEJhm1bt2B';
    const fileResponse = await fetch(`${FIGMA_API_BASE}/files/${fileKey}`, {
      headers: {
        'X-Figma-Token': FIGMA_TOKEN,
      },
    });

    console.log(`   Status: ${fileResponse.status} ${fileResponse.statusText}`);

    if (fileResponse.ok) {
      const fileData = await fileResponse.json();
      console.log(`   ✅ File name: ${fileData.name || 'N/A'}`);
      console.log(`   Last modified: ${fileData.lastModified || 'N/A'}`);
    } else {
      const errorData = await fileResponse.text();
      console.log(`   ❌ Error: ${errorData}`);
    }

    // Test 3: Try with node-id
    console.log('\n3. Testing file access (with node-id)...');
    const nodeId = '3732:1596';
    const nodeResponse = await fetch(`${FIGMA_API_BASE}/files/${fileKey}?ids=${nodeId}`, {
      headers: {
        'X-Figma-Token': FIGMA_TOKEN,
      },
    });

    console.log(`   Status: ${nodeResponse.status} ${nodeResponse.statusText}`);

    if (nodeResponse.ok) {
      const nodeData = await nodeResponse.json();
      console.log(`   ✅ File name: ${nodeData.name || 'N/A'}`);
    } else {
      const errorData = await nodeResponse.text();
      console.log(`   ❌ Error: ${errorData}`);
    }

  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  }
}

testConnection();
