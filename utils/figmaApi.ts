/**
 * Figma API Utility Functions
 * Documentation: https://www.figma.com/developers/api
 */

const FIGMA_API_BASE = 'https://api.figma.com/v1';

/**
 * Get Figma personal access token from environment
 */
const getFigmaToken = (): string => {
  const token = process.env.FIGMA_TOKEN;
  if (!token || token === 'YOUR_FIGMA_PERSONAL_ACCESS_TOKEN_HERE') {
    throw new Error('FIGMA_TOKEN is not configured in .env.local');
  }
  return token;
};

/**
 * Fetch a Figma file by file key
 * @param fileKey - The file key from the Figma URL (e.g., "a4HeaeWKeacfWEJhm1bt2B")
 * @param nodeId - Optional specific node ID to fetch
 */
export const fetchFigmaFile = async (fileKey: string, nodeId?: string) => {
  const token = getFigmaToken();
  const url = nodeId
    ? `${FIGMA_API_BASE}/files/${fileKey}?ids=${nodeId}`
    : `${FIGMA_API_BASE}/files/${fileKey}`;

  const response = await fetch(url, {
    headers: {
      'X-Figma-Token': token,
    },
  });

  if (!response.ok) {
    throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

/**
 * Fetch images from a Figma file
 * @param fileKey - The file key from the Figma URL
 * @param nodeIds - Array of node IDs to fetch images for
 * @param format - Image format (png, jpg, svg, pdf)
 * @param scale - Image scale (0.01 to 4)
 */
export const fetchFigmaImages = async (
  fileKey: string,
  nodeIds: string[],
  format: 'png' | 'jpg' | 'svg' | 'pdf' = 'png',
  scale: number = 2
) => {
  const token = getFigmaToken();
  const ids = nodeIds.join(',');
  const url = `${FIGMA_API_BASE}/images/${fileKey}?ids=${ids}&format=${format}&scale=${scale}`;

  const response = await fetch(url, {
    headers: {
      'X-Figma-Token': token,
    },
  });

  if (!response.ok) {
    throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

/**
 * Parse Figma URL to extract file key and node ID
 * @param url - Full Figma URL
 * @returns Object with fileKey and nodeId
 */
export const parseFigmaUrl = (url: string): { fileKey: string; nodeId?: string } => {
  const urlPattern = /figma\.com\/design\/([^/]+)/;
  const nodePattern = /node-id=([^&]+)/;

  const fileMatch = url.match(urlPattern);
  const nodeMatch = url.match(nodePattern);

  if (!fileMatch) {
    throw new Error('Invalid Figma URL');
  }

  return {
    fileKey: fileMatch[1],
    nodeId: nodeMatch ? nodeMatch[1] : undefined,
  };
};

/**
 * Test Figma API connection
 */
export const testFigmaConnection = async (): Promise<boolean> => {
  try {
    const token = getFigmaToken();
    const response = await fetch(`${FIGMA_API_BASE}/me`, {
      headers: {
        'X-Figma-Token': token,
      },
    });
    return response.ok;
  } catch (error) {
    console.error('Figma connection test failed:', error);
    return false;
  }
};
