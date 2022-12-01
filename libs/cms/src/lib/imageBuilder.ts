import { imageUrlBuilderFactory } from "@aew/cms-image-utils";

import { client } from "./client";

export const imageUrlBuilder = imageUrlBuilderFactory(client);
