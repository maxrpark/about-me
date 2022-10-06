import mongoose, { Schema, Document, model } from "mongoose";

interface ThemeConfInt {
  theme: string;
  layout: string;
}

type ThemeSchemaType = ThemeConfInt & Document;

const ThemeConfigSchema = new Schema<ThemeSchemaType>({
  theme: {
    type: String,
    enum: {
      values: ["default", "dark", "costume", "pink", "light"],
      message: "{VALUE} is not a valid type",
    },
    required: [true, "Please enter a theme type"],
  },
  layout: {
    type: String,
    enum: {
      values: ["default", "minimalist", "styles"],
      message: "{VALUE} is not a valid type",
    },
    required: [true, "Please enter a layout type"],
  },
});

let ThemeConfig: mongoose.Model<ThemeSchemaType>;
try {
  ThemeConfig = model<ThemeSchemaType>("ThemeConfig");
} catch (error) {
  ThemeConfig = model<ThemeSchemaType>("ThemeConfig", ThemeConfigSchema);
}
export default ThemeConfig;
