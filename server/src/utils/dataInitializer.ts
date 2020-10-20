import SnippetSchema from '../models/snippet';

export class DataInitializer {
  public static async populateInitialData() {
    const existingData = await SnippetSchema.find({});;
    if (existingData.length) {
      return;
    }

    // TODO: read from file
    const snippet = new SnippetSchema({
      name: 'test name',
      code: 'test code'
    });

    await snippet.save();
  }
}
