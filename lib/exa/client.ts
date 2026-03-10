export async function analyzeProductContext(title: string): Promise<string[]> {
  try {
    const suggestions = [
      `Highlight ${title} features`,
      `Emphasize quality and durability`,
      `Show product in use context`,
      `Display size comparison`,
      `Highlight special offers`,
    ];

    return suggestions;
  } catch (error) {
    console.error('EXA analysis error:', error);
    return [];
  }
}
