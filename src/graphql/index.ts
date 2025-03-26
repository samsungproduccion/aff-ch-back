import { mergeSchemas } from "@graphql-tools/schema";
import {authSchema} from "./auth";
import { codesSchema } from "./codes";
import { productSchema } from "./product";
import { resourceSchema } from "./resources";
import { transactionSchema } from "./transaction";
import { userSchema } from "./user";
import { benefitSchema } from "./benefit";
import { seedSchema } from "./seed";
import { moduleSchema } from "./module";
import { menuSchema } from "./menu";
import { rolesSchema } from "./roles";
import { categorySchema } from "./category";
import { pageTrackingSchema } from "./page-tracking";

export default async () => {
  return mergeSchemas({
    schemas: [
      authSchema,
      userSchema,
      productSchema,
      codesSchema,
      resourceSchema,
      transactionSchema,
      benefitSchema,
      seedSchema,
      moduleSchema,
      menuSchema,
      rolesSchema,
      categorySchema,
      pageTrackingSchema
    ],
  });
};
