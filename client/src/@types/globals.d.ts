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
