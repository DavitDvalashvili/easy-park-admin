export type ResponseStatus = {
  status:
    | "inserted"
    | "insert_exists"
    | "insert_error"
    | "updated"
    | "update_exists"
    | "update_error"
    | "deleted"
    | "delete_error";
  message: string;
  insert_id?: number | string;
};

export type service = {
  serviceName: string;
  title: string;
  description: string;
  languageId?: string | number;
  serviceId?: string | number;
};

export type benefit = {
  benefit: string;
  benefitId?: string | number;
  languageId?: string | number;
};

export type faq = {
  faqId?: string | number;
  question: string;
  answer: string;
  languageId?: string | number;
};

export type about = {
  Id?: string | number;
  title: string;
  subtitle: string;
  description: string;
  languageId?: string | number;
};

export type device = {
  deviceId?: string | number;
  name: string;
  description: string;
  languageId?: string | number;
};

export type feature = {
  featureId?: string | number;
  feature: string;
  languageId?: string | number;
};

export type image = {
  imageId: string | number;
  imageUrl: string;
};

export type deviceData = {
  devices: device[];
  features: feature[];
  images: image[];
};
