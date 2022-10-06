import mongoose, { Document, Schema, model } from "mongoose";
import { LinkItemInt } from "../../ts/interfaces/interfaces";

type LinkSchemaType = LinkItemInt & Document;

const UserLinkSchema = new Schema<LinkSchemaType>({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minLength: 3,
    maxLength: 12,
  },
  url: {
    type: String,
    required: [true, "Please provide URL"],
  },
  type: {
    type: String,
    enum: {
      values: ["social", "links"],
      message: "{VALUE} is not a valid type",
    },
    required: [true, "Please a type"],
  },
});

let UserLink: mongoose.Model<LinkSchemaType>;
try {
  UserLink = model<LinkSchemaType>("Link");
} catch (error) {
  UserLink = model<LinkSchemaType>("Link", UserLinkSchema);
}
export default UserLink;
