import SnippetSchema from '../models/snippet';
import TagSchema from '../models/tag';
import UserSchema, { UserModel } from '../models/user';

class DataInitializer {
  public static async populateInitialData() {
    DataInitializer.populateSnippets();
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
    );
    const snippet = await SnippetSchema.findOneAndUpdate(
      { name: snippetName },
      { code: snippetCode, author: author._id, likes: likes.map((l) => l._id) },
      { new: true, upsert: true },
    );

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
    // TODO: read from file
    const user1 = await UserSchema.findOneAndUpdate(
      { email: 'harrypotter@hogwards.com' },
      { password: 'harry1234', firstName: 'Harry', lastName: 'Potter' },
      { new: true, upsert: true },
    );

    const user2 = await UserSchema.findOneAndUpdate(
      { email: 'hansolo@starwars.com' },
      { password: 'solo1234', firstName: 'Han', lastName: 'Solo' },
      { new: true, upsert: true },
    );

    const user3 = await UserSchema.findOneAndUpdate(
      { email: 'jacksparrow@pirates.com' },
      { password: 'sparrow', firstName: 'Jack', lastName: 'Sparrow' },
      { new: true, upsert: true },
    );

    this.createRelationship(
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

    this.createRelationship(
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

    this.createRelationship(
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
