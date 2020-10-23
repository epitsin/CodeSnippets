import SnippetSchema from '../models/snippet';
import TagSchema from '../models/tag';
import UserSchema, { UserModel } from '../models/user';

class DataInitializer {
  public static async populateInitialData(): Promise<void> {
    return DataInitializer.populateSnippets();
  }

  private static async createRelationship(
    tagName: string,
    snippetName: string,
    snippetCode: string,
    author: UserModel,
    likes: UserModel[],
  ): Promise<void> {
    const tag = await TagSchema.findOneAndUpdate(
      { name: tagName },
      {},
      { new: true, upsert: true },
    ).exec();
    const snippet = await SnippetSchema.findOneAndUpdate(
      { name: snippetName },
      { code: snippetCode, author: author._id, likes: likes.map((l) => l._id) },
      { new: true, upsert: true },
    ).exec();

    // Use equals to compare ObjectIds.
    if (!snippet.tags.some((t) => t.equals(tag?._id))) {
      snippet.tags.push(tag._id);
      await snippet.save();
    }

    // Use equals to compare ObjectIds.
    if (!tag.snippets.some((s) => s.equals(snippet?._id))) {
      tag.snippets.push(snippet._id);
      await tag.save();
    }
  }

  private static async populateSnippets() {
    // Using find and create separately (instead of findOneAndUpdate) because of the save pre hook
    const user1Email = 'harrypotter@hogwards.com';
    let user1 = await UserSchema.findOne({ email: user1Email }).exec();
    if (!user1) {
      user1 = await (new UserSchema({
        email: user1Email,
        password: 'harry1234',
        firstName: 'Harry',
        lastName: 'Potter',
      })).save();
    }

    const user2Email = 'hansolo@starwars.com';
    let user2 = await UserSchema.findOne({ email: user2Email }).exec();
    if (!user2) {
      user2 = await (new UserSchema({
        email: user2Email,
        password: 'solo1234',
        firstName: 'Han',
        lastName: 'Solo',
      })).save();
    }

    const user3Email = 'jacksparrow@pirates.com';
    let user3 = await UserSchema.findOne({ email: user3Email }).exec();
    if (!user3) {
      user3 = await (new UserSchema({
        email: user3Email,
        password: 'sparrow',
        firstName: 'Jack',
        lastName: 'Sparrow',
      })).save();
    }

    const adminEmail = 'gandalf@lordoftherings.com';
    let admin = await UserSchema.findOne({ email: adminEmail }).exec();
    if (!admin) {
      admin = await (new UserSchema({
        email: adminEmail,
        password: 'lord',
        firstName: 'Just',
        lastName: 'Gandalf',
      })).save();
    }

    if (!admin.roles.some((r) => r === 'admin')) {
      admin.roles.push('admin');
      await admin.save();
    }

    await this.createRelationship(
      'JavaScript',
      'Validating a Date Format',
      `function ValidateDateFormat(input) {
      var dateString = input.value;
   
      var regex = /(((0[1-9]|1[0-2])\\/(0|1)[0-9]|2[0-9]|3[0-1])\\/((19|20)\\d\\d))$/;
   
      Check whether valid dd/MM/yyyy Date Format.
      if (regex.test(dateString) || dateString.length == 0) {
          ShowHideError("none");
      } else {
          ShowHideError("block");
          input.focus();
          input.select();
      }
  };`,
      user1,
      [user2, user3],
    );

    await this.createRelationship(
      'CSS',
      'CSS Conic Gradient Example',
      `conic-gradient() = conic-gradient(
    [ from <angle> ]? [ at <position> ]?,
    <angular-color-stop-list>
  )
  .conic-gradient {
    background: conic-gradient(#fff, #000);
  }
  .conic-gradient {
    /* Original example */
    background-image: conic-gradient(#fff, #000);
    /* Explicitly state the location center point */
    background: conic-gradient(at 50% 50%, #fff, #000);
    /* Explicitly state the angle of the start color */
    background: conic-gradient(from 0deg, #fff, #000);
    /* Explicitly state the angle of the start color and center point location */
    background: conic-gradient(from 0deg at center, #fff, #000);
    /* Explicitly state the angles of both colors as percentages instead of degrees */
    background: conic-gradient(#fff 0%, #000 100%);
    /* Explicitly state the angle of the starting color in degrees and the ending color by a full turn of the circle */
    background: conic-gradient(#fff 0deg, #000 1turn);
  }`,
      user2,
      [user1],
    );

    await this.createRelationship(
      'Java',
      'How to Java configuration file with terraform',
      `//For example, to try the AWS two-tier architecture example:

git clone https://github.com/terraform-providers/terraform-provider-aws.git
cd terraform-provider-aws/examples/two-tier

// try out an example, run Terraform's init and apply commands while in the example's directory:

$ terraform init
...
$ terraform apply
...`,
      user3,
      [],
    );
  }
}

export default DataInitializer;
