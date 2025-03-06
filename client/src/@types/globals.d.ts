type ResponseStatus = {
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

type service = {
  description: string;
  serviceId?: number | string;
  languageId?: number | string;
  serviceName: string;
  title: string;
};

type benefit = {
  benefit: string;
  benefitId?: string | number;
  languageId?: string | number;
};

type faq = {
  faqId?: string | number;
  question: string;
  answer: string;
  languageId?: string | number;
};

type about = {
  Id?: string | number;
  title: string;
  subtitle: string;
  description: string;
  languageId?: string | number;
};

type device = {
  deviceId?: string | number;
  name: string;
  description: string;
  languageId?: string | number;
};

type feature = {
  featureId?: string | number;
  feature: string;
  languageId?: string | number;
};

type image = {
  imageId: string | number;
  imageUrl: string;
};

type deviceData = {
  devices: device[];
  features: feature[];
  images: image[];
};
